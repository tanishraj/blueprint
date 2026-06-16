import { cva } from 'class-variance-authority';

export const dropdownRootStyles = cva('inline-flex');

export const dropdownMenuStyles = cva(
  'z-50 min-w-40 rounded border border-gray-300 bg-white p-1 text-default shadow-md outline-none',
);

export const dropdownItemStyles = cva(
  'flex w-full cursor-pointer items-center gap-2 rounded px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-default-hovered focus-visible:bg-default-hovered active:bg-default-pressed disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
  {
    variants: {
      selected: {
        true: 'bg-default-hovered font-medium',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export const dropdownItemIconStyles = cva('size-4 shrink-0');

export const dropdownItemLabelStyles = cva('min-w-0 flex-1 truncate');

export const dropdownArrowStyles = cva(
  'fill-white text-[var(--gray-300)] drop-shadow-[0_1px_1px_rgb(0_0_0_/_0.05)]',
);
