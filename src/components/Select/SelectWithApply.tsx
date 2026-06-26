import { useCallback, useId, useMemo, useState } from 'react';
import { Check, Minus } from 'lucide-react';
import ReactSelect, {
  components,
  type ActionMeta,
  type GroupBase,
  type MenuProps,
  type MultiValue,
  type MultiValueProps,
  type OnChangeValue,
} from 'react-select';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { SelectFieldShell } from './shared';
import {
  buildHelperText,
  createBaseSelectClassNames,
  createBaseSelectComponents,
  createBaseSelectStyles,
  defaultGetOptionLabel,
  defaultGetOptionValue,
  getHelperTextId,
  getResolvedPlaceholder,
  isSelectInvalid,
  mergeDescribedBy,
} from './shared.helpers';
import type { SelectOption, SelectProps } from './types';

const ALL_OPTION_VALUE = '__select_all__' as const;

export interface SelectWithApplyProps<
  Option extends SelectOption = SelectOption,
  IsMulti extends boolean = false,
> extends SelectProps<Option, IsMulti> {
  allOptionLabel?: string;
  applyButtonLabel?: string;
  compactDisplay?: boolean;
}

export const SelectWithApply = <
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
  compactDisplay = false,
  components: customComponents,
  isMulti,
  isOptionDisabled,
  isSearchable = false,
  menuPlacement = 'auto',
  menuPortalTarget,
  menuPosition = 'fixed',
  onChange,
  options = [],
  styles: customStyles,
  value,
  allOptionLabel = 'All',
  applyButtonLabel = 'Apply',
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}: SelectWithApplyProps<Option, IsMulti>) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const invalid = isSelectInvalid({ ariaInvalid, error, errorMsg });
  const helperText = buildHelperText({
    caption,
    error,
    errorMsg,
    hideErrorMsg,
    hintText,
  });
  const isReadOnly = Boolean(readOnly ?? readonly);
  const isSelectDisabled = Boolean(disabled ?? isDisabled);
  const helperTextId = getHelperTextId(selectId);
  const resolvedPlaceholder = getResolvedPlaceholder({
    label,
    placeholder,
    required,
  });
  const describedBy = mergeDescribedBy({
    ariaDescribedBy,
    helperText,
    helperTextId,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const committedValue = useMemo(
    () => (value ?? null) as OnChangeValue<Option, IsMulti>,
    [value],
  );
  const [pendingValue, setPendingValue] =
    useState<OnChangeValue<Option, IsMulti>>(committedValue);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const allOption = useMemo(
    () =>
      ({
        label: allOptionLabel,
        value: ALL_OPTION_VALUE,
      }) as unknown as Option,
    [allOptionLabel],
  );

  const realOptions = options as readonly Option[];

  const optionsWithAll = useMemo(
    () =>
      isMulti
        ? ([allOption, ...realOptions] as readonly Option[])
        : realOptions,
    [allOption, isMulti, realOptions],
  );
  const resolvedPendingValue = hasPendingChanges
    ? pendingValue
    : committedValue;

  const pendingCount = Array.isArray(resolvedPendingValue)
    ? resolvedPendingValue.length
    : 0;
  const allRealOptionsSelected =
    Boolean(isMulti) &&
    realOptions.length > 0 &&
    pendingCount === realOptions.length;
  const someRealOptionsSelected =
    Boolean(isMulti) && pendingCount > 0 && !allRealOptionsSelected;

  const displayValue = useMemo(() => {
    if (!isMulti) {
      return resolvedPendingValue;
    }

    const pending = (resolvedPendingValue as MultiValue<Option>) ?? [];

    if (allRealOptionsSelected) {
      return [allOption] as unknown as OnChangeValue<Option, IsMulti>;
    }

    return pending as unknown as OnChangeValue<Option, IsMulti>;
  }, [allOption, allRealOptionsSelected, isMulti, resolvedPendingValue]);

  const isOptionCurrentlySelected = useCallback(
    (option: Option) => {
      const optionValue = option.value;

      if (optionValue === ALL_OPTION_VALUE) {
        return allRealOptionsSelected;
      }

      if (!isMulti) {
        const selectedValue = resolvedPendingValue as Option | null;
        return selectedValue?.value === optionValue;
      }

      return ((resolvedPendingValue as MultiValue<Option>) ?? []).some(
        selected => selected.value === optionValue,
      );
    },
    [allRealOptionsSelected, isMulti, resolvedPendingValue],
  );

  const handlePendingChange = useCallback(
    (
      newValue: OnChangeValue<Option, IsMulti>,
      actionMeta: ActionMeta<Option>,
    ) => {
      if (!isMulti) {
        setPendingValue(newValue);
        setHasPendingChanges(true);
        return;
      }

      const clickedValue = actionMeta.option?.value;
      const clickedAll = clickedValue === ALL_OPTION_VALUE;

      if (clickedAll && actionMeta.action === 'select-option') {
        setPendingValue(
          realOptions as unknown as OnChangeValue<Option, IsMulti>,
        );
        setHasPendingChanges(true);
        return;
      }

      if (clickedAll && actionMeta.action === 'deselect-option') {
        setPendingValue([] as unknown as OnChangeValue<Option, IsMulti>);
        setHasPendingChanges(true);
        return;
      }

      if (
        !clickedAll &&
        actionMeta.action === 'deselect-option' &&
        allRealOptionsSelected
      ) {
        const remaining = realOptions.filter(
          option => option.value !== clickedValue,
        );
        setPendingValue(remaining as unknown as OnChangeValue<Option, IsMulti>);
        setHasPendingChanges(true);
        return;
      }

      const filtered = ((newValue as MultiValue<Option>) ?? []).filter(
        option => option.value !== ALL_OPTION_VALUE,
      );
      setPendingValue(filtered as unknown as OnChangeValue<Option, IsMulti>);
      setHasPendingChanges(true);
    },
    [allRealOptionsSelected, isMulti, realOptions],
  );

  const handleApply = useCallback(() => {
    onChange?.(resolvedPendingValue, {} as ActionMeta<Option>);
    setHasPendingChanges(false);
    setIsMenuOpen(false);
  }, [onChange, resolvedPendingValue]);
  const handleMenuOpen = useCallback(() => {
    setPendingValue(committedValue);
    setHasPendingChanges(false);
    setIsMenuOpen(true);
  }, [committedValue]);
  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
    setPendingValue(committedValue);
    setHasPendingChanges(false);
  }, [committedValue]);
  const resolvedIsOptionDisabled = useCallback(
    (option: Option, selectValue: readonly Option[]) =>
      isOptionDisabled?.(option, selectValue) ?? Boolean(option.disabled),
    [isOptionDisabled],
  );

  const mergedComponents = useMemo(
    () =>
      createBaseSelectComponents<Option, IsMulti>({
        customComponents,
        menu: (menuProps: MenuProps<Option, IsMulti, GroupBase<Option>>) => (
          <components.Menu {...menuProps}>
            {menuProps.children}
            <div className='border-t border-gray-200 bg-white px-3 py-2'>
              <div className='flex justify-end'>
                <Button
                  appearance='filled'
                  size='sm'
                  variant='primary'
                  onClick={handleApply}
                >
                  {applyButtonLabel}
                </Button>
              </div>
            </div>
          </components.Menu>
        ),
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
        option: isMulti
          ? optionProps => {
              const isAllOption =
                (optionProps.data as Option).value === ALL_OPTION_VALUE;
              const checked =
                isAllOption && someRealOptionsSelected
                  ? undefined
                  : optionProps.isSelected;

              return (
                <components.Option {...optionProps}>
                  <div className='flex items-center gap-2'>
                    <span
                      aria-hidden='true'
                      className={`
                        flex size-4 items-center justify-center rounded-sm border
                        ${
                          checked || (isAllOption && someRealOptionsSelected)
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-400 bg-white text-transparent'
                        }
                      `}
                    >
                      {isAllOption && someRealOptionsSelected ? (
                        <Minus className='size-3' strokeWidth={3} />
                      ) : (
                        <Check className='size-3' strokeWidth={3} />
                      )}
                    </span>
                    <span>{optionProps.label}</span>
                  </div>
                </components.Option>
              );
            }
          : undefined,
        size,
      }),
    [
      applyButtonLabel,
      compactDisplay,
      customComponents,
      handleApply,
      isMulti,
      someRealOptionsSelected,
      size,
    ],
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
          menu: (base, state) => {
            const nextBase = customStyles?.menu
              ? customStyles.menu(base, state)
              : base;

            return {
              ...nextBase,
              overflow: 'hidden',
            };
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
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        backspaceRemovesValue={false}
        classNames={mergedClassNames}
        closeMenuOnSelect={false}
        components={mergedComponents}
        getOptionLabel={defaultGetOptionLabel}
        getOptionValue={defaultGetOptionValue}
        hideSelectedOptions={restProps.hideSelectedOptions ?? false}
        inputId={selectId}
        instanceId={selectId}
        isClearable={restProps.isClearable ?? false}
        isDisabled={isSelectDisabled}
        isMulti={isMulti}
        isOptionDisabled={resolvedIsOptionDisabled}
        isOptionSelected={isOptionCurrentlySelected}
        isSearchable={isReadOnly ? false : isSearchable}
        menuIsOpen={isReadOnly ? false : isMenuOpen}
        menuPlacement={menuPlacement}
        menuPortalTarget={
          menuPortalTarget ??
          (typeof document !== 'undefined' ? document.body : null)
        }
        menuPosition={menuPosition}
        onChange={handlePendingChange}
        onMenuClose={handleMenuClose}
        onMenuOpen={handleMenuOpen}
        options={optionsWithAll}
        placeholder={resolvedPlaceholder}
        styles={mergedStyles}
        unstyled
        value={displayValue}
      />
    </SelectFieldShell>
  );
};
