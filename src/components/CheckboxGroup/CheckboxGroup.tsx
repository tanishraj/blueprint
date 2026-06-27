import { type ChangeEvent, useCallback, useId, useState } from 'react';

import { cn } from '@/utils/classNames';

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
  CheckboxGroupShapes,
  CheckboxGroupSizes,
} from './types';

interface CheckboxGroupItemProps {
  option: CheckboxGroupOption;
  checked: boolean;
  disabled: boolean;
  describedBy?: string;
  invalid: boolean;
  name: string | undefined;
  size?: CheckboxGroupSizes;
  shape?: CheckboxGroupShapes;
  onItemChange: (value: string, checked: boolean) => void;
}

const CheckboxGroupItem = ({
  option,
  checked,
  disabled,
  describedBy,
  invalid,
  name,
  size,
  shape,
  onItemChange,
}: CheckboxGroupItemProps) => {
  const {
    value,
    shape: optionShape,
    disabled: optionDisabled,
    onChange: optionOnChange,
    ...checkboxProps
  } = option;
  const resolvedDisabled = disabled || Boolean(optionDisabled);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onItemChange(value, event.target.checked);
      optionOnChange?.(event);
    },
    [onItemChange, optionOnChange, value],
  );

  return (
    <Checkbox
      {...checkboxProps}
      aria-describedby={describedBy}
      name={name}
      value={value}
      size={size}
      shape={optionShape ?? shape}
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

export function CheckboxGroup({
  options,
  value,
  defaultValue = [],
  onValueChange,
  name,
  label,
  description,
  error,
  size = 'md',
  shape = 'square',
  orientation = 'vertical',
  disabled = false,
  required = false,
  className,
  ...restProps
}: CheckboxGroupProps) {
  const generatedId = useId();
  const helperId = `${generatedId}-helper`;
  const [uncontrolledValue, setUncontrolledValue] =
    useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const selectedValue = value ?? uncontrolledValue;
  const invalid = Boolean(error) || restProps['aria-invalid'] === true;
  const helperText = error ?? description;
  const describedByParts = [
    restProps['aria-describedby'],
    helperText ? helperId : undefined,
  ].filter(Boolean);
  const describedBy =
    describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

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
      aria-describedby={describedBy}
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
            shape={shape}
            onItemChange={handleItemChange}
            {...(describedBy !== undefined ? { describedBy } : {})}
          />
        ))}
      </div>
    </fieldset>
  );
}
