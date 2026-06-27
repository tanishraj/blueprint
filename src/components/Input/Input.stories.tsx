import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Plus, Search, User } from 'lucide-react';

import { Input } from './Input';
import type { InputProps } from './types';

const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const icons = ['None', 'Plus', 'Mail', 'Search', 'User'] as const;

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component: `
Input is a labeled text control with helper text, semantic variants, optional icons, clear action, disabled state, and error treatment.
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
        <div className='flex min-h-screen w-full items-center justify-center p-12'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    label: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    placeholder: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    caption: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    error: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    value: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    defaultValue: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    leadingIcon: {
      options: icons,
      mapping: {
        None: undefined,
        Plus,
        Mail,
        Search,
        User,
      },
      control: { type: 'select' },
      table: {
        category: 'Content',
      },
    },
    trailingIcon: {
      options: icons,
      mapping: {
        None: undefined,
        Plus,
        Mail,
        Search,
        User,
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
    size: {
      options: sizes,
      control: { type: 'radio' },
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
    required: {
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
    clearable: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    clearLabel: {
      control: 'text',
      table: {
        category: 'Accessibility',
      },
    },
    type: {
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
      control: { type: 'select' },
      table: {
        category: 'Behavior',
      },
    },
    containerClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    labelClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    inputClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    onChange: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    onClear: {
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
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    caption: 'There will be a caption text here',
    variant: 'default',
    size: 'md',
    leadingIcon: Plus,
    trailingIcon: Plus,
    required: true,
    clearable: false,
    disabled: false,
    fullWidth: false,
    type: 'text',
  },
};

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Input {...args} />,
};

export const Variants: Story = {
  render: () => (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {variants.map(variant => (
        <Input
          key={variant}
          caption='There will be a caption text here'
          label='Label'
          leadingIcon={Plus}
          placeholder={variant}
          required
          trailingIcon={Plus}
          variant={variant}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {sizes.map(size => (
        <Input
          key={size}
          caption='There will be a caption text here'
          label='Label'
          leadingIcon={Plus}
          placeholder={size.toUpperCase()}
          required
          size={size}
          trailingIcon={Plus}
          variant='primary'
        />
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className='grid gap-6 sm:grid-cols-2'>
      <Input
        caption='There will be a caption text here'
        label='With actions'
        leadingIcon={Plus}
        placeholder='Placeholder'
        trailingIcon={Plus}
      />
      <Input
        caption='There will be a caption text here'
        label='Email'
        placeholder='Placeholder'
        trailingIcon={Mail}
      />
    </div>
  ),
};

export const Clearable: Story = {
  render: () => (
    <div className='grid gap-6 sm:grid-cols-2'>
      <Input
        caption='There will be a caption text here'
        clearable
        defaultValue='Placeholder'
        label='Label'
        leadingIcon={Plus}
        trailingIcon={Plus}
      />
      <Input
        caption='There will be a caption text here'
        clearable
        defaultValue='Placeholder'
        label='Label'
        trailingIcon={Mail}
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='grid gap-6 sm:grid-cols-2'>
      <Input
        caption='There will be a caption text here'
        label='Default'
        placeholder='Placeholder'
      />
      <Input
        disabled
        caption='There will be a caption text here'
        label='Disabled'
        placeholder='Placeholder'
        value='Placeholder'
      />
      <Input
        error='There will be a caption text here'
        label='Error'
        placeholder='Placeholder'
        trailingIcon={Mail}
      />
      <Input
        caption='There will be a caption text here'
        label='Focused style'
        placeholder='Placeholder'
        trailingIcon={Mail}
        variant='primary'
      />
    </div>
  ),
};
