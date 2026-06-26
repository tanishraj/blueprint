import type { DayPickerProps } from 'react-day-picker';

export type CalendarShape = 'squared' | 'circle';

type CalendarDayPickerProps = DayPickerProps extends infer Props
  ? Props extends unknown
    ? Omit<Props, 'navLayout'>
    : never
  : never;

export type CalendarProps = CalendarDayPickerProps & {
  shape?: CalendarShape;
};
