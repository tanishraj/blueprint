import { OrgChart } from 'd3-org-chart';
import {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '../../utils';
import {
  organizationChartEmptyStateClassName,
  ORGANIZATION_CHART_NODE_HEIGHT,
  ORGANIZATION_CHART_NODE_WIDTH,
  organizationChartLegendClassName,
  organizationChartWrapperClassName,
  organizationChartZoomIndicatorClassName,
} from './OrganizationChart.styles';
import type {
  OrgChartComponentProps,
  OrgChartNodeData,
  OrgChartOrientation,
  OrgChartRef,
} from './types';
import {
  buildButtonContent,
  buildNodeContent,
  normalizeOrgChartNode,
} from './utils';

const DEFAULT_ORIENTATION: OrgChartOrientation = 'top';

const LEGEND_ITEMS = [
  {
    label: 'Secured Entity',
    indicatorClassName: 'border-primary',
  },
  {
    label: 'Unsecured Entity',
    indicatorClassName: 'border-danger border-dashed',
  },
] as const;

export const OrganizationChart = forwardRef<
  OrgChartRef,
  OrgChartComponentProps
>(function OrganizationChart(
  {
    data,
    orientation: controlledOrientation,
    onOrientationChange,
    initialDepth = 1,
    imageName = 'organization-chart',
    onNodeClick,
    onZoomChange,
    className,
    emptyMessage = 'No organization chart data available.',
    showZoomBadge = true,
    dataTestId,
    ...restProps
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<OrgChart<OrgChartNodeData> | null>(null);
  const zoomTextRef = useRef<HTMLDivElement | null>(null);
  const [uncontrolledOrientation, setUncontrolledOrientation] =
    useState<OrgChartOrientation>(controlledOrientation ?? DEFAULT_ORIENTATION);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const normalizedData = useMemo(() => data.map(normalizeOrgChartNode), [data]);
  const orientation = controlledOrientation ?? uncontrolledOrientation;
  const handleOrientationChange = useCallback(
    (nextOrientation: OrgChartOrientation) => {
      if (controlledOrientation === undefined) {
        setUncontrolledOrientation(nextOrientation);
      }

      onOrientationChange?.(nextOrientation);
    },
    [controlledOrientation, onOrientationChange],
  );

  useImperativeHandle(
    ref,
    (): OrgChartRef => ({
      zoomIn: () => chartRef.current?.zoomIn(),
      zoomOut: () => chartRef.current?.zoomOut(),
      resetZoom: () => {
        chartRef.current?.render().fit();
      },
      resetLevel: () => {
        chartRef.current
          ?.collapseAll()
          .initialExpandLevel(initialDepth)
          .render()
          .fit();
      },
      resetOrientation: () => {
        handleOrientationChange(DEFAULT_ORIENTATION);
      },
      exportImg: () => chartRef.current?.exportImg({ full: true }),
      exportSvg: () => {
        if (!chartRef.current) {
          return;
        }

        chartRef.current.render().fit();

        window.setTimeout(() => {
          chartRef.current?.exportSvg();
        }, 1000);
      },
      expandAll: () => {
        chartRef.current?.expandAll().fit();
      },
      collapseAll: () => {
        chartRef.current?.collapseAll().fit();
      },
    }),
    [handleOrientationChange, initialDepth],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    const container = containerRef.current;

    if (!container || !root || normalizedData.length === 0) {
      return;
    }

    container.replaceChildren();

    const chart = new OrgChart<OrgChartNodeData>();
    chartRef.current = chart;

    chart
      .container(container as unknown as string)
      .data(normalizedData)
      .layout(orientation)
      .imageName(imageName)
      .initialExpandLevel(initialDepth)
      .svgHeight(Math.max(root.clientHeight, 720))
      .nodeWidth(() => ORGANIZATION_CHART_NODE_WIDTH)
      .nodeHeight(() => ORGANIZATION_CHART_NODE_HEIGHT)
      .childrenMargin(() => 64)
      .siblingsMargin(() => 80)
      .neighbourMargin(() => 96)
      .compact(false)
      .buttonContent(
        ({
          node,
        }: {
          node: {
            data: OrgChartNodeData & { _directSubordinates?: number };
            children?: unknown[] | null | undefined;
            _children?: unknown[] | null | undefined;
          };
        }) => buildButtonContent(node),
      )
      .nodeButtonWidth(() => 44)
      .nodeButtonHeight(() => 32)
      .nodeUpdate((_, index, elements) => {
        const element = elements[index] as unknown as SVGElement;
        const buttonGroup =
          element.querySelector<SVGGElement>('.node-button-g');
        const buttonCircle = element.querySelector<SVGCircleElement>(
          '.node-button-circle',
        );
        const buttonText =
          element.querySelector<SVGTextElement>('.node-button-text');

        buttonGroup?.setAttribute('display', '');

        if (buttonCircle) {
          buttonCircle.setAttribute('fill', 'transparent');
          buttonCircle.setAttribute('stroke', 'transparent');
        }

        if (buttonText) {
          buttonText.setAttribute('display', 'none');
        }
      })
      .linkUpdate((_, index, elements) => {
        const element = elements[index] as unknown as SVGPathElement;

        element.setAttribute('stroke', 'var(--border-color-default)');
        element.setAttribute('stroke-width', '2');
        element.setAttribute('fill', 'none');
      })
      .onZoom((event: { transform?: { k?: number } }) => {
        const zoomPercent = Math.round((event.transform?.k ?? 1) * 100);

        if (zoomTextRef.current) {
          zoomTextRef.current.textContent = `Zoom: ${zoomPercent}%`;
        }

        onZoomChange?.(zoomPercent);
      })
      .onNodeClick((node: { id?: string | number | undefined }) => {
        if (node?.id) {
          onNodeClick?.(String(node.id));
        }
      })
      .nodeContent((node: { data: OrgChartNodeData }) =>
        buildNodeContent(
          node.data,
          ORGANIZATION_CHART_NODE_WIDTH,
          ORGANIZATION_CHART_NODE_HEIGHT,
        ),
      )
      .render()
      .fit();

    return () => {
      chart.clear();
      if (chartRef.current === chart) {
        chartRef.current = null;
      }
      container.replaceChildren();
    };
  }, [
    imageName,
    initialDepth,
    normalizedData,
    onNodeClick,
    onZoomChange,
    orientation,
  ]);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || normalizedData.length === 0) {
      return;
    }

    const updateDimensions = () => {
      setDimensions({
        width: root.clientWidth,
        height: root.clientHeight,
      });
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(root);

    return () => {
      observer.disconnect();
    };
  }, [normalizedData.length]);

  useLayoutEffect(() => {
    if (
      !chartRef.current ||
      !dimensions.width ||
      !dimensions.height ||
      normalizedData.length === 0
    ) {
      return;
    }

    chartRef.current.render().fit();
  }, [dimensions.height, dimensions.width, normalizedData.length]);

  if (normalizedData.length === 0) {
    return (
      <div
        {...restProps}
        data-test-id={dataTestId}
        ref={rootRef}
        className={cn(organizationChartEmptyStateClassName, className)}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      {...restProps}
      data-test-id={dataTestId}
      ref={rootRef}
      className={cn(organizationChartWrapperClassName, className)}
    >
      <div className={organizationChartLegendClassName}>
        <div className='flex items-center gap-3 text-sm text-default'>
          {LEGEND_ITEMS.map(item => (
            <div key={item.label} className='flex items-center gap-2'>
              <span
                aria-hidden='true'
                className={cn(
                  'block h-4 w-4 rounded-[4px] border-2 bg-transparent',
                  item.indicatorClassName,
                )}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      {showZoomBadge ? (
        <div
          ref={zoomTextRef}
          className={organizationChartZoomIndicatorClassName}
        >
          Zoom: 100%
        </div>
      ) : null}
      <div
        ref={containerRef}
        role='region'
        aria-label='Organization chart'
        className='h-full w-full'
      />
    </div>
  );
});
