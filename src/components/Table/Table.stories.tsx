import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table, TableCell, TableRow } from './Table';
import type { TableColumn, TableProps } from './types';

interface InvoiceRow {
  amount: string;
  id: string;
  method: string;
  status: string;
}

interface CountryRow {
  code: string;
  name: string;
  population: string;
}

const invoices: InvoiceRow[] = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  {
    id: 'INV003',
    status: 'Unpaid',
    method: 'Bank Transfer',
    amount: '$350.00',
  },
  { id: 'INV004', status: 'Paid', method: 'Wire', amount: '$450.00' },
  { id: 'INV005', status: 'Draft', method: 'ACH', amount: '$550.00' },
];

const countries: CountryRow[] = Array.from({ length: 14 }, (_, index) => ({
  code: ['IN', 'CN', 'IT', 'US', 'CA', 'AU', 'DE'][index % 7],
  name: [
    'India',
    'China',
    'Italy',
    'United States',
    'Canada',
    'Australia',
    'Germany',
  ][index % 7],
  population: [
    '1,324,171,354',
    '1,403,500,365',
    '60,483,973',
    '327,167,434',
    '37,602,103',
    '25,475,400',
    '83,019,200',
  ][index % 7],
}));

const invoiceColumns: TableColumn<InvoiceRow>[] = [
  { accessorKey: 'id', header: 'Invoice', className: 'font-medium' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'method', header: 'Method' },
  { accessorKey: 'amount', header: 'Amount', align: 'right' },
];

const countryColumns: TableColumn<CountryRow>[] = [
  { accessorKey: 'name', header: 'Name', className: 'font-medium' },
  { accessorKey: 'code', header: 'ISO Code' },
  { accessorKey: 'population', header: 'Population', align: 'right' },
];

const meta: Meta<TableProps<InvoiceRow>> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component: `
Simple data-driven HTML table. Pass \`columns\` and \`data\`, and the component renders the header, body, empty state, and optional footer automatically.
        `,
      },
    },
  },
  args: {
    caption: 'A list of recent invoices.',
    columns: invoiceColumns,
    data: invoices,
    size: 'md',
    striped: false,
    interactive: false,
    stickyHeader: false,
    showColumnBorder: false,
    rowKey: 'id',
  },
  argTypes: {
    caption: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    captionSide: {
      control: 'radio',
      options: ['top', 'bottom'],
      table: {
        category: 'Content',
      },
    },
    columns: {
      control: false,
      table: {
        category: 'Content',
      },
    },
    data: {
      control: false,
      table: {
        category: 'Content',
      },
    },
    emptyMessage: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    footer: {
      control: false,
      table: {
        category: 'Content',
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
      },
    },
    striped: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    interactive: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    stickyHeader: {
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    showColumnBorder: {
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    rowKey: {
      control: false,
      table: {
        category: 'Behavior',
      },
    },
    className: {
      control: false,
      table: {
        category: 'Layout',
      },
    },
    containerClassName: {
      control: false,
      table: {
        category: 'Layout',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TableProps<InvoiceRow>>;

export const Playground: Story = {};

export const WithFooter: Story = {
  args: {
    footer: (
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell align='right'>$750.00</TableCell>
      </TableRow>
    ),
    showColumnBorder: true,
  },
};

export const StripedInteractive: Story = {
  args: {
    interactive: true,
    striped: true,
  },
};

export const StickyHeader: StoryObj<TableProps<CountryRow>> = {
  args: {
    caption: 'Sticky headers for scrollable data.',
    captionSide: 'top',
    columns: countryColumns,
    containerClassName: 'max-h-80 overflow-auto',
    data: countries,
    rowKey: row => `${row.code}-${row.population}`,
    stickyHeader: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    emptyMessage: 'No invoices found.',
  },
};
