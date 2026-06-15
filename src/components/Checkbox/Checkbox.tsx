import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type FC,
  type MouseEvent,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';
import { Check, Minus } from 'lucide-react';

import { cn } from '@/utils';

import {
  checkboxCheckIconStyles,
  checkboxContentStyles,
  checkboxControlStyles,
  checkboxDescriptionStyles,
  checkboxIndeterminateIconStyles,
  checkboxInputStyles,
  checkboxLabelStyles,
  checkboxRequiredStyles,
  checkboxRootStyles,
} from './Checkbox.styles';
import type { CheckboxSizes } from './types';

export interface CheckboxProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'size' | 'type'
> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: CheckboxSizes;
  indeterminate?: boolean;
}

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

export const Checkbox: FC<CheckboxProps> = ({
  ref,
  id,
  label,
  description,
  error,
  size = 'md',
  indeterminate = false,
  disabled = false,
  required = false,
  checked,
  defaultChecked,
  className,
  onChange,
  onClick,
  ...restProps
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const invalid = Boolean(error) || restProps['aria-invalid'] === true;
  const helperText = error ?? description;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (inputRef.current) {
        inputRef.current.indeterminate = false;
      }

      onChange?.(event);
    },
    [onChange],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      if (inputRef.current) {
        inputRef.current.indeterminate = false;
      }

      onClick?.(event);
    },
    [onClick],
  );

  return (
    <label
      htmlFor={inputId}
      className={cn(checkboxRootStyles({ disabled }), className)}
    >
      <span className='relative inline-flex'>
        <input
          {...restProps}
          ref={setInputRef}
          id={inputId}
          type='checkbox'
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          aria-invalid={invalid || undefined}
          className={cn(checkboxInputStyles())}
          onChange={handleChange}
          onClick={handleClick}
        />
        <span
          aria-hidden='true'
          className={cn(
            checkboxControlStyles({ size, invalid, indeterminate }),
          )}
        >
          {indeterminate ? (
            <Minus
              strokeWidth={3}
              className={cn(checkboxIndeterminateIconStyles({ size }))}
            />
          ) : (
            <Check
              strokeWidth={3}
              className={cn(checkboxCheckIconStyles({ size }))}
            />
          )}
        </span>
      </span>

      {(label || helperText) && (
        <span className={cn(checkboxContentStyles())}>
          {label && (
            <span className={cn(checkboxLabelStyles({ size }))}>
              {label}
              {required && (
                <span
                  aria-hidden='true'
                  className={cn(checkboxRequiredStyles())}
                >
                  *
                </span>
              )}
            </span>
          )}
          {helperText && (
            <span className={cn(checkboxDescriptionStyles({ size, invalid }))}>
              {helperText}
            </span>
          )}
        </span>
      )}
    </label>
  );
};
