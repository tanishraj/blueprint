import { cva } from 'class-variance-authority';

export const drawerPortalRootStyles = cva('isolate z-50', {
  variants: {
    portal: {
      true: 'fixed inset-0',
      false: 'absolute inset-0',
    },
  },
  defaultVariants: {
    portal: true,
  },
});

export const drawerOverlayStyles = cva(
  'absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:fill-mode-forwards data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-500',
);

export const drawerPanelStyles = cva(
  'absolute z-20 flex max-h-full max-w-full flex-col overflow-hidden border-gray-400 bg-white text-default shadow-xl outline-none data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards data-[state=closed]:duration-300 data-[state=closed]:ease-in data-[state=open]:animate-in data-[state=open]:duration-500 data-[state=open]:ease-out',
  {
    variants: {
      placement: {
        right:
          'right-0 top-0 h-full data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full',
        left: 'left-0 top-0 h-full data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-left-full',
        top: 'left-0 top-0 w-full data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full',
        bottom:
          'bottom-0 left-0 w-full data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        full: '',
      },
    },
    compoundVariants: [
      {
        placement: 'right',
        size: ['sm', 'md', 'lg'],
        className: 'border-l',
      },
      {
        placement: 'left',
        size: ['sm', 'md', 'lg'],
        className: 'border-r',
      },
      {
        placement: 'top',
        size: ['sm', 'md', 'lg'],
        className: 'border-b',
      },
      {
        placement: 'bottom',
        size: ['sm', 'md', 'lg'],
        className: 'border-t',
      },
      {
        placement: ['left', 'right'],
        size: 'sm',
        className: 'w-80',
      },
      {
        placement: ['left', 'right'],
        size: 'md',
        className: 'w-96',
      },
      {
        placement: ['left', 'right'],
        size: 'lg',
        className: 'w-[32rem]',
      },
      {
        placement: ['left', 'right'],
        size: 'full',
        className: 'w-full',
      },
      {
        placement: ['top', 'bottom'],
        size: 'sm',
        className: 'h-64',
      },
      {
        placement: ['top', 'bottom'],
        size: 'md',
        className: 'h-80',
      },
      {
        placement: ['top', 'bottom'],
        size: 'lg',
        className: 'h-[32rem]',
      },
      {
        placement: ['top', 'bottom'],
        size: 'full',
        className: 'h-full',
      },
    ],
    defaultVariants: {
      placement: 'right',
      size: 'md',
    },
  },
);

export const drawerHeaderStyles = cva(
  'flex min-h-14 shrink-0 justify-between gap-4 border-b border-gray-400 px-6 py-4',
  {
    variants: {
      withDescription: {
        true: 'items-start',
        false: 'items-center',
      },
    },
    defaultVariants: {
      withDescription: false,
    },
  },
);

export const drawerHeaderContentStyles = cva('min-w-0 flex-1');

export const drawerTitleStyles = cva('truncate text-base font-semibold');

export const drawerDescriptionStyles = cva('mt-1 text-sm text-gray-600');

export const drawerCloseButtonStyles = cva(
  'inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded outline-none transition-colors hover:bg-default-hovered active:bg-default-pressed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
);

export const drawerCloseIconStyles = cva('size-4 shrink-0');

export const drawerBodyStyles = cva('min-h-0 flex-1 overflow-auto px-6 py-5');

export const drawerFooterStyles = cva(
  'flex shrink-0 items-center justify-end gap-3 border-t border-gray-400 px-6 py-4',
);
