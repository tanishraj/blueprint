import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DatePicker } from './DatePicker';

const january2026 = new Date(2026, 0, 1);
const selectedDate = new Date(2026, 0, 15);
const formatDateForTest = (date: Date) =>
  `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

describe('DatePicker', () => {
  it('renders the formatted selected value', () => {
    render(
      <DatePicker
        formatDate={formatDateForTest}
        label='Date'
        value={selectedDate}
      />,
    );

    expect(screen.getByLabelText('Date')).toHaveValue('1/15/2026');
  });

  it('opens the calendar on input click and selects a date', () => {
    const handleValueChange = vi.fn();

    render(
      <DatePicker
        calendarProps={{ defaultMonth: january2026, fixedWeeks: true }}
        label='Date'
        onValueChange={handleValueChange}
        value={undefined}
      />,
    );

    fireEvent.click(screen.getByLabelText('Date'));

    expect(
      screen.getByRole('dialog', { name: 'Date calendar' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('15'));

    expect(handleValueChange).toHaveBeenCalled();
    expect(
      screen.queryByRole('dialog', { name: 'Date calendar' }),
    ).not.toBeInTheDocument();
  });

  it('opens the calendar when clicking the calendar icon', () => {
    const { container } = render(<DatePicker label='Date' value={undefined} />);

    const calendarIcon = container.querySelector('svg.lucide-calendar-days');

    expect(calendarIcon).not.toBeNull();

    fireEvent.click(calendarIcon as SVGElement);

    expect(
      screen.getByRole('dialog', { name: 'Date calendar' }),
    ).toBeInTheDocument();
  });

  it('clears the selected value when clearable', () => {
    const handleValueChange = vi.fn();

    render(
      <DatePicker
        clearable
        label='Date'
        onValueChange={handleValueChange}
        value={selectedDate}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /clear date/i }));

    expect(handleValueChange).toHaveBeenCalledWith(undefined);
  });

  it('shows both the clear action and calendar icon when clearable has a value', () => {
    const { container } = render(
      <DatePicker clearable label='Date' value={selectedDate} />,
    );

    expect(
      screen.getByRole('button', { name: /clear date/i }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });

  it('does not open when disabled', () => {
    render(<DatePicker disabled label='Date' />);

    fireEvent.click(screen.getByLabelText('Date'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not expose an expanded state when disabled', () => {
    render(<DatePicker disabled label='Date' open value={selectedDate} />);

    expect(screen.getByLabelText('Date')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when clicking outside', () => {
    render(
      <>
        <button type='button'>Outside</button>
        <DatePicker
          calendarProps={{ defaultMonth: january2026 }}
          defaultOpen
          label='Date'
        />
      </>,
    );

    expect(
      screen.getByRole('dialog', { name: 'Date calendar' }),
    ).toBeInTheDocument();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));

    expect(
      screen.queryByRole('dialog', { name: 'Date calendar' }),
    ).not.toBeInTheDocument();
  });
});
