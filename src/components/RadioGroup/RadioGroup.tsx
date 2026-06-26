import {
  type ChangeEvent,
  type ReactNode,
  useCallback,
  useId,
  useState,
} from 'react';

import { cn } from '@/utils/classNames';

import { Radio } from '../Radio/Radio';
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

const RadioGroupItem = ({
  checked,
  disabled,
  invalid,
  name,
  onItemChange,
  option,
  size,
}: RadioGroupItemProps) => {
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

function hasContent(value: ReactNode | undefined) {
  return (
    value !== undefined && value !== null && value !== false && value !== ''
  );
}

export function RadioGroup({
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
}: RadioGroupProps) {
  const generatedId = useId();
  const helperId = `${generatedId}-description`;
  const groupName = name ?? generatedId;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selectedValue = value ?? uncontrolledValue;
  const invalid =
    Boolean(error) || ariaInvalid === true || ariaInvalid === 'true';
  const helperText = error ?? description;
  const hasLabel = hasContent(label);
  const hasHelperText = hasContent(helperText);
  const describedByParts = [
    ariaDescribedBy,
    hasHelperText ? helperId : undefined,
  ].filter(Boolean);
  const describedBy =
    describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

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
      aria-describedby={describedBy}
      className={cn(radioGroupStyles({ disabled }), className)}
      disabled={disabled}
    >
      {hasLabel && (
        <legend className={cn(radioGroupLegendStyles({ size }))}>
          {label}
          {required && (
            <span aria-hidden='true' className={cn(radioGroupRequiredStyles())}>
              *
            </span>
          )}
        </legend>
      )}
      {hasHelperText && (
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
}
