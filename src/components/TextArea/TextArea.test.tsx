import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { TextArea } from './TextArea';

describe('TextArea Component', () => {
  it('renders label, required marker, textarea, and caption', () => {
    render(
      <TextArea
        caption='There will be a caption text here'
        label='Label'
        placeholder='Placeholder'
        required
      />,
    );

    const textarea = screen.getByLabelText(/label/i);

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'Placeholder');
    expect(textarea).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(
      screen.getByText(/there will be a caption text here/i),
    ).toBeInTheDocument();
  });

  it('uses error text as helper text and marks the textarea invalid', () => {
    render(<TextArea error='Something went wrong' label='Description' />);

    const textarea = screen.getByLabelText(/description/i);
    const field = textarea.parentElement;

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveClass('border-danger');
    expect(field).toHaveClass('focus-within:ring-[var(--danger-100)]');
    expect(screen.getByText(/something went wrong/i)).toHaveClass(
      'text-danger',
    );
  });

  it('shows max length count when no caption or error is provided', () => {
    render(<TextArea defaultValue='' maxLength={500} />);

    expect(screen.getByText('0 of 500 characters')).toBeInTheDocument();
  });

  it('updates max length count for uncontrolled usage', () => {
    render(<TextArea aria-label='Notes' defaultValue='' maxLength={500} />);
    const textarea = screen.getByRole('textbox', { name: /notes/i });

    fireEvent.change(textarea, { target: { value: 'jane' } });

    expect(screen.getByText('4 of 500 characters')).toBeInTheDocument();
  });

  it('updates max length count for controlled usage', () => {
    const { rerender } = render(
      <TextArea aria-label='Notes' maxLength={500} readOnly value='abc' />,
    );

    expect(screen.getByText('3 of 500 characters')).toBeInTheDocument();

    rerender(
      <TextArea aria-label='Notes' maxLength={500} readOnly value='abcdef' />,
    );

    expect(screen.getByText('6 of 500 characters')).toBeInTheDocument();
  });

  it('hides the count when caption is provided', () => {
    render(
      <TextArea caption='This is a hint' defaultValue='abc' maxLength={500} />,
    );

    expect(screen.getByText('This is a hint')).toBeInTheDocument();
    expect(screen.queryByText('3 of 500 characters')).not.toBeInTheDocument();
  });

  it('calls onChange', () => {
    const handleChange = vi.fn();
    render(<TextArea aria-label='Notes' onChange={handleChange} />);
    const textarea = screen.getByRole('textbox', { name: /notes/i });

    fireEvent.change(textarea, { target: { value: 'jane' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('supports disabled state', () => {
    render(<TextArea disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('can render full width', () => {
    render(<TextArea aria-label='Notes' fullWidth />);

    expect(
      screen.getByRole('textbox').parentElement?.parentElement,
    ).toHaveClass('w-full');
  });
});
