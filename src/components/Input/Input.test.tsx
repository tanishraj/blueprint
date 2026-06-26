import { Mail, Plus } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from './Input';

describe('Input Component', () => {
  it('renders label, required marker, input, and caption', () => {
    render(
      <Input
        caption='There will be a caption text here'
        label='Label'
        placeholder='Placeholder'
        required
      />,
    );

    const input = screen.getByLabelText(/label/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Placeholder');
    expect(input).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(
      screen.getByText(/there will be a caption text here/i),
    ).toBeInTheDocument();
  });

  it('merges helper text with a custom aria-describedby value', () => {
    render(
      <>
        <span id='external-description'>External help</span>
        <Input
          aria-describedby='external-description'
          caption='Caption text'
          label='Label'
        />
      </>,
    );

    const input = screen.getByLabelText(/label/i);
    const describedBy = input.getAttribute('aria-describedby');
    const caption = screen.getByText('Caption text');

    expect(describedBy).toContain('external-description');
    expect(describedBy).toContain(caption.getAttribute('id'));
  });

  it('renders leading and trailing icons', () => {
    render(<Input aria-label='Email' leadingIcon={Plus} trailingIcon={Mail} />);

    const input = screen.getByRole('textbox', { name: /email/i });

    expect(input).toBeInTheDocument();
    expect(input.parentElement?.querySelectorAll('svg')).toHaveLength(2);
  });

  it('uses error text as the helper text and marks the input invalid', () => {
    render(
      <Input error='Something went wrong' label='Email' variant='primary' />,
    );

    const input = screen.getByLabelText(/email/i);
    const field = input.parentElement;

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveClass('border-danger');
    expect(field).toHaveClass('focus-within:ring-[var(--danger-100)]');
    expect(screen.getByText(/something went wrong/i)).toHaveClass(
      'text-danger',
    );
  });

  it('supports uncontrolled clearable input', () => {
    const handleClear = vi.fn();

    render(
      <Input
        aria-label='Search'
        clearable
        defaultValue='Query'
        onClear={handleClear}
      />,
    );

    const input = screen.getByRole('textbox', { name: /search/i });

    expect(input).toHaveValue('Query');
    fireEvent.click(screen.getByRole('button', { name: /clear input/i }));

    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('calls onChange and shows clear action when typing into an uncontrolled input', () => {
    const handleChange = vi.fn();

    render(<Input aria-label='Search' clearable onChange={handleChange} />);

    const input = screen.getByRole('textbox', { name: /search/i });

    expect(screen.queryByRole('button', { name: /clear input/i })).toBeNull();
    fireEvent.change(input, { target: { value: 'abc' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole('button', { name: /clear input/i }),
    ).toBeInTheDocument();
  });

  it('does not render clear button when disabled', () => {
    render(<Input aria-label='Search' clearable disabled value='Query' />);

    expect(screen.getByRole('textbox', { name: /search/i })).toBeDisabled();
    expect(screen.queryByRole('button', { name: /clear input/i })).toBeNull();
  });
});
