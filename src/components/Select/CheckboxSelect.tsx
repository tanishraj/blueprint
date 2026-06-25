import { Check } from 'lucide-react';
import { useCallback, useId, useMemo } from 'react';
import ReactSelect, {
  components,
  type GroupBase,
  type MultiValueProps,
} from 'react-select';

import { Badge } from '../Badge';
import {
  buildHelperText,
  createBaseSelectClassNames,
  createBaseSelectComponents,
  createBaseSelectStyles,
  defaultFormatOptionLabel,
  defaultGetOptionLabel,
  defaultGetOptionValue,
  getResolvedPlaceholder,
  SelectFieldShell,
} from './shared';
import type { SelectOption, SelectProps } from './types';

export interface CheckboxSelectProps<
  Option extends SelectOption = SelectOption,
  IsMulti extends boolean = false,
> extends SelectProps<Option, IsMulti> {
  compactDisplay?: boolean;
}

export const CheckboxSelect = <
  Option extends SelectOption = SelectOption,
  IsMulti extends boolean = false,
>({
  ref,
  id,
  label,
  caption,
  error,
  errorMsg,
  hideErrorMsg = false,
  hintText,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  containerClassName,
  labelClassName,
  inputClassName,
  disabled,
  isDisabled,
  readOnly,
  readonly,
  required = false,
  placeholder,
  className,
  classNames: customClassNames,
  components: customComponents,
  compactDisplay = false,
  formatOptionLabel,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isOptionDisabled,
  isSearchable = true,
  menuIsOpen,
  menuPlacement = 'auto',
  menuPortalTarget,
  menuPosition = 'fixed',
  openMenuOnClick = true,
  options,
  styles: customStyles,
  value,
  ...restProps
}: CheckboxSelectProps<Option, IsMulti>) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const invalid = Boolean(error ?? errorMsg);
  const helperText = buildHelperText({
    caption,
    error,
    errorMsg,
    hideErrorMsg,
    hintText,
  });
  const isReadOnly = Boolean(readOnly ?? readonly);
  const isSelectDisabled = Boolean(disabled ?? isDisabled);
  const resolvedPlaceholder = getResolvedPlaceholder({
    label,
    placeholder,
    required,
  });
  const resolvedIsOptionDisabled = useCallback(
    (option: Option, selectValue: readonly Option[]) =>
      isOptionDisabled?.(option, selectValue) ?? Boolean(option.disabled),
    [isOptionDisabled],
  );

  const mergedComponents = useMemo(
    () =>
      createBaseSelectComponents<Option, IsMulti>({
        customComponents,
        multiValue: compactDisplay
          ? (props: MultiValueProps<Option, IsMulti, GroupBase<Option>>) => {
              const selectedValues = Array.isArray(props.selectProps.value)
                ? props.selectProps.value
                : [];

              if (props.index !== 0) {
                return null;
              }

              return (
                <div className='flex items-center gap-2 text-sm text-default'>
                  <span className='truncate'>
                    {defaultGetOptionLabel(props.data)}
                  </span>
                  {selectedValues.length > 1 && (
                    <Badge shape='square' size='sm' variant='primary'>
                      +{selectedValues.length - 1}
                    </Badge>
                  )}
                </div>
              );
            }
          : undefined,
        multiValueRemove: compactDisplay ? () => null : undefined,
        option: optionProps => (
          <components.Option {...optionProps}>
            <div className='flex items-center gap-2'>
              <span
                aria-hidden='true'
                className={`
                  flex size-4 items-center justify-center rounded-sm border
                  ${optionProps.isSelected ? 'border-primary bg-primary text-white' : 'border-gray-400 bg-white text-transparent'}
                `}
              >
                <Check className='size-3' strokeWidth={3} />
              </span>
              <span>{optionProps.label}</span>
            </div>
          </components.Option>
        ),
        size,
      }),
    [compactDisplay, customComponents, size],
  );

  const mergedClassNames = useMemo(
    () =>
      createBaseSelectClassNames<Option, IsMulti>({
        className,
        customClassNames,
        fullWidth,
        inputClassName,
        invalid,
        isInactive: isSelectDisabled || isReadOnly,
        size,
        variant,
      }),
    [
      className,
      customClassNames,
      fullWidth,
      inputClassName,
      invalid,
      isReadOnly,
      isSelectDisabled,
      size,
      variant,
    ],
  );

  const mergedStyles = useMemo(
    () =>
      createBaseSelectStyles<Option, IsMulti>({
        customStyles: {
          ...customStyles,
          control: (base, state) => {
            const nextBase = customStyles?.control
              ? customStyles.control(base, state)
              : base;

            return compactDisplay
              ? {
                  ...nextBase,
                  flexWrap: 'nowrap',
                }
              : nextBase;
          },
          valueContainer: (base, state) => {
            const nextBase = customStyles?.valueContainer
              ? customStyles.valueContainer(base, state)
              : base;

            return compactDisplay
              ? {
                  ...nextBase,
                  flexWrap: 'nowrap',
                  overflow: 'hidden',
                }
              : nextBase;
          },
        },
        fullWidth,
      }),
    [compactDisplay, customStyles, fullWidth],
  );

  return (
    <SelectFieldShell
      containerClassName={containerClassName}
      disabled={isSelectDisabled}
      fullWidth={fullWidth}
      helperText={helperText}
      id={selectId}
      invalid={invalid}
      label={label}
      labelClassName={labelClassName}
      required={required}
      size={size}
    >
      <ReactSelect<Option, IsMulti, GroupBase<Option>>
        {...restProps}
        ref={ref}
        aria-describedby={helperText ? `${selectId}-caption` : undefined}
        aria-invalid={invalid || undefined}
        backspaceRemovesValue={
          isReadOnly ? false : restProps.backspaceRemovesValue
        }
        classNames={mergedClassNames}
        closeMenuOnSelect={restProps.closeMenuOnSelect ?? false}
        components={mergedComponents}
        formatOptionLabel={formatOptionLabel ?? defaultFormatOptionLabel}
        getOptionLabel={getOptionLabel ?? defaultGetOptionLabel}
        getOptionValue={getOptionValue ?? defaultGetOptionValue}
        hideSelectedOptions={restProps.hideSelectedOptions ?? false}
        inputId={selectId}
        instanceId={selectId}
        isDisabled={isSelectDisabled}
        isMulti={isMulti}
        isOptionDisabled={resolvedIsOptionDisabled}
        isSearchable={isReadOnly ? false : isSearchable}
        menuIsOpen={isReadOnly ? false : menuIsOpen}
        menuPlacement={menuPlacement}
        menuPortalTarget={
          menuPortalTarget ??
          (typeof document !== 'undefined' ? document.body : null)
        }
        menuPosition={menuPosition}
        openMenuOnClick={isReadOnly ? false : openMenuOnClick}
        options={options}
        placeholder={resolvedPlaceholder}
        styles={mergedStyles}
        unstyled
        {...(value !== undefined ? { value } : {})}
      />
    </SelectFieldShell>
  );
};
