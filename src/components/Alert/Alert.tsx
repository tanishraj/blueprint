import { X } from 'lucide-react';
import type {
  ComponentPropsWithoutRef,
  ComponentType,
  ReactNode,
  SVGProps,
} from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/classNames';
import type { RemoveNull } from '@/utils/types';

import {
  alertCloseButtonStyles,
  alertContentWrapperStyles,
  alertDescriptionStyles,
  alertIconStyles,
  alertTitleStyles,
  alertWrapperStyles,
} from './Alert.styles';

type AlertIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface AlertProps
  extends
    Omit<ComponentPropsWithoutRef<'div'>, 'title'>,
    RemoveNull<VariantProps<typeof alertWrapperStyles>> {
  title?: ReactNode;
  icon?: AlertIcon;
  children?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

export function Alert({
  variant,
  appearance,
  size,
  inverted = false,
  title,
  icon: Icon,
  children,
  onClose,
  closeLabel = 'Dismiss alert',
  className,
  role,
  ...restProps
}: AlertProps) {
  const hasTitle = title !== null && title !== undefined;
  const hasDescription = children !== null && children !== undefined;

  return (
    <div
      {...restProps}
      role={role ?? 'alert'}
      className={cn(
        alertWrapperStyles({
          variant,
          appearance,
          size,
          inverted,
        }),
        className,
      )}
    >
      {Icon ? (
        <div>
          <Icon
            aria-hidden='true'
            className={cn(
              alertIconStyles({ variant, appearance, size, inverted }),
            )}
            strokeWidth={1.75}
          />
        </div>
      ) : null}
      {hasTitle || hasDescription ? (
        <div
          className={cn(
            alertContentWrapperStyles({
              variant,
              appearance,
              size,
            }),
          )}
        >
          {hasTitle ? (
            <div
              className={cn(
                alertTitleStyles({
                  variant,
                  appearance,
                  size,
                  inverted,
                }),
              )}
            >
              {title}
            </div>
          ) : null}
          {hasDescription ? (
            <div
              className={cn(
                alertDescriptionStyles({
                  appearance,
                  variant,
                  size,
                  inverted,
                }),
              )}
            >
              {children}
            </div>
          ) : null}
        </div>
      ) : null}
      {onClose ? (
        <button
          type='button'
          aria-label={closeLabel}
          className={cn(
            alertCloseButtonStyles({
              appearance,
              variant,
              size,
              inverted,
            }),
          )}
          onClick={onClose}
        >
          <X aria-hidden='true' />
        </button>
      ) : null}
    </div>
  );
}
