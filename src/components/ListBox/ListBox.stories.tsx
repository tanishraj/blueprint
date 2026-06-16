import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, Settings, User } from 'lucide-react';

import { ListBox } from './ListBox';
import type { ListBoxProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;

const listItems = [
  { label: 'Item Name', value: 'one' },
  { label: 'Item Name', value: 'two' },
  { label: 'Item Name', value: 'three' },
  { label: 'Item Name', value: 'four' },
];

const iconItems = [
  { label: 'Profile', value: 'profile', leadingIcon: User },
  { label: 'Settings', value: 'settings', leadingIcon: Settings },
  { label: 'Completed', value: 'completed', leadingIcon: Check },
];

const meta: Meta<ListBoxProps> = {
  title: 'Components/ListBox',
  component: ListBox,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'ListBox is a compact selectable list surface. Use ListItem for individual rows or pass items directly to ListBox.',
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
    items: {
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    selectedValue: {
      control: 'text',
      table: {
        category: 'State',
      },
    },
    size: {
      options: sizes,
      control: { type: 'radio' },
      table: {
        category: 'Appearance',
      },
    },
    itemRole: {
      options: ['option', 'menuitem'],
      control: { type: 'radio' },
      table: {
        category: 'Accessibility',
      },
    },
    role: {
      control: 'text',
      table: {
        category: 'Accessibility',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    leadingSlot: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    onItemSelect: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    items: listItems,
    size: 'md',
    itemRole: 'option',
    role: 'listbox',
  },
};

export default meta;
type Story = StoryObj<ListBoxProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <ListBox {...args} />,
};

export const Counts: Story = {
  render: () => (
    <div className='grid gap-8 lg:grid-cols-3'>
      {[1, 2, 3, 4, 5, 6].map(count => (
        <ListBox key={count} items={listItems.slice(0, count)} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {sizes.map(size => (
        <ListBox key={size} items={listItems.slice(0, 3)} size={size} />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='grid gap-6 sm:grid-cols-2'>
      <ListBox items={listItems} selectedValue='two' />
      <ListBox
        items={[
          ...listItems.slice(0, 2),
          { label: 'Disabled Item', value: 'disabled', disabled: true },
        ]}
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => <ListBox items={iconItems} selectedValue='completed' />,
};
