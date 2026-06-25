import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SelectWithApply } from './SelectWithApply';

const options = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

describe('SelectWithApply', () => {
  it('commits a pending selection only after clicking apply', () => {
    const handleChange = vi.fn();

    render(
      <SelectWithApply
        label='Status'
        onChange={handleChange}
        options={options}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText('Status'), {
      code: 'ArrowDown',
      key: 'ArrowDown',
    });
    fireEvent.click(screen.getByText('Active'));

    expect(handleChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(handleChange).toHaveBeenCalled();
  });
});
