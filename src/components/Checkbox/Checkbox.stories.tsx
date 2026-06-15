import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox, CheckboxProps } from './Checkbox';

const sizes = ['sm', 'md', 'lg'] as const;
const shapes = ['square', 'circle'] as const;

const meta: Meta<CheckboxProps> = {
  title: 'components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Checkbox lets users select one or more options from a set.

Use \`label\` for the visible option text, \`description\` for supporting copy, \`error\` for validation messaging, and \`indeterminate\` for mixed parent selections.
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
        <div className='w-full min-h-screen flex items-center justify-center p-6'>
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
    shape: {
      control: { type: 'radio' },
      options: shapes,
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
    indeterminate: {
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
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
  },
  args: {
    label: 'Checkbox',
    description: 'This is a checkbox description.',
    size: 'md',
    shape: 'square',
    disabled: false,
    required: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Checkbox {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      {sizes.map(size => (
        <Checkbox
          key={size}
          size={size}
          label={`${size.toUpperCase()} checkbox`}
          description='Use size to match surrounding form density.'
        />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      {shapes.map(shape => (
        <Checkbox
          key={shape}
          shape={shape}
          label={`${shape} checkbox`}
          description='Shape controls the checkbox indicator geometry.'
          defaultChecked
        />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      <Checkbox label='Unchecked' />
      <Checkbox label='Checked' defaultChecked />
      <Checkbox label='Indeterminate' indeterminate />
      <Checkbox label='Disabled' disabled />
      <Checkbox label='Disabled checked' defaultChecked disabled />
    </div>
  ),
};

export const Validation: Story = {
  render: () => (
    <div className='flex flex-col gap-5'>
      <Checkbox
        label='Required checkbox'
        description='This selection is required.'
        required
      />
      <Checkbox
        label='Checkbox with error'
        error='This field is required.'
        required
      />
    </div>
  ),
};
