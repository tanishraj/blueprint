import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from './ProgressBar';
import type { ProgressBarProps } from './types';

const appearances = ['linear', 'circular'] as const;
const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;
const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<ProgressBarProps> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component: `
ProgressBar communicates completion or loading progress in linear and circular forms. It supports semantic variants, labels, captions, visible values, endpoint dots, and inverted dark-surface styling.
        `,
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return <Story />;
      }

      return (
        <div className='flex min-h-screen w-full items-center justify-center p-12'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    appearance: {
      options: appearances,
      control: { type: 'radio' },
      table: {
        category: 'Appearance',
        type: { summary: appearances.join(' | ') },
        defaultValue: { summary: 'linear' },
      },
    },
    variant: {
      options: variants,
      control: { type: 'select' },
      table: {
        category: 'Appearance',
        type: { summary: variants.join(' | ') },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      options: sizes,
      control: { type: 'radio' },
      table: {
        category: 'Appearance',
        type: { summary: sizes.join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    inverted: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    caption: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      table: {
        category: 'State',
        defaultValue: { summary: '0' },
      },
    },
    min: {
      control: { type: 'number' },
      table: {
        category: 'State',
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: { type: 'number' },
      table: {
        category: 'State',
        defaultValue: { summary: '100' },
      },
    },
    showValue: {
      control: 'boolean',
      table: {
        category: 'Content',
        defaultValue: { summary: 'true' },
      },
    },
    showDot: {
      control: 'boolean',
      table: {
        category: 'Content',
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    labelClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    valueClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    captionClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    trackClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    indicatorClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    valueFormatter: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    role: {
      control: 'text',
      table: {
        category: 'Advanced',
        defaultValue: { summary: 'progressbar' },
      },
    },
  },
  args: {
    appearance: 'linear',
    caption: 'There will be a caption text here',
    fullWidth: false,
    inverted: false,
    label: 'Label',
    max: 100,
    min: 0,
    showDot: false,
    showValue: true,
    size: 'md',
    value: 30,
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <ProgressBar {...args} />,
};

export const Variants: Story = {
  render: () => (
    <div className='grid w-[min(52rem,calc(100vw-4rem))] gap-6 sm:grid-cols-2'>
      {variants.map(variant => (
        <ProgressBar
          key={variant}
          caption='There will be a caption text here'
          label='Label'
          value={30}
          variant={variant}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex w-80 flex-col gap-6'>
      {sizes.map(size => (
        <ProgressBar
          key={size}
          caption='There will be a caption text here'
          label='Label'
          size={size}
          value={30}
          variant='primary'
        />
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className='grid w-[min(52rem,calc(100vw-4rem))] gap-6 sm:grid-cols-2'>
      {variants.map(variant => (
        <ProgressBar
          key={variant}
          caption='There will be a caption text here'
          label='Label'
          showDot
          value={30}
          variant={variant}
        />
      ))}
    </div>
  ),
};

export const Circular: Story = {
  render: () => (
    <div className='grid gap-8 sm:grid-cols-3'>
      {variants.map(variant => (
        <ProgressBar
          key={variant}
          appearance='circular'
          caption='There will be a caption text here'
          label='Label'
          value={30}
          variant={variant}
        />
      ))}
    </div>
  ),
};

export const Inverted: Story = {
  render: () => (
    <div className='grid gap-8 rounded-lg bg-default-inverted p-8 sm:grid-cols-2'>
      <ProgressBar
        caption='There will be a caption text here'
        inverted
        label='Label'
        value={30}
        variant='primary'
      />
      <ProgressBar
        appearance='circular'
        caption='There will be a caption text here'
        inverted
        label='Label'
        value={30}
        variant='primary'
      />
    </div>
  ),
};
