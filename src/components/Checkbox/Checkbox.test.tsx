import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('renders a labelled checkbox', () => {
    render(<Checkbox label='Accept terms' />);

    expect(
      screen.getByRole('checkbox', { name: /accept terms/i }),
    ).toBeInTheDocument();
  });

  it('supports checked state', () => {
    render(<Checkbox label='Receive updates' defaultChecked />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when toggled', () => {
    const handleChange = vi.fn();

    render(<Checkbox label='Notify me' onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /notify me/i }));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('supports disabled state', () => {
    render(<Checkbox label='Disabled checkbox' disabled />);

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('uses square shape by default', () => {
    render(<Checkbox label='Square checkbox' />);

    expect(screen.getByRole('checkbox').nextElementSibling).toHaveClass(
      'rounded',
    );
  });

  it('supports circle shape', () => {
    render(<Checkbox label='Circle checkbox' shape='circle' />);

    expect(screen.getByRole('checkbox').nextElementSibling).toHaveClass(
      'rounded-full',
    );
  });

  it('sets the native indeterminate property', () => {
    render(<Checkbox label='Mixed selection' indeterminate />);

    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true);
  });

  it('marks the input invalid when error text is provided', () => {
    render(<Checkbox label='Required field' error='This field is required' />);

    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders required marker outside the accessible label', () => {
    render(<Checkbox label='Checkbox' required />);

    expect(
      screen.getByRole('checkbox', { name: /^checkbox$/i }),
    ).toBeInTheDocument();
  });
});
