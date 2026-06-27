import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, ChevronDown, Plus, Settings, User } from 'lucide-react';

import { Dropdown } from './Dropdown';
import type { DropdownProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;
const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;
const appearances = ['filled', 'outline', 'dashed', 'ghost'] as const;
const placements = ['top', 'right', 'bottom', 'left'] as const;
const alignments = ['start', 'center', 'end'] as const;
const menuPlacements = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
] as const;
const triggerActions = ['click', 'hover'] as const;
const renderAsOptions = ['button', 'unstyled'] as const;

const menuItems = [
  { label: 'Profile', value: 'profile', leadingIcon: User },
  { label: 'Settings', value: 'settings', leadingIcon: Settings },
  { label: 'Completed', value: 'completed', leadingIcon: Check },
];

const meta: Meta<DropdownProps> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component: `
Dropdown opens a compact menu-style popover list from a Button-like trigger. Use it for action menus, filters, and quick command lists.
        `,
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return <Story />;
      }

      return (
        <div className='flex min-h-screen w-full items-center justify-center p-32'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    children: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    items: {
      control: 'object',
      table: {
        category: 'Content',
      },
    },
    selectedValue: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    closeOnSelect: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    clickOutsideToClose: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    triggerAction: {
      options: triggerActions,
      control: { type: 'radio' },
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'click' },
      },
    },
    showChevron: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    withArrow: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    iconOnly: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    leadingIcon: {
      options: ['None', 'Plus'],
      mapping: {
        None: undefined,
        Plus,
      },
      control: { type: 'select' },
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
    appearance: {
      options: appearances,
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
    placement: {
      options: placements,
      control: { type: 'radio' },
      table: {
        category: 'Position',
      },
    },
    align: {
      options: alignments,
      control: { type: 'radio' },
      table: {
        category: 'Position',
        defaultValue: { summary: 'start' },
      },
    },
    menuPlacement: {
      options: menuPlacements,
      control: { type: 'select' },
      table: {
        category: 'Position',
      },
    },
    menuOffset: {
      control: 'object',
      table: {
        category: 'Position',
        defaultValue: { summary: '[6, 0]' },
      },
    },
    open: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    defaultOpen: {
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
    loading: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    inverted: {
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    fullWidth: {
      control: 'boolean',
      table: {
        category: 'Layout',
      },
    },
    inline: {
      control: 'boolean',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
    usePortal: {
      control: 'boolean',
      table: {
        category: 'Portal',
        defaultValue: { summary: 'true' },
      },
    },
    renderAs: {
      options: renderAsOptions,
      control: { type: 'radio' },
      table: {
        category: 'Advanced',
        defaultValue: { summary: 'button' },
      },
    },
    icon: {
      options: ['Plus', 'ChevronDown'],
      mapping: {
        Plus,
        ChevronDown,
      },
      control: { type: 'select' },
      table: {
        category: 'Advanced',
      },
    },
    chevronIcon: {
      options: ['ChevronDown'],
      mapping: {
        ChevronDown,
      },
      control: { type: 'select' },
      table: {
        category: 'Advanced',
      },
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
      table: {
        category: 'Advanced',
        defaultValue: { summary: 'button' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    triggerClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    menuClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    trigger: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    menuContent: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    menuProps: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    portalTarget: {
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
    onClick: {
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
    onOpenChange: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    children: 'Dropdown',
    items: menuItems,
    size: 'md',
    variant: 'primary',
    appearance: 'filled',
    placement: 'bottom',
    align: 'start',
    menuOffset: [6, 0],
    closeOnSelect: true,
    clickOutsideToClose: true,
    showChevron: true,
    triggerAction: 'click',
    renderAs: 'button',
    withArrow: false,
    iconOnly: false,
    inline: false,
    usePortal: true,
    disabled: false,
    loading: false,
    inverted: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<DropdownProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Dropdown {...args} />,
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {variants.map(variant => (
        <Dropdown
          key={variant}
          items={menuItems}
          variant={variant}
          appearance='filled'
        >
          {variant}
        </Dropdown>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      {sizes.map(size => (
        <Dropdown
          key={size}
          items={menuItems}
          size={size}
          variant='primary'
          appearance='filled'
        >
          {size.toUpperCase()}
        </Dropdown>
      ))}
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      {appearances.map(appearance => (
        <Dropdown
          key={appearance}
          aria-label={`${appearance} dropdown`}
          appearance={appearance}
          icon={Plus}
          iconOnly
          items={menuItems}
          variant='primary'
        />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Dropdown items={menuItems} variant='primary' appearance='filled'>
        Default
      </Dropdown>
      <Dropdown
        items={menuItems}
        selectedValue='settings'
        variant='primary'
        appearance='filled'
      >
        Selected
      </Dropdown>
      <Dropdown items={menuItems} loading variant='primary' appearance='filled'>
        Loading
      </Dropdown>
      <Dropdown
        disabled
        items={menuItems}
        variant='primary'
        appearance='filled'
      >
        Disabled
      </Dropdown>
    </div>
  ),
};
