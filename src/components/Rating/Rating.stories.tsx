import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs, useCallback } from 'storybook/preview-api';

import { Rating } from './Rating';
import type { RatingProps } from './types';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const precisions = [1, 0.5] as const;
const values = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const RatingPlayground = (args: RatingProps) => {
  const [, updateArgs] = useArgs<RatingProps>();
  const handleValueChange = useCallback(
    (nextValue: number) => updateArgs({ value: nextValue }),
    [updateArgs],
  );

  return (
    <Rating
      {...args}
      value={args.value ?? 3}
      onValueChange={handleValueChange}
    />
  );
};

const meta: Meta<RatingProps> = {
  title: 'components/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'Rating displays a star-based score and can be interactive, read-only, disabled, or half-step precise.',
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
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      table: {
        category: 'State',
      },
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      table: {
        category: 'State',
      },
    },
    max: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      table: {
        category: 'State',
      },
    },
    precision: {
      control: { type: 'radio' },
      options: precisions,
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
    readOnly: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    name: {
      control: 'text',
      table: {
        category: 'Behavior',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
    getLabelText: {
      control: false,
      table: {
        category: 'Accessibility',
      },
    },
    onValueChange: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    defaultValue: 3,
    disabled: false,
    max: 5,
    precision: 1,
    readOnly: false,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<RatingProps>;

export const Default: Story = {
  name: 'Playground',
  args: {
    disabled: false,
    max: 5,
    precision: 1,
    readOnly: false,
    size: 'md',
    value: 3,
  },
  render: RatingPlayground,
};

export const Values: Story = {
  render: () => (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {values.map(value => (
        <Rating key={value} precision={0.5} readOnly value={value} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      {sizes.map(size => (
        <Rating key={size} readOnly size={size} value={3.5} />
      ))}
    </div>
  ),
};

export const Precision: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      <Rating precision={1} readOnly value={3} />
      <Rating precision={0.5} readOnly value={3.5} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      <Rating defaultValue={3} />
      <Rating readOnly value={3.5} />
      <Rating disabled value={3} />
    </div>
  ),
};
