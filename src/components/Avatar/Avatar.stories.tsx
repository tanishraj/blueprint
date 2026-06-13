import { Brain, CircleDashed, ShieldCheck, UserRound } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, type AvatarProps } from './Avatar';
import { type AvatarImage, type AvatarStatusPosition } from './types';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const shapes = ['circle', 'square'] as const;
const iconOptions = {
  none: undefined,
  user: UserRound,
  shield: ShieldCheck,
  brain: Brain,
  'circle-dashed': CircleDashed,
} as const;
const statusPositions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] as const satisfies readonly AvatarStatusPosition[];
const statusValues = [
  'info',
  'success',
  'warning',
  'danger',
  'primary',
] as const;

const profileImage: AvatarImage = {
  src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80',
  alt: 'Avatar user',
};

const meta: Meta<AvatarProps> = {
  title: 'components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Avatar displays a compact user identity marker.

Supported modes:

- no icon/img: render initials.
- icon: pass a Lucide/React SVG component.
- img: pass an object with image source and alt text.

Styling controls:

- size for density and space usage.
- shape to toggle circle or square.
- inverted for palette inversion.
- stroke for bordered avatar styles.
- status and statusPosition to add presence indicators.

Accessibility:
- Use meaningful alt text in img.
- Keep aria-label explicit when initials are not used.
        `.trim(),
      },
    },
  },
  argTypes: {
    size: {
      description: 'Avatar size token.',
      options: sizes,
      control: { type: 'select' },
      table: {
        category: 'Appearance',
      },
    },
    shape: {
      description: 'Avatar shape: circle or square.',
      options: shapes,
      control: { type: 'select' },
      table: {
        category: 'Appearance',
      },
    },
    inverted: {
      description: 'Use inverted background and text colors.',
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    stroke: {
      description: 'Show border stroke around avatar.',
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    initials: {
      description:
        'Text shown in text mode (automatically shortens to one character in xs size).',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    status: {
      description:
        'Presence indicator status (info, success, warning, danger, primary).',
      options: statusValues,
      control: { type: 'select' },
      table: {
        category: 'Status',
      },
    },
    statusPosition: {
      description: 'Corner position for the status indicator.',
      options: statusPositions,
      control: { type: 'select' },
      table: {
        category: 'Status',
      },
    },
    icon: {
      description: 'Icon rendered when image is not provided.',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: { type: 'select' },
      table: {
        category: 'Content',
      },
    },
    img: {
      description: 'Image object containing `src` and `alt`.',
      control: {
        type: 'object',
      },
      table: {
        category: 'Content',
      },
    },
    role: {
      description: 'Override semantic role used by container.',
      control: false,
      table: {
        category: 'Accessibility',
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return <Story />;
      }

      return (
        <div className='w-full h-screen flex items-center justify-center'>
          <Story />
        </div>
      );
    },
  ],
  args: {
    size: 'md',
    shape: 'circle',
    inverted: false,
    stroke: false,
    statusPosition: 'top-right',
  },
};

export default meta;

type Story = StoryObj<AvatarProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Avatar {...args} />,
  args: {
    initials: 'AU',
    size: 'md',
    shape: 'circle',
    inverted: false,
    stroke: false,
    icon: iconOptions.user,
  },
};

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      <div className='flex flex-col items-center gap-3 text-center'>
        <Avatar initials='AU' size='lg' shape='circle' />
        <span className='min-h-4 text-xs text-slate-500'>Initials</span>
      </div>
      <div className='flex flex-col items-center gap-3 text-center'>
        <Avatar icon={UserRound} size='lg' shape='circle' />
        <span className='min-h-4 text-xs text-slate-500'>Icon</span>
      </div>
      <div className='flex flex-col items-center gap-3 text-center'>
        <Avatar img={profileImage} size='lg' shape='circle' />
        <span className='min-h-4 text-xs text-slate-500'>Image</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      {sizes.map(size => (
        <div
          key={size}
          className='flex flex-col items-center gap-3 text-center'
        >
          <Avatar initials='AU' size={size} shape='circle' />
          <span className='min-h-4 text-xs text-slate-500'>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      {shapes.map(shape => (
        <div
          key={shape}
          className='flex flex-col items-center gap-3 text-center'
        >
          <Avatar shape={shape} size='lg' initials='AU' />
          <span className='min-h-4 text-xs text-slate-500 capitalize'>
            {shape}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const WithStroke: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      <Avatar shape='circle' size='lg' initials='AU' stroke />
      <Avatar shape='square' size='lg' initials='AU' stroke />
      <Avatar img={profileImage} size='lg' shape='circle' stroke />
    </div>
  ),
};

export const Status: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      {statusValues.map(status => (
        <Avatar
          key={status}
          initials='AU'
          size='md'
          shape='circle'
          status={status}
          statusPosition='top-right'
        />
      ))}
    </div>
  ),
};
