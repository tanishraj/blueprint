import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Radio } from './Radio';

describe('Radio Component', () => {
  it('renders a labelled radio', () => {
    render(<Radio label='Select option' />);

    expect(
      screen.getByRole('radio', { name: /select option/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Select option').closest('label')).toHaveClass(
      'items-center',
    );
  });

  it('supports checked state', () => {
    render(<Radio defaultChecked label='Selected option' />);

    const radio = screen.getByRole('radio');

    expect(radio).toBeChecked();
    expect(radio.nextElementSibling).toHaveClass('peer-checked:[&>span]:flex');
  });

  it('calls onChange when selected', () => {
    const handleChange = vi.fn();

    render(<Radio label='Notify me' onChange={handleChange} />);
    fireEvent.click(screen.getByRole('radio', { name: /notify me/i }));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('supports native grouped selection by name', () => {
    render(
      <>
        <Radio defaultChecked label='One' name='choices' value='one' />
        <Radio label='Two' name='choices' value='two' />
      </>,
    );

    const one = screen.getByRole('radio', { name: /one/i });
    const two = screen.getByRole('radio', { name: /two/i });

    expect(one).toBeChecked();
    fireEvent.click(two);

    expect(one).not.toBeChecked();
    expect(two).toBeChecked();
  });

  it('supports disabled state', () => {
    render(<Radio disabled label='Disabled radio' />);

    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('applies size styles to the control', () => {
    render(<Radio label='Large radio' size='lg' />);

    expect(screen.getByRole('radio').nextElementSibling).toHaveClass('size-5');
  });

  it('aligns the medium control with the label line', () => {
    render(<Radio label='Radio with error' error='This field is required' />);

    expect(screen.getByRole('radio').nextElementSibling).toHaveClass('mt-px');
  });

  it('marks the input invalid when error text is provided', () => {
    render(<Radio error='This field is required' label='Required field' />);

    const radio = screen.getByRole('radio');

    expect(radio.nextElementSibling).toHaveClass('border-danger');
    expect(radio).toHaveAttribute('aria-describedby');
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders required marker outside the accessible label', () => {
    render(<Radio label='Radio' required />);

    expect(screen.getByRole('radio', { name: /^radio$/i })).toBeInTheDocument();
  });

  it('merges external aria-describedby with generated helper text id', () => {
    render(
      <>
        <span id='hint-id'>Hint</span>
        <Radio
          aria-describedby='hint-id'
          description='Helpful copy'
          label='Radio'
        />
      </>,
    );

    expect(screen.getByRole('radio')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('hint-id'),
    );
    expect(screen.getByRole('radio')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('-description'),
    );
  });

  it('renders falsy content values', () => {
    render(<Radio description={0} label={0} />);

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getAllByText('0')).toHaveLength(2);
  });
});
