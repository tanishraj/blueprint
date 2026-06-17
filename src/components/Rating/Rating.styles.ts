import { cva } from 'class-variance-authority';

export const ratingRootStyles = cva('inline-flex w-fit items-center gap-1', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-40',
      false: '',
    },
    readOnly: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { disabled: false, readOnly: false, className: 'cursor-pointer' },
  ],
  defaultVariants: {
    disabled: false,
    readOnly: false,
  },
});

export const ratingStarStyles = cva(
  'relative inline-flex shrink-0 items-center justify-center',
  {
    variants: {
      size: {
        xs: 'size-4',
        sm: 'size-5',
        md: 'size-7',
        lg: 'size-9',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const ratingStarIconStyles = cva(
  'pointer-events-none absolute inset-0 size-full',
);

export const ratingInputStyles = cva('sr-only peer');

export const ratingOptionLabelStyles = cva(
  'absolute inset-y-0 z-10 rounded outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base',
  {
    variants: {
      interactive: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
      part: {
        half: 'left-0 w-1/2',
        full: 'right-0 w-1/2',
        whole: 'inset-x-0',
      },
    },
    defaultVariants: {
      interactive: true,
      part: 'whole',
    },
  },
);

export const ratingEmptyIconStyles = cva('text-gray-500');

export const ratingFilledIconStyles = cva('text-primary');

export const ratingFillLayerStyles = cva(
  'pointer-events-none absolute inset-y-0 left-0 overflow-hidden',
  {
    variants: {
      amount: {
        half: 'w-1/2',
        full: 'w-full',
      },
    },
    defaultVariants: {
      amount: 'full',
    },
  },
);

export const ratingIconCanvasStyles = cva(
  'pointer-events-none relative inline-block',
  {
    variants: {
      size: {
        xs: 'size-4',
        sm: 'size-5',
        md: 'size-7',
        lg: 'size-9',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
