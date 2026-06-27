import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyeOff, SearchX, ChartNoAxesCombined } from 'lucide-react';

import { EmptyState } from './EmptyState';
import type { EmptyStateProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;
const orientations = ['vertical', 'horizontal'] as const;
const iconOptions = ['None', 'SearchX', 'EyeOff', 'Chart'] as const;

const meta: Meta<EmptyStateProps> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'EmptyState communicates no-data, no-results, or blocked states with optional iconography, copy, custom content, and action buttons.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    description: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    icon: {
      options: iconOptions,
      mapping: {
        None: undefined,
        SearchX: <SearchX />,
        EyeOff: <EyeOff />,
        Chart: <ChartNoAxesCombined />,
      },
      control: { type: 'select' },
      table: {
        category: 'Content',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
      },
    },
    size: {
      options: sizes,
      control: { type: 'radio' },
      table: {
        category: 'Appearance',
      },
    },
    orientation: {
      options: orientations,
      control: { type: 'radio' },
      table: {
        category: 'Layout',
      },
    },
    actions: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    copyClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    description:
      'We encountered an error while retrieving your records. Please check your connection and try again.',
    icon: <SearchX />,
    orientation: 'vertical',
    size: 'md',
    title: 'Unable to Load Data',
  },
};

export default meta;
type Story = StoryObj<EmptyStateProps>;

export const Playground: Story = {
  render: args => (
    <div className='w-full rounded border border-gray-300 border-dashed'>
      <EmptyState
        {...args}
        actions={[
          {
            actionKey: 'retry',
            children: 'Try Again',
            variant: 'primary',
          },
        ]}
      />
    </div>
  ),
};

export const HorizontalSizes: Story = {
  render: args => (
    <div className='flex flex-col gap-5'>
      {sizes.map(size => (
        <div
          className='w-full rounded border border-gray-300 border-dashed'
          key={size}
        >
          <EmptyState
            {...args}
            actions={[
              {
                actionKey: 'reset',
                appearance: 'outline',
                children: 'Reset Filters',
                variant: 'default',
              },
              {
                actionKey: 'create',
                children: 'Add Item',
                variant: 'primary',
              },
            ]}
            orientation='horizontal'
            size={size}
          />
        </div>
      ))}
    </div>
  ),
};

export const WithoutActions: Story = {
  render: args => (
    <div className='w-full rounded border border-gray-300 border-dashed'>
      <EmptyState {...args} />
    </div>
  ),
};

export const MultipleActions: Story = {
  render: args => (
    <div className='w-full rounded border border-gray-300 border-dashed'>
      <EmptyState
        {...args}
        actions={[
          {
            actionKey: 'back',
            children: 'Back to Reports',
            variant: 'primary',
          },
          {
            actionKey: 'contact',
            appearance: 'outline',
            children: 'Contact Support',
            variant: 'default',
          },
          {
            actionKey: 'dismiss',
            appearance: 'ghost',
            children: 'Dismiss',
            variant: 'default',
          },
        ]}
        icon={<ChartNoAxesCombined />}
      />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className='w-full rounded border border-gray-300 border-dashed'>
      <EmptyState
        actions={[
          {
            actionKey: 'continue',
            appearance: 'outline',
            children: 'Continue',
            variant: 'default',
          },
        ]}
        description='The icon prop can render a custom React node when the default visuals are not enough.'
        icon={<EyeOff className='size-5' />}
        size='sm'
        title='Custom Icon'
      />
    </div>
  ),
};

export const WithCustomCopyStyles: Story = {
  render: () => (
    <div className='w-full rounded border border-gray-300 border-dashed'>
      <EmptyState
        actions={[
          {
            actionKey: 'retry',
            appearance: 'outline',
            children: 'Try Again',
            variant: 'default',
          },
        ]}
        copyClassName='max-w-xl text-info'
        description='copyClassName lets consumers adjust the copy block while EmptyState keeps the rest of the layout controlled.'
        icon={<SearchX />}
        title='Custom Copy Width'
      />
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <div className='w-full rounded border border-gray-300 border-dashed'>
      <EmptyState
        actions={[
          {
            actionKey: 'request',
            children: 'Request Access',
            variant: 'primary',
          },
        ]}
        description='Ask an administrator to add you to this workspace.'
        icon={<EyeOff />}
        title='No workspace access'
      >
        <div className='rounded bg-default px-3 py-2 text-sm text-gray-600'>
          Workspace ID: demo-workspace
        </div>
      </EmptyState>
    </div>
  ),
};
