import { Plus, User } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Dropdown } from './Dropdown';
import { DropdownList } from './DropdownList';

const items = [
  { label: 'Profile', value: 'profile', leadingIcon: User },
  { label: 'Settings', value: 'settings' },
  { label: 'Disabled action', value: 'disabled', disabled: true },
];

const renderOpenStateTrigger = (open: boolean) => (
  <button type='button'>{open ? 'Open menu' : 'Closed menu'}</button>
);

const renderCloseMenuContent = (closeMenu: () => void) => (
  <button onClick={closeMenu} type='button'>
    Close menu
  </button>
);

describe('Dropdown Component', () => {
  it('renders a trigger with menu semantics', () => {
    render(<Dropdown items={items}>Actions</Dropdown>);

    const dropdown = screen.getByRole('button', { name: /actions/i });

    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveAttribute('aria-haspopup', 'menu');
    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens a popover menu list on click', () => {
    render(<Dropdown items={items}>Actions</Dropdown>);

    fireEvent.click(screen.getByRole('button', { name: /actions/i }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: /profile/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /actions/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('supports a custom trigger render function', () => {
    render(<Dropdown items={items} trigger={renderOpenStateTrigger} />);

    fireEvent.click(screen.getByRole('button', { name: /closed menu/i }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('supports custom menu content with a close callback', () => {
    render(<Dropdown menuContent={renderCloseMenuContent}>Actions</Dropdown>);

    fireEvent.click(screen.getByRole('button', { name: /actions/i }));
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('calls onItemSelect and closes by default when an item is selected', () => {
    const handleItemSelect = vi.fn();

    render(
      <Dropdown items={items} onItemSelect={handleItemSelect}>
        Actions
      </Dropdown>,
    );

    fireEvent.click(screen.getByRole('button', { name: /actions/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: /settings/i }));

    expect(handleItemSelect).toHaveBeenCalledWith(items[1]);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('can keep the menu open after selecting an item', () => {
    render(
      <Dropdown closeOnSelect={false} items={items}>
        Actions
      </Dropdown>,
    );

    fireEvent.click(screen.getByRole('button', { name: /actions/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: /settings/i }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('does not select disabled items', () => {
    const handleItemSelect = vi.fn();

    render(
      <Dropdown items={items} onItemSelect={handleItemSelect}>
        Actions
      </Dropdown>,
    );

    fireEvent.click(screen.getByRole('button', { name: /actions/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: /disabled action/i }));

    expect(handleItemSelect).not.toHaveBeenCalled();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('applies selected item styles', () => {
    render(
      <Dropdown defaultOpen items={items} selectedValue='settings'>
        Actions
      </Dropdown>,
    );

    expect(screen.getByRole('menuitem', { name: /settings/i })).toHaveClass(
      'font-medium',
    );
  });

  it('renders icon only dropdowns with an accessible label', () => {
    render(
      <Dropdown aria-label='Create item' icon={Plus} iconOnly items={items} />,
    );

    const dropdown = screen.getByRole('button', { name: /create item/i });

    expect(dropdown).toBeInTheDocument();
    expect(dropdown.querySelectorAll('svg')).toHaveLength(1);
  });

  it('does not open while loading or disabled', () => {
    render(
      <>
        <Dropdown items={items} loading>
          Loading
        </Dropdown>
        <Dropdown disabled items={items}>
          Disabled
        </Dropdown>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: /loading/i }));
    fireEvent.click(screen.getByRole('button', { name: /disabled/i }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders DropdownList items and closes after selecting an item', () => {
    const handleItemSelect = vi.fn();
    const closeMenu = vi.fn();

    render(
      <DropdownList
        closeMenu={closeMenu}
        items={items}
        onItemSelect={handleItemSelect}
        selectedValue='settings'
      />,
    );

    fireEvent.click(screen.getByRole('menuitem', { name: /profile/i }));

    expect(handleItemSelect).toHaveBeenCalledWith(items[0]);
    expect(closeMenu).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('menuitem', { name: /settings/i })).toHaveClass(
      'font-medium',
    );
  });

  it('allows DropdownList to keep the menu open after selection', () => {
    const closeMenu = vi.fn();

    render(
      <DropdownList
        closeMenu={closeMenu}
        closeOnSelect={false}
        items={items}
      />,
    );

    fireEvent.click(screen.getByRole('menuitem', { name: /profile/i }));

    expect(closeMenu).not.toHaveBeenCalled();
  });
});
