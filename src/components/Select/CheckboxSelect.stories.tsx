import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckboxSelect } from './CheckboxSelect';
import type { SelectOption } from './types';

const options: SelectOption[] = [
  { value: 'fintech', label: 'FinTech' },
  { value: 'banking', label: 'Banking Tech' },
  { value: 'insurance', label: 'Insurance IT' },
  { value: 'crypto', label: 'Cryptocurrencies' },
];

const meta: Meta<typeof CheckboxSelect> = {
  title: 'Components/Select/CheckboxSelect',
  component: CheckboxSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CheckboxSelect keeps the menu open for multi-selection and renders checkbox affordances for each option.',
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
    label: 'Industry sectors',
    placeholder: 'Select sectors',
    options,
    size: 'md',
    variant: 'default',
    isMulti: true,
    isSearchable: true,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxSelect>;

export const Playground: Story = {};

export const Compact: Story = {
  args: {
    compactDisplay: true,
    defaultValue: options.slice(0, 3),
  },
};
