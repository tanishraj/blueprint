import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useRef, useState } from 'react';

import { Button } from '../Button';
import { Drawer } from './Drawer';
import type { DrawerProps } from './types';

const placements = ['right', 'left', 'top', 'bottom'] as const;
const sizes = ['sm', 'md', 'lg', 'full'] as const;

const DrawerDemo = (args: DrawerProps) => {
  const [open, setOpen] = useState(args.open);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Button onClick={handleOpen} variant='primary'>
        Open drawer
      </Button>
      <Drawer
        {...args}
        footer={
          <>
            <Button appearance='outline' onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClose} variant='primary'>
              Button
            </Button>
          </>
        }
        onClose={handleClose}
        open={open}
      >
        <div className='space-y-4 text-sm text-gray-600'>
          <p>
            Drawer content sits in a scrollable body between the header and
            footer. Use it for task flows, forms, detail panels, and focused
            secondary surfaces.
          </p>
          <p>
            The component is controlled, so consumers own the open state and can
            close from the overlay, close button, or Escape key.
          </p>
        </div>
      </Drawer>
    </>
  );
};

const ContainerDemo = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div
      ref={containerRef}
      className='relative h-120 w-[min(48rem,calc(100vw-4rem))] overflow-hidden rounded border border-gray-400 bg-default p-6'
    >
      <Button onClick={handleOpen} variant='primary'>
        Open in container
      </Button>
      <Drawer
        containerRef={containerRef}
        disablePortal={false}
        footer={
          <Button onClick={handleClose} variant='primary'>
            Button
          </Button>
        }
        onClose={handleClose}
        open={open}
        placement='right'
        size='sm'
        title='Container drawer'
      >
        This drawer is rendered into a specific container ref instead of the
        document body.
      </Drawer>
    </div>
  );
};

const meta: Meta<DrawerProps> = {
  title: 'components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Drawer is a controlled overlay panel for secondary workflows. It renders through Portal by default and supports custom portal containers through an element, container id, or container ref.
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
        <div className='flex min-h-screen w-full items-center justify-center p-8'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    placement: {
      control: { type: 'radio' },
      options: placements,
      table: {
        category: 'Appearance',
        type: { summary: placements.join(' | ') },
        defaultValue: { summary: 'right' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: sizes,
      table: {
        category: 'Appearance',
        type: { summary: sizes.join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    open: {
      control: 'boolean',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
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
    closeOnEscape: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    closeOnOverlayClick: {
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
    showOverlay: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    disablePortal: {
      control: 'boolean',
      table: {
        category: 'Portal',
        defaultValue: { summary: 'false' },
      },
    },
    containerId: {
      control: 'text',
      table: {
        category: 'Portal',
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'object',
      table: {
        category: 'Advanced',
        type: { summary: 'ReactNode' },
      },
    },
    footer: {
      control: 'object',
      table: {
        category: 'Advanced',
        type: { summary: 'ReactNode' },
      },
    },
    onClose: {
      control: false,
      table: {
        category: 'Advanced',
        type: { summary: '() => void' },
      },
    },
    closeLabel: {
      control: 'text',
      table: {
        category: 'Advanced',
        type: { summary: 'string' },
        defaultValue: { summary: 'Close drawer' },
      },
    },
    container: {
      control: 'object',
      table: {
        category: 'Advanced',
        type: { summary: 'HTMLElement | null' },
      },
    },
    containerRef: {
      control: 'object',
      table: {
        category: 'Advanced',
        type: { summary: 'RefObject<HTMLElement | null>' },
      },
    },
    role: {
      control: 'text',
      table: {
        category: 'Advanced',
        type: { summary: 'AriaRole' },
        defaultValue: { summary: 'dialog' },
      },
    },
  },
  args: {
    open: false,
    title: 'Title',
    description: 'Description',
    placement: 'right',
    size: 'md',
    closeOnEscape: true,
    closeOnOverlayClick: true,
    showCloseButton: true,
    showOverlay: true,
    disablePortal: false,
  },
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <DrawerDemo {...args} />,
};

export const Placements: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {placements.map(placement => (
        <DrawerDemo
          key={placement}
          closeOnEscape
          closeOnOverlayClick
          open={false}
          placement={placement}
          showCloseButton
          showOverlay
          size='sm'
          title={`${placement} drawer`}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {sizes.map(size => (
        <DrawerDemo
          key={size}
          closeOnEscape
          closeOnOverlayClick
          open={false}
          placement='right'
          showCloseButton
          showOverlay
          size={size}
          title={`${size} drawer`}
        />
      ))}
    </div>
  ),
};

export const InContainer: Story = {
  render: () => <ContainerDemo />,
};
