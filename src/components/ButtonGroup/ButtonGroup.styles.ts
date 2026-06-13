import { cva } from 'class-variance-authority';

export const buttonGroupStyles = cva(
  'inline-flex isolate overflow-hidden rounded-md border border-default',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row items-center',
        vertical: 'flex-col items-stretch',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);

export const buttonGroupItemStyles = cva('inline-flex', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: '',
    },
    position: {
      single: '',
      first: '',
      middle: '',
      last: '',
    },
    fullWidth: {
      true: 'flex-1',
      false: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      position: 'first',
      className: 'border-r border-default',
    },
    {
      orientation: 'horizontal',
      position: 'middle',
      className: 'border-r border-default',
    },
    {
      orientation: 'horizontal',
      position: 'last',
      className: 'border-r-0',
    },
    {
      orientation: 'horizontal',
      position: 'single',
      className: 'border-r-0',
    },
    {
      orientation: 'vertical',
      position: 'first',
      className: 'border-b border-default',
    },
    {
      orientation: 'vertical',
      position: 'middle',
      className: 'border-b border-default',
    },
    {
      orientation: 'vertical',
      position: 'last',
      className: 'border-b-0',
    },
    {
      orientation: 'vertical',
      position: 'single',
      className: 'border-b-0',
    },
  ],
});

export const buttonGroupItemInnerStyles = cva(
  'rounded-none border-0 !rounded-none shadow-none',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  },
);
