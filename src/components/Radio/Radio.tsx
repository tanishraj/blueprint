import { type ReactNode, type Ref, useCallback, useId, useRef } from 'react';

import { cn } from '@/utils/classNames';

import {
  radioContentStyles,
  radioControlStyles,
  radioDescriptionStyles,
  radioDotStyles,
  radioInputStyles,
  radioLabelStyles,
  radioRequiredStyles,
  radioRootStyles,
} from './Radio.styles';
import type { RadioProps } from './types';

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

function hasContent(value: ReactNode | undefined) {
  return (
    value !== undefined && value !== null && value !== false && value !== ''
  );
}

export function Radio({
  ref,
  id,
  label,
  description,
  error,
  size = 'md',
  disabled = false,
  required = false,
  checked,
  defaultChecked,
  className,
  onChange,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}: RadioProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-description`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const invalid =
    Boolean(error) || ariaInvalid === true || ariaInvalid === 'true';
  const helperText = error ?? description;
  const hasLabel = hasContent(label);
  const hasHelperText = hasContent(helperText);
  const describedByParts = [
    ariaDescribedBy,
    hasHelperText ? helperId : undefined,
  ].filter(Boolean);
  const describedBy =
    describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );

  return (
    <label
      className={cn(radioRootStyles({ disabled, hasHelperText }), className)}
      htmlFor={inputId}
    >
      <span className='relative inline-flex'>
        <input
          {...restProps}
          ref={setInputRef}
          id={inputId}
          aria-describedby={describedBy}
          checked={checked}
          className={cn(radioInputStyles())}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          required={required}
          type='radio'
        />
        <span
          aria-hidden='true'
          className={cn(radioControlStyles({ size, hasHelperText, invalid }))}
        >
          <span className={cn(radioDotStyles({ size, invalid }))} />
        </span>
      </span>

      {(hasLabel || hasHelperText) && (
        <span className={cn(radioContentStyles())}>
          {hasLabel && (
            <span className={cn(radioLabelStyles({ size }))}>
              {label}
              {required && (
                <span aria-hidden='true' className={cn(radioRequiredStyles())}>
                  *
                </span>
              )}
            </span>
          )}
          {hasHelperText && (
            <span
              className={cn(radioDescriptionStyles({ size, invalid }))}
              id={helperId}
            >
              {helperText}
            </span>
          )}
        </span>
      )}
    </label>
  );
}
