import { cva } from 'class-variance-authority';

export const confirmationPopupRootStyles = cva('relative inline-flex');

export const confirmationPopupTriggerStyles = cva('inline-flex w-fit');

export const confirmationPopupPanelStyles = cva(
  'z-50 rounded border border-gray-300 bg-base text-default shadow-md outline-none',
  {
    variants: {
      size: {
        sm: 'w-48 p-1.5',
        md: 'w-56 p-2',
        lg: 'w-64 p-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const confirmationPopupHeaderStyles = cva(
  'flex items-start justify-between',
  {
    variants: {
      size: {
        sm: 'gap-1.5',
        md: 'gap-2',
        lg: 'gap-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const confirmationPopupTitleWrapperStyles = cva(
  'flex min-w-0 items-center',
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-1.5',
        lg: 'gap-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const confirmationPopupTitleStyles = cva('truncate font-semibold', {
  variants: {
    size: {
      sm: 'text-[11px] leading-4',
      md: 'text-xs leading-4',
      lg: 'text-sm leading-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const confirmationPopupIconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-3',
      lg: 'size-3.5',
    },
    variant: {
      default: 'text-gray-950',
      primary: 'text-primary',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export const confirmationPopupCloseButtonStyles = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded text-gray-950 outline-none transition-colors hover:bg-default-hovered active:bg-default-pressed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
  {
    variants: {
      size: {
        sm: 'size-4.5',
        md: 'size-5',
        lg: 'size-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const confirmationPopupCloseIconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-3.5',
      lg: 'size-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const confirmationPopupBodyStyles = cva('', {
  variants: {
    size: {
      sm: 'mt-1',
      md: 'mt-1',
      lg: 'mt-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const confirmationPopupDescriptionStyles = cva('text-gray-600', {
  variants: {
    size: {
      sm: 'text-[10px] leading-4',
      md: 'text-[10px] leading-4',
      lg: 'text-xs leading-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const confirmationPopupFooterStyles = cva(
  'flex items-center justify-end',
  {
    variants: {
      size: {
        sm: 'mt-2 gap-1',
        md: 'mt-2 gap-1',
        lg: 'mt-2.5 gap-1.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const confirmationPopupArrowStyles = cva(
  'fill-white text-[var(--gray-300)] drop-shadow-[0_1px_1px_rgb(0_0_0_/_0.05)]',
);
