import { useLayoutEffect, useRef, useImperativeHandle } from 'react';
import { OrgChart } from 'd3-org-chart';

import { OrgChartNodeData, OrgChartComponentProps, OrgChartRef } from './types';

export const OrganizationChart = ({
  data,
  orientation = 'top',
  initialDepth = 1,
  onNodeClick,
  onZoomChange,
  ref,
}: OrgChartComponentProps) => {
  const d3Container = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<OrgChart<OrgChartNodeData> | null>(null);
  const zoomTextRef = useRef<HTMLDivElement | null>(null);

  // Exposes type-safe controls to the parent component ref
  useImperativeHandle(
    ref,
    (): OrgChartRef => ({
      zoomIn: () => chartRef.current?.zoomIn(),
      zoomOut: () => chartRef.current?.zoomOut(),
      resetZoom: () => {
        if (chartRef.current) {
          chartRef.current
            .render() // 3. Re-draws tree configuration cleanly
            .fit(); // 4. Centers newly built state inside boundaries
        }
      },
      resetLevel: () => {
        if (chartRef.current) {
          chartRef.current
            .collapseAll() // 1. Collapses all custom user node toggles
            .initialExpandLevel(initialDepth) // 2. Enforces baseline structural level depth
            .render() // 3. Re-draws tree configuration cleanly
            .fit(); // 4. Centers newly built state inside boundaries
        }
      },
      exportImg: () => chartRef.current?.exportImg({ full: true }),
      exportSvg: () => {
        if (chartRef.current) {
          // 1. Temporarily drop animation speeds to 0ms for instant repositioning
          chartRef.current.render().fit();

          // 2. Defer file assembly until the browser completes the DOM transform frame calculations
          setTimeout(() => {
            if (chartRef.current) {
              chartRef.current.exportSvg();
            }
          }, 1000);
        }
      },
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
        .initialExpandLevel(initialDepth)
        .nodeWidth(() => 250)
        .nodeHeight(() => 140)
        // --- LIVE PERFORMANCE ZOOM LISTENER ---
        .onZoom((event: any) => {
          // d3-org-chart passes the d3-zoom event context natively [://github.com]
          // event.transform.k contains the active vector scale multiplier
          if (event && event.transform && zoomTextRef.current) {
            const currentPercentage = Math.round(event.transform.k * 100);
            zoomTextRef.current.innerText = `Zoom: ${currentPercentage}%`;
          }
        })
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
  }, [data, initialDepth, onNodeClick, onZoomChange, orientation]);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        ref={zoomTextRef} // 👈 Tied straight to the native text modifier reference
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          color: '#FFFFFF',
          padding: '8px 14px',
          borderRadius: '20px',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          zIndex: 10,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
        }}
      >
        Zoom: 100%
      </div>
      <div ref={d3Container} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};
