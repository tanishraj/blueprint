import { cva } from 'class-variance-authority';

export const modalPortalRootStyles = cva('isolate z-50', {
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

export const modalOverlayStyles = cva(
  'absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:fill-mode-forwards data-[state=closed]:[--tw-animation-duration:200ms] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:[--tw-animation-duration:300ms]',
);

export const modalPositionerStyles = cva(
  'relative z-20 flex h-full w-full items-center justify-center p-6 pointer-events-none',
);

export const modalPanelStyles = cva(
  'pointer-events-auto flex max-h-[calc(100dvh-3rem)] w-full flex-col overflow-hidden rounded bg-default text-default shadow-xl outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:fill-mode-forwards data-[state=closed]:[--tw-animation-duration:200ms] data-[state=closed]:[animation-timing-function:var(--ease-in)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:[--tw-animation-duration:300ms] data-[state=open]:[animation-timing-function:var(--ease-out)]',
  {
    variants: {
      size: {
        sm: 'max-w-xl',
        md: 'max-w-3xl',
        lg: 'max-w-5xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const modalHeaderStyles = cva(
  'flex min-h-14 shrink-0 justify-between gap-4 border-b border-default px-4 py-3',
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

export const modalHeaderContentStyles = cva('flex min-w-0 flex-1 gap-2', {
  variants: {
    withDescription: {
      true: 'items-start',
      false: 'items-center',
    },
  },
  defaultVariants: {
    withDescription: false,
  },
});

export const modalLeadingIconStyles = cva('size-4 shrink-0', {
  variants: {
    withDescription: {
      true: 'mt-1',
      false: '',
    },
  },
  defaultVariants: {
    withDescription: false,
  },
});

export const modalTitleGroupStyles = cva('min-w-0 flex-1');

export const modalTitleStyles = cva('truncate text-base font-semibold');

export const modalDescriptionStyles = cva('mt-1 text-sm text-caption');

export const modalCloseButtonStyles = cva(
  'inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded outline-none transition-colors hover:bg-default-hovered active:bg-default-pressed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
);

export const modalCloseIconStyles = cva('size-4 shrink-0');

export const modalBodyStyles = cva('min-h-0 flex-1 overflow-auto px-4 py-4');

export const modalFooterStyles = cva(
  'flex shrink-0 items-center justify-end gap-3 border-t border-default px-4 py-3',
);
