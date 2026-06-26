import type { ComponentPropsWithoutRef, ReactNode } from 'react';

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
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  buttons?: ButtonGroupItem[];
  orientation?: ButtonGroupOrientation;
  size?: ButtonGroupSizes;
  inverted?: boolean;
}
