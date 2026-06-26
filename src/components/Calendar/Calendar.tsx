import { type FC, useMemo } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import {
  DayFlag,
  DayPicker,
  SelectionState,
  UI,
  type ClassNames,
  type ChevronProps,
  type CustomComponents,
} from 'react-day-picker';

import { cn } from '@/utils';

import {
  calendarCaptionLabelStyles,
  calendarChevronStyles,
  calendarDayButtonStyles,
  calendarDayStyles,
  calendarDisabledStyles,
  calendarDropdownRootStyles,
  calendarDropdownsStyles,
  calendarDropdownStyles,
  calendarFooterStyles,
  calendarMonthCaptionStyles,
  calendarMonthGridStyles,
  calendarMonthsStyles,
  calendarMonthStyles,
  calendarNavButtonStyles,
  calendarNavStyles,
  calendarOutsideStyles,
  calendarRangeEndStyles,
  calendarRangeMiddleStyles,
  calendarRangeStartStyles,
  calendarRootStyles,
  calendarSelectedStyles,
  calendarTodayStyles,
  calendarWeekdayStyles,
  calendarWeekdaysStyles,
  calendarWeekStyles,
} from './Calendar.styles';
import type { CalendarProps } from './types';

function CalendarChevron({
  className,
  disabled,
  orientation = 'right',
  size,
  ...props
}: ChevronProps) {
  const iconClassName = cn(calendarChevronStyles(), className);
  const iconSize = size ?? 16;

  if (orientation === 'left') {
    return (
      <ChevronLeft
        {...props}
        aria-hidden='true'
        className={iconClassName}
        data-disabled={disabled || undefined}
        size={iconSize}
      />
    );
  }

  if (orientation === 'up') {
    return (
      <ChevronUp
        {...props}
        aria-hidden='true'
        className={iconClassName}
        data-disabled={disabled || undefined}
        size={iconSize}
      />
    );
  }

  if (orientation === 'down') {
    return (
      <ChevronDown
        {...props}
        aria-hidden='true'
        className={iconClassName}
        data-disabled={disabled || undefined}
        size={iconSize}
      />
    );
  }

  return (
    <ChevronRight
      {...props}
      aria-hidden='true'
      className={iconClassName}
      data-disabled={disabled || undefined}
      size={iconSize}
    />
  );
}

const getCalendarClassNames = (
  classNames: CalendarProps['classNames'],
  shape: NonNullable<CalendarProps['shape']>,
): Partial<ClassNames> => ({
  [UI.Root]: cn(classNames?.[UI.Root]),
  [UI.Months]: cn(calendarMonthsStyles(), classNames?.[UI.Months]),
  [UI.Month]: cn(calendarMonthStyles(), classNames?.[UI.Month]),
  [UI.MonthCaption]: cn(
    calendarMonthCaptionStyles(),
    classNames?.[UI.MonthCaption],
  ),
  [UI.CaptionLabel]: cn(
    calendarCaptionLabelStyles(),
    classNames?.[UI.CaptionLabel],
  ),
  [UI.Nav]: cn(calendarNavStyles(), classNames?.[UI.Nav]),
  [UI.PreviousMonthButton]: cn(
    calendarNavButtonStyles({ shape }),
    classNames?.[UI.PreviousMonthButton],
  ),
  [UI.NextMonthButton]: cn(
    calendarNavButtonStyles({ shape }),
    classNames?.[UI.NextMonthButton],
  ),
  [UI.MonthGrid]: cn(calendarMonthGridStyles(), classNames?.[UI.MonthGrid]),
  [UI.Weekdays]: cn(calendarWeekdaysStyles(), classNames?.[UI.Weekdays]),
  [UI.Weekday]: cn(calendarWeekdayStyles(), classNames?.[UI.Weekday]),
  [UI.Weeks]: cn(classNames?.[UI.Weeks]),
  [UI.Week]: cn(calendarWeekStyles(), classNames?.[UI.Week]),
  [UI.Day]: cn(calendarDayStyles(), classNames?.[UI.Day]),
  [UI.DayButton]: cn(
    calendarDayButtonStyles({ shape }),
    classNames?.[UI.DayButton],
  ),
  [UI.Dropdowns]: cn(calendarDropdownsStyles(), classNames?.[UI.Dropdowns]),
  [UI.DropdownRoot]: cn(
    calendarDropdownRootStyles(),
    classNames?.[UI.DropdownRoot],
  ),
  [UI.Dropdown]: cn(calendarDropdownStyles(), classNames?.[UI.Dropdown]),
  [UI.MonthsDropdown]: cn(
    calendarDropdownStyles(),
    'calendar-month-dropdown',
    classNames?.[UI.MonthsDropdown],
  ),
  [UI.YearsDropdown]: cn(
    calendarDropdownStyles(),
    'calendar-year-dropdown',
    classNames?.[UI.YearsDropdown],
  ),
  [UI.Footer]: cn(calendarFooterStyles(), classNames?.[UI.Footer]),
  [SelectionState.selected]: cn(
    calendarSelectedStyles(),
    classNames?.[SelectionState.selected],
  ),
  [SelectionState.range_start]: cn(
    calendarRangeStartStyles({ shape }),
    classNames?.[SelectionState.range_start],
  ),
  [SelectionState.range_middle]: cn(
    calendarRangeMiddleStyles({ shape }),
    classNames?.[SelectionState.range_middle],
  ),
  [SelectionState.range_end]: cn(
    calendarRangeEndStyles({ shape }),
    classNames?.[SelectionState.range_end],
  ),
  [DayFlag.today]: cn(calendarTodayStyles(), classNames?.[DayFlag.today]),
  [DayFlag.outside]: cn(calendarOutsideStyles(), classNames?.[DayFlag.outside]),
  [DayFlag.disabled]: cn(
    calendarDisabledStyles(),
    classNames?.[DayFlag.disabled],
  ),
});

const getCalendarComponents = (
  components: CalendarProps['components'],
): Partial<CustomComponents> => ({
  Chevron: CalendarChevron,
  ...components,
});

export const Calendar: FC<CalendarProps> = ({
  className,
  classNames,
  components,
  shape = 'squared',
  showOutsideDays = true,
  ...props
}) => {
  const mergedClassNames = useMemo(
    () => getCalendarClassNames(classNames, shape),
    [classNames, shape],
  );
  const mergedComponents = useMemo(
    () => getCalendarComponents(components),
    [components],
  );

  return (
    <DayPicker
      {...props}
      className={cn(calendarRootStyles(), className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      navLayout='after'
      showOutsideDays={showOutsideDays}
    />
  );
};
