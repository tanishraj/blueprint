import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Layers, Settings, SquareArrowOutUpRight } from 'lucide-react';

import { Breadcrumb, BreadcrumbProps } from './Breadcrumb';

const appearances = ['ghost', 'outline'] as const;
const separators = ['>', '/'] as const;

const defaultItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Library', href: '/library', icon: Layers },
  { label: 'Components', href: '/components', icon: Settings },
  { label: 'Breadcrumb', icon: SquareArrowOutUpRight },
];

const meta: Meta<BreadcrumbProps> = {
  title: 'components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Breadcrumb helps users understand their current location in a page hierarchy and move back to parent destinations.

Use \`appearance\` for the container treatment and \`separator\` for the visual divider between items. The last item is treated as the current page unless an item sets \`current\` explicitly.
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
    appearance: {
      description: 'Visual treatment for the breadcrumb wrapper.',
      control: { type: 'radio' },
      options: appearances,
      table: {
        category: 'Appearance',
      },
    },
    separator: {
      description: 'Separator rendered between breadcrumb items.',
      control: { type: 'radio' },
      options: separators,
      table: {
        category: 'Appearance',
      },
    },
    items: {
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
    'aria-label': {
      control: 'text',
      table: {
        category: 'Accessibility',
      },
    },
  },
  args: {
    appearance: 'ghost',
    separator: '>',
    items: defaultItems,
  },
};

export default meta;
type Story = StoryObj<BreadcrumbProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Breadcrumb {...args} />,
};

export const Appearances: Story = {
  render: () => (
    <div className='flex flex-col items-start gap-6'>
      {appearances.map(appearance => (
        <div key={appearance} className='flex flex-col gap-3'>
          <Breadcrumb items={defaultItems} appearance={appearance} />
          <span className='text-xs text-slate-500 capitalize'>
            {appearance}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Separators: Story = {
  render: () => (
    <div className='flex flex-col items-start gap-6'>
      {separators.map(separator => (
        <div key={separator} className='flex flex-col gap-3'>
          <Breadcrumb items={defaultItems} separator={separator} />
          <span className='text-xs text-slate-500'>Separator {separator}</span>
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <Breadcrumb
      appearance='outline'
      items={[
        { label: 'Home', href: '/', icon: Home },
        { label: 'Disabled', href: '/disabled', disabled: true },
        { label: 'Current', href: '/current', current: true },
        { label: 'Next', href: '/next' },
      ]}
    />
  ),
};
