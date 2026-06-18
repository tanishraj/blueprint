import type { Meta, StoryObj } from '@storybook/react-vite';

import { RadioGroup } from './RadioGroup';
import type { RadioGroupProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;
const orientations = ['vertical', 'horizontal'] as const;

const options = [
  { label: 'Radio', value: 'one' },
  { label: 'Radio', value: 'two' },
  { label: 'Radio', value: 'three' },
  { label: 'Radio', value: 'four' },
  { label: 'Radio', value: 'five' },
];

const meta: Meta<RadioGroupProps> = {
  title: 'components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
RadioGroup collects related radio options under one accessible group label.

Use \`value\` for controlled state, \`defaultValue\` for uncontrolled state, and \`onValueChange\` to receive the selected option value.
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
        <div className='flex min-h-screen w-full items-center justify-center p-6'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    label: {
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
    error: {
      control: 'text',
      table: {
        category: 'Validation',
      },
    },
    options: {
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    size: {
      control: { type: 'radio' },
      options: sizes,
      table: {
        category: 'Appearance',
      },
    },
    orientation: {
      control: { type: 'radio' },
      options: orientations,
      table: {
        category: 'Layout',
      },
    },
    value: {
      control: 'text',
      table: {
        category: 'State',
      },
    },
    defaultValue: {
      control: 'text',
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
    required: {
      control: 'boolean',
      table: {
        category: 'Validation',
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
    onValueChange: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    label: 'Title',
    description: 'There will be a caption text here',
    options: options.slice(0, 3),
    defaultValue: 'one',
    size: 'md',
    orientation: 'horizontal',
    disabled: false,
    required: true,
  },
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <RadioGroup {...args} />,
};

export const Orientations: Story = {
  render: () => (
    <div className='grid gap-10 lg:grid-cols-2'>
      {orientations.map(orientation => (
        <RadioGroup
          key={orientation}
          defaultValue='one'
          description='There will be a caption text here'
          label='Title'
          options={options.slice(0, 3)}
          orientation={orientation}
          required
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {sizes.map(size => (
        <RadioGroup
          key={size}
          defaultValue='one'
          description='There will be a caption text here'
          label={`${size.toUpperCase()} group`}
          options={options.slice(0, 3)}
          orientation='horizontal'
          required
          size={size}
        />
      ))}
    </div>
  ),
};

export const Counts: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {[2, 3, 4, 5].map(count => (
        <RadioGroup
          key={count}
          defaultValue='one'
          description='There will be a caption text here'
          label='Title'
          options={options.slice(0, count)}
          orientation='horizontal'
          required
        />
      ))}
    </div>
  ),
};

export const Validation: Story = {
  render: () => (
    <div className='grid gap-10 lg:grid-cols-2'>
      <RadioGroup
        description='There will be a caption text here'
        label='Title'
        options={options.slice(0, 3)}
        required
      />
      <RadioGroup
        defaultValue='two'
        error='There will be a caption text here'
        label='Title'
        options={options.slice(0, 3)}
        required
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup
      defaultValue='one'
      description='There will be a caption text here'
      disabled
      label='Title'
      options={options.slice(0, 3)}
      orientation='horizontal'
      required
    />
  ),
};
