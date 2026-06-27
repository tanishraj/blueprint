import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type MouseEvent,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';
import { Check, Minus } from 'lucide-react';

import { cn } from '@/utils/classNames';

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
import type { CheckboxShapes, CheckboxSizes } from './types';

export interface CheckboxProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'size' | 'type'
> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: CheckboxSizes;
  shape?: CheckboxShapes;
  indeterminate?: boolean;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T) {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  ref.current = value;
}

export function Checkbox({
  ref,
  id,
  label,
  description,
  error,
  size = 'md',
  shape = 'square',
  indeterminate = false,
  disabled = false,
  required = false,
  checked,
  defaultChecked,
  className,
  onChange,
  onClick,
  ...restProps
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperTextId = `${inputId}-description`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const invalid = Boolean(error) || restProps['aria-invalid'] === true;
  const helperText = error ?? description;
  const hasHelperText = Boolean(helperText);
  const describedByParts = [
    restProps['aria-describedby'],
    helperText ? helperTextId : undefined,
  ].filter(Boolean);
  const describedBy =
    describedByParts.length > 0 ? describedByParts.join(' ') : undefined;
  const errorMessageId = error ? helperTextId : undefined;

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
      className={cn(checkboxRootStyles({ disabled, hasHelperText }), className)}
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
          aria-describedby={describedBy}
          aria-errormessage={errorMessageId}
          aria-invalid={invalid || undefined}
          className={cn(checkboxInputStyles())}
          onChange={handleChange}
          onClick={handleClick}
        />
        <span
          aria-hidden='true'
          className={cn(
            checkboxControlStyles({
              size,
              shape,
              hasHelperText,
              invalid,
              indeterminate,
            }),
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

      {label || helperText ? (
        <span className={cn(checkboxContentStyles())}>
          {label ? (
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
          ) : null}
          {helperText ? (
            <span
              id={helperTextId}
              className={cn(checkboxDescriptionStyles({ size, invalid }))}
            >
              {helperText}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}
