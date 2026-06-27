import type { InputProps } from '../Input';
import type { CalendarProps } from '../Calendar';

export type DatePickerCalendarProps = Omit<
  CalendarProps,
  'mode' | 'selected' | 'onSelect'
>;

type BaseDatePickerProps = Omit<
  InputProps,
  | 'defaultValue'
  | 'leadingIcon'
  | 'onChange'
  | 'onClear'
  | 'readOnly'
  | 'trailingIcon'
  | 'type'
  | 'value'
> & {
  calendarProps?: DatePickerCalendarProps | undefined;
  closeOnSelect?: boolean;
  defaultOpen?: boolean;
  defaultValue?: Date | undefined;
  formatDate?: (date: Date) => string;
  onClear?: () => void;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: Date | undefined) => void;
  open?: boolean;
  panelClassName?: string;
  value?: Date | undefined;
};

export type DatePickerProps = Readonly<BaseDatePickerProps>;
