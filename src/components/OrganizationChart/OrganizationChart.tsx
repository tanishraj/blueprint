import React, { useLayoutEffect, useRef, useImperativeHandle } from 'react';
import { OrgChart } from 'd3-org-chart';

import { OrgChartNodeData, OrgChartComponentProps, OrgChartRef } from './types';

export const OrganizationChart = ({
  data,
  orientation = 'top',
  onNodeClick,
  ref,
}: OrgChartComponentProps) => {
  const d3Container = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<OrgChart<OrgChartNodeData> | null>(null);

  // Exposes type-safe controls to the parent component ref
  useImperativeHandle(
    ref,
    (): OrgChartRef => ({
      zoomIn: () => chartRef.current?.zoomIn(),
      zoomOut: () => chartRef.current?.zoomOut(),
      resetZoom: () => chartRef.current?.fit(),
      exportImg: () => chartRef.current?.exportImg({ full: true }),
      exportSvg: () => chartRef.current?.exportSvg(),
      expandAll: () => {
        chartRef.current?.expandAll().fit();
      },
      collapseAll: () => {
        chartRef.current?.collapseAll().fit();
      },
    }),
  );

  useLayoutEffect(() => {
    if (data && d3Container.current) {
      if (!chartRef.current) {
        chartRef.current = new OrgChart<OrgChartNodeData>();
      }

      chartRef.current
        .container(d3Container.current)
        .data(data)
        .layout(orientation)
        .nodeWidth(() => 250)
        .nodeHeight(() => 140)
        .onNodeClick(node => {
          if (onNodeClick && node) onNodeClick(node.id);
        })
        .nodeContent(d => {
          return `
            <div style="font-family: sans-serif; background-color: white; position: absolute; width: ${d.width}px; height: ${d.height}px; border-radius: 10px; border: 1px solid #E4E2E9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)">
                <div style="padding: 16px;">
                  <div style="font-weight: bold; color: #111827; font-size: 16px;">${d.data.name}</div>
                  <div style="color: #6B7280; font-size: 14px; margin-top: 4px;">${d.data.position}</div>
                </div>
            </div>
          `;
        })
        .render()
        .fit();
    }
  }, [data, onNodeClick, orientation]);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <div ref={d3Container} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};
