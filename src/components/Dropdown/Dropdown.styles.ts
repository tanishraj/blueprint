import { cva } from 'class-variance-authority';

export const dropdownRootStyles = cva('inline-flex');

export const dropdownArrowStyles = cva(
  'fill-white text-[var(--gray-300)] drop-shadow-[0_1px_1px_rgb(0_0_0_/_0.05)]',
);
