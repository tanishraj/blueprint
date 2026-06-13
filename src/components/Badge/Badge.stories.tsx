import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';

import { Badge, BadgeProps } from './Badge';

const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const shapes = ['circle', 'square'] as const;
const icons = ['None', 'Plus'] as const;

const meta: Meta<BadgeProps> = {
  title: 'components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Badge is a compact status indicator component that supports text, icon, and dot variants with configurable variant, size, and shape.',
      },
      layout: 'centered',
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return <Story />;
      }

      return (
        <div className='w-full min-h-screen flex items-center justify-center'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variants,
    },
    size: {
      control: { type: 'radio' },
      options: sizes,
    },
    shape: {
      control: { type: 'radio' },
      options: shapes,
    },
    inverted: {
      control: 'boolean',
    },
    icon: {
      options: icons,
      mapping: {
        None: undefined,
        Plus,
      },
      control: { type: 'select' },
    },
    children: {
      control: 'text',
    },
    role: {
      options: ['img', 'status', 'presentation', 'none'],
      mapping: {
        none: undefined,
      },
      control: {
        type: 'select',
      },
    },
    'aria-label': {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    shape: 'circle',
    inverted: false,
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Badge {...args} />,
  args: {
    children: 'Playground',
    variant: 'default',
    size: 'md',
    shape: 'circle',
    inverted: false,
    icon: Plus,
  },
};

export const Variant: Story = {
  name: 'Variants',
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-6'>
      {variants.map(variant => (
        <div
          key={variant}
          className='flex flex-col items-center gap-3 text-center'
        >
          <Badge variant={variant}>Badge</Badge>
          <span className='min-h-4 text-xs text-slate-500 capitalize'>
            {variant}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Size: Story = {
  name: 'Sizes',
  render: () => (
    <div className='flex flex-wrap items-end justify-center gap-8'>
      {sizes.map(size => (
        <div
          key={size}
          className='flex flex-col items-center gap-3 text-center'
        >
          <Badge size={size} icon={Plus}>
            {size.toUpperCase()}
          </Badge>
          <span className='min-h-4 text-xs text-slate-500'>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Shape: Story = {
  name: 'Shapes',
  render: () => (
    <div className='flex flex-wrap items-start justify-center gap-8'>
      {shapes.map(shape => (
        <div
          key={shape}
          className='flex flex-col items-center gap-3 text-center'
        >
          <Badge shape={shape} icon={Plus} />
          <span className='min-h-4 text-xs text-slate-500 capitalize'>
            {shape} shape
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Appearance: Story = {
  name: 'Appearances',
  render: () => (
    <div className='flex flex-wrap items-start justify-center gap-8'>
      {[
        { key: 'dot', node: <Badge aria-label='Dot appearance' /> },
        { key: 'icon', node: <Badge icon={Plus} /> },
        { key: 'text', node: <Badge>Text</Badge> },
      ].map(({ key, node }) => (
        <div
          key={key}
          className='flex h-full flex-col items-center gap-3 text-center'
        >
          <div className='h-9'>{node}</div>
          <span className='min-h-4 text-xs text-slate-500 capitalize'>
            {key} appearance
          </span>
        </div>
      ))}
    </div>
  ),
};
