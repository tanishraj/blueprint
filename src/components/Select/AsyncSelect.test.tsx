import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AsyncSelect } from './AsyncSelect';
import type { SelectOption } from './types';

const options: SelectOption[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'In review', value: 'in-review' },
  { label: 'Published', value: 'published' },
];

const loadOptions = async () => options;

describe('AsyncSelect', () => {
  it('hides the rendered selected value while the menu is open', async () => {
    render(
      <AsyncSelect
        defaultValue={options[1]}
        defaultOptions={options}
        label='Async status'
        loadOptions={loadOptions}
        options={options}
      />,
    );

    expect(screen.getAllByText('In review')).toHaveLength(1);

    fireEvent.focus(screen.getByLabelText('Async status'));
    fireEvent.keyDown(screen.getByLabelText('Async status'), {
      code: 'ArrowDown',
      key: 'ArrowDown',
    });

    expect(screen.getAllByText('In review')).toHaveLength(1);
  });

  it('renders the selected option immediately after choosing it', () => {
    render(
      <AsyncSelect
        defaultOptions={options}
        label='Async status'
        loadOptions={loadOptions}
        options={options}
      />,
    );

    const input = screen.getByLabelText('Async status');

    fireEvent.focus(input);
    fireEvent.keyDown(input, {
      code: 'ArrowDown',
      key: 'ArrowDown',
    });
    fireEvent.click(screen.getByText('Published'));

    expect(screen.getByText('Published')).toBeInTheDocument();
  });
});
