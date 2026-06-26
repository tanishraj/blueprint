import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs, useCallback } from 'storybook/preview-api';

import { Feedback } from './Feedback';
import type { FeedbackProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;
const variants = ['face', 'emoji'] as const;
const values = [1, 2, 3, 4, 5] as const;

const FeedbackPlayground = (args: FeedbackProps) => {
  const [, updateArgs] = useArgs<FeedbackProps>();
  const handleValueChange = useCallback(
    (nextValue: number) => updateArgs({ value: nextValue }),
    [updateArgs],
  );

  return (
    <Feedback
      {...args}
      value={args.value ?? 4}
      onValueChange={handleValueChange}
    />
  );
};

const meta: Meta<FeedbackProps> = {
  title: 'Components/Feedback',
  component: Feedback,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'Feedback captures five sentiment choices with either outlined face icons or emoji tiles.',
      },
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
      control: { type: 'radio' },
      options: values,
      table: {
        category: 'State',
      },
    },
    defaultValue: {
      control: { type: 'radio' },
      options: values,
      table: {
        category: 'State',
      },
    },
    variant: {
      control: { type: 'radio' },
      options: variants,
      table: {
        category: 'Appearance',
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
    options: {
      control: false,
      table: {
        category: 'Advanced',
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
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
  },
  args: {
    disabled: false,
    readOnly: false,
    size: 'md',
    value: 4,
    variant: 'face',
  },
};

export default meta;
type Story = StoryObj<FeedbackProps>;

export const Default: Story = {
  name: 'Playground',
  render: FeedbackPlayground,
};

export const FaceValues: Story = {
  render: () => (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {values.map(value => (
        <Feedback key={value} readOnly value={value} variant='face' />
      ))}
    </div>
  ),
};

export const EmojiValues: Story = {
  render: () => (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {values.map(value => (
        <Feedback key={value} readOnly value={value} variant='emoji' />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {sizes.map(size => (
        <div key={size} className='flex flex-col gap-3'>
          <Feedback readOnly size={size} value={4} variant='face' />
          <Feedback readOnly size={size} value={4} variant='emoji' />
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      <Feedback defaultValue={2} variant='face' />
      <Feedback readOnly value={4} variant='emoji' />
      <Feedback disabled value={3} variant='face' />
    </div>
  ),
};
