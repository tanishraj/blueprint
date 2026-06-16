import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import { Button } from '../Button';
import { Modal } from './Modal';
import type { ModalProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;
const icons = ['None', 'Plus'] as const;

const SlotArea = () => (
  <div className='flex min-h-80 items-center justify-center border border-dashed border-primary bg-primary-inverted font-semibold'>
    Slot Area
  </div>
);

const ModalFooter = ({ onClose }: { onClose: () => void }) => (
  <>
    <Button appearance='ghost' onClick={onClose} variant='default'>
      Button
    </Button>
    <Button appearance='filled' onClick={onClose} variant='primary'>
      Button
    </Button>
  </>
);

const ModalDemo = (args: ModalProps) => {
  const [open, setOpen] = useState(args.open);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Button onClick={handleOpen} variant='primary'>
        Open modal
      </Button>
      <Modal
        {...args}
        footer={<ModalFooter onClose={handleClose} />}
        onClose={handleClose}
        open={open}
      >
        <SlotArea />
      </Modal>
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
      className='relative h-120 w-[min(56rem,calc(100vw-4rem))] overflow-hidden rounded border border-gray-400 bg-default p-6'
    >
      <Button onClick={handleOpen} variant='primary'>
        Open in container
      </Button>
      <Modal
        containerRef={containerRef}
        footer={<ModalFooter onClose={handleClose} />}
        onClose={handleClose}
        open={open}
        size='sm'
        title='Container modal'
      >
        <SlotArea />
      </Modal>
    </div>
  );
};

const meta: Meta<ModalProps> = {
  title: 'components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Modal is a controlled centered dialog for focused tasks. It renders through Portal by default, supports custom containers, and provides header, body, and footer slots.
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
    size: {
      control: { type: 'radio' },
      options: sizes,
      table: {
        category: 'Appearance',
        type: { summary: sizes.join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    leadingIcon: {
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
    open: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    title: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    description: {
      control: 'text',
      table: {
        category: 'Content',
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
      },
    },
    children: {
      control: 'object',
      table: {
        category: 'Advanced',
      },
    },
    footer: {
      control: 'object',
      table: {
        category: 'Advanced',
      },
    },
    onClose: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    closeLabel: {
      control: 'text',
      table: {
        category: 'Advanced',
        defaultValue: { summary: 'Close modal' },
      },
    },
    container: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    containerRef: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    role: {
      control: 'text',
      table: {
        category: 'Advanced',
        defaultValue: { summary: 'dialog' },
      },
    },
  },
  args: {
    open: false,
    title: 'Title',
    description: undefined,
    size: 'md',
    leadingIcon: Plus,
    closeOnEscape: true,
    closeOnOverlayClick: true,
    showCloseButton: true,
    showOverlay: true,
    disablePortal: false,
  },
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <ModalDemo {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {sizes.map(size => (
        <ModalDemo
          key={size}
          closeOnEscape
          closeOnOverlayClick
          leadingIcon={Plus}
          open={false}
          showCloseButton
          showOverlay
          size={size}
          title={`${size} modal`}
        />
      ))}
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <ModalDemo
      closeOnEscape
      closeOnOverlayClick
      description='Description'
      leadingIcon={Plus}
      open={false}
      showCloseButton
      showOverlay
      size='md'
      title='Modal title'
    />
  ),
};

export const InContainer: Story = {
  render: () => <ContainerDemo />,
};
