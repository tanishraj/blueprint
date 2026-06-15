import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { CheckboxGroup } from './CheckboxGroup';

const options = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
];

describe('CheckboxGroup Component', () => {
  it('renders a labelled checkbox group', () => {
    render(<CheckboxGroup label='Teams' options={options} />);

    expect(screen.getByRole('group', { name: /teams/i })).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  it('supports uncontrolled default values', () => {
    render(<CheckboxGroup options={options} defaultValue={['design']} />);

    expect(screen.getByRole('checkbox', { name: /design/i })).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: /engineering/i }),
    ).not.toBeChecked();
  });

  it('calls onValueChange with the next selected values', () => {
    const handleValueChange = vi.fn();

    render(
      <CheckboxGroup options={options} onValueChange={handleValueChange} />,
    );
    fireEvent.click(screen.getByRole('checkbox', { name: /engineering/i }));

    expect(handleValueChange).toHaveBeenCalledWith(['engineering']);
  });

  it('supports controlled selected values', () => {
    render(<CheckboxGroup options={options} value={['product']} />);

    expect(screen.getByRole('checkbox', { name: /product/i })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /design/i })).not.toBeChecked();
  });

  it('passes a shared name to each checkbox', () => {
    render(<CheckboxGroup options={options} name='teams' />);

    screen
      .getAllByRole('checkbox')
      .forEach(checkbox => expect(checkbox).toHaveAttribute('name', 'teams'));
  });

  it('supports horizontal orientation', () => {
    render(<CheckboxGroup options={options} orientation='horizontal' />);

    expect(screen.getByRole('group').querySelector('.flex-row')).toBeTruthy();
  });

  it('marks the group invalid when error text is provided', () => {
    render(
      <CheckboxGroup
        label='Teams'
        options={options}
        error='Choose at least one team'
      />,
    );

    expect(screen.getByText('Choose at least one team')).toHaveClass(
      'text-danger',
    );
    screen
      .getAllByRole('checkbox')
      .forEach(checkbox =>
        expect(checkbox).toHaveAttribute('aria-invalid', 'true'),
      );
  });

  it('disables all options when the group is disabled', () => {
    render(<CheckboxGroup options={options} disabled />);

    screen
      .getAllByRole('checkbox')
      .forEach(checkbox => expect(checkbox).toBeDisabled());
  });
});
