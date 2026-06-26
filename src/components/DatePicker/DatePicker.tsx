import {
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { CalendarDays } from 'lucide-react';

import { cn } from '@/utils/classNames';
import { mergeRefs } from '@/utils/mergeRefs';

import { Calendar } from '../Calendar';
import { Input } from '../Input';
import {
  datePickerPanelStyles,
  datePickerRootStyles,
} from './DatePicker.styles';
import type { DatePickerProps } from './types';

const defaultFormatDate = (date: Date) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

const getInitialMonth = (
  selectedDate: Date | undefined,
  defaultMonth: Date | undefined,
) => selectedDate ?? defaultMonth ?? new Date();

const getTextLabel = (
  value: DatePickerProps['label'] | DatePickerProps['aria-label'],
) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  return 'Choose date';
};

export function DatePicker({
  calendarProps,
  className,
  clearLabel = 'Clear date',
  clearable = false,
  closeOnSelect = true,
  defaultOpen = false,
  defaultValue,
  disabled = false,
  formatDate = defaultFormatDate,
  id,
  inputClassName,
  label,
  onClear,
  onClick,
  onKeyDown,
  onOpenChange,
  onValueChange,
  open,
  panelClassName,
  size = 'md',
  value,
  variant = 'default',
  ...restProps
}: DatePickerProps) {
  const {
    className: calendarClassName,
    classNames: calendarBaseClassNames,
    defaultMonth,
    month: controlledMonth,
    onMonthChange,
    ...restCalendarProps
  } = calendarProps ?? {};
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const dialogId = `${inputId}-dialog`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const isControlled = value !== undefined;
  const isOpenControlled = open !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [viewMonthOverride, setViewMonthOverride] = useState<Date | undefined>(
    () => defaultMonth,
  );
  const selectedDate = isControlled ? value : uncontrolledValue;
  const isOpen = isOpenControlled ? open : uncontrolledOpen;
  const isCalendarOpen = !disabled && isOpen;
  const displayedMonth =
    controlledMonth ??
    viewMonthOverride ??
    selectedDate ??
    getInitialMonth(undefined, defaultMonth);
  const formattedValue = useMemo(
    () => (selectedDate ? formatDate(selectedDate) : ''),
    [formatDate, selectedDate],
  );
  const inputAriaLabel = getTextLabel(restProps['aria-label'] ?? label);
  const panelAriaLabel = `${inputAriaLabel} calendar`;
  const hasValue = selectedDate !== undefined;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isOpenControlled, onOpenChange],
  );

  const setSelectedDate = useCallback(
    (nextValue: Date | undefined) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
  });
  const role = useRole(context, { role: 'dialog' });
  const { getFloatingProps } = useInteractions([dismiss, role]);
  const { setReference, setFloating } = refs;

  const handleMonthChange = useCallback(
    (nextMonth: Date) => {
      if (controlledMonth === undefined) {
        setViewMonthOverride(nextMonth);
      }

      onMonthChange?.(nextMonth);
    },
    [controlledMonth, onMonthChange],
  );

  const handleSelect = useCallback(
    (nextDate: Date | undefined) => {
      setSelectedDate(nextDate);

      if (nextDate && controlledMonth === undefined) {
        setViewMonthOverride(nextDate);
      }

      if (closeOnSelect && nextDate) {
        setOpen(false);
        inputRef.current?.focus();
      }
    },
    [closeOnSelect, controlledMonth, setOpen, setSelectedDate],
  );

  const handleClear = useCallback(() => {
    setSelectedDate(undefined);
    setOpen(false);
    inputRef.current?.focus();
    onClear?.();
  }, [onClear, setOpen, setSelectedDate]);

  const handleInputClick = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      onClick?.(event);

      if (event.defaultPrevented || disabled) {
        return;
      }

      setOpen(!isOpen);
    },
    [disabled, isOpen, onClick, setOpen],
  );

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented || disabled) {
        return;
      }

      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (
        event.key === 'ArrowDown' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        setOpen(true);
      }
    },
    [disabled, isOpen, onKeyDown, setOpen],
  );

  const inputRefCallback = useMemo(
    () => mergeRefs<HTMLInputElement>(inputRef, restProps.ref),
    [restProps.ref],
  );
  const fieldRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      fieldRef.current = node;
      setReference(node);
    },
    [setReference],
  );
  const inputProps = {
    className: cn('cursor-pointer', className),
    inputClassName: cn('cursor-pointer', inputClassName),
  };
  const calendarComponentProps = {
    ...(calendarClassName
      ? {
          className: cn('rounded shadow-none', calendarClassName),
        }
      : { className: 'rounded shadow-none' }),
    ...(calendarBaseClassNames ? { classNames: calendarBaseClassNames } : {}),
  };
  const floatingProps = getFloatingProps({
    'aria-label': panelAriaLabel,
    className: cn(datePickerPanelStyles(), panelClassName),
    id: dialogId,
    style: {
      ...floatingStyles,
    },
  });

  useEffect(() => {
    const node = fieldRef.current;

    if (!node) {
      return;
    }

    const handleFieldClick = (event: globalThis.MouseEvent) => {
      if (disabled || event.defaultPrevented) {
        return;
      }

      if (
        event.target instanceof HTMLInputElement ||
        (event.target instanceof Element &&
          event.target.closest('button') !== null)
      ) {
        return;
      }

      setOpen(!isOpen);
      inputRef.current?.focus();
    };

    node.addEventListener('click', handleFieldClick);

    return () => {
      node.removeEventListener('click', handleFieldClick);
    };
  }, [disabled, isOpen, setOpen]);

  return (
    <div className={cn(datePickerRootStyles())}>
      <Input
        {...restProps}
        {...inputProps}
        aria-controls={dialogId}
        aria-expanded={isCalendarOpen}
        aria-haspopup='dialog'
        clearLabel={clearLabel}
        clearable={clearable && hasValue}
        disabled={disabled}
        fieldRef={fieldRefCallback}
        id={inputId}
        label={label}
        onClear={handleClear}
        onClick={handleInputClick}
        onKeyDown={handleInputKeyDown}
        placeholder={restProps.placeholder}
        readOnly
        ref={inputRefCallback}
        size={size}
        trailingIcon={CalendarDays}
        value={formattedValue}
        variant={variant}
      />
      {isCalendarOpen && (
        <FloatingPortal>
          <div {...floatingProps} ref={setFloating}>
            <Calendar
              {...restCalendarProps}
              {...calendarComponentProps}
              mode='single'
              month={displayedMonth}
              onMonthChange={handleMonthChange}
              onSelect={handleSelect}
              selected={selectedDate}
            />
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
