import { cva } from 'class-variance-authority';

export const listBoxStyles = cva(
  'z-50 flex flex-col overflow-hidden rounded border border-gray-300 bg-white text-default shadow-md outline-none',
  {
    variants: {
      size: {
        sm: 'min-w-48 gap-1 p-1',
        md: 'min-w-64 gap-1.5 p-1.5',
        lg: 'min-w-80 gap-2 p-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const listItemStyles = cva(
  'flex w-full cursor-pointer items-center rounded text-left outline-none transition-colors hover:bg-default-hovered focus-visible:bg-default-hovered active:bg-default-pressed disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
  {
    variants: {
      size: {
        sm: 'gap-1.5 px-2 py-1.5 text-sm',
        md: 'gap-2 px-3 py-2 text-base',
        lg: 'gap-2.5 px-4 py-3 text-lg',
      },
      selected: {
        true: 'bg-default-hovered font-medium',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      selected: false,
    },
  },
);

export const listItemIconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const listItemLabelStyles = cva('min-w-0 flex-1 truncate');
