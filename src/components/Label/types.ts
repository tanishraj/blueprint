import type { LabelHTMLAttributes, ReactNode } from 'react';

export type LabelVariant = 'primary' | 'secondary' | 'tertiary';
export type LabelSize = 'lg' | 'md' | 'sm';
export type LabelPosition = 'top' | 'bottom' | 'right' | 'left';
export type LabelWeight = 'semibold' | 'medium' | 'normal';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  endAdornment?: ReactNode;
  labelWeight?: LabelWeight;
  position?: LabelPosition;
  required?: boolean;
  size?: LabelSize;
  text?: ReactNode;
  variant?: LabelVariant;
}

export type ILabelProps = LabelProps;
