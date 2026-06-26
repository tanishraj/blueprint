import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Calendar } from './Calendar';

const january2026 = new Date(2026, 0, 1);
const selectedDate = new Date(2026, 0, 15);

describe('Calendar Component', () => {
  it('renders a month grid with the selected date', () => {
    const { container } = render(
      <Calendar
        defaultMonth={january2026}
        mode='single'
        selected={selectedDate}
      />,
    );

    expect(screen.getByText('January 2026')).toBeInTheDocument();
    expect(screen.getByText('15').closest('td')?.className).toContain(
      '[&>button]:!bg-primary',
    );
    expect(container.firstElementChild).toHaveClass(
      'relative',
      'rounded-lg',
      'border',
    );
  });

  it('calls onSelect when a date is selected', () => {
    const handleSelect = vi.fn();

    render(
      <Calendar
        defaultMonth={january2026}
        mode='single'
        onSelect={handleSelect}
      />,
    );

    fireEvent.click(screen.getByText('15'));

    expect(handleSelect).toHaveBeenCalled();
  });

  it('supports custom root and element class names', () => {
    const { container } = render(
      <Calendar
        className='calendar-root'
        classNames={{ day_button: 'calendar-day-button' }}
        defaultMonth={january2026}
        mode='single'
      />,
    );

    expect(container.querySelector('.calendar-root')).toBeInTheDocument();
    expect(container.querySelector('.calendar-day-button')).toBeInTheDocument();
  });

  it('marks disabled dates', () => {
    render(
      <Calendar
        defaultMonth={january2026}
        disabled={selectedDate}
        mode='single'
      />,
    );

    expect(screen.getByText('15').closest('td')?.className).toContain(
      '[&>button]:cursor-not-allowed',
    );
    expect(screen.getByText('15').closest('button')).toBeDisabled();
  });

  it('renders navigation buttons', () => {
    const { container } = render(<Calendar defaultMonth={january2026} />);

    expect(
      screen.getByRole('button', { name: /previous month/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next month/i }),
    ).toBeInTheDocument();
    expect(container.querySelector('nav')).toHaveClass(
      'absolute',
      'inset-x-3',
      'z-20',
    );
    expect(screen.getByRole('button', { name: /next month/i })).toHaveClass(
      'cursor-pointer',
      'z-20',
    );
  });

  it('adds gaps between day cells', () => {
    render(<Calendar defaultMonth={january2026} />);

    expect(screen.getByText('15').closest('tr')).toHaveClass('gap-1');
  });

  it('uses selected styling for range middle dates', () => {
    render(
      <Calendar
        defaultMonth={january2026}
        mode='range'
        selected={{
          from: new Date(2026, 0, 13),
          to: new Date(2026, 0, 18),
        }}
      />,
    );

    expect(screen.getByText('15').closest('td')?.className).toContain(
      '[&>button]:!bg-primary',
    );
    expect(screen.getByText('15').closest('td')?.className).toContain(
      '[&>button]:!text-white',
    );
    expect(screen.getByText('15').closest('td')?.className).toContain(
      '[&>button]:!rounded',
    );
  });

  it('supports circle shaped days', () => {
    render(
      <Calendar
        defaultMonth={january2026}
        mode='single'
        selected={selectedDate}
        shape='circle'
      />,
    );

    expect(screen.getByText('15').closest('button')).toHaveClass(
      'rounded-full',
    );
    expect(screen.getByRole('button', { name: /previous month/i })).toHaveClass(
      'rounded-full',
    );
    expect(screen.getByRole('button', { name: /next month/i })).toHaveClass(
      'rounded-full',
    );
  });

  it('supports month and year dropdown captions', () => {
    render(
      <Calendar
        captionLayout='dropdown'
        defaultMonth={january2026}
        endMonth={new Date(2030, 11, 1)}
        mode='single'
        startMonth={new Date(2020, 0, 1)}
      />,
    );

    expect(screen.getByLabelText(/choose the month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose the year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose the month/i)).toHaveClass(
      'absolute',
      'calendar-month-dropdown',
      'opacity-0',
    );
    expect(
      screen.getByLabelText(/choose the month/i).parentElement,
    ).toHaveClass(
      'group',
      'rounded',
      'border',
      'bg-white',
      'has-[.calendar-month-dropdown]:w-[120px]',
    );
    expect(
      screen
        .getByLabelText(/choose the month/i)
        .parentElement?.querySelector('[aria-hidden="true"]'),
    ).toHaveClass(
      'text-sm',
      'font-semibold',
      'group-has-[.calendar-month-dropdown]:justify-between',
      'group-has-[.calendar-month-dropdown]:[&>svg]:size-4',
    );
    expect(
      screen.getByLabelText(/choose the month/i).parentElement,
    ).not.toHaveClass('focus-within:ring-2');
    expect(screen.getByLabelText(/choose the year/i).parentElement).toHaveClass(
      'has-[.calendar-year-dropdown]:w-[80px]',
    );
    expect(
      screen
        .getByLabelText(/choose the year/i)
        .parentElement?.querySelector('[aria-hidden="true"]'),
    ).toHaveClass(
      'text-sm',
      'font-semibold',
      'group-has-[.calendar-year-dropdown]:justify-between',
      'group-has-[.calendar-year-dropdown]:[&>svg]:size-4',
    );
    expect(screen.getByLabelText(/choose the year/i)).toHaveValue('2026');
  });
});
