import { act, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { OrganizationChart } from './OrganizationChart';
import { companyHierarchy20Data } from './mockData';
import type { OrgChartRef } from './types';
import { normalizeOrgChartNode } from './utils';

const createOrgChartMock = () => {
  return {
    container: vi.fn().mockReturnThis(),
    data: vi.fn().mockReturnThis(),
    layout: vi.fn().mockReturnThis(),
    initialExpandLevel: vi.fn().mockReturnThis(),
    imageName: vi.fn().mockReturnThis(),
    svgHeight: vi.fn().mockReturnThis(),
    nodeWidth: vi.fn().mockReturnThis(),
    nodeHeight: vi.fn().mockReturnThis(),
    childrenMargin: vi.fn().mockReturnThis(),
    siblingsMargin: vi.fn().mockReturnThis(),
    neighbourMargin: vi.fn().mockReturnThis(),
    compact: vi.fn().mockReturnThis(),
    nodeButtonWidth: vi.fn().mockReturnThis(),
    nodeButtonHeight: vi.fn().mockReturnThis(),
    buttonContent: vi.fn().mockReturnThis(),
    nodeUpdate: vi.fn().mockReturnThis(),
    onZoom: vi.fn().mockReturnThis(),
    onNodeClick: vi.fn().mockReturnThis(),
    linkUpdate: vi.fn().mockReturnThis(),
    nodeContent: vi.fn().mockReturnThis(),
    render: vi.fn().mockReturnThis(),
    fit: vi.fn().mockReturnThis(),
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    initialZoom: vi.fn().mockReturnThis(),
    collapseAll: vi.fn().mockReturnThis(),
    expandAll: vi.fn().mockReturnThis(),
    exportImg: vi.fn(),
    exportSvg: vi.fn(),
    clear: vi.fn(),
  };
};

const orgChartInstances: ReturnType<typeof createOrgChartMock>[] = [];

vi.mock('d3-org-chart', () => {
  function OrgChart() {
    const instance = createOrgChartMock();
    orgChartInstances.push(instance);
    return instance;
  }

  return {
    OrgChart,
  };
});

class ResizeObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
}

describe('OrganizationChart', () => {
  beforeEach(() => {
    orgChartInstances.length = 0;
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  it('configures the chart instance with the provided hierarchy data', () => {
    render(
      <OrganizationChart data={companyHierarchy20Data} className='h-[720px]' />,
    );

    const chart = orgChartInstances[0];

    expect(chart.data).toHaveBeenCalledWith(
      companyHierarchy20Data.map(normalizeOrgChartNode),
    );
    expect(chart.layout).toHaveBeenCalledWith('top');
    expect(chart.render).toHaveBeenCalled();
    expect(
      screen.getByRole('region', { name: /organization chart/i }),
    ).toBeInTheDocument();
  });

  it('updates the zoom indicator and emits zoom changes', () => {
    const onZoomChange = vi.fn();

    render(
      <OrganizationChart
        data={companyHierarchy20Data}
        className='h-[720px]'
        onZoomChange={onZoomChange}
      />,
    );

    const onZoom = orgChartInstances[0].onZoom.mock.calls[0][0];

    act(() => {
      onZoom({ transform: { k: 1.62 } });
    });

    expect(screen.getByText('Zoom: 162%')).toBeInTheDocument();
    expect(onZoomChange).toHaveBeenCalledWith(162);
  });

  it('exposes imperative chart actions through the forwarded ref', () => {
    const ref = createRef<OrgChartRef>();

    render(
      <OrganizationChart
        ref={ref}
        data={companyHierarchy20Data}
        className='h-[720px]'
        initialDepth={2}
      />,
    );

    const chart = orgChartInstances[0];

    ref.current?.zoomIn();
    ref.current?.resetLevel();
    ref.current?.expandAll();

    expect(chart.zoomIn).toHaveBeenCalled();
    expect(chart.collapseAll).toHaveBeenCalled();
    expect(chart.initialExpandLevel).toHaveBeenCalledWith(2);
    expect(chart.expandAll).toHaveBeenCalled();
  });
});
