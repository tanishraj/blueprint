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
  resetLevel: () => void;
  exportImg: () => void;
  exportSvg: () => void;
  expandAll: () => void;
  collapseAll: () => void;
}

export interface OrgChartComponentProps {
  data: OrgChartNodeData[];
  orientation?: OrgChartOrientation;
  initialDepth?: number;
  onNodeClick?: (nodeId: string) => void;
  onZoomChange?: (zoomPercent: number) => void;
  ref?: React.Ref<OrgChartRef>;
}
