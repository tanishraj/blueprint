import { cn } from '@/utils/classNames';

import { Button, type ButtonProps } from '../Button';
import {
  buttonGroupItemInnerStyles,
  buttonGroupItemStyles,
  buttonGroupStyles,
} from './ButtonGroup.styles';
import type { ButtonGroupProps } from './types';

type ButtonGroupItemPosition = 'single' | 'first' | 'middle' | 'last';

const getItemPosition = (
  index: number,
  total: number,
): ButtonGroupItemPosition => {
  if (total === 1) {
    return 'single';
  }

  if (index === 0) {
    return 'first';
  }

  if (index === total - 1) {
    return 'last';
  }

  return 'middle';
};

function resolveInheritedValue<T>(itemValue: T | undefined, groupValue: T): T {
  return itemValue ?? groupValue;
}

export function ButtonGroup({
  buttons = [],
  orientation = 'horizontal',
  size,
  inverted,
  role = 'group',
  className,
  ...restProps
}: ButtonGroupProps) {
  const ariaLabel = restProps['aria-label'];
  const ariaLabelledBy = restProps['aria-labelledby'];
  const total = buttons.length;

  return (
    <div
      {...restProps}
      role={role}
      aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? 'Button group')}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        buttonGroupStyles({
          orientation,
        }),
        className,
      )}
    >
      {buttons.map((item, index) => {
        const {
          id,
          children,
          size: itemSize,
          variant: itemVariant,
          appearance: itemAppearance,
          loading: itemLoading,
          inverted: itemInverted,
          fullWidth: itemFullWidth,
          ...buttonProps
        } = item;

        const itemPosition = getItemPosition(index, total);
        const resolvedSize = resolveInheritedValue(itemSize, size);
        const resolvedVariant = itemVariant ?? 'default';
        const resolvedAppearance = itemAppearance ?? 'filled';
        const resolvedInverted = resolveInheritedValue(itemInverted, inverted);

        return (
          <div
            key={id ?? index}
            className={cn(
              buttonGroupItemStyles({
                orientation,
                position: itemPosition,
                fullWidth: Boolean(itemFullWidth),
              }),
            )}
          >
            <Button
              {...(buttonProps as ButtonProps)}
              size={resolvedSize}
              variant={resolvedVariant}
              appearance={resolvedAppearance}
              loading={itemLoading}
              inverted={resolvedInverted}
              fullWidth={Boolean(itemFullWidth)}
              className={cn(
                buttonGroupItemInnerStyles({
                  fullWidth: Boolean(itemFullWidth),
                }),
              )}
            >
              {children}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
