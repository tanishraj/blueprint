import {
  type ComponentPropsWithRef,
  type FC,
  type ReactNode,
  type Ref,
  useCallback,
  useId,
  useRef,
} from 'react';

import { cn } from '@/utils';

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
import type { RadioSizes } from './types';

export interface RadioProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'size' | 'type'
> {
  description?: ReactNode;
  error?: ReactNode;
  label?: ReactNode;
  size?: RadioSizes;
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

export const Radio: FC<RadioProps> = ({
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
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const invalid =
    Boolean(error) || ariaInvalid === true || ariaInvalid === 'true';
  const helperText = error ?? description;

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );

  return (
    <label
      className={cn(radioRootStyles({ disabled }), className)}
      htmlFor={inputId}
    >
      <span className='relative inline-flex'>
        <input
          {...restProps}
          ref={setInputRef}
          id={inputId}
          aria-describedby={helperText ? helperId : ariaDescribedBy}
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
          className={cn(radioControlStyles({ size, invalid }))}
        >
          <span className={cn(radioDotStyles({ size, invalid }))} />
        </span>
      </span>

      {(label || helperText) && (
        <span className={cn(radioContentStyles())}>
          {label && (
            <span className={cn(radioLabelStyles({ size }))}>
              {label}
              {required && (
                <span aria-hidden='true' className={cn(radioRequiredStyles())}>
                  *
                </span>
              )}
            </span>
          )}
          {helperText && (
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
};
