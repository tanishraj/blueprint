import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs, useCallback } from 'storybook/preview-api';

import { Slider } from './Slider';
import type { SliderProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;

const SingleSliderPlayground = (args: SliderProps) => {
  const [, updateArgs] = useArgs<SliderProps>();
  const handleValueChange = useCallback(
    (nextValue: number | [number, number]) => updateArgs({ value: nextValue }),
    [updateArgs],
  );

  return (
    <Slider
      {...args}
      value={args.value ?? 50}
      onValueChange={handleValueChange}
      range={false}
    />
  );
};

const RangeSliderPlayground = (args: SliderProps) => {
  const [, updateArgs] = useArgs<SliderProps>();
  const handleValueChange = useCallback(
    (nextValue: number | [number, number]) => updateArgs({ value: nextValue }),
    [updateArgs],
  );

  return (
    <Slider
      {...args}
      value={Array.isArray(args.value) ? args.value : [0, 50]}
      onValueChange={handleValueChange}
      range
      showMaxLabel
    />
  );
};

const meta: Meta<SliderProps> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'Slider supports single-value and range selection with visible markers, labels, captions, error text, and size variants.',
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
    value: {
      control: false,
      table: {
        category: 'State',
      },
    },
    defaultValue: {
      control: false,
      table: {
        category: 'State',
      },
    },
    min: {
      control: { type: 'number' },
      table: {
        category: 'State',
      },
    },
    max: {
      control: { type: 'number' },
      table: {
        category: 'State',
      },
    },
    step: {
      control: { type: 'number' },
      table: {
        category: 'State',
      },
    },
    range: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    size: {
      control: { type: 'radio' },
      options: sizes,
      table: {
        category: 'Appearance',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
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
    error: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    showMinLabel: {
      control: 'boolean',
      table: {
        category: 'Content',
      },
    },
    showValueLabel: {
      control: 'boolean',
      table: {
        category: 'Content',
      },
    },
    showMaxLabel: {
      control: 'boolean',
      table: {
        category: 'Content',
      },
    },
    formatValue: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    caption: '',
    disabled: false,
    label: 'Slider Label',
    max: 10,
    min: 0,
    showMaxLabel: false,
    showMinLabel: true,
    showValueLabel: true,
    size: 'md',
    step: 1,
  },
};

export default meta;
type Story = StoryObj<SliderProps>;

export const Default: Story = {
  name: 'Playground',
  render: SingleSliderPlayground,
  args: {
    range: false,
    value: 5,
  },
};

export const Range: Story = {
  render: RangeSliderPlayground,
  args: {
    range: true,
    showMaxLabel: true,
    value: [0, 5],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex w-[min(40rem,100%)] flex-col gap-8'>
      {sizes.map(size => (
        <Slider
          key={size}
          label='Slider Label'
          max={10}
          size={size}
          value={5}
        />
      ))}
    </div>
  ),
};

export const RangeSizes: Story = {
  render: () => (
    <div className='flex w-[min(40rem,100%)] flex-col gap-8'>
      {sizes.map(size => (
        <Slider
          key={size}
          label='Slider Label'
          max={10}
          range
          showMaxLabel
          size={size}
          value={[0, 5]}
        />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex w-[min(40rem,100%)] flex-col gap-8'>
      <Slider
        caption='There will be a caption text here'
        label='Slider Label'
        max={10}
        value={5}
      />
      <Slider disabled label='Slider Label' max={10} value={5} />
      <Slider
        error='There will be an error text here'
        label='Slider Label'
        max={10}
        value={5}
      />
      <Slider label='Slider Label' max={10} range showMaxLabel value={[0, 5]} />
    </div>
  ),
};
