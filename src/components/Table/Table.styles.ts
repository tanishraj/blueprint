import { cva } from 'class-variance-authority';

import type { TableAlign, TableSizes } from './types';

export const tableContainerStyles = cva(
  'relative w-full overflow-x-auto rounded-lg border border-default bg-default shadow-sm',
);

export const tableRootStyles = cva(
  'w-full min-w-full border-separate border-spacing-0 caption-bottom text-default',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const tableCaptionStyles = cva('px-4 text-caption', {
  variants: {
    size: {
      sm: 'py-2 text-xs',
      md: 'py-3 text-sm',
      lg: 'py-3.5 text-sm',
    },
    side: {
      top: 'caption-top text-left',
      bottom: 'caption-bottom text-left',
    },
  },
  defaultVariants: {
    size: 'md',
    side: 'bottom',
  },
});

export const tableHeaderStyles = cva('', {
  variants: {},
});

export const tableBodyStyles = cva('', {
  variants: {
    striped: {
      true: '[&_tr:nth-child(odd)]:bg-default-hovered',
      false: '',
    },
    interactive: {
      true: '[&_tr]:transition-colors [&_tr:hover]:bg-default-hovered',
      false: '',
    },
  },
  defaultVariants: {
    striped: false,
    interactive: false,
  },
});

export const tableFooterStyles = cva(
  'bg-default-hovered font-medium text-default [&_tr:last-child_td]:border-b-0',
);

export const tableRowStyles = cva(
  'group focus-within:bg-default-hovered data-[state=selected]:bg-default-hovered',
);

const resolveCellPadding = (size: TableSizes) => {
  switch (size) {
    case 'sm':
      return 'px-3 py-2';
    case 'lg':
      return 'px-5 py-4';
    case 'md':
    default:
      return 'px-4 py-3';
  }
};

const resolveCellAlign = (align: TableAlign) => {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    case 'left':
    default:
      return 'text-left';
  }
};

export const tableHeadStyles = ({
  align,
  showColumnBorder,
  size,
  stickyHeader,
}: {
  align: TableAlign;
  showColumnBorder: boolean;
  size: TableSizes;
  stickyHeader: boolean;
}) => {
  return [
    'border-b border-default bg-default-hovered/95 text-caption font-semibold tracking-wide uppercase',
    resolveCellPadding(size),
    resolveCellAlign(align),
    stickyHeader &&
      'sticky top-0 z-10 bg-default-hovered backdrop-blur supports-[backdrop-filter]:bg-default-hovered/95',
    showColumnBorder && 'border-r border-default last:border-r-0',
  ]
    .filter(Boolean)
    .join(' ');
};

export const tableCellStyles = ({
  align,
  showColumnBorder,
  size,
}: {
  align: TableAlign;
  showColumnBorder: boolean;
  size: TableSizes;
}) => {
  return [
    'align-middle border-b border-default text-default',
    resolveCellPadding(size),
    resolveCellAlign(align),
    showColumnBorder && 'border-r border-default last:border-r-0',
  ]
    .filter(Boolean)
    .join(' ');
};
