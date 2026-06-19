import type { ComponentPropsWithoutRef } from 'react';

export type OrgChartOrientation = 'top' | 'left' | 'bottom' | 'right';
export type OrgChartNodeAccent =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export interface OrgChartCountryData {
  id?: string | null;
  name?: string | null;
  country_code?: string | null;
  __typename?: string;
}

export interface OrgChartApiNodeData {
  id: string;
  companyId?: string;
  securityPosition?: string | null;
  entityName: string;
  country?: OrgChartCountryData | null;
  entityType?: string | null;
  parent?: { id: string } | null;
  role?: string | null;
  revenue?: number | null;
  revenueAllocPct?: number | null;
  __typename?: string;
}

export interface OrgChartNodeData {
  id: string;
  parentId: string | null;
  name: string;
  position: string;
  countryCode?: string | null;
  countryName?: string | null;
  entityType?: string | null;
  role?: string | null;
  revenue?: number | null;
  revenueShare?: number | null;
  securityPosition?: string | null;
  companyCode?: string;
  location?: string;
  headcount?: string;
  accent?: OrgChartNodeAccent;
}

export interface OrgChartRef {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  resetLevel: () => void;
  resetOrientation: () => void;
  exportImg: () => void;
  exportSvg: () => void;
  expandAll: () => void;
  collapseAll: () => void;
}

export interface OrgChartComponentProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'onClick'
> {
  data: Array<OrgChartNodeData | OrgChartApiNodeData>;
  orientation?: OrgChartOrientation;
  onOrientationChange?: (orientation: OrgChartOrientation) => void;
  initialDepth?: number;
  imageName?: string;
  onNodeClick?: (nodeId: string) => void;
  onZoomChange?: (zoomPercent: number) => void;
  emptyMessage?: string;
  showZoomBadge?: boolean;
  dataTestId?: string;
}
