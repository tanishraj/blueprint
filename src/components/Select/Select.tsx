import { useCallback, useId, useMemo } from 'react';
import ReactSelect, {
  type ClassNamesConfig,
  type GroupBase,
  type SelectComponentsConfig,
  type StylesConfig,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { SelectFieldShell } from './shared';
import {
  buildHelperText,
  createBaseSelectClassNames,
  createBaseSelectComponents,
  createBaseSelectStyles,
  createFormatCreateLabel,
  defaultFormatOptionLabel,
  defaultGetOptionLabel,
  defaultGetOptionValue,
  getHelperTextId,
  getResolvedPlaceholder,
  isSelectInvalid,
  mergeDescribedBy,
} from './shared.helpers';
import type { SelectOption, SelectProps } from './types';

export const Select = <
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
  isCreatable = false,
  createText = 'Create',
  placeholder,
  className,
  components: customComponents,
  classNames: customClassNames,
  styles: customStyles,
  menuPortalTarget,
  menuPlacement = 'auto',
  menuPosition = 'fixed',
  isSearchable = true,
  isOptionDisabled,
  getOptionLabel,
  getOptionValue,
  formatOptionLabel,
  formatCreateLabel,
  menuIsOpen,
  openMenuOnClick = true,
  backspaceRemovesValue = true,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}: SelectProps<Option, IsMulti>) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperTextId = getHelperTextId(selectId);
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
  const isInactive = isSelectDisabled || isReadOnly;
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
  const resolvedIsOptionDisabled = useCallback(
    (option: Option, selectValue: readonly Option[]) =>
      isOptionDisabled?.(option, selectValue) ?? Boolean(option.disabled),
    [isOptionDisabled],
  );
  const resolvedFormatCreateLabel = useMemo(
    () => formatCreateLabel ?? createFormatCreateLabel(createText),
    [createText, formatCreateLabel],
  );

  const mergedComponents = useMemo<
    SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>
  >(
    () =>
      createBaseSelectComponents<Option, IsMulti>({
        customComponents,
        size,
      }),
    [customComponents, size],
  );

  const mergedClassNames = useMemo<
    ClassNamesConfig<Option, IsMulti, GroupBase<Option>>
  >(
    () =>
      createBaseSelectClassNames<Option, IsMulti>({
        className,
        customClassNames,
        fullWidth,
        inputClassName,
        invalid,
        isInactive,
        size,
        variant,
      }),
    [
      className,
      customClassNames,
      fullWidth,
      inputClassName,
      invalid,
      isInactive,
      size,
      variant,
    ],
  );

  const mergedStyles = useMemo<
    StylesConfig<Option, IsMulti, GroupBase<Option>>
  >(
    () =>
      createBaseSelectStyles<Option, IsMulti>({
        customStyles,
        fullWidth,
      }),
    [customStyles, fullWidth],
  );

  const selectProps = {
    ...restProps,
    ref,
    'aria-describedby': describedBy,
    'aria-invalid': invalid || undefined,
    backspaceRemovesValue: isReadOnly ? false : backspaceRemovesValue,
    classNames: mergedClassNames,
    components: mergedComponents,
    formatCreateLabel: resolvedFormatCreateLabel,
    formatOptionLabel: formatOptionLabel ?? defaultFormatOptionLabel,
    getOptionLabel: getOptionLabel ?? defaultGetOptionLabel,
    getOptionValue: getOptionValue ?? defaultGetOptionValue,
    inputId: selectId,
    instanceId: selectId,
    isDisabled: isSelectDisabled,
    isOptionDisabled: resolvedIsOptionDisabled,
    isSearchable: isReadOnly ? false : isSearchable,
    menuIsOpen: isReadOnly ? false : menuIsOpen,
    menuPlacement,
    menuPortalTarget:
      menuPortalTarget ??
      (typeof document !== 'undefined' ? document.body : null),
    menuPosition,
    openMenuOnClick: isReadOnly ? false : openMenuOnClick,
    placeholder: resolvedPlaceholder,
    styles: mergedStyles,
    unstyled: true,
  };

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
      {isCreatable ? (
        <CreatableSelect<Option, IsMulti, GroupBase<Option>> {...selectProps} />
      ) : (
        <ReactSelect<Option, IsMulti, GroupBase<Option>> {...selectProps} />
      )}
    </SelectFieldShell>
  );
};
