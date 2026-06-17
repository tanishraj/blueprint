import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio, RadioProps } from './Radio';

const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<RadioProps> = {
  title: 'components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Radio is a single selectable option primitive. Use `label` for visible option text, `description` for supporting copy, and `error` for validation messaging.',
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
    size: {
      control: { type: 'radio' },
      options: sizes,
      table: {
        category: 'Appearance',
      },
    },
    checked: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    defaultChecked: {
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
    value: {
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
    onChange: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    ref: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    label: 'Radio',
    description: undefined,
    size: 'md',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<RadioProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Radio {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      {sizes.map(size => (
        <Radio
          key={size}
          label={`${size.toUpperCase()} radio`}
          name='radio-sizes'
          size={size}
          value={size}
        />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='grid gap-5 sm:grid-cols-2'>
      <Radio label='Unchecked' name='radio-state-unchecked' />
      <Radio defaultChecked label='Checked' name='radio-state-checked' />
      <Radio disabled label='Disabled' name='radio-state-disabled' />
      <Radio
        defaultChecked
        disabled
        label='Disabled checked'
        name='radio-state-disabled-checked'
      />
    </div>
  ),
};

export const Validation: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      <Radio label='Required radio' required />
      <Radio
        defaultChecked
        error='This field is required.'
        label='Radio with error'
        required
      />
    </div>
  ),
};
