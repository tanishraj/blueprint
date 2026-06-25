import type { ComponentPropsWithoutRef, Key, ReactNode } from 'react';

import type { InputSizes } from '../Input/types';

export type TableSizes = InputSizes;
export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn<RowData> {
  accessorKey?: keyof RowData;
  align?: TableAlign;
  cell?: (row: RowData, rowIndex: number) => ReactNode;
  className?: string;
  header: ReactNode;
  headerClassName?: string;
  id?: string;
}

export interface TableProps<RowData extends object = Record<string, unknown>>
  extends Omit<ComponentPropsWithoutRef<'table'>, 'children' | 'size'> {
  caption?: ReactNode;
  captionSide?: 'top' | 'bottom';
  columns: TableColumn<RowData>[];
  containerClassName?: string;
  data: RowData[];
  emptyMessage?: ReactNode;
  footer?: ReactNode;
  interactive?: boolean;
  rowKey?: keyof RowData | ((row: RowData, index: number) => Key);
  showColumnBorder?: boolean;
  size?: TableSizes;
  stickyHeader?: boolean;
  striped?: boolean;
}

export interface TableCaptionProps
  extends ComponentPropsWithoutRef<'caption'> {
  side?: 'top' | 'bottom';
}

export interface TableCellProps
  extends ComponentPropsWithoutRef<'td'> {
  align?: TableAlign | undefined;
}

export interface TableHeadProps
  extends ComponentPropsWithoutRef<'th'> {
  align?: TableAlign | undefined;
}

export interface TableContextValue {
  interactive: boolean;
  showColumnBorder: boolean;
  size: TableSizes;
  stickyHeader: boolean;
  striped: boolean;
}

export interface TableSectionProps {
  children: ReactNode;
  className?: string;
}
