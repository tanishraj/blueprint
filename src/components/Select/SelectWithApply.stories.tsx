import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { MultiValue, OnChangeValue } from 'react-select';

import { SelectWithApply } from './SelectWithApply';
import type { SelectOption } from './types';

const statusOptions: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' },
];

const SingleSelectDemo = (args: ComponentProps<typeof SelectWithApply>) => {
  const [value, setValue] = useState<OnChangeValue<SelectOption, false>>(null);
  const handleChange = setValue as NonNullable<
    ComponentProps<typeof SelectWithApply>['onChange']
  >;

  return <SelectWithApply {...args} value={value} onChange={handleChange} />;
};

const MultiSelectDemo = (args: ComponentProps<typeof SelectWithApply>) => {
  const [value, setValue] = useState<MultiValue<SelectOption>>([]);
  const handleChange = setValue as NonNullable<
    ComponentProps<typeof SelectWithApply>['onChange']
  >;

  return (
    <SelectWithApply {...args} isMulti value={value} onChange={handleChange} />
  );
};

const meta: Meta<typeof SelectWithApply> = {
  title: 'Components/Select/SelectWithApply',
  component: SelectWithApply,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'SelectWithApply keeps pending changes in the open menu until the user commits them with the apply action.',
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
  args: {
    label: 'Status',
    placeholder: 'Select status',
    options: statusOptions,
    size: 'md',
    variant: 'default',
    applyButtonLabel: 'Apply',
  },
};

export default meta;
type Story = StoryObj<typeof SelectWithApply>;

export const Single: Story = {
  render: args => <SingleSelectDemo {...args} />,
};

export const Multi: Story = {
  args: {
    isMulti: true,
    allOptionLabel: 'All statuses',
  },
  render: args => <MultiSelectDemo {...args} />,
};

export const Compact: Story = {
  args: {
    isMulti: true,
    compactDisplay: true,
    allOptionLabel: 'All statuses',
  },
  render: args => <MultiSelectDemo {...args} />,
};
