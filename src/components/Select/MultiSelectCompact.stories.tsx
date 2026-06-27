import type { Meta, StoryObj } from '@storybook/react-vite';

import { MultiSelectCompact } from './MultiSelectCompact';
import type { SelectOption } from './types';

const options: SelectOption[] = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
];

const meta: Meta<typeof MultiSelectCompact> = {
  title: 'Components/Select/MultiSelectCompact',
  component: MultiSelectCompact,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MultiSelectCompact collapses multi-value display into a compact first-item-plus-count summary.',
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
    label: 'Teams',
    placeholder: 'Select teams',
    options,
    defaultValue: options.slice(0, 3),
    size: 'md',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelectCompact>;

export const Playground: Story = {};
