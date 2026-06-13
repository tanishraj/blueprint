import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, SVGProps } from 'react';
import { useCallback, useRef, useState } from 'react';

import { Button } from '../Button';
import { companyHierarchy20Data, companyHierarchy50Data } from './mockData';
import { OrganizationChart } from './OrganizationChart';
import type { OrgChartOrientation, OrgChartRef } from './types';

const iconProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='M10 4v12M4 10h12' />
  </svg>
);

const MinusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='M4 10h12' />
  </svg>
);

const FitIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='M7 4H4v3M13 4h3v3M4 13v3h3M16 13v3h-3' />
  </svg>
);

const ResetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='M4 10a6 6 0 1 0 2-4.47' />
    <path d='M4 4v4h4' />
  </svg>
);

const ExpandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='m5 7 5 5 5-5' />
    <path d='m5 3 5 5 5-5' />
  </svg>
);

const CollapseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='m5 13 5-5 5 5' />
    <path d='m5 17 5-5 5 5' />
  </svg>
);

const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='M10 3v9' />
    <path d='m6.5 9.5 3.5 3.5 3.5-3.5' />
    <path d='M4 16h12' />
  </svg>
);

const DownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='m5 7 5 6 5-6' />
  </svg>
);

const UpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='m5 13 5-6 5 6' />
  </svg>
);

const LeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='m13 5-6 5 6 5' />
  </svg>
);

const RightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 20 20' {...iconProps} {...props}>
    <path d='m7 5 6 5-6 5' />
  </svg>
);

function ControlPanel({
  chartRef,
  layout,
  setLayout,
}: {
  chartRef: React.RefObject<OrgChartRef | null>;
  layout: OrgChartOrientation;
  setLayout: (value: OrgChartOrientation) => void;
}) {
  const handleZoomIn = useCallback(() => {
    chartRef.current?.zoomIn();
  }, [chartRef]);

  const handleZoomOut = useCallback(() => {
    chartRef.current?.zoomOut();
  }, [chartRef]);

  const handleResetZoom = useCallback(() => {
    chartRef.current?.resetZoom();
  }, [chartRef]);

  const handleResetLevel = useCallback(() => {
    chartRef.current?.resetLevel();
  }, [chartRef]);

  const handleExpandAll = useCallback(() => {
    chartRef.current?.expandAll();
  }, [chartRef]);

  const handleCollapseAll = useCallback(() => {
    chartRef.current?.collapseAll();
  }, [chartRef]);

  const handleResetAll = useCallback(() => {
    chartRef.current?.resetZoom();
    chartRef.current?.resetLevel();
  }, [chartRef]);

  const handleExportPNG = useCallback(() => {
    chartRef.current?.exportImg();
  }, [chartRef]);

  const handleExportSVG = useCallback(() => {
    chartRef.current?.exportSvg();
  }, [chartRef]);

  const handleSetLayoutTop = useCallback(() => {
    setLayout('top');
  }, [setLayout]);

  const handleSetLayoutLeft = useCallback(() => {
    setLayout('left');
  }, [setLayout]);

  const handleSetLayoutBottom = useCallback(() => {
    setLayout('bottom');
  }, [setLayout]);

  const handleSetLayoutRight = useCallback(() => {
    setLayout('right');
  }, [setLayout]);

  return (
    <div className='absolute right-4 top-4 z-10 flex flex-col gap-3 rounded-md border border-default bg-default/95 p-3 shadow-lg backdrop-blur-sm'>
      <div className='text-xs font-semibold uppercase tracking-[0.08em] text-caption'>
        Zoom
      </div>
      <div className='grid grid-cols-3 gap-2 rounded-sm border border-default p-2'>
        <Button
          aria-label='Zoom in'
          leadingIcon={PlusIcon}
          onClick={handleZoomIn}
          size='sm'
          variant='default'
          appearance='outline'
        >
          In
        </Button>
        <Button
          aria-label='Zoom out'
          leadingIcon={MinusIcon}
          onClick={handleZoomOut}
          size='sm'
          variant='default'
          appearance='outline'
        >
          Out
        </Button>
        <Button
          aria-label='Reset zoom'
          leadingIcon={FitIcon}
          onClick={handleResetZoom}
          size='sm'
          variant='default'
          appearance='outline'
        >
          Fit
        </Button>
      </div>

      <div className='text-xs font-semibold uppercase tracking-[0.08em] text-caption'>
        Structure
      </div>
      <div className='grid grid-cols-2 gap-2 rounded-sm border border-default p-2'>
        <Button
          aria-label='Reset level'
          leadingIcon={ResetIcon}
          onClick={handleResetLevel}
          size='sm'
          variant='default'
          appearance='outline'
        >
          Reset
        </Button>
        <Button
          aria-label='Expand all'
          leadingIcon={ExpandIcon}
          onClick={handleExpandAll}
          size='sm'
          variant='default'
          appearance='outline'
        >
          Expand
        </Button>
        <Button
          aria-label='Collapse all'
          leadingIcon={CollapseIcon}
          onClick={handleCollapseAll}
          size='sm'
          variant='default'
          appearance='outline'
        >
          Collapse
        </Button>
        <Button
          aria-label='Reset chart'
          leadingIcon={ResetIcon}
          onClick={handleResetAll}
          size='sm'
          variant='default'
          appearance='outline'
        >
          All
        </Button>
      </div>

      <div className='text-xs font-semibold uppercase tracking-[0.08em] text-caption'>
        Export
      </div>
      <div className='grid grid-cols-2 gap-2 rounded-sm border border-default p-2'>
        <Button
          aria-label='Download PNG'
          leadingIcon={DownloadIcon}
          onClick={handleExportPNG}
          size='sm'
          variant='default'
          appearance='outline'
        >
          PNG
        </Button>
        <Button
          aria-label='Download SVG'
          leadingIcon={DownloadIcon}
          onClick={handleExportSVG}
          size='sm'
          variant='default'
          appearance='outline'
        >
          SVG
        </Button>
      </div>

      <div className='text-xs font-semibold uppercase tracking-[0.08em] text-caption'>
        Orientation
      </div>
      <div className='grid grid-cols-2 gap-2 rounded-sm border border-default p-2'>
        <Button
          aria-label='Vertical orientation'
          leadingIcon={DownIcon}
          onClick={handleSetLayoutTop}
          size='sm'
          variant={layout === 'top' ? 'primary' : 'default'}
          appearance={layout === 'top' ? 'filled' : 'outline'}
        >
          Vertical
        </Button>
        <Button
          aria-label='Left to right orientation'
          leadingIcon={RightIcon}
          onClick={handleSetLayoutLeft}
          size='sm'
          variant={layout === 'left' ? 'primary' : 'default'}
          appearance={layout === 'left' ? 'filled' : 'outline'}
        >
          Left
        </Button>
        <Button
          aria-label='Bottom up orientation'
          leadingIcon={UpIcon}
          onClick={handleSetLayoutBottom}
          size='sm'
          variant={layout === 'bottom' ? 'primary' : 'default'}
          appearance={layout === 'bottom' ? 'filled' : 'outline'}
        >
          Bottom
        </Button>
        <Button
          aria-label='Right to left orientation'
          leadingIcon={LeftIcon}
          onClick={handleSetLayoutRight}
          size='sm'
          variant={layout === 'right' ? 'primary' : 'default'}
          appearance={layout === 'right' ? 'filled' : 'outline'}
        >
          Right
        </Button>
      </div>
    </div>
  );
}

const meta: Meta<typeof OrganizationChart> = {
  title: 'Components/OrganizationChart',
  component: OrganizationChart,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    data: {
      control: false,
      table: {
        category: 'Data',
      },
    },
    orientation: {
      control: 'select',
      options: [
        'top',
        'left',
        'bottom',
        'right',
      ] satisfies OrgChartOrientation[],
      table: {
        category: 'Layout',
      },
    },
    initialDepth: {
      control: { type: 'number', min: 0, step: 1 },
      table: {
        category: 'Layout',
      },
    },
    onNodeClick: {
      action: 'nodeClick',
      control: false,
      table: {
        category: 'Events',
      },
    },
    onZoomChange: {
      action: 'zoomChange',
      control: false,
      table: {
        category: 'Events',
      },
    },
    imageName: {
      control: false,
      table: {
        category: 'Data',
      },
    },
    showZoomBadge: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    dataTestId: {
      control: 'text',
      table: {
        category: 'Testing',
      },
    },
    emptyMessage: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
  },
  args: {
    orientation: 'top',
    initialDepth: 1,
    emptyMessage: 'No organization chart data available.',
    showZoomBadge: true,
    dataTestId: 'organization-chart',
  },
};

export default meta;
type Story = StoryObj<typeof OrganizationChart>;

type OrganizationChartStoryProps = Omit<
  ComponentProps<typeof OrganizationChart>,
  'imageName'
> & {
  imageName?: string;
};

function OrganizationChartStory({
  data,
  imageName = 'organization-chart',
  ...props
}: OrganizationChartStoryProps) {
  const chartActionsRef = useRef<OrgChartRef | null>(null);
  const [layout, setLayout] = useState<OrgChartOrientation>('top');

  return (
    <div className='h-screen bg-default p-8'>
      <div className='relative flex h-full flex-col'>
        <ControlPanel
          chartRef={chartActionsRef}
          layout={layout}
          setLayout={setLayout}
        />
        <div className='flex h-full min-h-0 flex-1 rounded-md border border-default bg-default p-4'>
          <OrganizationChart
            ref={chartActionsRef}
            {...props}
            data={data}
            orientation={layout}
            imageName={imageName}
          />
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  args: {
    data: companyHierarchy20Data,
  },
  render: args => {
    return (
      <OrganizationChartStory
        {...args}
        data={companyHierarchy20Data}
        imageName='organization-chart-default'
      />
    );
  },
};

export const FiftyNodesFiveLevels: Story = {
  args: {
    data: companyHierarchy50Data,
    initialDepth: 2,
  },
  render: args => {
    return (
      <OrganizationChartStory
        {...args}
        data={companyHierarchy50Data}
        imageName='organization-chart-fifty'
      />
    );
  },
};
