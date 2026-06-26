import type { DayPickerProps } from 'react-day-picker';

export type CalendarShape = 'squared' | 'circle';

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type CalendarProps = DistributiveOmit<DayPickerProps, 'navLayout'> & {
  shape?: CalendarShape;
};
