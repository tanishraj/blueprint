import type { ComponentProps, Ref, ReactNode } from 'react';
import { useCallback, useId, useMemo } from 'react';
import { Check } from 'lucide-react';
import ReactSelect, {
  components,
  type ActionMeta,
  type GroupBase,
  type MultiValue,
  type MultiValueProps,
} from 'react-select';

import { Badge } from '../Badge';
import { Divider } from '../Divider';
import {
  buildHelperText,
  createBaseSelectClassNames,
  createBaseSelectComponents,
  createBaseSelectStyles,
  defaultGetOptionLabel,
  defaultGetOptionValue,
  getResolvedPlaceholder,
  SelectFieldShell,
} from './shared';
import type { GroupedSelectOption, SelectSizes, SelectVariants } from './types';

export interface GroupedSelectProps<
  Option extends GroupedSelectOption = GroupedSelectOption,
> {
  caption?: ReactNode;
  className?: string;
  compactDisplay?: boolean;
  containerClassName?: string;
  disabled?: boolean;
  error?: ReactNode;
  errorMsg?: ReactNode;
  fullWidth?: boolean;
  hideErrorMsg?: boolean;
  hideSelectedOptions?: boolean;
  hintText?: ReactNode;
  inputClassName?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  label?: ReactNode;
  labelClassName?: string;
  menuIsOpen?: boolean;
  menuPlacement?: 'auto' | 'top' | 'bottom';
  menuPortalTarget?: HTMLElement | null;
  menuPosition?: 'absolute' | 'fixed';
  onChange?: (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => void;
  options: readonly GroupBase<Option>[];
  placeholder?: ReactNode;
  readOnly?: boolean;
  readonly?: boolean;
  ref?: Ref<unknown>;
  required?: boolean;
  size?: SelectSizes;
  styles?: ComponentProps<typeof ReactSelect<Option, true>>['styles'];
  value?: MultiValue<Option>;
  variant?: SelectVariants;
}

export const GroupedSelect = <
  Option extends GroupedSelectOption = GroupedSelectOption,
>({
  caption,
  className,
  compactDisplay = false,
  containerClassName,
  disabled,
  error,
  errorMsg,
  fullWidth = false,
  hideErrorMsg = false,
  hideSelectedOptions = false,
  hintText,
  inputClassName,
  isClearable = false,
  isSearchable = true,
  label,
  labelClassName,
  menuIsOpen,
  menuPlacement = 'auto',
  menuPortalTarget,
  menuPosition = 'fixed',
  onChange,
  options,
  placeholder,
  readOnly,
  readonly,
  ref,
  required = false,
  size = 'md',
  styles,
  value = [],
  variant = 'default',
}: GroupedSelectProps<Option>) => {
  const generatedId = useId();
  const selectId = generatedId;
  const invalid = Boolean(error ?? errorMsg);
  const helperText = buildHelperText({
    caption,
    error,
    errorMsg,
    hideErrorMsg,
    hintText,
  });
  const isReadOnly = Boolean(readOnly ?? readonly);
  const isSelectDisabled = Boolean(disabled);
  const resolvedPlaceholder = getResolvedPlaceholder({
    label,
    placeholder,
    required,
  });

  const handleChange = useCallback(
    (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
      if (actionMeta.action === 'select-option' && actionMeta.option) {
        const selectedGroup = actionMeta.option.group;
        const filtered = newValue.filter(
          option =>
            option.group !== selectedGroup ||
            option.value === actionMeta.option?.value,
        );
        onChange?.(filtered, actionMeta);
        return;
      }

      onChange?.(newValue, actionMeta);
    },
    [onChange],
  );
  const resolvedIsOptionDisabled = useCallback(
    (option: Option) => Boolean(option.disabled),
    [],
  );

  const mergedComponents = useMemo(
    () =>
      createBaseSelectComponents<Option, true>({
        group: groupProps => {
          const groups = groupProps.selectProps
            .options as readonly GroupBase<Option>[];
          const isFirstGroup = groups[0] === groupProps.data;

          return (
            <>
              {!isFirstGroup && <Divider className='my-1' />}
              <components.Group {...groupProps} />
            </>
          );
        },
        multiValue: compactDisplay
          ? (props: MultiValueProps<Option, true, GroupBase<Option>>) => {
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
    [compactDisplay, size],
  );

  const mergedClassNames = useMemo(
    () =>
      createBaseSelectClassNames<Option, true>({
        className,
        fullWidth,
        inputClassName,
        invalid,
        isInactive: isSelectDisabled || isReadOnly,
        size,
        variant,
      }),
    [
      className,
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
      createBaseSelectStyles<Option, true>({
        customStyles: {
          ...styles,
          control: (base, state) => {
            const nextBase = styles?.control
              ? styles.control(base, state)
              : base;

            return compactDisplay
              ? {
                  ...nextBase,
                  flexWrap: 'nowrap',
                }
              : nextBase;
          },
          valueContainer: (base, state) => {
            const nextBase = styles?.valueContainer
              ? styles.valueContainer(base, state)
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
    [compactDisplay, fullWidth, styles],
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
      <ReactSelect<Option, true, GroupBase<Option>>
        ref={ref as never}
        aria-describedby={helperText ? `${selectId}-caption` : undefined}
        aria-invalid={invalid || undefined}
        backspaceRemovesValue={false}
        classNames={mergedClassNames}
        closeMenuOnSelect={false}
        components={mergedComponents}
        getOptionLabel={defaultGetOptionLabel}
        getOptionValue={defaultGetOptionValue}
        hideSelectedOptions={hideSelectedOptions}
        inputId={selectId}
        instanceId={selectId}
        isClearable={isClearable}
        isDisabled={isSelectDisabled}
        isMulti
        isOptionDisabled={resolvedIsOptionDisabled}
        isSearchable={isReadOnly ? false : isSearchable}
        menuIsOpen={isReadOnly ? false : menuIsOpen}
        menuPlacement={menuPlacement}
        menuPortalTarget={
          menuPortalTarget ??
          (typeof document !== 'undefined' ? document.body : null)
        }
        menuPosition={menuPosition}
        onChange={handleChange}
        options={options}
        placeholder={resolvedPlaceholder}
        styles={mergedStyles}
        unstyled
        value={value}
      />
    </SelectFieldShell>
  );
};
