import type { Meta, StoryObj } from '@storybook/react-vite';

import { Calendar } from './Calendar';
import type { CalendarProps } from './types';

const january2026 = new Date(2026, 0, 1);
const selectedDate = new Date(2026, 0, 15);
const rangeSelection = {
  from: new Date(2026, 0, 13),
  to: new Date(2026, 0, 18),
};
const multipleSelection = [
  new Date(2026, 0, 6),
  new Date(2026, 0, 12),
  new Date(2026, 0, 22),
];
const disabledDates = [
  new Date(2026, 0, 10),
  new Date(2026, 0, 11),
  { dayOfWeek: [0, 6] },
];
const shapes = ['squared', 'circle'] as const;
const captionLayouts = [
  'label',
  'dropdown',
  'dropdown-months',
  'dropdown-years',
] as const;

const meta: Meta<CalendarProps> = {
  title: 'components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'Calendar wraps React Day Picker with ui-kit styling for single, multiple, and range date selection.',
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
        <div className='flex min-h-screen w-full items-center justify-center p-8'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['single', 'multiple', 'range'],
      table: {
        category: 'Selection',
      },
    },
    selected: {
      control: false,
      table: {
        category: 'Selection',
      },
    },
    defaultMonth: {
      control: false,
      table: {
        category: 'Navigation',
      },
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 3, step: 1 },
      table: {
        category: 'Navigation',
      },
    },
    captionLayout: {
      control: { type: 'select' },
      options: captionLayouts,
      table: {
        category: 'Navigation',
      },
    },
    startMonth: {
      control: false,
      table: {
        category: 'Navigation',
      },
    },
    endMonth: {
      control: false,
      table: {
        category: 'Navigation',
      },
    },
    showOutsideDays: {
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    fixedWeeks: {
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    shape: {
      control: { type: 'radio' },
      options: shapes,
      table: {
        category: 'Appearance',
      },
    },
    disabled: {
      control: false,
      table: {
        category: 'State',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
    classNames: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    components: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    captionLayout: 'label',
    defaultMonth: january2026,
    fixedWeeks: true,
    mode: 'single',
    numberOfMonths: 1,
    selected: selectedDate,
    shape: 'squared',
    showOutsideDays: true,
  },
};

export default meta;
type Story = StoryObj<CalendarProps>;

export const Default: Story = {
  name: 'Playground',
};

export const Range: Story = {
  args: {
    defaultMonth: january2026,
    fixedWeeks: true,
    mode: 'range',
    selected: rangeSelection,
    showOutsideDays: true,
  },
};

export const Multiple: Story = {
  args: {
    defaultMonth: january2026,
    fixedWeeks: true,
    mode: 'multiple',
    selected: multipleSelection,
  },
};

export const DisabledDates: Story = {
  args: {
    defaultMonth: january2026,
    disabled: disabledDates,
    fixedWeeks: true,
    mode: 'single',
    selected: selectedDate,
  },
};

export const MultipleMonths: Story = {
  args: {
    defaultMonth: january2026,
    fixedWeeks: true,
    mode: 'single',
    numberOfMonths: 2,
    selected: selectedDate,
  },
};

export const MonthYearSelect: Story = {
  args: {
    captionLayout: 'dropdown',
    defaultMonth: january2026,
    endMonth: new Date(2030, 11, 1),
    fixedWeeks: true,
    mode: 'single',
    selected: selectedDate,
    startMonth: new Date(2020, 0, 1),
  },
};

export const CircleShape: Story = {
  args: {
    defaultMonth: january2026,
    fixedWeeks: true,
    mode: 'single',
    selected: selectedDate,
    shape: 'circle',
  },
};
