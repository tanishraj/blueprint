import type { ReactNode } from 'react';

import { cn } from '@/utils/classNames';

import {
  inputCaptionStyles,
  inputLabelStyles,
  inputRequiredStyles,
  inputRootStyles,
} from '../Input/Input.styles';
import type { SelectSizes } from './types';
import { getHelperTextId, hasContent } from './shared.helpers';

interface SelectFieldShellProps {
  children: ReactNode;
  containerClassName?: string | undefined;
  disabled?: boolean | undefined;
  fullWidth?: boolean | undefined;
  helperText?: ReactNode | undefined;
  id: string;
  invalid?: boolean | undefined;
  label?: ReactNode | undefined;
  labelClassName?: string | undefined;
  required?: boolean | undefined;
  size?: SelectSizes | undefined;
}

export const SelectFieldShell = ({
  children,
  containerClassName,
  disabled = false,
  fullWidth = false,
  helperText,
  id,
  invalid = false,
  label,
  labelClassName,
  required = false,
  size = 'md',
}: SelectFieldShellProps) => {
  const captionId = getHelperTextId(id);

  return (
    <div className={cn(inputRootStyles({ fullWidth }), containerClassName)}>
      {hasContent(label) && (
        <label
          className={cn(inputLabelStyles({ size, disabled }), labelClassName)}
          htmlFor={id}
        >
          {label}
          {required && (
            <span aria-hidden='true' className={cn(inputRequiredStyles())}>
              *
            </span>
          )}
        </label>
      )}

      {children}

      {hasContent(helperText) && (
        <p
          className={cn(
            inputCaptionStyles({
              size,
              invalid,
              disabled,
            }),
          )}
          id={captionId}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
