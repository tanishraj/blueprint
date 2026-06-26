import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Accordion } from './Accordion';

const items = [
  {
    value: 'account',
    title: 'Account settings',
    content: 'Account content',
  },
  {
    value: 'billing',
    title: 'Billing and invoices',
    content: 'Billing content',
  },
  {
    value: 'disabled',
    title: 'Disabled section',
    content: 'Disabled content',
    disabled: true,
  },
];

describe('Accordion Component', () => {
  it('renders all accordion headers', () => {
    render(<Accordion items={items} />);

    expect(
      screen.getByRole('button', { name: /account settings/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /billing and invoices/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /disabled section/i }),
    ).toBeInTheDocument();
  });

  it('opens and closes a single item by default', () => {
    render(<Accordion items={items} />);

    const accountTrigger = screen.getByRole('button', {
      name: /account settings/i,
    });

    fireEvent.click(accountTrigger);
    expect(screen.getByText('Account content')).toBeInTheDocument();
    expect(accountTrigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(accountTrigger);
    expect(screen.queryByText('Account content')).not.toBeInTheDocument();
    expect(accountTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps only one section open in single mode', () => {
    render(<Accordion items={items} defaultValue='account' type='single' />);

    fireEvent.click(
      screen.getByRole('button', { name: /billing and invoices/i }),
    );

    expect(screen.queryByText('Account content')).not.toBeInTheDocument();
    expect(screen.getByText('Billing content')).toBeInTheDocument();
  });

  it('supports multiple open sections', () => {
    render(<Accordion items={items} type='multiple' />);

    fireEvent.click(screen.getByRole('button', { name: /account settings/i }));
    fireEvent.click(
      screen.getByRole('button', { name: /billing and invoices/i }),
    );

    expect(screen.getByText('Account content')).toBeInTheDocument();
    expect(screen.getByText('Billing content')).toBeInTheDocument();
  });

  it('does not toggle disabled items', () => {
    render(<Accordion items={items} />);

    fireEvent.click(screen.getByRole('button', { name: /disabled section/i }));

    expect(screen.queryByText('Disabled content')).not.toBeInTheDocument();
  });

  it('calls onValueChange with the next value', () => {
    const onValueChange = vi.fn();

    render(<Accordion items={items} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('button', { name: /account settings/i }));

    expect(onValueChange).toHaveBeenCalledWith('account');
  });

  it('keeps a single panel open when controlled value is passed as an array in single mode', () => {
    render(
      <Accordion items={items} type='single' value={['account', 'billing']} />,
    );

    expect(screen.getByText('Account content')).toBeInTheDocument();
    expect(screen.queryByText('Billing content')).not.toBeInTheDocument();
  });

  it('does not close the active item in single mode when collapsible is false', () => {
    render(
      <Accordion
        items={items}
        type='single'
        collapsible={false}
        defaultValue='account'
      />,
    );

    const accountTrigger = screen.getByRole('button', {
      name: /account settings/i,
    });

    fireEvent.click(accountTrigger);

    expect(screen.getByText('Account content')).toBeInTheDocument();
    expect(accountTrigger).toHaveAttribute('aria-expanded', 'true');
  });
});
