import { type FC, useCallback, useId, useState } from 'react';

import { cn } from '@/utils';

import { Checkbox } from '../Checkbox';
import {
  checkboxGroupDescriptionStyles,
  checkboxGroupHeaderStyles,
  checkboxGroupItemsStyles,
  checkboxGroupLegendStyles,
  checkboxGroupRequiredStyles,
  checkboxGroupStyles,
} from './CheckboxGroup.styles';
import type {
  CheckboxGroupOption,
  CheckboxGroupProps,
  CheckboxGroupSizes,
} from './types';

interface CheckboxGroupItemProps {
  option: CheckboxGroupOption;
  checked: boolean;
  disabled: boolean;
  invalid: boolean;
  name: string | undefined;
  size?: CheckboxGroupSizes;
  onItemChange: (value: string, checked: boolean) => void;
}

const CheckboxGroupItem: FC<CheckboxGroupItemProps> = ({
  option,
  checked,
  disabled,
  invalid,
  name,
  size,
  onItemChange,
}) => {
  const {
    value,
    disabled: optionDisabled,
    onChange: optionOnChange,
    ...checkboxProps
  } = option;
  const resolvedDisabled = disabled || Boolean(optionDisabled);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onItemChange(value, event.target.checked);
      optionOnChange?.(event);
    },
    [onItemChange, optionOnChange, value],
  );

  return (
    <Checkbox
      {...checkboxProps}
      name={name}
      value={value}
      size={size}
      checked={checked}
      disabled={resolvedDisabled}
      aria-invalid={invalid || undefined}
      onChange={handleChange}
    />
  );
};

const toggleValue = (
  currentValue: string[],
  optionValue: string,
  checked: boolean,
) => {
  if (checked) {
    return currentValue.indexOf(optionValue) >= 0
      ? currentValue
      : [...currentValue, optionValue];
  }

  return currentValue.filter(value => value !== optionValue);
};

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  options,
  value,
  defaultValue = [],
  onValueChange,
  name,
  label,
  description,
  error,
  size = 'md',
  orientation = 'vertical',
  disabled = false,
  required = false,
  className,
  ...restProps
}) => {
  const generatedId = useId();
  const helperId = `${generatedId}-helper`;
  const [uncontrolledValue, setUncontrolledValue] =
    useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const selectedValue = value ?? uncontrolledValue;
  const invalid = Boolean(error) || restProps['aria-invalid'] === true;
  const helperText = error ?? description;

  const handleItemChange = useCallback(
    (optionValue: string, checked: boolean) => {
      const nextValue = toggleValue(selectedValue, optionValue, checked);

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange, selectedValue],
  );

  return (
    <fieldset
      {...restProps}
      disabled={disabled}
      aria-describedby={helperText ? helperId : restProps['aria-describedby']}
      className={cn(checkboxGroupStyles({ disabled }), className)}
    >
      {label && (
        <legend className={cn(checkboxGroupLegendStyles({ size }))}>
          {label}
          {required && (
            <span
              aria-hidden='true'
              className={cn(checkboxGroupRequiredStyles())}
            >
              *
            </span>
          )}
        </legend>
      )}
      {helperText && (
        <span className={cn(checkboxGroupHeaderStyles())}>
          <span
            id={helperId}
            className={cn(checkboxGroupDescriptionStyles({ size, invalid }))}
          >
            {helperText}
          </span>
        </span>
      )}
      <div className={cn(checkboxGroupItemsStyles({ orientation }))}>
        {options.map(option => (
          <CheckboxGroupItem
            key={option.value}
            option={option}
            checked={selectedValue.indexOf(option.value) >= 0}
            disabled={disabled}
            invalid={invalid}
            name={name}
            size={size}
            onItemChange={handleItemChange}
          />
        ))}
      </div>
    </fieldset>
  );
};
