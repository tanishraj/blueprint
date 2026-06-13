import { type FC } from 'react';

import { cn } from '@/utils';

import { Button, type ButtonProps } from '../Button';
import {
  buttonGroupItemInnerStyles,
  buttonGroupItemStyles,
  buttonGroupStyles,
} from './ButtonGroup.styles';
import type {
  ButtonGroupItem,
  ButtonGroupProps,
  ButtonGroupOrientation,
} from './types';

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

const resolveInheritedValue = <T,>(
  itemValue: T | undefined,
  groupValue: T,
): T => itemValue ?? groupValue;

export const ButtonGroup: FC<ButtonGroupProps> = ({
  buttons = [],
  orientation = 'horizontal',
  size,
  inverted,
  role = 'group',
  ...restProps
}) => {
  const total = buttons.length;

  return (
    <div
      role={role}
      aria-label={restProps['aria-label'] ?? 'Button group'}
      className={cn(
        buttonGroupStyles({
          orientation: orientation as ButtonGroupOrientation,
        }),
      )}
      {...restProps}
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
        } = item as ButtonGroupItem;

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
};
