import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import { Button } from '../Button';
import { ConfirmationPopup } from './ConfirmationPopup';
import type { ConfirmationPopupProps } from './types';

const placements = ['top', 'right', 'bottom', 'left'] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;

const ConfirmationPopupDemo = (args: ConfirmationPopupProps) => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
  }, []);

  return (
    <ConfirmationPopup
      {...args}
      open={open}
      onOpenChange={handleOpenChange}
      trigger={<Button variant='primary'>Open confirmation popup</Button>}
    />
  );
};

const meta: Meta<ConfirmationPopupProps> = {
  title: 'components/ConfirmationPopup',
  component: ConfirmationPopup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'ConfirmationPopup is a compact floating confirmation surface with semantic variants, a close affordance, and cancel/action buttons.',
      },
      layout: 'centered',
    },
  },
  decorators: [
    Story => (
      <div className='flex min-h-screen w-full items-center justify-center p-8'>
        <Story />
      </div>
    ),
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
    size: {
      control: { type: 'select' },
      options: sizes,
      table: {
        category: 'Appearance',
        type: { summary: sizes.join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    title: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    description: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    placement: {
      control: { type: 'select' },
      options: placements,
      table: {
        category: 'Position',
        type: { summary: placements.join(' | ') },
        defaultValue: { summary: 'bottom' },
      },
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      table: {
        category: 'Position',
        type: { summary: 'start | center | end' },
        defaultValue: { summary: 'center' },
      },
    },
    children: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    open: {
      control: false,
      table: {
        category: 'State',
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: false,
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    actionLabel: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Action' },
      },
    },
    cancelLabel: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Cancel' },
      },
    },
    closeLabel: {
      control: 'text',
      table: {
        category: 'Advanced',
        type: { summary: 'string' },
        defaultValue: { summary: 'Close confirmation popup' },
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
    showCancelButton: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    showActionButton: {
      control: 'boolean',
      table: {
        category: 'Behavior',
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
    closeOnCancel: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    closeOnAction: {
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
    onClose: {
      control: false,
      table: {
        category: 'Advanced',
        type: { summary: '() => void' },
      },
    },
    onCancel: {
      control: false,
      table: {
        category: 'Advanced',
        type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
    onAction: {
      control: false,
      table: {
        category: 'Advanced',
        type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
    actionButtonProps: {
      control: false,
      table: {
        category: 'Advanced',
        type: { summary: 'Partial<ButtonProps>' },
      },
    },
    cancelButtonProps: {
      control: false,
      table: {
        category: 'Advanced',
        type: { summary: 'Partial<ButtonProps>' },
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
    actionLabel: 'Action',
    align: 'center',
    cancelLabel: 'Cancel',
    closeOnAction: true,
    closeOnCancel: true,
    description: 'Lorem ipsum dolor sit amet.',
    placement: 'bottom',
    size: 'md',
    showActionButton: true,
    showArrow: true,
    showCancelButton: true,
    showCloseButton: true,
    title: 'Title',
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<ConfirmationPopupProps>;

export const Default: Story = {
  render: ConfirmationPopupDemo,
};

export const Variants: Story = {
  render: args => (
    <div className='grid w-full max-w-6xl grid-cols-1 gap-x-14 gap-y-20 md:grid-cols-2 xl:grid-cols-3'>
      {variants.map(variant => (
        <div
          key={variant}
          className='flex min-h-64 flex-col items-center justify-start pt-8 gap-4 border border-default border-dashed rounded-md'
        >
          <span className='text-lg font-medium capitalize'>{variant}</span>
          <ConfirmationPopup
            {...args}
            defaultOpen
            trigger={<Button>{variant}</Button>}
            variant={variant}
          />
        </div>
      ))}
    </div>
  ),
  args: {
    placement: 'bottom',
  },
};

export const Sizes: Story = {
  render: args => (
    <div className='grid w-full max-w-6xl grid-cols-1 gap-x-14 gap-y-20 md:grid-cols-3'>
      {sizes.map(size => (
        <div
          key={size}
          className='flex min-h-64 flex-col items-center justify-start pt-8 gap-4 border border-default border-dashed rounded-md'
        >
          <span className='text-lg font-medium'>{size}</span>
          <ConfirmationPopup
            {...args}
            defaultOpen
            size={size}
            title={`Size: ${size}`}
            trigger={<Button>{size}</Button>}
          />
        </div>
      ))}
    </div>
  ),
};

export const Placements: Story = {
  render: args => (
    <div className='grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2'>
      {placements.map(placement => (
        <div
          key={placement}
          className='flex min-h-80 flex-col items-center justify-center gap-4 rounded border border-dashed border-gray-300 p-10'
        >
          <ConfirmationPopup
            {...args}
            defaultOpen
            placement={placement}
            title={`Placement: ${placement}`}
            trigger={<span aria-hidden='true'>{placement}</span>}
          />
        </div>
      ))}
    </div>
  ),
};

export const Minimal: Story = {
  render: args => (
    <ConfirmationPopupDemo
      {...args}
      showArrow={false}
      showCancelButton={false}
      showCloseButton={false}
      variant='default'
    />
  ),
};
