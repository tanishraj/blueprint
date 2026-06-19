import type { OrgChartApiNodeData, OrgChartNodeData } from './types';

const COLORS = {
  secured: 'var(--border-color-primary)',
  unsecured: 'var(--border-color-danger)',
  surface:
    'color-mix(in srgb, var(--background-color-default) 86%, var(--text-color-white) 14%)',
  border: 'var(--border-color-default)',
  textPrimary: 'var(--text-color-default)',
  textSecondary: 'var(--text-color-caption)',
  chipBackground: 'var(--background-color-primary-inverted)',
  chipBorder: 'var(--border-color-primary)',
  chipText: 'var(--text-color-primary)',
  chipTextStrong: 'var(--text-color-primary)',
  chipBackgroundActive: 'var(--background-color-primary)',
  chipBorderActive: 'var(--border-color-primary)',
  chipTextOnActive: 'var(--text-color-white)',
};

type OrgChartButtonNodeData = OrgChartNodeData & {
  _directSubordinates?: number;
};

type OrgChartButtonNode = {
  data: OrgChartButtonNodeData;
  children?: unknown[] | null | undefined;
  _children?: unknown[] | null | undefined;
};

export const formatEnumLabel = (value?: string | null): string => {
  if (!value) {
    return '—';
  }

  return value
    .replace(/_/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
};

export const formatRoleLabel = (value?: string | null): string | null => {
  const label = formatEnumLabel(value);

  if (label === '—' || label.toLowerCase() === 'not applicable') {
    return null;
  }

  return label;
};

export const formatRevenue = (value?: number | null): string => {
  if (value === undefined || value === null) {
    return '-';
  }

  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    })
      .format(millions)
      .replace(/\.0+$/, '')
      .replace(/(\.\d*[1-9])0+$/, '$1');

    return `$${formatted} M`;
  }

  return `$${new Intl.NumberFormat('en-US').format(value)}`;
};

export const formatRevenueShare = (value?: number | null): string | null => {
  if (value === undefined || value === null) {
    return null;
  }

  return `${Math.round(value * 100)}% of group`;
};

const getCountryFlagSrc = (countryCode?: string | null): string | null => {
  if (!countryCode || countryCode.length !== 2) {
    return null;
  }

  return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;
};

const getBottomTags = (node: OrgChartNodeData): string[] => {
  const tags: string[] = [];
  const entityTypeLabel = node.entityType
    ? formatEnumLabel(node.entityType)
    : node.position;
  const roleLabel = formatRoleLabel(node.role);

  if (entityTypeLabel && entityTypeLabel !== '—') {
    tags.push(entityTypeLabel);
  }

  if (roleLabel && roleLabel !== 'Borrower') {
    tags.push(roleLabel);
  }

  if (!tags.length && node.companyCode) {
    tags.push(node.companyCode);
  }

  return tags;
};

export const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export const isOrgChartApiNodeData = (
  node: OrgChartNodeData | OrgChartApiNodeData,
): node is OrgChartApiNodeData => {
  return 'entityName' in node;
};

export const normalizeOrgChartNode = (
  node: OrgChartNodeData | OrgChartApiNodeData,
): OrgChartNodeData => {
  if (!isOrgChartApiNodeData(node)) {
    return {
      ...node,
      countryName: node.countryName ?? node.location ?? node.position,
      entityType: node.entityType ?? node.position,
      role: node.role ?? null,
      securityPosition: node.securityPosition ?? 'Secured',
    };
  }

  return {
    id: node.id,
    parentId: node.parent?.id ?? null,
    name: node.entityName,
    position: node.entityType ?? 'Entity',
    countryCode: node.country?.country_code ?? null,
    countryName: node.country?.name ?? null,
    entityType: node.entityType ?? null,
    role: node.role ?? null,
    revenue: node.revenue ?? null,
    revenueShare: node.revenueAllocPct ?? null,
    securityPosition: node.securityPosition ?? null,
  };
};

export const buildNodeContent = (
  node: OrgChartNodeData,
  width: number,
  height: number,
): string => {
  const isBorrower = formatRoleLabel(node.role) === 'Borrower';
  const isUnsecured = node.securityPosition === 'Unsecured';
  const flagSrc = getCountryFlagSrc(node.countryCode);
  const revenueLabel = node.revenue !== undefined ? 'Revenue' : 'Headcount';
  const revenue =
    node.revenue !== undefined
      ? formatRevenue(node.revenue)
      : node.headcount || '-';
  const revenueShare =
    node.revenue !== undefined ? formatRevenueShare(node.revenueShare) : null;
  const tags = getBottomTags(node);
  const locationLabel = node.countryName ?? node.location ?? node.position;

  return `
        <div style="
            box-sizing: border-box;
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            border-radius: 16px;
            border: 2px ${isUnsecured ? 'dashed' : 'solid'} ${isUnsecured ? COLORS.unsecured : COLORS.secured};
            background: ${COLORS.surface};
            font-family: var(--font-body);
            color: ${COLORS.textPrimary};
            padding: 20px;
            overflow: visible;
        ">
            ${
              isBorrower
                ? `<div style="
                        position: absolute;
                        top: -20px;
                        right: 24px;
                        border: 2px solid ${COLORS.chipBorder};
                        border-radius: 999px;
                        background: ${COLORS.chipBackground};
                        padding: 8px 16px;
                        color: ${COLORS.chipText};
                        font-size: 14px;
                        font-weight: 700;
                        line-height: 1;
                        text-transform: uppercase;
                    ">BORROWER</div>`
                : ''
            }
            <div style="font-size: 18px; font-weight: 700; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(node.name)}">${escapeHtml(node.name)}</div>
            <div style="display:flex; align-items:center; gap:10px; margin-top:16px; font-size:14px; line-height:20px; color:${COLORS.textPrimary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${flagSrc ? `<img src="${flagSrc}" alt="" width="24" height="18" style="display:block; border-radius:2px; flex:0 0 auto;" />` : ''}
                <span style="overflow:hidden; text-overflow:ellipsis;">${escapeHtml(locationLabel)}</span>
            </div>
            <div style="margin-top:20px; font-size:16px; line-height:24px; color:${COLORS.textSecondary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${revenueLabel}: <span style="font-weight:700; color:${COLORS.textPrimary};">${escapeHtml(revenue)}</span>
                ${revenueShare ? `<span> (${escapeHtml(revenueShare)})</span>` : ''}
            </div>
            <div style="height:1px; margin:18px 0 16px; background:${COLORS.border};"></div>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
                ${tags
                  .map(
                    tag => `<span style="
                            display:inline-flex;
                            align-items:center;
                            width:fit-content;
                            max-width:100%;
                            padding:6px 12px;
                            border:2px solid ${COLORS.chipBorder};
                            border-radius:999px;
                            background:${COLORS.chipBackground};
                            color:${COLORS.chipText};
                            font-size:13px;
                            font-weight:700;
                            line-height:1.2;
                            white-space:normal;
                            overflow-wrap:anywhere;
                            text-align:center;
                        " title="${escapeHtml(tag)}">${escapeHtml(tag)}</span>`,
                  )
                  .join('')}
            </div>
        </div>
    `;
};

export const buildButtonContent = (node: OrgChartButtonNode) => {
  const childCount = node.data._directSubordinates ?? 0;
  const isExpanded = Boolean(node.children);
  const background = isExpanded
    ? COLORS.chipBackground
    : COLORS.chipBackgroundActive;
  const border = isExpanded ? COLORS.chipBorder : COLORS.chipBorderActive;
  const text = isExpanded ? COLORS.chipTextStrong : COLORS.chipTextOnActive;

  return `
        <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            min-width:32px;
            height:32px;
            margin:auto;
            border:2px solid ${border};
            border-radius:999px;
            background:${background};
            color:${text};
            font-family:var(--font-body);
            font-size:13px;
            font-weight:700;
            line-height:1;
            box-sizing:border-box;
            padding:0 10px;
        ">${childCount}</div>
    `;
};
