import { cva } from 'class-variance-authority';

export const accordionRootStyles = cva(
  'w-full overflow-hidden rounded border border-default bg-base',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const accordionItemStyles = cva('bg-base border-default', {
  variants: {
    last: {
      true: 'border-b-0',
      false: 'border-b',
    },
    disabled: {
      true: 'bg-disabled',
      false: '',
    },
  },
  defaultVariants: {
    last: false,
    disabled: false,
  },
});

export const accordionHeaderButtonStyles = cva(
  'flex w-full items-center justify-between gap-3 text-left font-medium text-default outline-none transition-colors hover:bg-default-hovered active:bg-default-pressed focus-visible:bg-default-hovered focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled disabled:hover:bg-disabled disabled:active:bg-disabled',
  {
    variants: {
      size: {
        sm: 'min-h-10 px-4 py-2 text-sm',
        md: 'min-h-12 px-4.5 py-3 text-base',
        lg: 'min-h-14 px-5 py-3.5 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const accordionTitleStyles = cva('flex-1', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed text-disabled',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const accordionChevronStyles = cva(
  'shrink-0 text-default transition-transform duration-200',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-4',
        lg: 'size-5',
      },
      open: {
        true: 'rotate-180',
        false: '',
      },
      disabled: {
        true: 'text-disabled',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      open: false,
      disabled: false,
    },
  },
);

export const accordionContentStyles = cva('border-t border-default');

export const accordionContentInnerStyles = cva(
  'px-4.5 py-3 text-sm leading-relaxed text-default',
  {
    variants: {
      size: {
        sm: 'px-4 pb-3 text-xs',
        md: 'px-4.5 pb-3 text-sm',
        lg: 'px-5 pb-4 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
