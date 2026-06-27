import { User } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { ListBox } from './ListBox';
import { ListItem } from './ListItem';

const items = [
  { label: 'Item One', value: 'one', leadingIcon: User },
  { label: 'Item Two', value: 'two' },
  { label: 'Disabled Item', value: 'disabled', disabled: true },
];

describe('ListBox Component', () => {
  it('renders listbox items with option semantics', () => {
    render(<ListBox items={items} selectedValue='two' />);

    expect(screen.getByRole('listbox')).toHaveClass(
      'bg-default',
      'border-default',
      'text-default',
    );
    expect(screen.getByRole('listbox')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
    expect(
      screen.getByRole('option', { name: /item one/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /item two/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('calls onItemSelect when enabled items are clicked', () => {
    const handleItemSelect = vi.fn();

    render(<ListBox items={items} onItemSelect={handleItemSelect} />);

    fireEvent.click(screen.getByRole('option', { name: /item one/i }));

    expect(handleItemSelect).toHaveBeenCalledWith(items[0]);
  });

  it('does not select disabled items', () => {
    const handleItemSelect = vi.fn();

    render(<ListBox items={items} onItemSelect={handleItemSelect} />);

    fireEvent.click(screen.getByRole('option', { name: /disabled item/i }));

    expect(handleItemSelect).not.toHaveBeenCalled();
  });

  it('defaults generated items to menuitem semantics when role is menu', () => {
    render(<ListBox items={items.slice(0, 2)} role='menu' />);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: /item one/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: /item two/i }),
    ).not.toHaveAttribute('aria-selected');
  });

  it('renders the leading slot before generated items', () => {
    render(
      <ListBox
        items={items.slice(0, 1)}
        leadingSlot={<span data-testid='listbox-leading-slot'>Arrow</span>}
      />,
    );

    const listbox = screen.getByRole('listbox');

    expect(listbox.firstChild).toBe(screen.getByTestId('listbox-leading-slot'));
  });

  it('supports direct ListItem usage', () => {
    const handleSelect = vi.fn();

    render(<ListItem item={items[0]} onSelect={handleSelect} selected />);

    fireEvent.click(screen.getByRole('option', { name: /item one/i }));

    expect(handleSelect).toHaveBeenCalledWith(items[0]);
    expect(screen.getByRole('option', { name: /item one/i })).toHaveClass(
      'font-medium',
    );
  });
});
