import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { SelectOption } from './types';
import {
  buildHelperText,
  createBaseSelectClassNames,
  createBaseSelectComponents,
  createBaseSelectStyles,
  createFormatCreateLabel,
  defaultFormatOptionLabel,
  defaultGetOptionLabel,
  defaultGetOptionValue,
  getChipContent,
  getResolvedPlaceholder,
} from './shared.helpers';

const option = {
  label: 'Active',
  value: 'active',
} satisfies SelectOption;

describe('select shared helpers', () => {
  it('resolves labels, values, and chip content from option data', () => {
    expect(defaultGetOptionLabel(option)).toBe('Active');
    expect(defaultGetOptionLabel({ label: <span>Status</span>, value: 42 })).toBe(
      '42',
    );
    expect(defaultGetOptionLabel({ label: <span>Status</span> })).toBe('');

    expect(defaultGetOptionValue(option)).toBe('active');
    expect(defaultGetOptionValue({ label: 'Visible label' })).toBe(
      'Visible label',
    );

    expect(defaultFormatOptionLabel(option)).toBe('Active');
    expect(getChipContent({ label: 7 })).toBe(7);
    expect(getChipContent({ label: <span>Status</span>, value: 'queued' })).toBe(
      'queued',
    );
    expect(getChipContent({ label: <span>Status</span> })).toBe('');
  });

  it('builds helper text with the correct precedence', () => {
    expect(
      buildHelperText({
        caption: 'Caption',
        error: 'Error message',
        hintText: 'Hint',
      }),
    ).toBe('Error message');

    expect(
      buildHelperText({
        caption: 'Caption',
        errorMsg: 'Error from errorMsg',
        hideErrorMsg: true,
        hintText: 'Hint',
      }),
    ).toBe('Caption');

    expect(
      buildHelperText({
        hintText: 'Fallback hint',
      }),
    ).toBe('Fallback hint');
  });

  it('resolves placeholders and create labels', () => {
    expect(
      getResolvedPlaceholder({
        label: undefined,
        placeholder: 'Select status',
        required: true,
      }),
    ).toBe('Select status *');

    expect(
      getResolvedPlaceholder({
        label: 'Status',
        placeholder: 'Select status',
        required: true,
      }),
    ).toBe('Select status');

    const formatCreateLabel = createFormatCreateLabel('Create');
    render(<>{formatCreateLabel('Pending')}</>);

    expect(screen.getByText('Create "Pending"')).toBeInTheDocument();
  });

  it('builds class names for active, invalid, and inactive control states', () => {
    const classNames = createBaseSelectClassNames<SelectOption, false>({
      className: 'root-class',
      customClassNames: {
        control: () => 'custom-control',
        container: () => 'custom-container',
      },
      fullWidth: true,
      inputClassName: 'input-class',
      size: 'md',
      variant: 'primary',
    });

    const controlClassName = classNames.control?.({
      isDisabled: false,
    } as never);
    const containerClassName = classNames.container?.({
      isDisabled: false,
    } as never);

    expect(controlClassName).toContain('hover:border-primary');
    expect(controlClassName).toContain('root-class');
    expect(controlClassName).toContain('input-class');
    expect(controlClassName).toContain('custom-control');
    expect(containerClassName).toContain('w-full');
    expect(containerClassName).toContain('custom-container');

    const invalidClassNames = createBaseSelectClassNames<SelectOption, false>({
      invalid: true,
      isInactive: false,
      size: 'md',
      variant: 'info',
    });

    expect(
      invalidClassNames.control?.({
        isDisabled: false,
      } as never),
    ).toContain('hover:border-danger');

    const inactiveClassNames = createBaseSelectClassNames<SelectOption, false>({
      isInactive: true,
      size: 'md',
      variant: 'success',
    });

    expect(
      inactiveClassNames.control?.({
        isDisabled: false,
      } as never),
    ).toContain('hover:border-gray-300');
  });

  it('builds option, placeholder, and indicator class names for different states', () => {
    const classNames = createBaseSelectClassNames<SelectOption, false>({
      size: 'sm',
      variant: 'default',
    });

    expect(
      classNames.placeholder?.({
        isDisabled: false,
      } as never),
    ).toContain('text-gray-500');
    expect(
      classNames.clearIndicator?.({
        isDisabled: false,
      } as never),
    ).toContain('hover:bg-transparent');
    expect(
      classNames.dropdownIndicator?.({
        isDisabled: false,
      } as never),
    ).toContain('hover:text-gray-600');
    expect(
      classNames.option?.({
        isDisabled: true,
        isSelected: false,
      } as never),
    ).toContain('cursor-not-allowed');
    expect(
      classNames.option?.({
        isDisabled: false,
        isSelected: true,
      } as never),
    ).toContain('font-medium');
  });

  it('builds styles for default and custom select states', () => {
    const customContainer = vi.fn(base => ({
      ...base,
      borderColor: 'tomato',
    }));
    const customOption = vi.fn(base => ({
      ...base,
      letterSpacing: '0.1em',
    }));

    const styles = createBaseSelectStyles<SelectOption, true>({
      customStyles: {
        container: customContainer,
        option: customOption,
      },
      fullWidth: true,
    });

    const containerStyle = styles.container?.(
      { width: 100 } as never,
      {} as never,
    );
    const valueContainerStyle = styles.valueContainer?.(
      {} as never,
      {
        hasValue: true,
        isMulti: true,
        selectProps: {
          controlShouldRenderValue: true,
        },
      } as never,
    );
    const compactValueContainerStyle = styles.valueContainer?.(
      {} as never,
      {
        hasValue: false,
        isMulti: false,
        selectProps: {
          controlShouldRenderValue: false,
        },
      } as never,
    );
    const disabledOptionStyle = styles.option?.(
      {} as never,
      {
        isDisabled: true,
        isFocused: false,
        isSelected: false,
      } as never,
    );
    const selectedOptionStyle = styles.option?.(
      {} as never,
      {
        isDisabled: false,
        isFocused: false,
        isSelected: true,
      } as never,
    );
    const focusedOptionStyle = styles.option?.(
      {} as never,
      {
        isDisabled: false,
        isFocused: true,
        isSelected: false,
      } as never,
    );

    expect(containerStyle).toMatchObject({
      borderColor: 'tomato',
      width: '100%',
    });
    expect(customContainer).toHaveBeenCalled();
    expect(valueContainerStyle?.display).toBe('flex');
    expect(compactValueContainerStyle?.display).toBe('grid');
    expect(disabledOptionStyle).toMatchObject({
      backgroundColor: 'transparent',
      cursor: 'not-allowed',
    });
    expect(selectedOptionStyle).toMatchObject({
      backgroundColor: 'var(--primary-100)',
      fontWeight: 500,
    });
    expect(focusedOptionStyle).toMatchObject({
      backgroundColor: 'var(--gray-100)',
    });
    expect(customOption).toHaveBeenCalled();
  });

  it('builds default component renderers and supports removing a chip', () => {
    const handleRemove = vi.fn();
    const componentsConfig = createBaseSelectComponents<SelectOption, true>({
      size: 'lg',
    });

    const MultiValue = componentsConfig.MultiValue;
    if (!MultiValue) {
      throw new Error('Expected MultiValue renderer');
    }

    const multiValueProps: any = {
      children: 'Active',
      clearValue: vi.fn(),
      components: {} as never,
      cx: vi.fn(),
      data: option,
      getClassNames: vi.fn(),
      getStyles: vi.fn(),
      getValue: vi.fn(() => [option]),
      hasValue: true,
      index: 0,
      innerProps: {},
      isDisabled: false,
      isFocused: false,
      isMulti: true,
      isRtl: false,
      options: [option],
      removeProps: { onClick: handleRemove },
      selectOption: vi.fn(),
      selectProps: {} as never,
      setValue: vi.fn(),
      theme: {} as never,
    };

    render(<MultiValue {...multiValueProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove Active' }));
    expect(handleRemove).toHaveBeenCalled();
  });
});
