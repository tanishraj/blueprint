import { type ReactNode, useId, useMemo } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import ReactSelect, {
  components,
  type ClassNamesConfig,
  type ClearIndicatorProps,
  type DropdownIndicatorProps,
  type GroupBase,
  type MultiValueProps,
  type MultiValueRemoveProps,
  type SelectComponentsConfig,
  type StylesConfig,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { cn } from '@/utils';

import {
  inputCaptionStyles,
  inputClearButtonStyles,
  inputFieldStyles,
  inputIconStyles,
  inputLabelStyles,
  inputRequiredStyles,
  inputRootStyles,
} from '../Input/Input.styles';
import { Chip } from '../Chip';
import type { SelectOption, SelectProps } from './types';

const defaultGetOptionLabel = <Option extends SelectOption>(option: Option) => {
  if (typeof option.label === 'string') {
    return option.label;
  }

  if (typeof option.value === 'string' || typeof option.value === 'number') {
    return String(option.value);
  }

  return '';
};

const defaultGetOptionValue = <Option extends SelectOption>(option: Option) => {
  if (typeof option.value === 'string' || typeof option.value === 'number') {
    return String(option.value);
  }

  return defaultGetOptionLabel(option);
};

const defaultFormatOptionLabel = <Option extends SelectOption>(option: Option) => {
  return option.label;
};

const getChipContent = <Option extends SelectOption>(option: Option) => {
  if (typeof option.label === 'string' || typeof option.label === 'number') {
    return option.label;
  }

  if (typeof option.value === 'string' || typeof option.value === 'number') {
    return option.value;
  }

  return '';
};

const buildHelperText = ({
  caption,
  error,
  errorMsg,
  hideErrorMsg,
  hintText,
}: {
  caption?: ReactNode;
  error?: ReactNode;
  errorMsg?: ReactNode;
  hideErrorMsg?: boolean;
  hintText?: ReactNode;
}) => {
  const normalizedError = error ?? errorMsg;

  if (normalizedError && !hideErrorMsg) {
    return normalizedError;
  }

  return caption ?? hintText;
};

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
  ...restProps
}: SelectProps<Option, IsMulti>) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const captionId = `${selectId}-caption`;
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
  const isInactive = isSelectDisabled || isReadOnly;
  const resolvedPlaceholder =
    typeof placeholder === 'string' && required && !label
      ? `${placeholder} *`
      : placeholder;

  const mergedComponents = useMemo<
    SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>
  >(
    () => ({
      IndicatorSeparator: () => null,
      ClearIndicator: (
        props: ClearIndicatorProps<Option, IsMulti, GroupBase<Option>>,
      ) => (
        <components.ClearIndicator {...props}>
          <X aria-hidden='true' className={cn(inputIconStyles({ size }))} />
        </components.ClearIndicator>
      ),
      DropdownIndicator: (
        props: DropdownIndicatorProps<Option, IsMulti, GroupBase<Option>>,
      ) => (
        <components.DropdownIndicator {...props}>
          <ChevronDown
            aria-hidden='true'
            className={cn(inputIconStyles({ size }))}
          />
        </components.DropdownIndicator>
      ),
      MultiValue: (
        props: MultiValueProps<Option, IsMulti, GroupBase<Option>>,
      ) => (
        <div {...props.innerProps}>
          <Chip
            appearance='outline'
            closeLabel={`Remove ${defaultGetOptionLabel(props.data)}`}
            onClose={() => {
              props.removeProps.onClick?.({} as never);
            }}
            shape='square'
            size={size === 'lg' ? 'md' : 'sm'}
            variant='primary'
          >
            {getChipContent(props.data)}
          </Chip>
        </div>
      ),
      MultiValueRemove: (
        props: MultiValueRemoveProps<Option, IsMulti, GroupBase<Option>>,
      ) => <components.MultiValueRemove {...props} />,
      ...customComponents,
    }),
    [customComponents, size],
  );

  const mergedClassNames = useMemo<
    ClassNamesConfig<Option, IsMulti, GroupBase<Option>>
  >(
    () => ({
      container: state =>
        cn('min-w-0', fullWidth && 'w-full', customClassNames?.container?.(state)),
      control: state =>
        cn(
          inputFieldStyles({
            size,
            variant,
            disabled: isInactive,
            invalid,
            fullWidth,
          }),
          'flex-nowrap',
          inputClassName,
          className,
          customClassNames?.control?.(state),
        ),
      valueContainer: state =>
        cn(
          'flex min-w-0 flex-1 flex-wrap items-center gap-1 p-0',
          customClassNames?.valueContainer?.(state),
        ),
      input: state => cn('m-0 p-0 text-current', customClassNames?.input?.(state)),
      placeholder: state =>
        cn('m-0 text-gray-500', customClassNames?.placeholder?.(state)),
      singleValue: state =>
        cn('m-0 text-default', customClassNames?.singleValue?.(state)),
      multiValue: state =>
        cn('my-0.5', customClassNames?.multiValue?.(state)),
      multiValueLabel: state => cn(customClassNames?.multiValueLabel?.(state)),
      multiValueRemove: state => cn('hidden', customClassNames?.multiValueRemove?.(state)),
      indicatorsContainer: state =>
        cn(
          'flex shrink-0 items-center gap-1 self-stretch',
          customClassNames?.indicatorsContainer?.(state),
        ),
      clearIndicator: state =>
        cn(
          inputClearButtonStyles({ size }),
          'h-full rounded-sm',
          customClassNames?.clearIndicator?.(state),
        ),
      dropdownIndicator: state =>
        cn(
          inputClearButtonStyles({ size }),
          'h-full rounded-sm',
          customClassNames?.dropdownIndicator?.(state),
        ),
      menu: state =>
        cn(
          'z-50 mt-1 overflow-hidden rounded-md border border-gray-200 bg-base shadow-lg',
          customClassNames?.menu?.(state),
        ),
      menuList: state =>
        cn('max-h-60 py-1', customClassNames?.menuList?.(state)),
      option: state =>
        cn(
          'cursor-pointer px-3 py-2 text-sm outline-none transition-colors',
          state.isDisabled && 'cursor-not-allowed text-gray-400',
          !state.isDisabled && 'text-default',
          state.isSelected && !state.isDisabled && 'font-medium',
          customClassNames?.option?.(state),
        ),
      noOptionsMessage: state =>
        cn('px-3 py-2 text-sm text-gray-600', customClassNames?.noOptionsMessage?.(state)),
      loadingMessage: state =>
        cn('px-3 py-2 text-sm text-gray-600', customClassNames?.loadingMessage?.(state)),
      group: state => cn('p-0', customClassNames?.group?.(state)),
      groupHeading: state =>
        cn(
          'px-3 py-2 text-xs font-semibold tracking-wide text-gray-500 uppercase',
          customClassNames?.groupHeading?.(state),
        ),
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

  const mergedStyles = useMemo<StylesConfig<Option, IsMulti, GroupBase<Option>>>(
    () => ({
      ...customStyles,
      container: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          minWidth: 0,
          width: fullWidth ? '100%' : base.width,
        };

        return customStyles?.container
          ? customStyles.container(nextBase, state)
          : nextBase;
      },
      valueContainer: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          flexWrap: 'wrap' as const,
          gap: '4px',
          minWidth: 0,
          padding: 0,
        };

        return customStyles?.valueContainer
          ? customStyles.valueContainer(nextBase, state)
          : nextBase;
      },
      input: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          color: 'inherit',
          margin: 0,
          padding: 0,
        };

        return customStyles?.input ? customStyles.input(nextBase, state) : nextBase;
      },
      placeholder: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          color: 'var(--text-color-placeholder)',
          margin: 0,
        };

        return customStyles?.placeholder
          ? customStyles.placeholder(nextBase, state)
          : nextBase;
      },
      singleValue: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          color: 'var(--text-color-default)',
          margin: 0,
        };

        return customStyles?.singleValue
          ? customStyles.singleValue(nextBase, state)
          : nextBase;
      },
      indicatorsContainer: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          alignItems: 'center',
          alignSelf: 'stretch',
          display: 'flex',
          flexShrink: 0,
          gap: '4px',
        };

        return customStyles?.indicatorsContainer
          ? customStyles.indicatorsContainer(nextBase, state)
          : nextBase;
      },
      menu: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          backgroundColor: 'var(--base-white)',
          border: '1px solid var(--gray-200)',
          borderRadius: '0.5rem',
          boxShadow: '0 20px 40px rgb(15 23 42 / 0.14)',
          marginTop: 4,
          overflow: 'hidden',
          zIndex: 50,
        };

        return customStyles?.menu ? customStyles.menu(nextBase, state) : nextBase;
      },
      menuList: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          backgroundColor: 'var(--base-white)',
          paddingBottom: 4,
          paddingTop: 4,
        };

        return customStyles?.menuList
          ? customStyles.menuList(nextBase, state)
          : nextBase;
      },
      option: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          backgroundColor: state.isDisabled
            ? 'transparent'
            : state.isSelected
              ? 'var(--primary-100)'
              : state.isFocused
                ? 'var(--gray-100)'
                : 'transparent',
          color: state.isDisabled
            ? 'var(--text-color-disabled)'
            : state.isSelected
              ? 'var(--text-color-primary)'
              : 'var(--text-color-default)',
          cursor: state.isDisabled ? 'not-allowed' : 'pointer',
          fontWeight: state.isSelected ? 600 : 400,
        };

        return customStyles?.option ? customStyles.option(nextBase, state) : nextBase;
      },
      multiValue: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          alignItems: 'center',
          backgroundColor: 'transparent',
          borderRadius: 0,
          margin: 0,
        };

        return customStyles?.multiValue
          ? customStyles.multiValue(nextBase, state)
          : nextBase;
      },
      multiValueLabel: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          margin: 0,
          padding: 0,
        };

        return customStyles?.multiValueLabel
          ? customStyles.multiValueLabel(nextBase, state)
          : nextBase;
      },
      multiValueRemove: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          display: 'none',
        };

        return customStyles?.multiValueRemove
          ? customStyles.multiValueRemove(nextBase, state)
          : nextBase;
      },
      menuPortal: (base, state) => {
        const nextBase: typeof base = {
          ...base,
          zIndex: 9999,
        };

        return customStyles?.menuPortal
          ? customStyles.menuPortal(nextBase, state)
          : nextBase;
      },
    }),
    [customStyles],
  );

  const selectProps = {
    ...restProps,
    ref,
    'aria-describedby': helperText ? captionId : undefined,
    'aria-invalid': invalid || undefined,
    backspaceRemovesValue: isReadOnly ? false : backspaceRemovesValue,
    classNames: mergedClassNames,
    components: mergedComponents,
    formatCreateLabel:
      formatCreateLabel ??
      ((inputValue: string) => (
        <span className='flex items-center gap-2 text-primary'>
          <Plus aria-hidden='true' className='size-4' />
          <span>{`${createText} "${inputValue}"`}</span>
        </span>
      )),
    formatOptionLabel: formatOptionLabel ?? defaultFormatOptionLabel,
    getOptionLabel: getOptionLabel ?? defaultGetOptionLabel,
    getOptionValue: getOptionValue ?? defaultGetOptionValue,
    inputId: selectId,
    instanceId: selectId,
    isDisabled: isSelectDisabled,
    isOptionDisabled:
      isOptionDisabled ?? ((option: Option) => Boolean(option.disabled)),
    isSearchable: isReadOnly ? false : isSearchable,
    menuIsOpen: isReadOnly ? false : menuIsOpen,
    menuPlacement,
    menuPortalTarget:
      menuPortalTarget ?? (typeof document !== 'undefined' ? document.body : null),
    menuPosition,
    openMenuOnClick: isReadOnly ? false : openMenuOnClick,
    placeholder: resolvedPlaceholder,
    styles: mergedStyles,
    unstyled: true,
  };

  return (
    <div className={cn(inputRootStyles({ fullWidth }), containerClassName)}>
      {label && (
        <label
          className={cn(
            inputLabelStyles({ size, disabled: isSelectDisabled }),
            labelClassName,
          )}
          htmlFor={selectId}
        >
          {label}
          {required && (
            <span aria-hidden='true' className={cn(inputRequiredStyles())}>
              *
            </span>
          )}
        </label>
      )}

      {isCreatable ? (
        <CreatableSelect<Option, IsMulti, GroupBase<Option>> {...selectProps} />
      ) : (
        <ReactSelect<Option, IsMulti, GroupBase<Option>> {...selectProps} />
      )}

      {helperText && (
        <p
          className={cn(
            inputCaptionStyles({
              size,
              invalid,
              disabled: isSelectDisabled,
            }),
          )}
          id={captionId}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
