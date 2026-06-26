import type { DayPickerProps } from 'react-day-picker';

export type CalendarShape = 'squared' | 'circle';

export type CalendarProps = DayPickerProps & {
  shape?: CalendarShape;
};
