import { cn } from '@/utils/classNames';

import {
  labelAdornmentStyles,
  labelRequiredStyles,
  labelStyles,
  labelTextStyles,
} from './Label.styles';
import type { LabelProps } from './types';

const labelWeightClassMap = {
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
} as const;

const hasLabelText = (text: LabelProps['text']) =>
  text !== undefined && text !== null;

export function Label({
  children,
  className,
  disabled = false,
  endAdornment,
  labelWeight = 'semibold',
  position = 'top',
  required = false,
  size = 'md',
  text,
  variant = 'primary',
  ...restProps
}: LabelProps) {
  const labelText = (
    <div className={cn(labelTextStyles({ variant, size }))}>
      <span className={labelWeightClassMap[labelWeight]}>
        {text}
        {required ? (
          <span aria-hidden='true' className={cn(labelRequiredStyles())}>
            *
          </span>
        ) : null}
      </span>
      {endAdornment ? (
        <span className={cn(labelAdornmentStyles())}>{endAdornment}</span>
      ) : null}
    </div>
  );
  const isTop = position === 'top';
  const isLeft = position === 'left';
  const isBottom = position === 'bottom';
  const isRight = position === 'right';

  return (
    <label
      aria-disabled={disabled || undefined}
      {...restProps}
      className={cn(labelStyles({ variant, position, disabled }), className)}
    >
      {(isTop || isLeft) && hasLabelText(text) ? labelText : null}
      {children}
      {(isBottom || isRight) && hasLabelText(text) ? labelText : null}
    </label>
  );
}
