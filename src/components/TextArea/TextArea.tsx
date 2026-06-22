import {
  type ChangeEvent,
  type FC,
  type Ref,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';

import { cn } from '@/utils';

import {
  textAreaCaptionStyles,
  textAreaElementStyles,
  textAreaFieldStyles,
  textAreaLabelStyles,
  textAreaRequiredStyles,
  textAreaRootStyles,
} from './TextArea.styles';
import type { TextAreaProps } from './types';

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

const getTextAreaValue = (
  value: TextAreaProps['value'] | TextAreaProps['defaultValue'],
) => {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.join('');
  }

  return '';
};

export const TextArea: FC<TextAreaProps> = ({
  ref,
  id,
  label,
  caption,
  error,
  size = 'md',
  variant = 'default',
  fullWidth = true,
  containerClassName,
  labelClassName,
  textAreaClassName,
  className,
  disabled = false,
  required = false,
  value,
  defaultValue,
  maxLength,
  onChange,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}) => {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;
  const captionId = `${textAreaId}-caption`;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    getTextAreaValue(defaultValue),
  );
  const currentValue =
    value !== undefined ? getTextAreaValue(value) : uncontrolledValue;
  const invalid =
    Boolean(error) || ariaInvalid === true || ariaInvalid === 'true';
  const countLabel =
    typeof maxLength === 'number'
      ? `${currentValue.length} of ${maxLength} characters`
      : null;
  const helperText = error ?? caption ?? countLabel;

  const setTextAreaRef = useCallback(
    (node: HTMLTextAreaElement | null) => {
      textAreaRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setUncontrolledValue(event.currentTarget.value);
      }

      onChange?.(event);
    },
    [onChange, value],
  );

  return (
    <div className={cn(textAreaRootStyles({ fullWidth }), containerClassName)}>
      {label && (
        <label
          className={cn(
            textAreaLabelStyles({ size, disabled }),
            labelClassName,
          )}
          htmlFor={textAreaId}
        >
          {label}
          {required && (
            <span aria-hidden='true' className={cn(textAreaRequiredStyles())}>
              *
            </span>
          )}
        </label>
      )}

      <div
        className={cn(
          textAreaFieldStyles({ size, variant, disabled, invalid, fullWidth }),
          className,
        )}
      >
        <textarea
          {...restProps}
          ref={setTextAreaRef}
          id={textAreaId}
          aria-describedby={helperText ? captionId : ariaDescribedBy}
          aria-invalid={invalid || undefined}
          className={cn(textAreaElementStyles(), textAreaClassName)}
          defaultValue={defaultValue}
          disabled={disabled}
          maxLength={maxLength}
          onChange={handleChange}
          required={required}
          value={value}
        />
      </div>

      {helperText && (
        <p
          className={cn(textAreaCaptionStyles({ size, invalid, disabled }))}
          id={captionId}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
