import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './Select';
import type { SelectOption, SelectProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;
const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;

const options: SelectOption[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'In review', value: 'review' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived', disabled: true },
];

const multiOptions: SelectOption[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
  { label: 'Marketing', value: 'marketing' },
];

const SelectDemo = (args: SelectProps<SelectOption>) => {
  const [value, setValue] = useState<SelectOption | null>(
    (args.defaultValue as SelectOption | null) ?? null,
  );

  return (
    <Select<SelectOption>
      {...args}
      value={value}
      onChange={nextValue => setValue(nextValue as SelectOption | null)}
    />
  );
};

const MultiSelectDemo = (args: SelectProps<SelectOption, true>) => {
  const [value, setValue] = useState<SelectOption[]>(
    (args.defaultValue as SelectOption[]) ?? [],
  );

  return (
    <Select<SelectOption, true>
      {...args}
      isMulti
      value={value}
      onChange={nextValue => setValue((nextValue as SelectOption[]) ?? [])}
    />
  );
};

const meta: Meta<SelectProps<SelectOption>> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component: `
Select wraps \`react-select\` with the same form-field framing used across this kit. It supports single and multi selection, creatable entries, helper text, and error treatment aligned with the Input component.
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
        <div className='flex min-h-screen w-full items-center justify-center p-12'>
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
    placeholder: {
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
    options: {
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    variant: {
      options: variants,
      control: { type: 'select' },
      table: {
        category: 'Appearance',
      },
    },
    size: {
      options: sizes,
      control: { type: 'radio' },
      table: {
        category: 'Appearance',
      },
    },
    required: {
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
    isClearable: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    isSearchable: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    isCreatable: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    fullWidth: {
      control: 'boolean',
      table: {
        category: 'Layout',
      },
    },
    menuPlacement: {
      options: ['auto', 'top', 'bottom'],
      control: { type: 'radio' },
      table: {
        category: 'Position',
      },
    },
    menuPosition: {
      options: ['absolute', 'fixed'],
      control: { type: 'radio' },
      table: {
        category: 'Position',
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
    label: 'Status',
    placeholder: 'Select status',
    caption: 'Choose one value from the list',
    options,
    size: 'md',
    variant: 'default',
    isClearable: true,
    isSearchable: true,
    disabled: false,
    required: false,
    fullWidth: false,
    menuPlacement: 'auto',
    menuPosition: 'fixed',
  },
};

export default meta;
type Story = StoryObj<SelectProps<SelectOption>>;

export const Default: Story = {
  name: 'Playground',
  args: {
    defaultValue: options[1],
  },
  render: args => <SelectDemo {...args} />,
};

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {variants.map(variant => (
        <Select
          key={variant}
          caption='Helper text for the current field'
          defaultValue={options[0]}
          label='Status'
          options={options}
          placeholder='Select status'
          variant={variant}
        />
      ))}
    </div>
  ),
};

export const MultiSelect: Story = {
  name: 'Multi Select',
  args: {
    label: 'Teams',
    caption: 'Choose one or more teams',
    defaultValue: multiOptions.slice(0, 2),
    options: multiOptions,
    placeholder: 'Select teams',
  },
  render: args => (
    <MultiSelectDemo
      {...(args as unknown as SelectProps<SelectOption, true>)}
    />
  ),
};

export const Creatable: Story = {
  name: 'Creatable',
  args: {
    label: 'Tags',
    caption: 'Create a new option if none match',
    defaultValue: multiOptions.slice(0, 1),
    isCreatable: true,
    options: multiOptions,
    placeholder: 'Select or create tags',
  },
  render: args => (
    <MultiSelectDemo
      {...(args as unknown as SelectProps<SelectOption, true>)}
    />
  ),
};

export const ErrorState: Story = {
  name: 'Error State',
  args: {
    error: 'A selection is required before continuing',
    label: 'Status',
    options,
    placeholder: 'Select status',
  },
  render: args => <SelectDemo {...args} />,
};

export const DisabledOptions: Story = {
  name: 'Disabled Options',
  args: {
    label: 'Status',
    options,
    placeholder: 'Select status',
    menuIsOpen: true,
    hideSelectedOptions: false,
  },
  render: args => <SelectDemo {...args} />,
};
