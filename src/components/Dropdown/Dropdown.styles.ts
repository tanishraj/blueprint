import { cva } from 'class-variance-authority';

export const dropdownRootStyles = cva('inline-flex');

export const dropdownTriggerStyles = cva('', {
  variants: {
    separateLabelAndChevron: {
      true: 'min-w-36 text-left [&_[data-slot=button-content]]:w-full [&_[data-slot=button-content]]:justify-between [&_[data-slot=button-label]]:text-left',
      false: '',
    },
  },
  defaultVariants: {
    separateLabelAndChevron: false,
  },
});

export const dropdownArrowStyles = cva(
  'fill-[var(--background-color-default)] text-[var(--border-color-default)] drop-shadow-[0_1px_1px_rgb(0_0_0_/_0.05)]',
);
