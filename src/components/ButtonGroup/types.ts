import { type HTMLAttributes, type ReactNode } from 'react';

import type { ButtonProps, ButtonSizes } from '../Button';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export type ButtonGroupSizes = ButtonSizes;

export interface ButtonGroupItem extends Omit<
  ButtonProps,
  'children' | 'ref' | 'className'
> {
  children?: ReactNode;
  id?: string;
}

export interface ButtonGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className'
> {
  buttons?: ButtonGroupItem[];
  orientation?: ButtonGroupOrientation;
  size?: ButtonGroupSizes;
  inverted?: boolean;
  role?: 'group' | string;
}
