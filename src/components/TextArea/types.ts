import type { ComponentPropsWithRef, ReactNode } from 'react';

import type { ButtonSizes, ButtonVariants } from '../Button';

export type TextAreaVariants = ButtonVariants;
export type TextAreaSizes = ButtonSizes;

export interface TextAreaProps extends Omit<
  ComponentPropsWithRef<'textarea'>,
  'children' | 'size'
> {
  caption?: ReactNode;
  containerClassName?: string;
  error?: ReactNode;
  fullWidth?: boolean;
  label?: ReactNode;
  labelClassName?: string;
  size?: TextAreaSizes;
  textAreaClassName?: string;
  variant?: TextAreaVariants;
}
