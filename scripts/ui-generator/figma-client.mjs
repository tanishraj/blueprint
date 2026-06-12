const normalizeNumber = (value) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }
  return Number(value.toFixed(4));
};

const colorToHex = ({ r = 0, g = 0, b = 0, a = 1 }) => {
  const clamp = (number) => {
    const normalized = Math.round(Math.max(0, Math.min(1, number)) * 255);
    return normalized.toString(16).padStart(2, '0');
  };

  const alpha = normalizeNumber(a);
  const alphaHex = alpha >= 1 ? '' : `/${clamp(alpha)}`;
  return `#${clamp(r)}${clamp(g)}${clamp(b)}${alphaHex}`.toLowerCase();
};

const collectColorsFromFills = (fills = []) => {
  const colors = [];

  if (!Array.isArray(fills)) {
    return colors;
  }

  fills.forEach((fill) => {
    if (!fill || fill.type !== 'SOLID') {
      return;
    }
    if (fill.visible === false) {
      return;
    }
    if (!fill.color) {
      return;
    }
    colors.push(colorToHex(fill.color));
  });

  return colors;
};

const walkNodeTree = (node, cb) => {
  if (!node || typeof node !== 'object') {
    return;
  }

  cb(node);

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => walkNodeTree(child, cb));
  }

  if (Array.isArray(node.children) === false) {
    Object.keys(node).forEach((key) => {
      const value = node[key];
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          value.forEach((item) => walkNodeTree(item, cb));
        } else if (key !== 'style' && key !== 'fills' && key !== 'strokes') {
          walkNodeTree(value, cb);
        }
      }
    });
  }
};

export async function fetchFigmaNode(fileKey, nodeId, token) {
  const encodedNodeId = encodeURIComponent(nodeId);
  const endpoint = `https://api.figma.com/v1/files/${encodeURIComponent(
    fileKey,
  )}/nodes?ids=${encodedNodeId}`;

  const response = await fetch(endpoint, {
    headers: {
      'X-Figma-Token': token,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Figma API error (${response.status}): ${body || response.statusText}`,
    );
  }

  return response.json();
}

const readNodeFromPayload = (payload, nodeId) => {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid Figma payload.');
  }

  if (payload.nodes && payload.nodes[nodeId]?.document) {
    return payload.nodes[nodeId].document;
  }

  const nodes = payload.nodes;
  if (nodes) {
    const firstKey = Object.keys(nodes)[0];
    if (firstKey && nodes[firstKey]?.document) {
      return nodes[firstKey].document;
    }
  }

  if (payload.document) {
    if (Array.isArray(payload.document.children) && payload.document.children[0]) {
      return payload.document.children[0];
    }
    return payload.document;
  }

  throw new Error('Could not find a compatible Figma node in payload.');
};

const parseVariantProperties = (node) => {
  const definitions = node?.componentPropertyDefinitions || {};
  return Object.entries(definitions).map(([name, value]) => {
    const def = value || {};
    return {
      name,
      type: def.type || 'TEXT',
      defaultValue: def.defaultValue || null,
      values: Array.isArray(def.values) ? def.values : [],
    };
  });
};

const parseVariantChildren = (node) => {
  if (!Array.isArray(node?.children)) {
    return [];
  }
  return node.children
    .map((child) => child?.name)
    .filter(Boolean)
    .map((name) => name.trim());
};

const collectDesignTokens = (node) => {
  const palette = new Set();
  const typography = [];
  const layout = [];

  walkNodeTree(node, (current) => {
    if (current.fills) {
      collectColorsFromFills(current.fills).forEach((hex) => palette.add(hex));
    }
    if (current.strokes) {
      collectColorsFromFills(current.strokes).forEach((hex) => palette.add(hex));
    }

    if (current.type === 'TEXT' && current.style) {
      typography.push({
        family: current.style.fontFamily,
        size: current.style.fontSize,
        weight: current.style.fontWeight,
        lineHeight: current.style.lineHeightPx || current.style.lineHeightPercentFontSize,
      });
    }

    if (current.type === 'RECTANGLE' || current.type === 'FRAME') {
      layout.push({
        name: current.name || current.type,
        width: current.absoluteBoundingBox?.width,
        height: current.absoluteBoundingBox?.height,
        cornerRadius: current.cornerRadius,
        x: current.absoluteBoundingBox?.x,
        y: current.absoluteBoundingBox?.y,
      });
    }
  });

  return {
    palette: [...palette],
    typography,
    layout,
  };
};

export function normalizeFigmaSpec(node, requestedName) {
  const props = parseVariantProperties(node);
  const tokens = collectDesignTokens(node);
  const variantChildren = parseVariantChildren(node);

  return {
    componentName: requestedName || node.name,
    figmaNodeName: node.name || requestedName,
    description: node.description || '',
    nodeType: node.type || 'COMPONENT',
    variantProperties: props,
    variantChildren,
    layout: node.absoluteBoundingBox
      ? {
          width: node.absoluteBoundingBox.width,
          height: node.absoluteBoundingBox.height,
        }
      : null,
    tokens,
  };
}

export async function resolveFigmaSpec({
  fileKey,
  nodeId,
  token,
  componentName,
}) {
  const payload = await fetchFigmaNode(fileKey, nodeId, token);
  const node = readNodeFromPayload(payload, nodeId);
  return normalizeFigmaSpec(node, componentName);
}

