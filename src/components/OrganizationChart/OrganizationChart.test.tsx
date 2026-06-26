import { act, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { OrganizationChart } from './OrganizationChart';
import { companyHierarchy20Data } from './mockData';
import type { OrgChartRef } from './types';
import { normalizeOrgChartNode } from './utils';

const resizeObserverCallbacks: Array<() => void> = [];
type OrgChartMock = {
  container: ReturnType<typeof vi.fn>;
  data: ReturnType<typeof vi.fn>;
  layout: ReturnType<typeof vi.fn>;
  initialExpandLevel: ReturnType<typeof vi.fn>;
  imageName: ReturnType<typeof vi.fn>;
  svgHeight: ReturnType<typeof vi.fn>;
  nodeWidth: ReturnType<typeof vi.fn>;
  nodeHeight: ReturnType<typeof vi.fn>;
  childrenMargin: ReturnType<typeof vi.fn>;
  siblingsMargin: ReturnType<typeof vi.fn>;
  neighbourMargin: ReturnType<typeof vi.fn>;
  compact: ReturnType<typeof vi.fn>;
  buttonContent: ReturnType<typeof vi.fn>;
  nodeButtonWidth: ReturnType<typeof vi.fn>;
  nodeButtonHeight: ReturnType<typeof vi.fn>;
  nodeUpdate: ReturnType<typeof vi.fn>;
  linkUpdate: ReturnType<typeof vi.fn>;
  onZoom: ReturnType<typeof vi.fn>;
  onNodeClick: ReturnType<typeof vi.fn>;
  nodeContent: ReturnType<typeof vi.fn>;
  render: ReturnType<typeof vi.fn>;
  fit: ReturnType<typeof vi.fn>;
  zoomIn: ReturnType<typeof vi.fn>;
  zoomOut: ReturnType<typeof vi.fn>;
  initialZoom: ReturnType<typeof vi.fn>;
  collapseAll: ReturnType<typeof vi.fn>;
  expandAll: ReturnType<typeof vi.fn>;
  exportImg: ReturnType<typeof vi.fn>;
  exportSvg: ReturnType<typeof vi.fn>;
  clear: ReturnType<typeof vi.fn>;
  onZoomHandler?: (...args: unknown[]) => void;
  onNodeClickHandler?: (...args: unknown[]) => void;
};

const createOrgChartMock = () => {
  const instance: OrgChartMock = {
    container: vi.fn(),
    data: vi.fn(),
    layout: vi.fn(),
    initialExpandLevel: vi.fn(),
    imageName: vi.fn(),
    svgHeight: vi.fn(),
    nodeWidth: vi.fn(),
    nodeHeight: vi.fn(),
    childrenMargin: vi.fn(),
    siblingsMargin: vi.fn(),
    neighbourMargin: vi.fn(),
    compact: vi.fn(),
    buttonContent: vi.fn(),
    nodeButtonWidth: vi.fn(),
    nodeButtonHeight: vi.fn(),
    nodeUpdate: vi.fn(),
    linkUpdate: vi.fn(),
    onZoom: vi.fn(),
    onNodeClick: vi.fn(),
    nodeContent: vi.fn(),
    render: vi.fn(),
    fit: vi.fn(),
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    initialZoom: vi.fn(),
    collapseAll: vi.fn(),
    expandAll: vi.fn(),
    exportImg: vi.fn(),
    exportSvg: vi.fn(),
    clear: vi.fn(),
  };

  const callWithoutArgs = (handler: unknown) => {
    if (typeof handler === 'function') {
      handler();
    }
  };

  instance.container = vi.fn().mockReturnThis();
  instance.data = vi.fn().mockReturnThis();
  instance.layout = vi.fn().mockReturnThis();
  instance.initialExpandLevel = vi.fn().mockReturnThis();
  instance.imageName = vi.fn().mockReturnThis();
  instance.svgHeight = vi.fn().mockReturnThis();
  instance.nodeWidth = vi.fn((handler: unknown) => {
    callWithoutArgs(handler);
    return instance;
  });
  instance.nodeHeight = vi.fn((handler: unknown) => {
    callWithoutArgs(handler);
    return instance;
  });
  instance.childrenMargin = vi.fn((handler: unknown) => {
    callWithoutArgs(handler);
    return instance;
  });
  instance.siblingsMargin = vi.fn((handler: unknown) => {
    callWithoutArgs(handler);
    return instance;
  });
  instance.neighbourMargin = vi.fn((handler: unknown) => {
    callWithoutArgs(handler);
    return instance;
  });
  instance.compact = vi.fn().mockReturnThis();
  instance.buttonContent = vi.fn((handler: unknown) => {
    if (typeof handler === 'function') {
      handler({ node: { data: { _directSubordinates: 3 } } });
    }
    return instance;
  });
  instance.nodeButtonWidth = vi.fn((handler: unknown) => {
    callWithoutArgs(handler);
    return instance;
  });
  instance.nodeButtonHeight = vi.fn((handler: unknown) => {
    callWithoutArgs(handler);
    return instance;
  });
  instance.nodeUpdate = vi.fn((handler: unknown) => {
    if (typeof handler === 'function') {
      const nodeButtonGroup = {
        setAttribute: vi.fn(),
      };
      const nodeButtonCircle = {
        setAttribute: vi.fn(),
      };
      const nodeButtonText = {
        setAttribute: vi.fn(),
      };

      handler({}, 0, [
        {
          querySelector: (selector: string) => {
            if (selector === '.node-button-g') return nodeButtonGroup;
            if (selector === '.node-button-circle') return nodeButtonCircle;
            if (selector === '.node-button-text') return nodeButtonText;
            return null;
          },
        },
      ]);
    }
    return instance;
  });
  instance.linkUpdate = vi.fn((handler: unknown) => {
    if (typeof handler === 'function') {
      handler({}, 0, [
        {
          setAttribute: vi.fn(),
        },
      ]);
    }
    return instance;
  });
  instance.onZoom = vi.fn((handler: unknown) => {
    if (typeof handler === 'function') {
      instance.onZoomHandler = handler as (...args: unknown[]) => void;
    }
    return instance;
  });
  instance.onNodeClick = vi.fn((handler: unknown) => {
    if (typeof handler === 'function') {
      instance.onNodeClickHandler = handler as (...args: unknown[]) => void;
    }
    return instance;
  });
  instance.nodeContent = vi.fn((handler: unknown) => {
    if (typeof handler === 'function') {
      handler({
        data: {
          id: 'abc',
          parentId: null,
          name: 'Node',
          position: 'Entity',
        },
      });
    }
    return instance;
  });
  instance.render = vi.fn().mockReturnThis();
  instance.fit = vi.fn().mockReturnThis();
  instance.zoomIn = vi.fn();
  instance.zoomOut = vi.fn();
  instance.initialZoom = vi.fn().mockReturnThis();
  instance.collapseAll = vi.fn().mockReturnThis();
  instance.expandAll = vi.fn().mockReturnThis();
  instance.exportImg = vi.fn();
  instance.exportSvg = vi.fn();
  instance.clear = vi.fn();

  return instance;
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
  constructor(callback: () => void) {
    resizeObserverCallbacks.push(callback);
  }

  observe = vi.fn();
  disconnect = vi.fn();
}

describe('OrganizationChart', () => {
  beforeEach(() => {
    orgChartInstances.length = 0;
    resizeObserverCallbacks.length = 0;
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  it('configures the chart instance with the provided hierarchy data', () => {
    render(
      <OrganizationChart
        data={companyHierarchy20Data}
        className='h-180'
        dataTestId='organization-chart'
      />,
    );

    const chart = orgChartInstances[0];

    expect(chart.data).toHaveBeenCalledWith(
      companyHierarchy20Data.map(normalizeOrgChartNode),
    );
    expect(chart.layout).toHaveBeenCalledWith('top');
    expect(chart.render).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole('region', { name: /organization chart/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('organization-chart')).toBeInTheDocument();
    expect(screen.getByText('Secured Entity')).toBeInTheDocument();
    expect(screen.getByText('Unsecured Entity')).toBeInTheDocument();
  });

  it('updates the zoom indicator and emits zoom changes', () => {
    const onZoomChange = vi.fn();

    render(
      <OrganizationChart
        data={companyHierarchy20Data}
        className='h-180'
        onZoomChange={onZoomChange}
      />,
    );

    const onZoom = orgChartInstances[0].onZoom.mock.calls[0][0];

    act(() => {
      onZoom({ transform: { k: 1.62 } });
    });

    expect(screen.getByText('Zoom: 162%')).toBeInTheDocument();
    expect(onZoomChange).toHaveBeenCalledWith(162);

    act(() => {
      onZoom({});
    });

    expect(screen.getByText('Zoom: 100%')).toBeInTheDocument();
  });

  it('exposes imperative chart actions through the forwarded ref', () => {
    const ref = createRef<OrgChartRef>();

    render(
      <OrganizationChart
        ref={ref}
        data={companyHierarchy20Data}
        className='h-180'
        initialDepth={2}
      />,
    );

    const chart = orgChartInstances[0];

    vi.useFakeTimers();

    act(() => {
      ref.current?.zoomIn();
      ref.current?.resetLevel();
      ref.current?.zoomOut();
      ref.current?.resetZoom();
      ref.current?.resetOrientation();
      ref.current?.exportImg();
      ref.current?.exportSvg();
      ref.current?.expandAll();

      vi.advanceTimersByTime(1100);
    });

    vi.useRealTimers();

    expect(chart.zoomIn).toHaveBeenCalled();
    expect(chart.collapseAll).toHaveBeenCalled();
    expect(chart.initialExpandLevel).toHaveBeenCalledWith(2);
    expect(chart.expandAll).toHaveBeenCalled();
    expect(chart.zoomOut).toHaveBeenCalled();
    expect(chart.render).toHaveBeenCalled();
    expect(chart.fit).toHaveBeenCalled();
    expect(chart.exportImg).toHaveBeenCalled();
    expect(chart.exportSvg).toHaveBeenCalled();
  });

  it('handles resize observer callback when chart is not initialized', () => {
    const { unmount } = render(
      <OrganizationChart data={companyHierarchy20Data} className='h-180' />,
    );

    unmount();

    const callback =
      resizeObserverCallbacks[resizeObserverCallbacks.length - 1];

    expect(typeof callback).toBe('function');
    callback?.();

    const chart = orgChartInstances[0];

    expect(chart.render).toHaveBeenCalledTimes(1);
  });

  it('renders the empty state when no chart data is provided', () => {
    const ref = createRef<OrgChartRef>();
    render(
      <OrganizationChart
        ref={ref}
        data={[]}
        className='h-180'
        dataTestId='organization-chart-empty'
        showZoomBadge={false}
      />,
    );

    expect(
      screen.getByText('No organization chart data available.'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('organization-chart-empty')).toBeInTheDocument();

    expect(ref.current?.exportSvg).toBeInstanceOf(Function);
    ref.current?.exportSvg();
  });

  it('invokes node click callback only when node id is present', () => {
    const onNodeClick = vi.fn();
    render(
      <OrganizationChart
        data={companyHierarchy20Data}
        className='h-180'
        onNodeClick={onNodeClick}
      />,
    );

    const onNodeClickHandler =
      orgChartInstances[0].onNodeClick.mock.calls[0][0];

    onNodeClickHandler({});
    onNodeClickHandler({ id: 42 });

    expect(onNodeClick).toHaveBeenCalledWith('42');
    expect(onNodeClick).toHaveBeenCalledTimes(1);
  });

  it('hides the zoom badge when showZoomBadge is disabled', () => {
    render(
      <OrganizationChart
        data={companyHierarchy20Data}
        className='h-180'
        showZoomBadge={false}
      />,
    );

    expect(screen.queryByText(/zoom:\s*100%/i)).not.toBeInTheDocument();
  });

  it('resets orientation through the forwarded ref for controlled usage', () => {
    const ref = createRef<OrgChartRef>();
    const onOrientationChange = vi.fn();

    render(
      <OrganizationChart
        ref={ref}
        data={companyHierarchy20Data}
        className='h-180'
        orientation='left'
        onOrientationChange={onOrientationChange}
      />,
    );

    ref.current?.resetOrientation();

    expect(onOrientationChange).toHaveBeenCalledWith('top');
  });
});
