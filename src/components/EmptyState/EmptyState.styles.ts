import { cva } from 'class-variance-authority';

export const emptyStateRootStyles = cva(
  'flex w-full flex-col items-center justify-center',
  {
    variants: {
      size: {
        sm: 'p-4',
        md: 'p-5',
        lg: 'p-6',
      },
      orientation: {
        vertical: 'text-center',
        horizontal: 'text-left',
      },
    },
    defaultVariants: {
      size: 'md',
      orientation: 'vertical',
    },
  },
);

export const emptyStateContentStyles = cva('flex w-full', {
  variants: {
    size: {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
    },
    orientation: {
      vertical: 'flex-col items-center justify-center',
      horizontal: 'flex-col items-stretch',
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'vertical',
  },
});

export const emptyStateBodyStyles = cva('flex', {
  variants: {
    size: {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
    },
    orientation: {
      vertical: 'flex-col items-center',
      horizontal: 'flex-row items-center',
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'vertical',
  },
});

export const emptyStateIconStyles = cva('shrink-0 text-gray-500', {
  variants: {
    size: {
      sm: 'size-14',
      md: 'size-16',
      lg: 'size-20',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const emptyStateCustomIconStyles = cva(
  'flex shrink-0 items-center justify-center text-gray-500',
  {
    variants: {
      size: {
        sm: 'size-14',
        md: 'size-16',
        lg: 'size-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const emptyStateDetailsStyles = cva('flex flex-col', {
  variants: {
    size: {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
    },
    orientation: {
      vertical: 'items-center',
      horizontal: 'min-w-0 flex-1 items-start',
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'vertical',
  },
});

export const emptyStateCopyStyles = cva('flex flex-col text-gray-600', {
  variants: {
    size: {
      sm: 'max-w-xs gap-1.5 text-sm leading-5',
      md: 'max-w-sm gap-2 text-base leading-6',
      lg: 'max-w-md gap-2.5 text-base leading-6',
    },
    orientation: {
      vertical: 'items-center text-center',
      horizontal: 'max-w-none items-start text-left',
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'vertical',
  },
});

export const emptyStateTitleStyles = cva('font-semibold text-default', {
  variants: {
    size: {
      sm: 'text-base leading-6',
      md: 'text-lg leading-7',
      lg: 'text-xl leading-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const emptyStateActionsStyles = cva(
  'flex flex-wrap items-center gap-2',
  {
    variants: {
      orientation: {
        vertical: 'justify-center',
        horizontal: 'justify-start',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
);
