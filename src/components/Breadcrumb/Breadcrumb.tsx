import { type FC, type HTMLAttributes } from 'react';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils';

import {
  breadcrumbIconStyles,
  breadcrumbItemStyles,
  breadcrumbLabelStyles,
  breadcrumbLinkStyles,
  breadcrumbListStyles,
  breadcrumbSeparatorIconStyles,
  breadcrumbSeparatorStyles,
  breadcrumbStyles,
} from './Breadcrumb.styles';
import type {
  BreadcrumbAppearances,
  BreadcrumbItem,
  BreadcrumbSeparators,
} from './types';

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  appearance?: BreadcrumbAppearances;
  separator?: BreadcrumbSeparators;
}

const BreadcrumbSeparator: FC<{ separator: BreadcrumbSeparators }> = ({
  separator,
}) => (
  <span aria-hidden='true' className={cn(breadcrumbSeparatorStyles())}>
    {separator === '>' ? (
      <ChevronRight className={cn(breadcrumbSeparatorIconStyles())} />
    ) : (
      separator
    )}
  </span>
);

export const Breadcrumb: FC<BreadcrumbProps> = ({
  items,
  appearance = 'ghost',
  separator = '>',
  role,
  className,
  ...restProps
}) => {
  const hasExplicitCurrent = items.some(item => item.current);

  return (
    <nav
      {...restProps}
      role={role}
      aria-label={restProps['aria-label'] ?? 'Breadcrumb'}
      className={cn(breadcrumbStyles({ appearance }), className)}
    >
      <ol className={cn(breadcrumbListStyles())}>
        {items.map((item, index) => {
          const {
            id,
            label,
            icon: Icon,
            current: itemCurrent,
            disabled,
            className: itemClassName,
            href,
            onClick,
            ...itemProps
          } = item;
          const resolvedCurrent =
            itemCurrent ?? (!hasExplicitCurrent && index === items.length - 1);
          const isLink = Boolean(href) && !resolvedCurrent && !disabled;
          const itemKey = id ?? href ?? index;
          const content = (
            <>
              {Icon && (
                <Icon
                  aria-hidden='true'
                  focusable='false'
                  className={cn(breadcrumbIconStyles())}
                />
              )}
              <span className={cn(breadcrumbLabelStyles())}>{label}</span>
            </>
          );

          return (
            <li key={itemKey} className={cn(breadcrumbItemStyles())}>
              {isLink ? (
                <a
                  {...itemProps}
                  href={href}
                  onClick={onClick}
                  className={cn(
                    breadcrumbLinkStyles({
                      current: false,
                      disabled: false,
                    }),
                    itemClassName,
                  )}
                >
                  {content}
                </a>
              ) : (
                <span
                  aria-current={resolvedCurrent ? 'page' : undefined}
                  className={cn(
                    breadcrumbLinkStyles({
                      current: resolvedCurrent,
                      disabled,
                    }),
                    itemClassName,
                  )}
                >
                  {content}
                </span>
              )}
              {index < items.length - 1 && (
                <BreadcrumbSeparator separator={separator} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
