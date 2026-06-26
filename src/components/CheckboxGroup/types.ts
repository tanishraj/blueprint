import { type FieldsetHTMLAttributes, type ReactNode } from 'react';

import type { CheckboxProps, CheckboxShapes, CheckboxSizes } from '../Checkbox';

export type CheckboxGroupOrientation = 'horizontal' | 'vertical';

export type CheckboxGroupSizes = CheckboxSizes;

export type CheckboxGroupShapes = CheckboxShapes;

export interface CheckboxGroupOption extends Omit<
  CheckboxProps,
  | 'checked'
  | 'description'
  | 'defaultChecked'
  | 'children'
  | 'error'
  | 'name'
  | 'ref'
  | 'size'
  | 'type'
  | 'value'
> {
  value: string;
}

export interface CheckboxGroupProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'children' | 'defaultValue' | 'onChange' | 'value'
> {
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  name?: string;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: CheckboxGroupSizes;
  shape?: CheckboxGroupShapes;
  orientation?: CheckboxGroupOrientation;
  required?: boolean;
}
