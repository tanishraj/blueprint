import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import { OrganizationChart } from './OrganizationChart';
import { OrgChartNodeData, OrgChartOrientation, OrgChartRef } from './types';
import { initialData } from './mockData';

const meta = {
  title: 'Components/OrganizationChart',
  component: OrganizationChart,
  argTypes: {
    initialDepth: Number,
  },
  args: {
    initialDepth: 1,
  },
  default: {},
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: args => {
    const [data] = useState<OrgChartNodeData[]>(initialData);
    const chartActionsRef = useRef<OrgChartRef | null>(null);
    const [layout, setLayout] = useState<OrgChartOrientation>('top');

    const handleNodeClick = (id: string): void => {
      console.log('Clicked ID:', id);
    };

    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        {/* Action Toolbar */}
        <div
          style={{
            padding: '10px',
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <button onClick={() => chartActionsRef.current?.zoomIn()}>
            ➕ Zoom In
          </button>
          <button onClick={() => chartActionsRef.current?.zoomOut()}>
            ➖ Zoom Out
          </button>
          <button onClick={() => chartActionsRef.current?.resetZoom()}>
            🔄 Reset Zoom
          </button>
          <button onClick={() => chartActionsRef.current?.resetLevel()}>
            🌳 Reset to Default Level
          </button>
          <button onClick={() => chartActionsRef.current?.expandAll()}>
            🌿 Expand All
          </button>
          <button onClick={() => chartActionsRef.current?.collapseAll()}>
            🍂 Collapse All
          </button>
          <button onClick={() => chartActionsRef.current?.exportImg()}>
            💾 Download Image
          </button>
          <button onClick={() => chartActionsRef.current?.exportSvg()}>
            📐 Download SVG
          </button>
          {/* Layout Switch Dropdown Selection */}
          <span
            style={{ marginLeft: '12px', fontSize: '14px', fontWeight: 'bold' }}
          >
            Orientation:
          </span>
          <select
            value={layout}
            onChange={e => setLayout(e.target.value as OrgChartOrientation)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #D1D5DB',
            }}
          >
            <option value='top'>Vertical (Top-to-Bottom)</option>
            <option value='left'>Horizontal (Left-to-Right)</option>
            <option value='bottom'>Bottom-up</option>
            <option value='right'>Right-to-Left</option>
          </select>
        </div>

        {/* Chart Canvas */}
        <OrganizationChart
          ref={chartActionsRef}
          data={data}
          orientation={layout}
          onNodeClick={handleNodeClick}
          {...args}
        />
      </div>
    );
  },
};
