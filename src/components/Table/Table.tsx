import { forwardRef, type ComponentPropsWithRef, type Key } from 'react';

import { cn } from '@/utils';

import { TableContext, useTable } from './context';
import {
  tableBodyStyles,
  tableCaptionStyles,
  tableCellStyles,
  tableContainerStyles,
  tableFooterStyles,
  tableHeaderStyles,
  tableHeadStyles,
  tableRootStyles,
  tableRowStyles,
} from './Table.styles';
import type {
  TableCaptionProps,
  TableCellProps,
  TableColumn,
  TableHeadProps,
  TableProps,
  TableSectionProps,
} from './types';

const getColumnId = <RowData extends object>(
  column: TableColumn<RowData>,
  index: number,
) => {
  if (column.id) {
    return column.id;
  }

  if (typeof column.accessorKey === 'string') {
    return column.accessorKey;
  }

  return `column-${index}`;
};

const getRowKey = <RowData extends object>(
  row: RowData,
  rowIndex: number,
  rowKey?: keyof RowData | ((row: RowData, index: number) => Key),
) => {
  if (typeof rowKey === 'function') {
    return rowKey(row, rowIndex);
  }

  if (rowKey) {
    return row[rowKey] as Key;
  }

  return rowIndex;
};

const getCellValue = <RowData extends object>(
  row: RowData,
  column: TableColumn<RowData>,
  rowIndex: number,
) => {
  if (column.cell) {
    return column.cell(row, rowIndex);
  }

  if (column.accessorKey) {
    return row[column.accessorKey] as React.ReactNode;
  }

  return null;
};

const TableComponent = <RowData extends object = Record<string, unknown>>({
  caption,
  captionSide = 'bottom',
  className,
  columns,
  containerClassName,
  data,
  emptyMessage = 'No results.',
  footer,
  interactive = false,
  rowKey,
  showColumnBorder = false,
  size = 'md',
  stickyHeader = false,
  striped = false,
  ...props
}: TableProps<RowData>) => {
  const contextValue = {
    interactive,
    showColumnBorder,
    size,
    stickyHeader,
    striped,
  };

  return (
    <TableContext value={contextValue}>
      <div className={cn(tableContainerStyles(), containerClassName)}>
        <table {...props} className={cn(tableRootStyles({ size }), className)}>
          {caption ? (
            <TableCaption side={captionSide}>{caption}</TableCaption>
          ) : null}
          <TableHeader>
            <TableRow>
              {columns.map((column, columnIndex) => (
                <TableHead
                  key={getColumnId(column, columnIndex)}
                  align={column.align}
                  className={column.headerClassName}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={getRowKey(row, rowIndex, rowKey)}>
                  {columns.map((column, columnIndex) => (
                    <TableCell
                      key={getColumnId(column, columnIndex)}
                      align={column.align}
                      className={column.className}
                    >
                      {getCellValue(row, column, rowIndex)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>{emptyMessage}</TableCell>
              </TableRow>
            )}
          </TableBody>
          {footer ? <TableFooter>{footer}</TableFooter> : null}
        </table>
      </div>
    </TableContext>
  );
};

export const Table = TableComponent as <RowData extends object = Record<string, unknown>>(
  props: TableProps<RowData>,
) => React.JSX.Element;

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, side = 'bottom', ...props }, ref) => {
    const { size } = useTable();

    return (
      <caption
        {...props}
        ref={ref}
        className={cn(tableCaptionStyles({ side, size }), className)}
      />
    );
  },
);

TableCaption.displayName = 'TableCaption';

export const TableHeader = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ children, className, ...props }, ref) => (
    <thead
      {...props}
      ref={ref}
      className={cn(tableHeaderStyles(), className)}
    >
      {children}
    </thead>
  ),
);

TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ children, className, ...props }, ref) => {
    const { interactive, striped } = useTable();

    return (
      <tbody
        {...props}
        ref={ref}
        className={cn(tableBodyStyles({ interactive, striped }), className)}
      >
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = 'TableBody';

export const TableFooter = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ children, className, ...props }, ref) => (
    <tfoot
      {...props}
      ref={ref}
      className={cn(tableFooterStyles(), 'bg-gray-50/90 text-gray-700', className)}
    >
      {children}
    </tfoot>
  ),
);

TableFooter.displayName = 'TableFooter';

export const TableRow = forwardRef<
  HTMLTableRowElement,
  ComponentPropsWithRef<'tr'>
>(({ className, ...props }, ref) => (
  <tr {...props} ref={ref} className={cn(tableRowStyles(), className)} />
));

TableRow.displayName = 'TableRow';

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ align = 'left', className, ...props }, ref) => {
    const { showColumnBorder, size, stickyHeader } = useTable();

    return (
      <th
        {...props}
        ref={ref}
        className={cn(
          tableHeadStyles({
            align,
            showColumnBorder,
            size,
            stickyHeader,
          }),
          className,
        )}
      />
    );
  },
);

TableHead.displayName = 'TableHead';

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = 'left', className, ...props }, ref) => {
    const { showColumnBorder, size } = useTable();

    return (
      <td
        {...props}
        ref={ref}
        className={cn(
          tableCellStyles({ align, showColumnBorder, size }),
          className,
        )}
      />
    );
  },
);

TableCell.displayName = 'TableCell';
