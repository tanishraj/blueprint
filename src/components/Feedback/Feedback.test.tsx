import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Feedback } from './Feedback';

describe('Feedback Component', () => {
  it('renders five feedback radios by default', () => {
    render(<Feedback />);

    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-label',
      '1 of 5, Very dissatisfied',
    );
  });

  it('supports controlled value', () => {
    render(<Feedback value={4} />);

    expect(
      screen.getByRole('radio', { name: '4 of 5, Satisfied' }),
    ).toBeChecked();
  });

  it('supports uncontrolled value changes', () => {
    render(<Feedback defaultValue={2} />);

    fireEvent.click(screen.getByRole('radio', { name: '5 of 5, Love it' }));

    expect(
      screen.getByRole('radio', { name: '5 of 5, Love it' }),
    ).toBeChecked();
  });

  it('calls onValueChange when an option is selected', () => {
    const handleValueChange = vi.fn();

    render(<Feedback onValueChange={handleValueChange} />);
    fireEvent.click(screen.getByRole('radio', { name: '3 of 5, Neutral' }));

    expect(handleValueChange).toHaveBeenCalledWith(3);
  });

  it('supports keyboard navigation', () => {
    const handleValueChange = vi.fn();

    render(<Feedback onValueChange={handleValueChange} value={2} />);
    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowRight' });

    expect(handleValueChange).toHaveBeenCalledWith(3);
  });

  it('does not change when read only', () => {
    const handleValueChange = vi.fn();

    render(<Feedback onValueChange={handleValueChange} readOnly value={2} />);
    fireEvent.click(screen.getByRole('radio', { name: '5 of 5, Love it' }));

    expect(handleValueChange).not.toHaveBeenCalled();
  });

  it('disables radios when disabled', () => {
    render(<Feedback disabled value={3} />);

    screen.getAllByRole('radio').forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  it('renders emoji variant with a selected tile', () => {
    render(<Feedback value={1} variant='emoji' />);

    expect(
      screen.getByRole('radio', { name: '1 of 5, Very dissatisfied' }),
    ).toBeChecked();
    expect(screen.getByText('😭')).toBeInTheDocument();
  });

  it('supports custom options', () => {
    render(
      <Feedback
        options={[
          { value: 10, label: 'Bad', emoji: '🙁' },
          { value: 20, label: 'Good', emoji: '🙂' },
        ]}
        value={20}
        variant='emoji'
      />,
    );

    expect(screen.getAllByRole('radio')).toHaveLength(2);
    expect(screen.getByRole('radio', { name: '2 of 2, Good' })).toBeChecked();
  });
});
