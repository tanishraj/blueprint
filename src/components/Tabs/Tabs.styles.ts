import { cva } from 'class-variance-authority';

export const tabsRootStyles = cva('flex w-full gap-4', {
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: 'flex-row items-start',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const tabListStyles = cva(
  'inline-flex w-fit max-w-full shrink-0 gap-2',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row items-end',
        vertical: 'flex-col items-stretch',
      },
      variant: {
        underline: '',
        pill: '',
      },
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        variant: 'underline',
        className: 'border-b border-default',
      },
      {
        orientation: 'vertical',
        variant: 'underline',
        className: 'border-r border-default',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'underline',
    },
  },
);

export const tabRootStyles = cva(
  'group relative inline-flex shrink-0 select-none items-center gap-1.5 whitespace-nowrap font-medium text-default outline-none transition-colors focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
  {
    variants: {
      variant: {
        underline: '',
        pill: 'rounded-full',
      },
      size: {
        sm: 'h-6 text-xs',
        md: 'h-8 text-sm',
        lg: 'h-10 text-base',
      },
      orientation: {
        horizontal: '',
        vertical: 'justify-start',
      },
      selected: {
        true: '',
        false: 'text-caption',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-40',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      {
        variant: 'underline',
        orientation: 'horizontal',
        size: 'sm',
        className: 'border-b-2 px-2 py-1.5 -mb-px',
      },
      {
        variant: 'underline',
        orientation: 'horizontal',
        size: 'md',
        className: 'border-b-2 px-2.5 py-2 -mb-px',
      },
      {
        variant: 'underline',
        orientation: 'horizontal',
        size: 'lg',
        className: 'border-b-[3px] px-3 py-2.5 -mb-px',
      },
      {
        variant: 'underline',
        orientation: 'vertical',
        size: 'sm',
        className: 'border-r-2 px-2 py-1.5 -mr-px',
      },
      {
        variant: 'underline',
        orientation: 'vertical',
        size: 'md',
        className: 'border-r-2 px-2.5 py-2 -mr-px',
      },
      {
        variant: 'underline',
        orientation: 'vertical',
        size: 'lg',
        className: 'border-r-[3px] px-3 py-2.5 -mr-px',
      },
      {
        variant: 'underline',
        selected: true,
        className: 'border-primary text-primary',
      },
      {
        variant: 'underline',
        selected: false,
        className: 'border-transparent hover:text-default',
      },
      {
        variant: 'pill',
        size: 'sm',
        className: 'px-2 py-1',
      },
      {
        variant: 'pill',
        size: 'md',
        className: 'px-3 py-1.5',
      },
      {
        variant: 'pill',
        size: 'lg',
        className: 'px-3.5 py-2',
      },
      {
        variant: 'pill',
        selected: true,
        className: 'bg-primary text-white',
      },
      {
        variant: 'pill',
        selected: false,
        className: 'hover:bg-default-hovered hover:text-default',
      },
    ],
    defaultVariants: {
      disabled: false,
      orientation: 'horizontal',
      selected: false,
      size: 'md',
      variant: 'underline',
    },
  },
);

export const tabAdornmentStyles = cva('inline-flex shrink-0 items-center');

export const tabIconStyles = cva('size-4 shrink-0 [&>svg]:size-4', {
  variants: {
    size: {
      sm: 'size-3.5 [&>svg]:size-3.5',
      md: 'size-4 [&>svg]:size-4',
      lg: 'size-[18px] [&>svg]:size-[18px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const tabStatusDotStyles = cva('inline-flex size-1.5 rounded-full', {
  variants: {
    selected: {
      true: 'bg-danger',
      false: 'bg-danger',
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const tabCloseButtonStyles = cva(
  'inline-flex shrink-0 items-center justify-center rounded text-caption outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-base',
  {
    variants: {
      size: {
        sm: 'size-3.5 [&>svg]:size-3',
        md: 'size-4 [&>svg]:size-3.5',
        lg: 'size-[18px] [&>svg]:size-4',
      },
      variant: {
        underline: '',
        pill: '',
      },
      selected: {
        true: 'text-caption',
        false: 'text-caption',
      },
    },
    compoundVariants: [
      {
        variant: 'underline',
        selected: false,
        className: 'group-hover:text-default',
      },
      {
        variant: 'underline',
        selected: true,
        className: 'group-hover:text-primary',
      },
      {
        variant: 'pill',
        selected: true,
        className: 'text-white',
      },
      {
        variant: 'pill',
        selected: false,
        className: 'group-hover:text-default',
      },
    ],
    defaultVariants: {
      selected: false,
      size: 'md',
      variant: 'underline',
    },
  },
);

export const tabPanelStyles = cva('min-w-0 flex-1 text-default outline-none', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'min-h-full',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
