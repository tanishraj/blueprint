import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback } from 'react';
import { Info } from 'lucide-react';

import { Button } from '../Button';
import { useToast, type ToastProps } from './useToast';
import { Toaster } from './Toaster';

const meta: Meta<ToastProps> = {
  title: 'Components/Toast',
  parameters: {
    docs: {
      description: {
        component: `
Toast provides transient notifications using Sonner for placement/queueing and this repo's Alert component for the actual UI.

- Toast sizing follows the existing Alert \`size\` prop from this codebase.
- Use \`dismissable\` to show the close control.
- Use \`duration\` and \`position\` to control lifecycle and placement.
`.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      options: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      control: { type: 'select' },
    },
    appearance: {
      options: ['filled', 'outline', 'dashed'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    position: {
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      control: { type: 'select' },
    },
    duration: {
      control: { type: 'range', min: 1000, max: 10000, step: 500 },
    },
    dismissable: {
      control: 'boolean',
    },
  },
  args: {
    title: 'Toast title',
    children: 'This is a toast notification.',
    icon: Info,
    variant: 'default',
    appearance: 'filled',
    size: 'md',
    position: 'bottom-right',
    duration: 3000,
    dismissable: true,
  },
};

export default meta;
type Story = StoryObj<ToastProps>;

function ToastDemo(args: ToastProps) {
  const toaster = useToast();

  const handleClick = useCallback(() => {
    toaster.toast(args);
  }, [args, toaster]);

  return (
    <>
      <Toaster />
      <Button variant='primary' appearance='filled' onClick={handleClick}>
        Show toast
      </Button>
    </>
  );
}

export const Default: Story = {
  render: args => <ToastDemo {...args} />,
};
