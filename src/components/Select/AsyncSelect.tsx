import { type FocusEvent, useId, useMemo, useState } from 'react';
import AsyncReactSelect, { type AsyncProps } from 'react-select/async';
import AsyncCreatableSelect, {
  type AsyncCreatableProps,
} from 'react-select/async-creatable';
import type { GroupBase, Options } from 'react-select';

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

export interface AsyncSelectProps<
  Option extends SelectOption = SelectOption,
  IsMulti extends boolean = false,
>
  extends
    Omit<AsyncProps<Option, IsMulti, GroupBase<Option>>, 'size' | 'isDisabled'>,
    Omit<
      AsyncCreatableProps<Option, IsMulti, GroupBase<Option>>,
      'size' | 'isDisabled'
    >,
    Pick<
      SelectProps<Option, IsMulti>,
      | 'caption'
      | 'containerClassName'
      | 'createText'
      | 'disabled'
      | 'error'
      | 'errorMsg'
      | 'fullWidth'
      | 'hideErrorMsg'
      | 'hintText'
      | 'inputClassName'
      | 'isCreatable'
      | 'label'
      | 'labelClassName'
      | 'readOnly'
      | 'readonly'
      | 'ref'
      | 'required'
      | 'size'
      | 'variant'
    > {
  'aria-describedby'?: string;
  isDisabled?: boolean;
  options?: Options<Option>;
}

export const AsyncSelect = <
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
  classNames: customClassNames,
  components: customComponents,
  controlShouldRenderValue,
  defaultOptions = false,
  formatCreateLabel,
  formatOptionLabel,
  getOptionLabel,
  getOptionValue,
  inputValue,
  isMulti,
  isOptionDisabled,
  isSearchable = true,
  loadOptions = async () => [],
  menuIsOpen,
  menuPlacement = 'auto',
  menuPortalTarget,
  menuPosition = 'absolute',
  onBlur,
  onFocus,
  onMenuClose,
  onMenuOpen,
  options = [],
  openMenuOnClick = true,
  styles: customStyles,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}: AsyncSelectProps<Option, IsMulti>) => {
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
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpenInternal, setIsMenuOpenInternal] = useState(false);
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
  const resolvedMenuIsOpen = menuIsOpen ?? isMenuOpenInternal;
  const shouldHideRenderedValue =
    Boolean(isSearchable) &&
    !isMulti &&
    !isReadOnly &&
    isFocused &&
    resolvedMenuIsOpen;

  const mergedComponents = useMemo(
    () =>
      createBaseSelectComponents<Option, IsMulti>({
        customComponents,
        size,
      }),
    [customComponents, size],
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
        customStyles,
        fullWidth,
      }),
    [customStyles, fullWidth],
  );

  const sharedProps = {
    ...restProps,
    ref,
    'aria-describedby': describedBy,
    'aria-invalid': invalid || undefined,
    classNames: mergedClassNames,
    components: mergedComponents,
    defaultOptions,
    formatCreateLabel: formatCreateLabel ?? createFormatCreateLabel(createText),
    formatOptionLabel: formatOptionLabel ?? defaultFormatOptionLabel,
    getOptionLabel: getOptionLabel ?? defaultGetOptionLabel,
    getOptionValue: getOptionValue ?? defaultGetOptionValue,
    inputId: selectId,
    instanceId: selectId,
    isDisabled: isSelectDisabled,
    isMulti,
    isOptionDisabled:
      isOptionDisabled ?? ((option: Option) => Boolean(option.disabled)),
    isSearchable: isReadOnly ? false : isSearchable,
    loadOptions,
    menuIsOpen: isReadOnly ? false : resolvedMenuIsOpen,
    menuPlacement,
    menuPortalTarget:
      menuPortalTarget ??
      (typeof document !== 'undefined' ? document.body : null),
    menuPosition,
    onBlur: (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    onFocus: (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    onMenuClose: () => {
      setIsMenuOpenInternal(false);
      onMenuClose?.();
    },
    onMenuOpen: () => {
      setIsMenuOpenInternal(true);
      onMenuOpen?.();
    },
    openMenuOnClick: isReadOnly ? false : openMenuOnClick,
    options,
    placeholder: resolvedPlaceholder,
    styles: mergedStyles,
    unstyled: true,
    controlShouldRenderValue:
      controlShouldRenderValue ?? !shouldHideRenderedValue,
    ...(inputValue !== undefined ? { inputValue } : {}),
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
        <AsyncCreatableSelect<Option, IsMulti, GroupBase<Option>>
          {...sharedProps}
        />
      ) : (
        <AsyncReactSelect<Option, IsMulti, GroupBase<Option>>
          {...sharedProps}
        />
      )}
    </SelectFieldShell>
  );
};
