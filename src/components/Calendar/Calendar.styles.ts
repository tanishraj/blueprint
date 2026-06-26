import { cva } from 'class-variance-authority';

export const calendarRootStyles = cva(
  'relative w-fit rounded-lg border border-gray-300 bg-white p-3 text-default shadow-sm',
);

export const calendarMonthsStyles = cva('flex flex-col gap-4 sm:flex-row');

export const calendarMonthStyles = cva('space-y-3');

export const calendarMonthCaptionStyles = cva(
  'relative flex min-h-8 items-center justify-center px-9',
);

export const calendarCaptionLabelStyles = cva(
  'inline-flex items-center gap-1 text-sm font-semibold text-default group-has-[.calendar-month-dropdown]:w-full group-has-[.calendar-month-dropdown]:justify-between group-has-[.calendar-month-dropdown]:gap-2 group-has-[.calendar-month-dropdown]:truncate group-has-[.calendar-month-dropdown]:[&>svg]:size-4 group-has-[.calendar-month-dropdown]:[&>svg]:shrink-0 group-has-[.calendar-year-dropdown]:w-full group-has-[.calendar-year-dropdown]:justify-between group-has-[.calendar-year-dropdown]:gap-2 group-has-[.calendar-year-dropdown]:truncate group-has-[.calendar-year-dropdown]:[&>svg]:size-4 group-has-[.calendar-year-dropdown]:[&>svg]:shrink-0',
);

export const calendarNavStyles = cva(
  'pointer-events-none absolute inset-x-3 top-3 z-20 flex items-center justify-between',
);

export const calendarNavButtonStyles = cva(
  'pointer-events-auto relative z-20 inline-flex size-8 cursor-pointer items-center justify-center text-gray-700 outline-none transition-colors hover:bg-default-hovered active:bg-default-pressed disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
  {
    variants: {
      shape: {
        squared: 'rounded',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      shape: 'squared',
    },
  },
);

export const calendarChevronStyles = cva('size-4');

export const calendarMonthGridStyles = cva('w-full border-collapse');

export const calendarWeekdaysStyles = cva('flex gap-1');

export const calendarWeekdayStyles = cva(
  'flex size-9 items-center justify-center text-xs font-medium text-gray-500',
);

export const calendarWeekStyles = cva('mt-1 flex w-full gap-1');

export const calendarDayStyles = cva(
  'relative flex size-9 items-center justify-center p-0 text-center text-sm',
);

export const calendarDayButtonStyles = cva(
  'inline-flex size-9 items-center justify-center text-sm text-default outline-none transition-colors hover:bg-default-hovered active:bg-default-pressed disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
  {
    variants: {
      shape: {
        squared: 'rounded',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      shape: 'squared',
    },
  },
);

export const calendarSelectedStyles = cva(
  '[&>button]:!bg-primary [&>button]:!text-white [&>button]:hover:!bg-primary-hovered [&>button]:active:!bg-primary-pressed',
);

export const calendarTodayStyles = cva(
  '[&>button]:font-semibold [&>button]:text-primary',
);

export const calendarOutsideStyles = cva('[&>button]:text-gray-400');

export const calendarDisabledStyles = cva(
  '[&>button]:cursor-not-allowed [&>button]:text-gray-400 [&>button]:line-through',
);

export const calendarRangeStartStyles = cva(
  '[&>button]:!bg-primary [&>button]:!text-white [&>button]:hover:!bg-primary-hovered [&>button]:active:!bg-primary-pressed',
  {
    variants: {
      shape: {
        squared: '[&>button]:!rounded',
        circle: '[&>button]:!rounded-full',
      },
    },
    defaultVariants: {
      shape: 'squared',
    },
  },
);

export const calendarRangeMiddleStyles = cva(
  '[&>button]:!bg-primary [&>button]:!text-white [&>button]:hover:!bg-primary-hovered [&>button]:active:!bg-primary-pressed',
  {
    variants: {
      shape: {
        squared: '[&>button]:!rounded',
        circle: '[&>button]:!rounded-full',
      },
    },
    defaultVariants: {
      shape: 'squared',
    },
  },
);

export const calendarRangeEndStyles = cva(
  '[&>button]:!bg-primary [&>button]:!text-white [&>button]:hover:!bg-primary-hovered [&>button]:active:!bg-primary-pressed',
  {
    variants: {
      shape: {
        squared: '[&>button]:!rounded',
        circle: '[&>button]:!rounded-full',
      },
    },
    defaultVariants: {
      shape: 'squared',
    },
  },
);

export const calendarDropdownsStyles = cva(
  'flex items-center justify-center gap-2',
);

export const calendarDropdownRootStyles = cva(
  'group relative inline-flex h-8 items-center justify-center rounded border border-gray-300 bg-white px-2 text-sm text-default outline-none has-[.calendar-month-dropdown]:w-[120px] has-[.calendar-year-dropdown]:w-[80px]',
);

export const calendarDropdownStyles = cva(
  'absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 outline-none',
);

export const calendarFooterStyles = cva('pt-3 text-xs text-gray-600');
