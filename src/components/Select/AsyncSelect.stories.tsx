import type { Meta, StoryObj } from '@storybook/react-vite';

import { AsyncSelect } from './AsyncSelect';
import type { SelectOption } from './types';

const options: SelectOption[] = [
  { value: 'opt-1', label: 'Option 1' },
  { value: 'opt-2', label: 'Option 2' },
  { value: 'opt-3', label: 'Option 3' },
  { value: 'opt-4', label: 'Option 4' },
];

const meta: Meta<typeof AsyncSelect> = {
  title: 'Components/Select/AsyncSelect',
  component: AsyncSelect,
  tags: ['autodocs'],
  args: {
    label: 'Async status',
    placeholder: 'Search options',
    size: 'md',
    variant: 'default',
    loadOptions: async (inputValue: string) =>
      options.filter(option =>
        option.label
          ?.toString()
          .toLowerCase()
          .includes(inputValue.toLowerCase()),
      ),
  },
};

export default meta;
type Story = StoryObj<typeof AsyncSelect>;

export const Playground: Story = {};

export const Creatable: Story = {
  args: {
    isCreatable: true,
    createText: 'Create option',
  },
};
