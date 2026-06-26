import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import { DatePicker } from './DatePicker';
import type { DatePickerProps } from './types';

const january2026 = new Date(2026, 0, 1);
const selectedDate = new Date(2026, 0, 15);

function DatePickerStoryState({
  args,
}: Readonly<{
  args: DatePickerProps;
}>) {
  const [storyValue, setStoryValue] = useState<Date | undefined>(args.value);
  const [storyOpen, setStoryOpen] = useState(args.open ?? false);

  const handleValueChange = useCallback((nextValue: Date | undefined) => {
    setStoryValue(nextValue);
  }, []);
  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setStoryOpen(nextOpen);
  }, []);

  return (
    <div className='w-full'>
      <DatePicker
        {...args}
        onOpenChange={handleOpenChange}
        onValueChange={handleValueChange}
        open={storyOpen}
        value={storyValue}
      />
    </div>
  );
}

function DatePickerPlayground(args: DatePickerProps) {
  return <DatePickerStoryState args={args} />;
}

const meta: Meta<DatePickerProps> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'DatePicker composes the existing Input and Calendar components into a single-date selection field with a floating calendar panel.',
      },
    },
  },
  argTypes: {
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
        category: 'Content',
      },
    },
    defaultValue: {
      control: false,
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
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
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
    open: {
      control: false,
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
    closeOnSelect: {
      control: 'boolean',
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
    panelClassName: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    calendarProps: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    formatDate: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    onValueChange: {
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
    calendarProps: {
      defaultMonth: january2026,
      fixedWeeks: true,
    },
    caption: 'There will be a caption text here',
    clearable: true,
    closeOnSelect: true,
    disabled: false,
    fullWidth: false,
    label: 'Label',
    open: false,
    placeholder: 'Select date',
    required: false,
    size: 'md',
    value: selectedDate,
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<DatePickerProps>;

export const Playground: Story = {
  render: DatePickerPlayground,
};

export const Empty: Story = {
  render: DatePickerPlayground,
  args: {},
};

export const WithCaption: Story = {
  render: DatePickerPlayground,
  args: {
    caption: 'Pick a reporting date.',
  },
};

export const ErrorState: Story = {
  render: DatePickerPlayground,
  args: {
    error: 'Please choose a valid date.',
    open: false,
  },
};

export const Disabled: Story = {
  render: DatePickerPlayground,
  args: {
    caption: 'This field is currently unavailable.',
    disabled: true,
  },
};

export const DisabledDates: Story = {
  render: DatePickerPlayground,
  args: {
    calendarProps: {
      defaultMonth: january2026,
      disabled: [{ dayOfWeek: [0, 6] }],
      fixedWeeks: true,
    },
  },
};
