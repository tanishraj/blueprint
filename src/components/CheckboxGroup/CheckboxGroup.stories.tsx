import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckboxGroup } from './CheckboxGroup';
import type { CheckboxGroupProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;
const shapes = ['square', 'circle'] as const;
const orientations = ['vertical', 'horizontal'] as const;

const options = [
  {
    label: 'Design',
    description: 'Interface, systems, and visual quality.',
    value: 'design',
  },
  {
    label: 'Engineering',
    description: 'Implementation, integration, and platform work.',
    value: 'engineering',
  },
  {
    label: 'Product',
    description: 'Strategy, prioritization, and delivery.',
    value: 'product',
  },
];

const meta: Meta<CheckboxGroupProps> = {
  title: 'components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
CheckboxGroup collects related checkbox options under one accessible group label.

Use \`value\` for controlled state, \`defaultValue\` for uncontrolled state, and \`onValueChange\` to receive the selected option values.
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
    shape: {
      control: { type: 'radio' },
      options: shapes,
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
      control: 'object',
      table: {
        category: 'State',
      },
    },
    defaultValue: {
      control: 'object',
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
  },
  args: {
    label: 'Teams',
    description: 'Select all teams that should have access.',
    options,
    defaultValue: ['design'],
    size: 'md',
    shape: 'square',
    orientation: 'vertical',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<CheckboxGroupProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <CheckboxGroup {...args} />,
};

export const Orientations: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {orientations.map(orientation => (
        <CheckboxGroup
          key={orientation}
          label={`${orientation} group`}
          options={options}
          orientation={orientation}
          defaultValue={['design']}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {sizes.map(size => (
        <CheckboxGroup
          key={size}
          label={`${size.toUpperCase()} group`}
          options={options}
          size={size}
          defaultValue={['engineering']}
        />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {shapes.map(shape => (
        <CheckboxGroup
          key={shape}
          label={`${shape} group`}
          options={options}
          shape={shape}
          defaultValue={['design', 'product']}
        />
      ))}
    </div>
  ),
};

export const Validation: Story = {
  render: () => (
    <CheckboxGroup
      label='Teams'
      options={options}
      error='Choose at least one team.'
      required
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup
      label='Teams'
      options={options}
      defaultValue={['design', 'product']}
      disabled
    />
  ),
};
