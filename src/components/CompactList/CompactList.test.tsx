import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CompactList } from './CompactList';

describe('CompactList', () => {
  it('renders visible items and exposes hidden items in the popover', () => {
    render(
      <CompactList items={['Apple', 'Banana', 'Cherry']} maxVisible={1} />,
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /2 more items/i });

    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('dialog', { name: /additional items/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });
});
