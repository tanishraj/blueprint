import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useArgs } from 'storybook/preview-api';

import { TextArea } from './TextArea';
import type { TextAreaProps } from './types';

const meta: Meta<TextAreaProps> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
TextArea provides multi-line text entry using this repo's current label, border, caption, and state styles.

- Use \`caption\` for helper text.
- Use \`error\` for validation messaging.
- Use \`maxLength\` to show a character count when no caption or error is provided.
`.trim(),
      },
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      options: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      control: { type: 'select' },
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
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    required: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    maxLength: {
      control: { type: 'number' },
      table: {
        category: 'Behavior',
      },
    },
    label: {
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
      control: false,
      table: {
        category: 'State',
      },
    },
    onChange: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    label: 'Description',
    placeholder: 'Write something...',
    size: 'md',
    variant: 'default',
    fullWidth: true,
    disabled: false,
    required: false,
    caption: '',
    error: '',
    maxLength: undefined,
    value: '',
    rows: 4,
  },
};

export default meta;
type Story = StoryObj<TextAreaProps>;

function TextAreaStory(args: TextAreaProps) {
  const [{ value }, updateArgs] = useArgs<TextAreaProps>();
  const { onChange } = args;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      updateArgs({ value: event.target.value });
      onChange?.(event);
    },
    [onChange, updateArgs],
  );

  return (
    <div>
      <TextArea
        {...args}
        onChange={handleChange}
        value={typeof value === 'string' ? value : ''}
      />
    </div>
  );
}

export const Default: Story = {
  render: TextAreaStory,
};

export const WithCharacterCount: Story = {
  render: TextAreaStory,
  args: {
    maxLength: 500,
    value: 'Initial value',
  },
};

export const WithCaption: Story = {
  render: TextAreaStory,
  args: {
    caption: 'This helper text replaces the character count.',
    maxLength: 500,
    value: 'Initial value',
  },
};

export const WithError: Story = {
  render: TextAreaStory,
  args: {
    error: 'This is an error.',
    maxLength: 500,
    value: 'Initial value',
  },
};
