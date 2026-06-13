import { OrgChart } from 'd3-org-chart';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { cn } from '../../utils';
import {
  organizationChartEmptyStateClassName,
  ORGANIZATION_CHART_NODE_HEIGHT,
  ORGANIZATION_CHART_NODE_WIDTH,
  organizationChartWrapperClassName,
  organizationChartZoomIndicatorClassName,
} from './OrganizationChart.styles';
import type {
  OrgChartComponentProps,
  OrgChartNodeData,
  OrgChartRef,
} from './types';
import {
  buildButtonContent,
  buildNodeContent,
  normalizeOrgChartNode,
} from './utils';

export const OrganizationChart = forwardRef<
  OrgChartRef,
  OrgChartComponentProps
>(function OrganizationChart(
  {
    data,
    orientation = 'top',
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
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const normalizedData = useMemo(() => data.map(normalizeOrgChartNode), [data]);

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
    [initialDepth],
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    const root = rootRef.current;

    if (!container || !root || normalizedData.length === 0) {
      return;
    }

    container.replaceChildren();

    const chart = new OrgChart<OrgChartNodeData>();
    chartRef.current = chart;

    const renderChart = () => {
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
            node: { data: OrgChartNodeData & { _directSubordinates?: number } };
          }) => {
            const childCount = node.data._directSubordinates ?? 0;

            return buildButtonContent(childCount);
          },
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
    };

    renderChart();

    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = new ResizeObserver(() => {
      if (!chartRef.current || normalizedData.length === 0) {
        return;
      }

      renderChart();
    });
    resizeObserverRef.current.observe(root);

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
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

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect();
      chartRef.current?.clear();
      chartRef.current = null;
    };
  }, []);

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
