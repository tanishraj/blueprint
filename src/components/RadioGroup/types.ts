import type { FieldsetHTMLAttributes, ReactNode } from 'react';

import type { RadioProps, RadioSizes } from '../Radio/types';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

export type RadioGroupSizes = RadioSizes;

export interface RadioGroupOption extends Omit<
  RadioProps,
  | 'checked'
  | 'defaultChecked'
  | 'children'
  | 'error'
  | 'name'
  | 'ref'
  | 'required'
  | 'size'
  | 'type'
  | 'value'
> {
  value: string;
}

export interface RadioGroupProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'children' | 'defaultValue' | 'onChange' | 'value'
> {
  defaultValue?: string;
  description?: ReactNode;
  error?: ReactNode;
  label?: ReactNode;
  name?: string;
  onValueChange?: (value: string) => void;
  options: RadioGroupOption[];
  orientation?: RadioGroupOrientation;
  required?: boolean;
  size?: RadioGroupSizes;
  value?: string;
}
