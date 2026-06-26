import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion } from './Accordion';
import type { AccordionItem, AccordionProps } from './types';

const sampleItems: AccordionItem[] = [
  {
    value: 'account',
    title: 'Account settings',
    content:
      'Manage profile information, password updates, and basic account preferences from a single section.',
  },
  {
    value: 'billing',
    title: 'Billing and invoices',
    content:
      'Review payment methods, download invoices, and keep subscription details current.',
  },
  {
    value: 'team',
    title: 'Team permissions',
    content:
      'Control invite access, assign member roles, and keep workspace permissions aligned.',
  },
];

const sizes = ['sm', 'md', 'lg'] as const;
const types = ['single', 'multiple'] as const;

const meta: Meta<AccordionProps> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Accordion groups related content into collapsible sections with a clean bordered list layout.

Use it for settings, FAQs, and dense information panels where only one or a few sections should be visible at a time.
        `.trim(),
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
        <div className='flex min-h-screen w-full items-center justify-center p-6'>
          <div className='w-full max-w-xl'>
            <Story />
          </div>
        </div>
      );
    },
  ],
  argTypes: {
    items: {
      description:
        'Accordion rows. Each item includes a stable value, title, content, and optional disabled state.',
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    size: {
      description: 'Header row height and spacing.',
      control: { type: 'select' },
      options: sizes,
      table: {
        category: 'Appearance',
      },
    },
    className: {
      description: 'Additional class names applied to the accordion root.',
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
    type: {
      description:
        'Selection mode. Use single for one open panel or multiple for several open panels.',
      control: { type: 'select' },
      options: types,
      table: {
        category: 'Behavior',
      },
    },
    collapsible: {
      description:
        'Allow the currently open item to collapse when using single selection mode.',
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    defaultValue: {
      description:
        'Initial open item value. Use a string for single mode or an array for multiple mode.',
      control: 'object',
      table: {
        category: 'Behavior',
      },
    },
    value: {
      description:
        'Controlled open value. Use with onValueChange when managing state externally.',
      control: 'object',
      table: {
        category: 'Behavior',
        subcategory: 'Controlled state',
      },
    },
    onValueChange: {
      description: 'Called when the open accordion value changes.',
      control: false,
      table: {
        category: 'Behavior',
        subcategory: 'Controlled state',
      },
    },
  },
  args: {
    items: sampleItems,
    type: 'single',
    size: 'md',
    collapsible: true,
    defaultValue: 'account',
  },
};

export default meta;
type Story = StoryObj<AccordionProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Accordion {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-8'>
      {sizes.map(size => (
        <div key={size} className='flex flex-col gap-3'>
          <Accordion items={sampleItems} size={size} defaultValue='account' />
          <span className='text-xs text-slate-500'>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion
      items={sampleItems}
      type='multiple'
      defaultValue={['account', 'billing']}
    />
  ),
};

export const DisabledItem: Story = {
  name: 'Disabled item',
  args: {
    items: [
      sampleItems[0],
      {
        ...sampleItems[1],
        disabled: true,
      },
      sampleItems[2],
    ],
    defaultValue: 'account',
  },
  render: args => <Accordion {...args} />,
};
