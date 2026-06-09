export type OrgChartOrientation = 'top' | 'left' | 'bottom' | 'right';

export interface OrgChartNodeData {
  id: string;
  parentId: string | null;
  name: string;
  position: string;
}

export interface OrgChartRef {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  exportImg: () => void;
  exportSvg: () => void;
  expandAll: () => void;
  collapseAll: () => void;
}

export interface OrgChartComponentProps {
  data: OrgChartNodeData[];
  orientation?: OrgChartOrientation;
  onNodeClick?: (nodeId: string) => void;
  ref?: React.Ref<OrgChartRef>;
}
