import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Rating } from './Rating';

describe('Rating Component', () => {
  it('renders five rating radios by default', () => {
    render(<Rating />);

    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getByRole('radio', { name: '1 out of 5' })).not.toBeChecked();
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-label',
      '0 out of 5',
    );
  });

  it('supports controlled value', () => {
    const { container } = render(<Rating value={3} />);

    expect(screen.getByRole('radio', { name: '3 out of 5' })).toBeChecked();
    expect(container.querySelector('[data-rating-icon="filled"]')).toHaveClass(
      'size-full',
    );
    expect(
      container.querySelector('[data-rating-icon="filled"] path'),
    ).toHaveAttribute('fill', 'var(--text-color-primary)');
    expect(
      container.querySelector('[data-rating-icon="filled"] path'),
    ).toHaveAttribute('stroke', 'var(--text-color-primary)');
    expect(
      container.querySelector('[data-rating-icon="filled"] path'),
    ).toHaveAttribute('stroke-width', '1.75');
  });

  it('uses the figma outline shape for empty stars', () => {
    const { container } = render(<Rating value={0} />);

    expect(
      container.querySelector('[data-rating-icon="empty"] path'),
    ).toHaveAttribute('fill', 'none');
    expect(
      container.querySelector('[data-rating-icon="empty"] path'),
    ).toHaveAttribute('stroke', 'var(--neutral-500)');
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-label',
      '0 out of 5',
    );
  });

  it('supports uncontrolled value changes', () => {
    render(<Rating defaultValue={1} />);

    fireEvent.click(screen.getByRole('radio', { name: '4 out of 5' }));

    expect(screen.getByRole('radio', { name: '4 out of 5' })).toBeChecked();
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-label',
      '4 out of 5',
    );
  });

  it('calls onValueChange when a star is selected', () => {
    const handleValueChange = vi.fn();

    render(<Rating onValueChange={handleValueChange} />);
    fireEvent.click(screen.getByRole('radio', { name: '2 out of 5' }));

    expect(handleValueChange).toHaveBeenCalledWith(2);
  });

  it('supports keyboard increments', () => {
    const handleValueChange = vi.fn();

    render(<Rating onValueChange={handleValueChange} value={2} />);
    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowRight' });

    expect(handleValueChange).toHaveBeenCalledWith(3);
  });

  it('supports half precision values', () => {
    render(<Rating precision={0.5} value={2.5} />);

    expect(screen.getAllByRole('radio')).toHaveLength(10);
    expect(screen.getByRole('radio', { name: '2.5 out of 5' })).toBeChecked();
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-label',
      '2.5 out of 5',
    );
  });

  it('calls onValueChange with half precision values', () => {
    const handleValueChange = vi.fn();

    render(<Rating onValueChange={handleValueChange} precision={0.5} />);
    fireEvent.click(screen.getByRole('radio', { name: '2.5 out of 5' }));

    expect(handleValueChange).toHaveBeenCalledWith(2.5);
  });

  it('does not change when read only', () => {
    const handleValueChange = vi.fn();

    render(<Rating onValueChange={handleValueChange} readOnly value={2} />);
    fireEvent.click(screen.getByRole('radio', { name: '4 out of 5' }));

    expect(handleValueChange).not.toHaveBeenCalled();
  });

  it('disables star buttons when disabled', () => {
    render(<Rating disabled value={2} />);

    screen.getAllByRole('radio').forEach(star => {
      expect(star).toBeDisabled();
    });
  });

  it('supports custom max values', () => {
    render(<Rating max={3} value={2} />);

    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-label',
      '2 out of 3',
    );
  });

  it('supports xs size', () => {
    const { container } = render(<Rating size='xs' value={1} />);

    expect(container.querySelector('[data-rating-icon="filled"]')).toHaveClass(
      'size-full',
    );
  });

  it('uses md size by default', () => {
    const { container } = render(<Rating value={1} />);

    expect(container.querySelector('[data-rating-icon="filled"]')).toHaveClass(
      'size-full',
    );
    expect(
      container.querySelector('[data-rating-icon="filled"]')?.parentElement,
    ).toHaveClass('size-7');
  });
});
