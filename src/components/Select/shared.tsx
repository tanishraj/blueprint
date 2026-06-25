import type { ReactNode } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import {
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
import type { SelectOption, SelectProps, SelectSizes, SelectVariants } from './types';

export const defaultGetOptionLabel = <Option extends SelectOption>(option: Option) => {
  if (typeof option.label === 'string') {
    return option.label;
  }

  if (typeof option.value === 'string' || typeof option.value === 'number') {
    return String(option.value);
  }

  return '';
};

export const defaultGetOptionValue = <Option extends SelectOption>(option: Option) => {
  if (typeof option.value === 'string' || typeof option.value === 'number') {
    return String(option.value);
  }

  return defaultGetOptionLabel(option);
};

export const defaultFormatOptionLabel = <Option extends SelectOption>(
  option: Option,
) => {
  return option.label;
};

export const getChipContent = <Option extends SelectOption>(option: Option) => {
  if (typeof option.label === 'string' || typeof option.label === 'number') {
    return option.label;
  }

  if (typeof option.value === 'string' || typeof option.value === 'number') {
    return option.value;
  }

  return '';
};

export const buildHelperText = ({
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

interface SelectFieldShellProps {
  children: ReactNode;
  containerClassName?: string | undefined;
  disabled?: boolean | undefined;
  fullWidth?: boolean | undefined;
  helperText?: ReactNode | undefined;
  id: string;
  invalid?: boolean | undefined;
  label?: ReactNode | undefined;
  labelClassName?: string | undefined;
  required?: boolean | undefined;
  size?: SelectSizes | undefined;
}

export const SelectFieldShell = ({
  children,
  containerClassName,
  disabled = false,
  fullWidth = false,
  helperText,
  id,
  invalid = false,
  label,
  labelClassName,
  required = false,
  size = 'md',
}: SelectFieldShellProps) => {
  const captionId = `${id}-caption`;

  return (
    <div className={cn(inputRootStyles({ fullWidth }), containerClassName)}>
      {label && (
        <label
          className={cn(
            inputLabelStyles({ size, disabled }),
            labelClassName,
          )}
          htmlFor={id}
        >
          {label}
          {required && (
            <span aria-hidden='true' className={cn(inputRequiredStyles())}>
              *
            </span>
          )}
        </label>
      )}

      {children}

      {helperText && (
        <p
          className={cn(
            inputCaptionStyles({
              size,
              invalid,
              disabled,
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

interface BaseSelectComponentsOptions<
  Option extends SelectOption,
  IsMulti extends boolean,
> {
  customComponents?:
    | SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>
    | undefined;
  dropdownIndicator?: SelectComponentsConfig<
    Option,
    IsMulti,
    GroupBase<Option>
  >['DropdownIndicator']
    | undefined;
  option?:
    | SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>['Option']
    | undefined;
  menu?:
    | SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>['Menu']
    | undefined;
  group?:
    | SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>['Group']
    | undefined;
  multiValue?: SelectComponentsConfig<
    Option,
    IsMulti,
    GroupBase<Option>
  >['MultiValue']
    | undefined;
  multiValueRemove?: SelectComponentsConfig<
    Option,
    IsMulti,
    GroupBase<Option>
  >['MultiValueRemove']
    | undefined;
  size: SelectSizes;
}

export const createBaseSelectComponents = <
  Option extends SelectOption,
  IsMulti extends boolean,
>({
  customComponents,
  dropdownIndicator,
  group,
  menu,
  multiValue,
  multiValueRemove,
  option,
  size,
}: BaseSelectComponentsOptions<Option, IsMulti>): SelectComponentsConfig<
  Option,
  IsMulti,
  GroupBase<Option>
> => ({
  IndicatorSeparator: () => null,
  ClearIndicator: (
    props: ClearIndicatorProps<Option, IsMulti, GroupBase<Option>>,
  ) => (
    <components.ClearIndicator {...props}>
      <X aria-hidden='true' className={cn(inputIconStyles({ size }))} />
    </components.ClearIndicator>
  ),
  DropdownIndicator:
    dropdownIndicator ??
    ((props: DropdownIndicatorProps<Option, IsMulti, GroupBase<Option>>) => (
      <components.DropdownIndicator {...props}>
        <ChevronDown
          aria-hidden='true'
          className={cn(inputIconStyles({ size }))}
        />
      </components.DropdownIndicator>
    )),
  ...(group ? { Group: group } : {}),
  ...(menu ? { Menu: menu } : {}),
  MultiValue:
    multiValue ??
    ((props: MultiValueProps<Option, IsMulti, GroupBase<Option>>) => (
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
    )),
  MultiValueRemove:
    multiValueRemove ??
    ((props: MultiValueRemoveProps<Option, IsMulti, GroupBase<Option>>) => (
      <components.MultiValueRemove {...props} />
    )),
  ...(option ? { Option: option } : {}),
  ...customComponents,
});

interface BaseSelectClassNamesOptions<
  Option extends SelectOption,
  IsMulti extends boolean,
> {
  className?: string | undefined;
  customClassNames?:
    | ClassNamesConfig<Option, IsMulti, GroupBase<Option>>
    | undefined;
  fullWidth?: boolean | undefined;
  inputClassName?: string | undefined;
  invalid?: boolean | undefined;
  isInactive?: boolean | undefined;
  size: SelectSizes;
  variant: SelectVariants;
}

const getSelectControlHoverClass = ({
  invalid,
  isInactive,
  variant,
}: Pick<
  BaseSelectClassNamesOptions<SelectOption, boolean>,
  'invalid' | 'isInactive' | 'variant'
>) => {
  if (isInactive) {
    return 'hover:border-gray-300';
  }

  if (invalid) {
    return 'hover:border-danger';
  }

  switch (variant) {
    case 'primary':
      return 'hover:border-primary';
    case 'info':
      return 'hover:border-info';
    case 'success':
      return 'hover:border-success';
    case 'warning':
      return 'hover:border-warning';
    case 'danger':
      return 'hover:border-danger';
    case 'default':
    default:
      return 'hover:border-gray-400';
  }
};

export const createBaseSelectClassNames = <
  Option extends SelectOption,
  IsMulti extends boolean,
>({
  className,
  customClassNames,
  fullWidth = false,
  inputClassName,
  invalid = false,
  isInactive = false,
  size,
  variant,
}: BaseSelectClassNamesOptions<Option, IsMulti>): ClassNamesConfig<
  Option,
  IsMulti,
  GroupBase<Option>
> => ({
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
      getSelectControlHoverClass({ invalid, isInactive, variant }),
      'flex-nowrap',
      inputClassName,
      className,
      customClassNames?.control?.(state),
    ),
  valueContainer: state =>
    cn(
      'min-w-0 items-center gap-1 p-0',
      customClassNames?.valueContainer?.(state),
    ),
  input: state => cn('m-0 p-0 text-current', customClassNames?.input?.(state)),
  placeholder: state =>
    cn('m-0 text-gray-500', customClassNames?.placeholder?.(state)),
  singleValue: state =>
    cn('m-0 text-default', customClassNames?.singleValue?.(state)),
  multiValue: state => cn('my-0.5', customClassNames?.multiValue?.(state)),
  multiValueLabel: state => cn(customClassNames?.multiValueLabel?.(state)),
  multiValueRemove: state =>
    cn('hidden', customClassNames?.multiValueRemove?.(state)),
  indicatorsContainer: state =>
    cn(
      'flex shrink-0 items-center gap-1 self-stretch',
      customClassNames?.indicatorsContainer?.(state),
    ),
  clearIndicator: state =>
    cn(
      inputClearButtonStyles({ size }),
      'bg-transparent p-0 hover:bg-transparent hover:text-gray-600 active:bg-transparent',
      customClassNames?.clearIndicator?.(state),
    ),
  dropdownIndicator: state =>
    cn(
      inputClearButtonStyles({ size }),
      'bg-transparent p-0 hover:bg-transparent hover:text-gray-600 active:bg-transparent',
      customClassNames?.dropdownIndicator?.(state),
    ),
  menu: state =>
    cn(
      'z-50 mt-1 overflow-hidden rounded-md border border-gray-200 bg-base shadow-lg',
      customClassNames?.menu?.(state),
    ),
  menuList: state => cn('max-h-60 py-1', customClassNames?.menuList?.(state)),
  option: state =>
    cn(
      'cursor-pointer px-3 py-2 text-sm outline-none transition-colors',
      state.isDisabled && 'cursor-not-allowed text-gray-400',
      !state.isDisabled && 'text-default',
      state.isSelected && !state.isDisabled && 'font-medium',
      customClassNames?.option?.(state),
    ),
  noOptionsMessage: state =>
    cn(
      'px-3 py-2 text-sm text-gray-600',
      customClassNames?.noOptionsMessage?.(state),
    ),
  loadingMessage: state =>
    cn(
      'px-3 py-2 text-sm text-gray-600',
      customClassNames?.loadingMessage?.(state),
    ),
  group: state => cn('p-0', customClassNames?.group?.(state)),
  groupHeading: state =>
    cn(
      'px-3 py-2 text-xs font-semibold tracking-wide text-gray-500 uppercase',
      customClassNames?.groupHeading?.(state),
    ),
});

interface BaseSelectStylesOptions<
  Option extends SelectOption,
  IsMulti extends boolean,
> {
  customStyles?:
    | StylesConfig<Option, IsMulti, GroupBase<Option>>
    | undefined;
  fullWidth?: boolean | undefined;
}

export const createBaseSelectStyles = <
  Option extends SelectOption,
  IsMulti extends boolean,
>({
  customStyles,
  fullWidth = false,
}: BaseSelectStylesOptions<Option, IsMulti>): StylesConfig<
  Option,
  IsMulti,
  GroupBase<Option>
> => ({
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
      display:
        state.isMulti && state.hasValue && state.selectProps.controlShouldRenderValue
          ? 'flex'
          : 'grid',
      flex: 1,
      flexWrap: 'wrap' as const,
      gap: '4px',
      minWidth: 0,
      overflow: 'hidden',
      padding: 0,
      position: 'relative',
      WebkitOverflowScrolling: 'touch',
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
      fontWeight: state.isSelected ? 500 : 400,
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
});

export const createFormatCreateLabel =
  (createText: string) => (inputValue: string) => (
    <span className='flex items-center gap-2 text-primary'>
      <Plus aria-hidden='true' className='size-4' />
      <span>{`${createText} "${inputValue}"`}</span>
    </span>
  );

export const getResolvedPlaceholder = ({
  label,
  placeholder,
  required,
}: Pick<SelectProps, 'label' | 'placeholder' | 'required'>) => {
  if (typeof placeholder === 'string' && required && !label) {
    return `${placeholder} *`;
  }

  return placeholder;
};
