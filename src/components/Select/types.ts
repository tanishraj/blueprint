import type { ReactNode, Ref } from 'react';
import type { GroupBase, SelectInstance } from 'react-select';
import type { CreatableProps } from 'react-select/creatable';

import type { InputSizes, InputVariants } from '../Input/types';

export type SelectSizes = InputSizes;
export type SelectVariants = InputVariants;
export type SelectAriaInvalid =
  | boolean
  | 'false'
  | 'grammar'
  | 'spelling'
  | 'true';

export interface SelectOption<T = string | number> {
  label: ReactNode;
  value?: T;
  __isNew__?: boolean;
  disabled?: boolean;
  options?: SelectOption<T>[];
}

export interface GroupedSelectOption<
  T = string | number,
> extends SelectOption<T> {
  group: string;
}

export interface SelectProps<
  Option extends SelectOption = SelectOption,
  IsMulti extends boolean = false,
> extends Omit<CreatableProps<Option, IsMulti, GroupBase<Option>>, 'size'> {
  'aria-describedby'?: string;
  'aria-invalid'?: SelectAriaInvalid;
  caption?: ReactNode;
  containerClassName?: string;
  createText?: string;
  disabled?: boolean;
  error?: ReactNode;
  errorMsg?: ReactNode;
  fullWidth?: boolean;
  hideErrorMsg?: boolean;
  hintText?: ReactNode;
  inputClassName?: string;
  isCreatable?: boolean;
  label?: ReactNode;
  labelClassName?: string;
  readOnly?: boolean;
  readonly?: boolean;
  ref?: Ref<SelectInstance<Option, IsMulti, GroupBase<Option>>>;
  required?: boolean;
  size?: SelectSizes;
  variant?: SelectVariants;
}
