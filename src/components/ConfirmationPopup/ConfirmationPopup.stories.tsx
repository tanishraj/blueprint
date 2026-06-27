import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

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

const noop = () => {};

const ConfirmationPopupDemo = (args: ConfirmationPopupProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ConfirmationPopup
      {...args}
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant='primary'>Open confirmation popup</Button>}
    />
  );
};

const meta: Meta<ConfirmationPopupProps> = {
  title: 'Components/ConfirmationPopup',
  component: ConfirmationPopup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'ConfirmationPopup is a compact floating confirmation surface with semantic variants, a close affordance, and cancel/action buttons.',
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div
        className={
          context.viewMode === 'docs'
            ? 'flex min-h-80 w-full items-center justify-center p-8'
            : 'flex min-h-screen w-full items-center justify-center p-8'
        }
      >
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
    portalled: {
      control: false,
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
    <div className='flex flex-col min-w-3xl gap-8'>
      {variants.map(variant => (
        <div
          key={variant}
          className='flex flex-col items-center justify-top overflow-visible rounded-md border border-default border-dashed px-6 pb-8 pt-40'
        >
          <ConfirmationPopup
            {...args}
            open
            onOpenChange={noop}
            placement='top'
            portalled={false}
            contentClassName='w-72 max-w-[calc(100vw-3rem)]'
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
    <div className='flex flex-col min-w-3xl gap-8'>
      {sizes.map(size => (
        <div
          key={size}
          className='flex flex-col items-center justify-top overflow-visible rounded-md border border-default border-dashed px-6 pb-8 pt-40'
        >
          <ConfirmationPopup
            {...args}
            open
            onOpenChange={noop}
            placement='top'
            portalled={false}
            contentClassName='w-72 max-w-[calc(100vw-3rem)]'
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
    <div className='flex flex-col min-w-3xl gap-8'>
      {placements.map(placement => (
        <div
          key={placement}
          className='flex flex-col items-center justify-top overflow-visible rounded-md border border-default border-dashed px-6 pb-40 pt-40'
        >
          <ConfirmationPopup
            {...args}
            open
            onOpenChange={noop}
            placement={placement}
            portalled={false}
            contentClassName='w-72 max-w-[calc(100vw-3rem)]'
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
