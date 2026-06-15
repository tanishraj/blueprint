import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Popover } from './Popover';
import type { PopoverProps } from './types';

const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;
const placements = ['top', 'right', 'bottom', 'left'] as const;
const alignments = ['start', 'center', 'end'] as const;

const PopoverDemo = (args: PopoverProps) => {
  return (
    <Popover
      {...args}
      trigger={
        <Button appearance='filled' variant='primary'>
          Open popover
        </Button>
      }
    />
  );
};

const meta: Meta<PopoverProps> = {
  title: 'components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Popover displays contextual content next to a trigger. It supports semantic title icons, placement, alignment, close interactions, and slot-style body content.
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
        <div className='flex min-h-screen w-full items-center justify-center p-32'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variants,
      table: {
        category: 'Appearance',
        type: { summary: variants.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    placement: {
      control: { type: 'radio' },
      options: placements,
      table: {
        category: 'Position',
        type: { summary: placements.join(' | ') },
        defaultValue: { summary: 'bottom' },
      },
    },
    align: {
      control: { type: 'radio' },
      options: alignments,
      table: {
        category: 'Position',
        type: { summary: alignments.join(' | ') },
        defaultValue: { summary: 'center' },
      },
    },
    open: {
      control: 'boolean',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    children: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    showArrow: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    showSlotBorder: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    closeOnOutsideClick: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    trigger: {
      control: false,
      table: {
        category: 'Advanced',
        type: { summary: 'ReactNode' },
      },
    },
    onOpenChange: {
      control: false,
      table: {
        category: 'Advanced',
        type: { summary: '(open: boolean) => void' },
      },
    },
    closeLabel: {
      control: 'text',
      table: {
        category: 'Advanced',
        type: { summary: 'string' },
        defaultValue: { summary: 'Close popover' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
    contentClassName: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
    triggerClassName: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
  },
  args: {
    title: 'Title',
    children: 'Slot Area',
    variant: 'default',
    placement: 'bottom',
    align: 'center',
    showArrow: true,
    showCloseButton: true,
    showSlotBorder: true,
    closeOnEscape: true,
    closeOnOutsideClick: true,
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <PopoverDemo {...args} />,
};

export const Variants: Story = {
  render: () => (
    <div className='grid grid-cols-3 gap-14'>
      {variants.map(variant => (
        <Popover
          key={variant}
          placement='bottom'
          title='Title'
          trigger={
            <Button appearance='filled' variant={variant}>
              {variant}
            </Button>
          }
          variant={variant}
        >
          Slot Area
        </Popover>
      ))}
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-36'>
      {placements.map(placement => (
        <Popover
          key={placement}
          placement={placement}
          title='Title'
          trigger={
            <Button appearance='filled' variant='primary'>
              {placement}
            </Button>
          }
          variant='primary'
        >
          Slot Area
        </Popover>
      ))}
    </div>
  ),
};

export const AlignmentMatrix: Story = {
  render: () => (
    <div className='grid grid-cols-4 gap-x-32 gap-y-28'>
      {placements.map(placement =>
        alignments.map(align => (
          <Popover
            key={`${placement}-${align}`}
            align={align}
            placement={placement}
            title='Title'
            trigger={
              <Button appearance='filled' variant='primary'>
                {placement} {align}
              </Button>
            }
            variant='info'
          >
            Slot Area
          </Popover>
        )),
      )}
    </div>
  ),
};
