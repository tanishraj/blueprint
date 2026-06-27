import { cva } from 'class-variance-authority';

export const popoverRootStyles = cva('relative inline-flex');

export const popoverTriggerStyles = cva('inline-flex w-fit');

export const popoverPanelStyles = cva(
  'z-50 w-64 rounded border border-default bg-default p-2 text-default shadow-md outline-none',
);

export const popoverHeaderStyles = cva(
  'flex min-h-6 items-center justify-between gap-2',
);

export const popoverTitleWrapperStyles = cva(
  'flex min-w-0 items-center gap-1.5',
);

export const popoverTitleStyles = cva('truncate text-xs font-semibold');

export const popoverIconStyles = cva('size-3 shrink-0', {
  variants: {
    variant: {
      default: 'text-default',
      primary: 'text-primary',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const popoverCloseButtonStyles = cva(
  'inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded text-default outline-none transition-colors hover:bg-default-hovered active:bg-default-pressed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
);

export const popoverCloseIconStyles = cva('size-3.5 shrink-0');

export const popoverBodyStyles = cva(
  'mt-1 flex min-h-40 items-center justify-center bg-primary/10 p-4 text-xs text-default',
  {
    variants: {
      showSlotBorder: {
        true: 'border border-dashed border-primary',
        false: '',
      },
    },
    defaultVariants: {
      showSlotBorder: true,
    },
  },
);

export const popoverArrowStyles = cva(
  'fill-[var(--background-color-default)] text-[var(--border-color-default)] drop-shadow-[0_1px_1px_rgb(0_0_0_/_0.05)]',
);
