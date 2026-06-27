import { cva } from 'class-variance-authority';

export const breadcrumbStyles = cva(
  'inline-flex max-w-full items-center overflow-hidden font-medium text-sm',
  {
    variants: {
      appearance: {
        ghost: 'min-h-6',
        outline: 'min-h-12 rounded border border-default bg-base px-3',
      },
    },
    defaultVariants: {
      appearance: 'ghost',
    },
  },
);

export const breadcrumbListStyles = cva(
  'flex min-w-0 flex-wrap items-center gap-3',
);

export const breadcrumbItemStyles = cva(
  'inline-flex min-w-0 items-center gap-2',
);

export const breadcrumbLinkStyles = cva(
  'inline-flex h-6 min-w-0 items-center gap-2 rounded outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
  {
    variants: {
      current: {
        true: 'cursor-default text-caption',
        false: 'text-info hover:text-info-hovered active:text-info-pressed',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-40',
        false: '',
      },
    },
    defaultVariants: {
      current: false,
      disabled: false,
    },
  },
);

export const breadcrumbIconStyles = cva('size-4 shrink-0');

export const breadcrumbLabelStyles = cva('min-w-0 truncate');

export const breadcrumbSeparatorStyles = cva(
  'inline-flex h-6 shrink-0 items-center justify-center text-default',
);

export const breadcrumbSeparatorIconStyles = cva('size-4 shrink-0');
