import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Table, TableCell, TableRow } from './Table';
import type { TableColumn } from './types';

interface InvoiceRow {
  amount: string;
  id: string;
}

const columns: TableColumn<InvoiceRow>[] = [
  { accessorKey: 'id', header: 'Invoice', className: 'font-medium' },
  { accessorKey: 'amount', header: 'Amount', align: 'right' },
];

const rows: InvoiceRow[] = [{ id: 'INV001', amount: '$250.00' }];

describe('Table', () => {
  it('renders a semantic table from columns and data', () => {
    render(
      <Table
        caption='Invoice summary'
        columns={columns}
        data={rows}
        rowKey='id'
      />,
    );

    expect(screen.getByText('Invoice summary')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Invoice' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '$250.00' })).toBeInTheDocument();
  });

  it('applies sticky header and striped body variants', () => {
    render(
      <Table columns={columns} data={rows} rowKey='id' stickyHeader striped />,
    );

    expect(screen.getAllByRole('columnheader')[0]).toHaveClass('sticky');
    expect(screen.getAllByRole('columnheader')[0]).toHaveClass(
      'bg-default-hovered',
      'border-default',
      'text-caption',
    );
    expect(screen.getAllByRole('rowgroup')[1]).toHaveClass(
      '[&_tr:nth-child(odd)]:bg-default-hovered',
    );
  });

  it('supports aligned cells and footer summaries', () => {
    render(
      <Table
        columns={columns}
        data={rows}
        footer={
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align='right'>$100.00</TableCell>
          </TableRow>
        }
        rowKey='id'
        showColumnBorder
      />,
    );

    expect(screen.getAllByRole('cell', { name: '$250.00' })[0]).toHaveClass(
      'text-right',
    );
    expect(screen.getByText('Total').closest('td')).toHaveClass('border-r');
    expect(screen.getByRole('table').parentElement).toHaveClass('border');
    expect(screen.getByRole('table').parentElement).toHaveClass(
      'border-default',
      'bg-default',
    );
    expect(screen.getByText('Total').closest('tfoot')).toHaveClass(
      'bg-default-hovered',
      'text-default',
    );
  });

  it('renders the empty state when no rows are provided', () => {
    render(
      <Table columns={columns} data={[]} emptyMessage='No invoices found.' />,
    );

    expect(screen.getByText('No invoices found.')).toBeInTheDocument();
  });

  it('renders falsy caption content and accessor values', () => {
    render(
      <Table
        caption={0}
        columns={[
          { accessorKey: 'id', header: 'Invoice' },
          { accessorKey: 'amount', header: 'Amount' },
        ]}
        data={[{ id: 'INV001', amount: 0 as unknown as string }]}
      />,
    );

    expect(screen.getAllByText('0')).toHaveLength(2);
    expect(screen.getByRole('cell', { name: '0' })).toBeInTheDocument();
  });
});
