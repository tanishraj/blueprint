import { type ChangeEvent, type FC, useCallback, useId, useState } from 'react';

import { cn } from '@/utils';

import { Radio } from '../Radio';
import {
  radioGroupDescriptionStyles,
  radioGroupHeaderStyles,
  radioGroupItemsStyles,
  radioGroupLegendStyles,
  radioGroupRequiredStyles,
  radioGroupStyles,
} from './RadioGroup.styles';
import type {
  RadioGroupOption,
  RadioGroupProps,
  RadioGroupSizes,
} from './types';

interface RadioGroupItemProps {
  checked: boolean;
  disabled: boolean;
  invalid: boolean;
  name: string;
  onItemChange: (value: string) => void;
  option: RadioGroupOption;
  size?: RadioGroupSizes;
}

const RadioGroupItem: FC<RadioGroupItemProps> = ({
  checked,
  disabled,
  invalid,
  name,
  onItemChange,
  option,
  size,
}) => {
  const {
    value,
    disabled: optionDisabled,
    onChange: optionOnChange,
    ...radioProps
  } = option;
  const resolvedDisabled = disabled || Boolean(optionDisabled);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (resolvedDisabled) {
        return;
      }

      if (event.target.checked) {
        onItemChange(value);
      }

      optionOnChange?.(event);
    },
    [onItemChange, optionOnChange, resolvedDisabled, value],
  );

  return (
    <Radio
      {...radioProps}
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

export const RadioGroup: FC<RadioGroupProps> = ({
  options,
  value,
  defaultValue,
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
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}) => {
  const generatedId = useId();
  const helperId = `${generatedId}-helper`;
  const groupName = name ?? generatedId;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selectedValue = value ?? uncontrolledValue;
  const invalid =
    Boolean(error) || ariaInvalid === true || ariaInvalid === 'true';
  const helperText = error ?? description;

  const handleItemChange = useCallback(
    (optionValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(optionValue);
      }

      onValueChange?.(optionValue);
    },
    [isControlled, onValueChange],
  );

  return (
    <fieldset
      {...restProps}
      aria-describedby={helperText ? helperId : ariaDescribedBy}
      className={cn(radioGroupStyles({ disabled }), className)}
      disabled={disabled}
    >
      {label && (
        <legend className={cn(radioGroupLegendStyles({ size }))}>
          {label}
          {required && (
            <span aria-hidden='true' className={cn(radioGroupRequiredStyles())}>
              *
            </span>
          )}
        </legend>
      )}
      {helperText && (
        <span className={cn(radioGroupHeaderStyles())}>
          <span
            className={cn(radioGroupDescriptionStyles({ size, invalid }))}
            id={helperId}
          >
            {helperText}
          </span>
        </span>
      )}
      <div className={cn(radioGroupItemsStyles({ orientation }))}>
        {options.map(option => (
          <RadioGroupItem
            key={option.value}
            checked={selectedValue === option.value}
            disabled={disabled}
            invalid={invalid}
            name={groupName}
            onItemChange={handleItemChange}
            option={option}
            size={size}
          />
        ))}
      </div>
    </fieldset>
  );
};
