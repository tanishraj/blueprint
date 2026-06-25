import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CheckboxSelect } from './CheckboxSelect';

const options = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
];

describe('CheckboxSelect', () => {
  it('keeps the menu open and allows selecting multiple options', () => {
    const handleChange = vi.fn();

    render(
      <CheckboxSelect
        isMulti
        label='Teams'
        onChange={handleChange}
        options={options}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText('Teams'), {
      code: 'ArrowDown',
      key: 'ArrowDown',
    });

    fireEvent.click(screen.getByText('Design'));
    fireEvent.click(screen.getByText('Engineering'));

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(screen.getAllByText('Design').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Engineering').length).toBeGreaterThan(0);
    expect(screen.getByText('Product')).toBeInTheDocument();
  });
});
