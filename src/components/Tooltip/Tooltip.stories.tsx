import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';
import type { TooltipProps } from './types';

const variants = ['primary', 'secondary'] as const;
const places = ['top', 'right', 'bottom', 'left'] as const;

const TooltipDemo = (args: TooltipProps) => {
  const tooltipId = args.id ?? 'tooltip-story';
  const tooltipContent = typeof args.content === 'string' ? args.content : null;

  return (
    <div className='flex w-full items-center justify-center p-24'>
      <Button
        data-tooltip-content={tooltipContent}
        data-tooltip-id={tooltipId}
        appearance='filled'
        variant='primary'
      >
        Hover me
      </Button>
      <Tooltip {...args} id={tooltipId} />
    </div>
  );
};

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tooltip attaches to any element with a matching \`data-tooltip-id\`. Provide content through the component itself or through the trigger's \`data-tooltip-content\` attribute to mirror the \`lqc-ui-kit\` usage pattern.
        `,
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      table: {
        category: 'Anchor',
        type: { summary: 'string' },
      },
    },
    content: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    variant: {
      control: { type: 'radio' },
      options: variants,
      table: {
        category: 'Appearance',
        type: { summary: variants.join(' | ') },
        defaultValue: { summary: 'primary' },
      },
    },
    place: {
      control: { type: 'radio' },
      options: places,
      table: {
        category: 'Position',
        type: { summary: places.join(' | ') },
        defaultValue: { summary: 'top' },
      },
    },
    isOpen: {
      control: 'boolean',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
      },
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      table: {
        category: 'Appearance',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    offset: {
      control: { type: 'number', min: 0, step: 1 },
      table: {
        category: 'Position',
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
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
    id: 'tooltip-story',
    content: 'I am a tooltip',
    variant: 'primary',
    place: 'top',
    opacity: 1,
    offset: 8,
  },
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Default: Story = {
  name: 'Playground',
  args: {
    isOpen: true,
  },
  render: args => <TooltipDemo {...args} />,
};

export const HoverTriggered: Story = {
  args: {
    content: 'I am a tooltip',
  },
  render: args => <TooltipDemo {...args} />,
};

export const Variants: Story = {
  render: () => (
    <div className='flex min-h-105 w-full flex-col items-center justify-center gap-16 px-6 py-8 md:flex-row md:gap-20'>
      <div className='flex min-w-56 flex-col items-center justify-center gap-3'>
        <Button
          data-tooltip-content='Primary tooltip content'
          data-tooltip-id='tooltip-primary'
          appearance='filled'
          variant='primary'
        >
          Primary
        </Button>
        <Tooltip id='tooltip-primary' variant='primary' />
      </div>
      <div className='flex min-w-56 flex-col items-center justify-center gap-3'>
        <Button
          data-tooltip-id='tooltip-secondary'
          appearance='outline'
          variant='default'
        >
          Secondary
        </Button>
        <Tooltip id='tooltip-secondary' isOpen variant='secondary'>
          <div className='space-y-1 p-3 text-sm'>
            <div className='font-medium text-default'>Secondary tooltip</div>
            <div className='text-caption'>
              Richer tooltip content can be passed as children.
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  ),
};
