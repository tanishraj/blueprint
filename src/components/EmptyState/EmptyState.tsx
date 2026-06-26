import { cloneElement, isValidElement, type Key, type ReactNode } from 'react';

import { cn } from '@/utils/classNames';

import { Button } from '../Button';
import {
  emptyStateActionsStyles,
  emptyStateBodyStyles,
  emptyStateContentStyles,
  emptyStateCopyStyles,
  emptyStateCustomIconStyles,
  emptyStateDetailsStyles,
  emptyStateIconStyles,
  emptyStateRootStyles,
  emptyStateTitleStyles,
} from './EmptyState.styles';
import type { EmptyStateProps } from './types';

interface EmptyStateIconElementProps {
  className?: string;
  focusable?: boolean;
}

function hasRenderableContent(value: ReactNode) {
  return value !== null && value !== undefined;
}

function renderEmptyStateIcon(
  icon: EmptyStateProps['icon'],
  size: NonNullable<EmptyStateProps['size']>,
) {
  if (!hasRenderableContent(icon)) {
    return null;
  }

  if (isValidElement<EmptyStateIconElementProps>(icon)) {
    return cloneElement(icon, {
      className: cn(emptyStateIconStyles({ size }), icon.props.className),
      focusable: icon.props.focusable ?? false,
    });
  }

  return (
    <span
      aria-hidden='true'
      className={cn(emptyStateCustomIconStyles({ size }))}
    >
      {icon}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  icon,
  size = 'md',
  orientation = 'vertical',
  actions,
  copyClassName,
  children,
  className,
  ...props
}: Readonly<EmptyStateProps>) {
  const actionsToRender = actions ?? [];
  const hasCopy =
    hasRenderableContent(title) ||
    hasRenderableContent(description) ||
    hasRenderableContent(children);
  const hasActions = actionsToRender.length > 0;
  const renderedIcon = renderEmptyStateIcon(icon, size);

  if (!renderedIcon && !hasCopy && !hasActions) {
    return (
      <div
        {...props}
        className={cn(emptyStateRootStyles({ size, orientation }), className)}
      />
    );
  }

  return (
    <div
      {...props}
      className={cn(emptyStateRootStyles({ size, orientation }), className)}
    >
      <div className={cn(emptyStateContentStyles({ size, orientation }))}>
        <div className={cn(emptyStateBodyStyles({ size, orientation }))}>
          {renderedIcon}

          {(hasCopy || hasActions) && (
            <div className={cn(emptyStateDetailsStyles({ size, orientation }))}>
              {hasCopy && (
                <div
                  className={cn(
                    emptyStateCopyStyles({ size, orientation }),
                    copyClassName,
                  )}
                >
                  {hasRenderableContent(title) ? (
                    <div className={cn(emptyStateTitleStyles({ size }))}>
                      {title}
                    </div>
                  ) : null}
                  {hasRenderableContent(description) ? (
                    <div>{description}</div>
                  ) : null}
                  {children}
                </div>
              )}

              {hasActions ? (
                <div className={cn(emptyStateActionsStyles({ orientation }))}>
                  {actionsToRender.map(
                    ({ actionKey, size: actionSize, ...action }, index) => (
                      <Button
                        key={(actionKey ?? index) as Key}
                        size={actionSize ?? size}
                        {...action}
                      />
                    ),
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
