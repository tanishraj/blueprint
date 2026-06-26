import { Brain, CircleDashed, ShieldCheck, UserRound } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AvatarGroup } from './AvatarGroup';
import type { AvatarGroupItem, AvatarGroupProps } from './types';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const shapes = ['circle', 'square'] as const;
const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;

const iconOptions = {
  none: undefined,
  user: UserRound,
  shield: ShieldCheck,
  brain: Brain,
  'circle-dashed': CircleDashed,
} as const;

const profileImage = {
  src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80',
  alt: 'Team member avatar',
};

const avatarItems = [
  { id: 'a1', initials: 'AB' },
  { id: 'a2', initials: 'CD', icon: iconOptions.user },
  { id: 'a3', img: profileImage, initials: 'EF' },
  { id: 'a4', initials: 'GH' },
  { id: 'a5', initials: 'IJ', icon: iconOptions.shield },
] satisfies AvatarGroupItem[];

const meta: Meta<AvatarGroupProps> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
AvatarGroup clusters a list of Avatar items with optional overflow count.

Usage:

- Provide \`items\` to render avatar members in order.
- Use \`max\` to limit visible avatars and show \`+N\` overflow.
      `.trim(),
      },
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
    items: {
      description: 'Avatar items shown by the group.',
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    size: {
      description: 'Shared avatar size token.',
      control: { type: 'select' },
      options: sizes,
      table: {
        category: 'Appearance',
      },
    },
    shape: {
      description: 'Shared avatar shape.',
      control: { type: 'select' },
      options: shapes,
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      description: 'Color variant for avatars and overflow count.',
      control: { type: 'select' },
      options: variants,
      table: {
        category: 'Appearance',
      },
    },
    max: {
      description: 'Maximum number of avatars visible before overflow counter.',
      control: 'number',
      table: {
        category: 'Layout',
      },
    },
    inverted: {
      description: 'Forwarded to each child avatar.',
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    stroke: {
      description: 'Forwarded to each child avatar.',
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    role: {
      description: 'Role for outer wrapper.',
      control: false,
      table: {
        category: 'Accessibility',
      },
    },
    'aria-label': {
      description: 'Accessible label for avatar group wrapper.',
      control: 'text',
      table: {
        category: 'Accessibility',
      },
    },
    'aria-labelledby': {
      description: 'ID reference used to label the avatar group externally.',
      control: 'text',
      table: {
        category: 'Accessibility',
      },
    },
    className: {
      description: 'Additional classes for container.',
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
  },
  args: {
    items: avatarItems,
    size: 'md',
    variant: 'default',
    shape: 'circle',
    max: 4,
    inverted: false,
    stroke: true,
  },
};

export default meta;
type Story = StoryObj<AvatarGroupProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <AvatarGroup {...args} />,
};

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      {variants.map(variant => (
        <div
          key={variant}
          className='flex flex-col items-center gap-3 text-center'
        >
          <AvatarGroup
            items={avatarItems.slice(0, 3)}
            max={2}
            variant={variant}
          />
          <span className='min-h-4 text-xs text-slate-500'>{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className='flex flex-wrap items-end justify-center gap-8'>
      {sizes.map(size => (
        <div
          key={size}
          className='flex flex-col items-center gap-3 text-center'
        >
          <AvatarGroup items={avatarItems.slice(0, 3)} size={size} />
          <span className='min-h-4 text-xs text-slate-500'>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  name: 'Shapes',
  render: () => (
    <div className='flex flex-wrap items-start justify-center gap-8'>
      {shapes.map(shape => (
        <div
          key={shape}
          className='flex flex-col items-center gap-3 text-center'
        >
          <AvatarGroup items={avatarItems.slice(0, 3)} shape={shape} />
          <span className='min-h-4 text-xs text-slate-500 capitalize'>
            {shape}
          </span>
        </div>
      ))}
    </div>
  ),
};
