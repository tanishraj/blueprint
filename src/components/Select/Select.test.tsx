import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './Select';
import type { SelectOption } from './types';

const options: SelectOption[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

describe('Select', () => {
  it('renders label and helper text', () => {
    render(
      <Select
        caption='Choose a status'
        label='Status'
        options={options}
        placeholder='Select status'
      />,
    );

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Choose a status')).toBeInTheDocument();
  });

  it('shows the error text instead of caption when invalid', () => {
    render(
      <Select
        caption='This caption should be replaced'
        error='Selection required'
        label='Status'
        options={options}
      />,
    );

    expect(screen.getByText('Selection required')).toBeInTheDocument();
    expect(
      screen.queryByText('This caption should be replaced'),
    ).not.toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = vi.fn();

    render(<Select label='Status' onChange={handleChange} options={options} />);

    fireEvent.keyDown(screen.getByLabelText('Status'), {
      code: 'ArrowDown',
      key: 'ArrowDown',
    });
    fireEvent.click(screen.getByText('Approved'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('renders selected multi values using chips', () => {
    render(
      <Select
        defaultValue={[options[0], options[1]]}
        isMulti
        label='Status'
        options={options}
      />,
    );

    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /remove/i })).toHaveLength(2);
  });

  it('shows disabled options when the menu is open', () => {
    render(
      <Select
        label='Status'
        options={[
          ...options,
          { label: 'Archived', value: 'archived', disabled: true },
        ]}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText('Status'), {
      code: 'ArrowDown',
      key: 'ArrowDown',
    });

    expect(screen.getByText('Archived')).toBeInTheDocument();
  });

  it('renders helper text with a generated caption id', () => {
    render(
      <Select caption='Choose a status' label='Status' options={options} />,
    );

    expect(screen.getByText('Choose a status')).toHaveAttribute(
      'id',
      expect.stringContaining('-caption'),
    );
  });

  it('renders falsy label and helper text content', () => {
    render(<Select caption={0} label={0} options={options} />);

    expect(screen.getByLabelText('0')).toBeInTheDocument();
    expect(screen.getAllByText('0')).toHaveLength(2);
  });
});
