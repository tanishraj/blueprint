import type {
  ComponentPropsWithRef,
  ComponentType,
  ReactNode,
  SVGProps,
} from 'react';

import type { ButtonSizes, ButtonVariants } from '../Button';

export type InputVariants = ButtonVariants;

export type InputSizes = ButtonSizes;

export type InputIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface InputProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'prefix' | 'size'
> {
  caption?: ReactNode;
  clearLabel?: string;
  clearable?: boolean;
  containerClassName?: string;
  error?: ReactNode;
  fullWidth?: boolean;
  inputClassName?: string;
  label?: ReactNode;
  labelClassName?: string;
  leadingIcon?: InputIcon;
  onClear?: () => void;
  size?: InputSizes;
  trailingIcon?: InputIcon;
  variant?: InputVariants;
}
