import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';

import { Badge } from './Badge';
import type { BadgeProps } from './Badge';

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
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Badge is a compact utility element used for status, counts, metadata chips, and quick indicators.

Behaviour:

- Add \`children\` for text mode.
- Add \`icon\` (without text) for icon mode.
- Use dot mode by omitting both \`children\` and \`icon\`.

Use in navigation, headers, and tables where lightweight emphasis is needed.

Accessibility:
- Keep text short and meaningful.
- When using decorative icons, ensure the surrounding UI provides clear context.
        `,
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
      description: 'Visual semantic of the badge.',
      control: { type: 'select' },
      options: variants,
      table: {
        category: 'Appearance',
      },
    },
    size: {
      description: 'Size scale for badge content and padding.',
      control: { type: 'radio' },
      options: sizes,
      table: {
        category: 'Appearance',
      },
    },
    shape: {
      description: 'Shape of the badge shell.',
      control: { type: 'radio' },
      options: shapes,
      table: {
        category: 'Appearance',
      },
    },
    inverted: {
      description: 'Inverted color mode for dark surfaces.',
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    icon: {
      description:
        'Optional icon component. With text, badge becomes text+icon mode; without text it becomes icon mode.',
      options: icons,
      mapping: {
        None: undefined,
        Plus,
      },
      control: { type: 'select' },
      table: {
        category: 'Content',
      },
    },
    children: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    role: {
      options: ['img', 'status', 'presentation', 'none'],
      mapping: {
        none: undefined,
      },
      control: {
        type: 'select',
      },
      table: {
        category: 'Accessibility',
      },
    },
    'aria-label': {
      control: 'text',
      table: {
        category: 'Accessibility',
      },
    },
    'aria-labelledby': {
      control: 'text',
      table: {
        category: 'Accessibility',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
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
