import { cva } from 'class-variance-authority';

import type { TableAlign, TableSizes } from './types';

export const tableContainerStyles = cva(
  'relative w-full overflow-x-auto rounded-lg border border-gray-200 bg-base shadow-sm',
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

export const tableCaptionStyles = cva('px-4 text-gray-600', {
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
      true: '[&_tr:nth-child(odd)]:bg-gray-50/60',
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
  'font-medium [&_tr:last-child_td]:border-b-0',
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
    'border-b border-gray-200 bg-gray-100/95 text-gray-700 font-semibold tracking-wide uppercase',
    resolveCellPadding(size),
    resolveCellAlign(align),
    stickyHeader &&
      'sticky top-0 z-10 bg-base backdrop-blur supports-[backdrop-filter]:bg-base/95',
    stickyHeader && 'bg-gray-100/95',
    showColumnBorder && 'border-r border-gray-200 last:border-r-0',
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
    'align-middle border-b border-gray-200 text-default',
    resolveCellPadding(size),
    resolveCellAlign(align),
    showColumnBorder && 'border-r border-gray-200 last:border-r-0',
  ]
    .filter(Boolean)
    .join(' ');
};
