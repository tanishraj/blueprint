import type { ComponentProps } from 'react';
import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { GroupBase, MultiValue } from 'react-select';

import { GroupedSelect } from './GroupedSelect';
import type { GroupedSelectOption } from './types';

const options: GroupBase<GroupedSelectOption>[] = [
  {
    label: 'TERM LOAN',
    options: [
      { value: 'tl-fixed', label: 'Fixed Rate', group: 'TERM LOAN' },
      { value: 'tl-variable', label: 'Variable Rate', group: 'TERM LOAN' },
    ],
  },
  {
    label: 'REVOLVING CREDIT',
    options: [
      { value: 'rc-secured', label: 'Secured', group: 'REVOLVING CREDIT' },
      { value: 'rc-unsecured', label: 'Unsecured', group: 'REVOLVING CREDIT' },
    ],
  },
];

const GroupedSelectDemo = (args: ComponentProps<typeof GroupedSelect>) => {
  const [value, setValue] = useState<MultiValue<GroupedSelectOption>>([]);
  const handleChange = useCallback(
    (nextValue: MultiValue<GroupedSelectOption>) => {
      setValue(nextValue);
    },
    [],
  );

  return <GroupedSelect {...args} value={value} onChange={handleChange} />;
};

const meta: Meta<typeof GroupedSelect> = {
  title: 'Components/Select/GroupedSelect',
  component: GroupedSelect,
  tags: ['autodocs'],
  args: {
    label: 'Loan type',
    placeholder: 'Select one per group',
    options,
    size: 'md',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof GroupedSelect>;

export const Playground: Story = {
  render: args => <GroupedSelectDemo {...args} />,
};

export const Compact: Story = {
  args: {
    compactDisplay: true,
  },
  render: args => <GroupedSelectDemo {...args} />,
};
