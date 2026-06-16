import {
  type ChangeEvent,
  type FC,
  type Ref,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';
import { X } from 'lucide-react';

import { cn } from '@/utils';

import {
  inputCaptionStyles,
  inputClearButtonStyles,
  inputElementStyles,
  inputFieldStyles,
  inputIconStyles,
  inputLabelStyles,
  inputRequiredStyles,
  inputRootStyles,
} from './Input.styles';
import type { InputProps } from './types';

const assignRef = <T,>(ref: Ref<T> | undefined, value: T) => {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  ref.current = value;
};

const hasInputValue = (value: InputProps['value']) =>
  value !== undefined && value !== null && String(value).length > 0;

export const Input: FC<InputProps> = ({
  ref,
  id,
  label,
  caption,
  error,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  clearable = false,
  clearLabel = 'Clear input',
  containerClassName,
  labelClassName,
  inputClassName,
  className,
  disabled = false,
  required = false,
  value,
  defaultValue,
  onChange,
  onClear,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = `${inputId}-caption`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uncontrolledHasValue, setUncontrolledHasValue] = useState(() =>
    hasInputValue(defaultValue),
  );
  const isControlled = value !== undefined;
  const invalid =
    Boolean(error) || ariaInvalid === true || ariaInvalid === 'true';
  const helperText = error ?? caption;
  const showClearButton =
    clearable &&
    !disabled &&
    (isControlled ? hasInputValue(value) : uncontrolledHasValue);

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledHasValue(event.currentTarget.value.length > 0);
      }

      onChange?.(event);
    },
    [isControlled, onChange],
  );

  const handleClear = useCallback(() => {
    if (!isControlled && inputRef.current) {
      inputRef.current.value = '';
      setUncontrolledHasValue(false);
    }

    inputRef.current?.focus();
    onClear?.();
  }, [isControlled, onClear]);

  return (
    <div className={cn(inputRootStyles({ fullWidth }), containerClassName)}>
      {label && (
        <label
          className={cn(inputLabelStyles({ size, disabled }), labelClassName)}
          htmlFor={inputId}
        >
          {label}
          {required && (
            <span aria-hidden='true' className={cn(inputRequiredStyles())}>
              *
            </span>
          )}
        </label>
      )}

      <div
        className={cn(
          inputFieldStyles({ size, variant, disabled, invalid, fullWidth }),
          className,
        )}
      >
        {LeadingIcon && (
          <LeadingIcon
            aria-hidden='true'
            className={cn(inputIconStyles({ size }))}
            focusable='false'
          />
        )}
        <input
          {...restProps}
          ref={setInputRef}
          id={inputId}
          aria-describedby={helperText ? captionId : ariaDescribedBy}
          aria-invalid={invalid || undefined}
          className={cn(inputElementStyles(), inputClassName)}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={handleChange}
          required={required}
          value={value}
        />
        {showClearButton && (
          <button
            aria-label={clearLabel}
            className={cn(inputClearButtonStyles({ size }))}
            onClick={handleClear}
            type='button'
          >
            <X aria-hidden='true' className={cn(inputIconStyles({ size }))} />
          </button>
        )}
        {TrailingIcon && (
          <TrailingIcon
            aria-hidden='true'
            className={cn(inputIconStyles({ size, muted: true }))}
            focusable='false'
          />
        )}
      </div>

      {helperText && (
        <p
          className={cn(inputCaptionStyles({ size, invalid, disabled }))}
          id={captionId}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
