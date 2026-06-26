import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleHelp } from 'lucide-react';

import { MetricCard } from './MetricCard';
import { ETrend, type MetricCardProps } from './types';
import { Button } from '../Button';
import { Popover } from '../Popover';

const meta: Meta<MetricCardProps> = {
  title: 'Components/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component: `
Compact metric summary card for dashboards and stat blocks.

- Use \`value\` + \`hint\` for a single metric.
- Use \`items\` for side-by-side metric pairs under one label.
- Use \`showDivider\` when the card sits inside a metric strip.
        `.trim(),
      },
    },
  },
  args: {
    label: { text: 'Revenue' },
    value: {
      text: '$250K',
      supportText: 'USD',
      trend: ETrend.positive,
    },
    hint: {
      text: 'vs last month',
      color: 'success',
      trend: ETrend.positive,
      trendPosition: 'right',
    },
    showDivider: false,
  },
  argTypes: {
    label: {
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    value: {
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    hint: {
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    items: {
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    showDivider: {
      control: 'boolean',
      table: {
        category: 'Layout',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
  },
};

export default meta;
type Story = StoryObj<MetricCardProps>;

export const Playground: Story = {};

export const WithAdornment: Story = {
  args: {
    label: {
      text: 'Revenue',
      endAdornment: <CircleHelp className='size-4 text-caption' />,
    },
  },
};

export const MultipleValues: Story = {
  args: {
    label: { text: 'Quarterly split' },
    items: [
      {
        value: { text: '$50K', trend: ETrend.positive },
        hint: { text: 'Jan', color: 'success' },
      },
      {
        value: { text: '$44K', trend: ETrend.negative },
        hint: { text: 'Feb', color: 'error' },
      },
      {
        value: { text: '$62K', trend: ETrend.positive },
        hint: { text: 'Mar', color: 'success' },
      },
    ],
  },
};

export const SupportTextOnly: Story = {
  args: {
    label: { text: 'Region' },
    value: {
      supportText: 'United States',
      supportTextSize: 'lg',
    },
    hint: {
      text: 'Primary market',
    },
  },
};

export const AllExamples: Story = {
  render: () => (
    <div className='grid w-full max-w-6xl grid-cols-3 gap-10'>
      <MetricCard label={{ text: 'Basic' }} value={{ text: '$100K' }} />

      <MetricCard
        label={{ text: 'With Hint' }}
        value={{ text: '$250K' }}
        hint={{ text: 'Q4 2024' }}
      />

      <MetricCard
        label={{ text: 'With Support' }}
        value={{ text: '36', supportText: 'months' }}
      />

      <MetricCard
        label={{ text: 'Positive Trend' }}
        value={{ text: '$150K', trend: ETrend.positive }}
        hint={{ text: 'Good performance', color: 'success' }}
      />

      <MetricCard
        label={{ text: 'Negative Trend' }}
        value={{ text: '$75K', trend: ETrend.negative }}
        hint={{ text: 'Below target', color: 'error' }}
      />

      <MetricCard
        label={{ text: 'Neutral Trend' }}
        value={{ text: '$100K', trend: ETrend.neutral }}
        hint={{ text: 'Stable' }}
      />

      <MetricCard
        label={{ text: 'Success State' }}
        value={{ text: '95%', color: 'success' }}
        hint={{ text: 'Excellent', color: 'success' }}
      />

      <MetricCard
        label={{ text: 'Warning State' }}
        value={{ text: '60%', color: 'warning' }}
        hint={{ text: 'Needs attention', color: 'warning' }}
      />

      <MetricCard
        label={{ text: 'Error State' }}
        value={{ text: '30%', color: 'error' }}
        hint={{ text: 'Critical', color: 'error' }}
      />

      <MetricCard
        label={{ text: 'Multiple Values' }}
        items={[
          { value: { text: '$50K' }, hint: { text: 'Jan' } },
          { value: { text: '$75K' }, hint: { text: 'Feb' } },
          { value: { text: '$100K' }, hint: { text: 'Mar' } },
        ]}
      />

      <MetricCard
        label={{ text: 'Mixed Metrics' }}
        items={[
          {
            value: {
              text: '250',
              supportText: 'users',
              trend: ETrend.positive,
            },
          },
          {
            value: {
              text: '45',
              supportText: 'mins',
              trend: ETrend.negative,
            },
          },
        ]}
      />

      <MetricCard
        label={{ text: 'With Divider' }}
        value={{ text: '$200K', trend: ETrend.positive }}
        hint={{ text: 'Revenue' }}
        showDivider
      />

      <MetricCard
        label={{
          text: 'With Info',
          endAdornment: (
            <Popover
              align='start'
              contentClassName='max-w-xs'
              placement='right'
              showCloseButton={false}
              title='Revenue Information'
              trigger={
                <Button
                  appearance='ghost'
                  className='min-h-0 px-0 py-0 text-caption hover:text-default'
                  shape='rounded'
                  size='sm'
                  variant='default'
                >
                  <CircleHelp className='size-4' />
                </Button>
              }
              variant='default'
            >
              <p className='text-sm leading-5 text-caption'>
                This metric shows the total revenue generated in the current
                quarter compared to the previous quarter.
              </p>
            </Popover>
          ),
        }}
        value={{ text: '$150K', trend: ETrend.positive }}
        hint={{ text: 'Q1 2024' }}
      />

      <MetricCard
        label={{ text: 'Hint Trend Left' }}
        value={{ text: '85%' }}
        hint={{
          text: 'vs last month',
          trend: ETrend.positive,
          trendPosition: 'left',
        }}
      />

      <MetricCard
        label={{ text: 'Hint Trend Right' }}
        value={{ text: '$42M' }}
        hint={{
          text: 'Target reached',
          trend: ETrend.positive,
          trendPosition: 'right',
        }}
      />

      <MetricCard
        label={{ text: 'Both Trends' }}
        value={{ text: '$125M', trend: ETrend.positive }}
        hint={{ text: 'Q4 2024', trend: ETrend.negative }}
      />

      <MetricCard
        value={{ text: '$500K', trend: ETrend.positive }}
        hint={{ text: 'No label example' }}
      />

      <MetricCard
        label={{ text: 'Text Only (Small)' }}
        value={{ supportText: 'United States', supportTextSize: 'sm' }}
        hint={{ text: 'Primary market' }}
      />

      <MetricCard
        label={{ text: 'Text Only (Large)' }}
        value={{ supportText: 'Active', supportTextSize: 'lg' }}
        hint={{ text: 'Current status' }}
      />

      <MetricCard
        label={{ text: 'Custom Content' }}
        value={{
          text: (
            <div className='flex items-baseline gap-0.5'>
              <span>1,234</span>
              <span className='text-sm text-caption'>users</span>
            </div>
          ),
        }}
        hint={{ text: 'Last 30 days' }}
      />
    </div>
  ),
};
