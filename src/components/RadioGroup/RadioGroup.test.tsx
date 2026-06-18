import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { RadioGroup } from './RadioGroup';

const options = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
];

describe('RadioGroup Component', () => {
  it('renders a labelled radio group', () => {
    render(<RadioGroup label='Teams' options={options} />);

    expect(screen.getByRole('group', { name: /teams/i })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('supports uncontrolled default value', () => {
    render(<RadioGroup defaultValue='design' options={options} />);

    expect(screen.getByRole('radio', { name: /design/i })).toBeChecked();
    expect(
      screen.getByRole('radio', { name: /engineering/i }),
    ).not.toBeChecked();
  });

  it('calls onValueChange with the selected value', () => {
    const handleValueChange = vi.fn();

    render(<RadioGroup options={options} onValueChange={handleValueChange} />);
    fireEvent.click(screen.getByRole('radio', { name: /engineering/i }));

    expect(handleValueChange).toHaveBeenCalledWith('engineering');
  });

  it('supports controlled selected value', () => {
    render(<RadioGroup options={options} value='product' />);

    expect(screen.getByRole('radio', { name: /product/i })).toBeChecked();
    expect(screen.getByRole('radio', { name: /design/i })).not.toBeChecked();
  });

  it('passes a shared name to each radio', () => {
    render(<RadioGroup name='teams' options={options} />);

    screen
      .getAllByRole('radio')
      .forEach(radio => expect(radio).toHaveAttribute('name', 'teams'));
  });

  it('generates a shared name when one is not provided', () => {
    render(<RadioGroup options={options} />);

    const names = screen
      .getAllByRole('radio')
      .map(radio => radio.getAttribute('name'));

    expect(new Set(names).size).toBe(1);
    expect(names[0]).toBeTruthy();
  });

  it('supports horizontal orientation', () => {
    render(<RadioGroup options={options} orientation='horizontal' />);

    expect(screen.getByRole('group').querySelector('.flex-row')).toBeTruthy();
  });

  it('marks the group invalid when error text is provided', () => {
    render(
      <RadioGroup error='Choose one team' label='Teams' options={options} />,
    );

    expect(screen.getByText('Choose one team')).toHaveClass('text-danger');
    screen.getAllByRole('radio').forEach(radio => {
      expect(radio.nextElementSibling).toHaveClass('border-danger');
    });
  });

  it('disables all options when the group is disabled', () => {
    render(<RadioGroup disabled options={options} />);

    screen.getAllByRole('radio').forEach(radio => expect(radio).toBeDisabled());
  });

  it('does not select disabled options', () => {
    const handleValueChange = vi.fn();

    render(
      <RadioGroup
        onValueChange={handleValueChange}
        options={[
          ...options.slice(0, 1),
          { label: 'Disabled', value: 'disabled', disabled: true },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('radio', { name: /disabled/i }));

    expect(handleValueChange).not.toHaveBeenCalled();
  });
});
