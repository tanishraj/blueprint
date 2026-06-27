import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleCheck, Plus, Settings, Tag, User } from 'lucide-react';

import { Chip } from './Chip';
import type { ChipProps } from './types';

const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const shapes = ['square', 'circle'] as const;
const appearances = ['filled', 'outline'] as const;
const icons = [
  'None',
  'Plus',
  'User',
  'Tag',
  'Settings',
  'CircleCheck',
] as const;
const handleClose = () => undefined;

const meta: Meta<ChipProps> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Chip is a compact label used for tags, filters, selections, and lightweight metadata.

Use \`appearance\` for filled or outline treatment, \`icon\` for leading visuals, \`onClose\` for removable chips, and \`shape\` to choose between square and circular geometry.
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
        <div className='w-full min-h-screen flex items-center justify-center p-6'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    children: {
      description: 'Text rendered inside the chip.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | number' },
      },
    },
    icon: {
      description: 'Optional leading icon rendered inside an Avatar.',
      options: icons,
      mapping: {
        None: undefined,
        Plus,
        User,
        Tag,
        Settings,
        CircleCheck,
      },
      control: { type: 'select' },
      table: {
        category: 'Content',
        type: { summary: icons.join(' | ') },
      },
    },
    variant: {
      description: 'Visual semantic of the chip.',
      control: { type: 'select' },
      options: variants,
      table: {
        category: 'Appearance',
        type: { summary: variants.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    appearance: {
      description: 'Visual treatment for the chip surface.',
      control: { type: 'radio' },
      options: appearances,
      table: {
        category: 'Appearance',
        type: { summary: appearances.join(' | ') },
        defaultValue: { summary: 'filled' },
      },
    },
    size: {
      description: 'Chip height, text size, and inner spacing.',
      control: { type: 'radio' },
      options: sizes,
      table: {
        category: 'Appearance',
        type: { summary: sizes.join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    shape: {
      description: 'Shape of the chip and leading Avatar.',
      control: { type: 'radio' },
      options: shapes,
      table: {
        category: 'Appearance',
        type: { summary: shapes.join(' | ') },
        defaultValue: { summary: 'circle' },
      },
    },
    disabled: {
      description: 'Disable interactions and reduce emphasis.',
      control: 'boolean',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inverted: {
      description: 'Use inverted palette tokens for alternate surfaces.',
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      description: 'Callback that renders and handles the remove button.',
      action: 'closed',
      table: {
        category: 'Actions',
        type: { summary: '() => void' },
      },
    },
    closeLabel: {
      description: 'Accessible label for the remove button.',
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'Remove chip' },
      },
    },
    className: {
      description: 'Additional classes applied to the chip wrapper.',
      control: 'text',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    children: 'Chip',
    variant: 'default',
    appearance: 'filled',
    size: 'md',
    shape: 'circle',
    inverted: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ChipProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Chip {...args} />,
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {variants.map(variant => (
        <Chip key={variant} variant={variant}>
          {variant}
        </Chip>
      ))}
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {appearances.map(appearance => (
        <Chip
          key={appearance}
          appearance={appearance}
          icon={Tag}
          variant='primary'
        >
          {appearance}
        </Chip>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {sizes.map(size => (
        <Chip key={size} size={size} icon={Plus}>
          {size.toUpperCase()}
        </Chip>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {shapes.map(shape => (
        <Chip key={shape} shape={shape} icon={User}>
          {shape}
        </Chip>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      <Chip icon={User}>Tanish</Chip>
      <Chip icon={User} variant='primary'>
        Profile
      </Chip>
      <Chip icon={Plus} variant='success'>
        Added
      </Chip>
    </div>
  ),
};

export const Inverted: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4 rounded-lg bg-slate-950 p-6'>
      {variants.map(variant => (
        <Chip key={variant} icon={CircleCheck} inverted variant={variant}>
          {variant}
        </Chip>
      ))}
    </div>
  ),
};

export const Removable: Story = {
  render: args => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      <Chip {...args} onClose={handleClose}>
        Filter
      </Chip>
      <Chip {...args} icon={User} onClose={handleClose}>
        Profile
      </Chip>
    </div>
  ),
};
