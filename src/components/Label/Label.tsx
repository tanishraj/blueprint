import type { FC } from 'react';

import { cn } from '@/utils';

import { labelStyles, labelTextStyles } from './Label.styles';
import type { LabelProps } from './types';

const labelWeightClassMap = {
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
} as const;

export const Label: FC<LabelProps> = ({
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
}) => {
  const labelText = (
    <div className={cn(labelTextStyles({ variant, size }))}>
      <span className={labelWeightClassMap[labelWeight]}>
        {text}
        {required ? ' *' : null}
      </span>
      {endAdornment ? <div>{endAdornment}</div> : null}
    </div>
  );
  const isTop = position === 'top';
  const isLeft = position === 'left';
  const isBottom = position === 'bottom';
  const isRight = position === 'right';

  return (
    <label
      {...restProps}
      className={cn(labelStyles({ variant, position, disabled }), className)}
    >
      {(isTop || isLeft) && text ? labelText : null}
      {children}
      {(isBottom || isRight) && text ? labelText : null}
    </label>
  );
};
