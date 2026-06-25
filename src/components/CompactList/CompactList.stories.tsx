import type { Meta, StoryObj } from '@storybook/react-vite';

import { CompactList } from './CompactList';

const objectItems = [
  { id: 1, name: 'John Doe', role: 'Developer' },
  { id: 2, name: 'Jane Smith', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', role: 'Manager' },
  { id: 4, name: 'Alice Brown', role: 'QA' },
];

const meta: Meta<typeof CompactList> = {
  title: 'Components/CompactList',
  component: CompactList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
CompactList shows the first few items inline and collapses the remainder behind a compact badge-triggered popover.
        `,
      },
      layout: 'centered',
    },
  },
  args: {
    items: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
    maxVisible: 1,
    lineClampSize: 0,
    includeAll: false,
  },
};

export default meta;
type Story = StoryObj<typeof CompactList>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      <CompactList items={['Apple', 'Banana', 'Cherry', 'Date']} maxVisible={2} />
      <CompactList items={objectItems} displayKey='name' maxVisible={2} />
      <CompactList
        items={objectItems}
        maxVisible={1}
        renderItem={item => `${item.name} - ${item.role}`}
      />
      <CompactList
        items={[
          'This is a long item that should clamp to a single line when needed.',
          'Another long line for clamping.',
        ]}
        lineClampSize={1}
        maxVisible={2}
      />
    </div>
  ),
};
