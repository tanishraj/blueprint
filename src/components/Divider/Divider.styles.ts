import { cva } from 'class-variance-authority';

export const dividerRootStyles = cva('flex shrink-0 text-gray-600', {
  variants: {
    orientation: {
      horizontal: 'w-full items-center',
      vertical: 'h-full min-h-6 flex-col items-center',
    },
    hasContent: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      hasContent: false,
      className: 'h-px bg-gray-400',
    },
    {
      orientation: 'vertical',
      hasContent: false,
      className: 'w-px self-stretch bg-gray-400',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    hasContent: false,
  },
});

export const dividerLineStyles = cva('shrink bg-gray-400', {
  variants: {
    orientation: {
      horizontal: 'h-px min-w-8 flex-1',
      vertical: 'w-px min-h-8 flex-1',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const dividerContentStyles = cva(
  'inline-flex shrink-0 items-center justify-center text-sm font-medium leading-none text-gray-600',
  {
    variants: {
      orientation: {
        horizontal: 'mx-3',
        vertical: 'my-3',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);
