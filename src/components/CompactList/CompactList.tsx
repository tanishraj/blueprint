import { type CSSProperties, type ReactNode, useMemo, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';

import { cn } from '@/utils';

import { Badge, type BadgeProps } from '../Badge';

type PrimitiveValue =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;
type ObjectItem = Record<string, unknown>;
type ItemType = PrimitiveValue | ObjectItem;

const isPrimitiveValue = (value: ItemType): value is PrimitiveValue => {
  return (
    value === null || (typeof value !== 'object' && typeof value !== 'function')
  );
};

export interface CompactListProps<T extends ItemType> {
  badgeProps?: Omit<BadgeProps, 'children'>;
  displayKey?: T extends ObjectItem ? keyof T : never;
  includeAll?: boolean;
  items: T[];
  lineClampSize?: number;
  maxVisible?: number;
  popoverClassName?: string;
  renderItem?: (item: T, index: number) => ReactNode;
}

const getLineClampStyle = (
  lineClampSize: number,
): CSSProperties | undefined => {
  if (lineClampSize <= 0) {
    return undefined;
  }

  return {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lineClampSize,
    display: '-webkit-box',
    overflow: 'hidden',
  };
};

const getItemKey = <T extends ItemType>(
  item: T,
  index: number,
  displayKey?: T extends ObjectItem ? keyof T : never,
) => {
  if (isPrimitiveValue(item)) {
    return `primitive-${String(item)}-${index}`;
  }

  const objectItem = item as ObjectItem;
  const itemId = objectItem['id'];

  if (typeof itemId === 'string' || typeof itemId === 'number') {
    return `id-${String(itemId)}`;
  }

  const displayValue =
    displayKey !== undefined ? objectItem[displayKey as string] : undefined;

  if (typeof displayValue !== 'undefined') {
    return `display-${String(displayValue)}-${index}`;
  }

  return `object-${JSON.stringify(objectItem)}-${index}`;
};

export const CompactList = <T extends ItemType>({
  badgeProps,
  displayKey,
  includeAll = false,
  items,
  lineClampSize = 0,
  maxVisible = 1,
  popoverClassName,
  renderItem,
}: CompactListProps<T>) => {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'right-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const getDisplayValue = useMemo(
    () =>
      (item: T, index: number): ReactNode => {
        if (renderItem) {
          return renderItem(item, index);
        }

        if (isPrimitiveValue(item)) {
          return String(item);
        }

        if (displayKey && typeof item === 'object' && item !== null) {
          return String(
            (item as Record<PropertyKey, unknown>)[displayKey as PropertyKey],
          );
        }

        return JSON.stringify(item);
      },
    [displayKey, renderItem],
  );

  if (items.length === 0) {
    return null;
  }

  const visibleItems = items.slice(0, maxVisible);
  const hiddenItems = includeAll ? items : items.slice(maxVisible);
  const hiddenCount = items.slice(maxVisible).length;
  const hasHiddenItems = hiddenItems.length > 0;
  const lineClampStyle = getLineClampStyle(lineClampSize);

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        lineClampSize > 1 && 'items-start',
      )}
    >
      {visibleItems.map((item, index) => {
        const content = getDisplayValue(item, index);
        const title =
          typeof content === 'string' || typeof content === 'number'
            ? String(content)
            : undefined;

        return (
          <div
            key={getItemKey(item, index, displayKey)}
            className='min-w-0'
            style={lineClampStyle}
            title={title}
          >
            {content}
          </div>
        );
      })}

      {hasHiddenItems && (
        <>
          <button
            {...getReferenceProps({
              ref: refs.setReference,
              className:
                'inline-flex cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              type: 'button',
            })}
          >
            <Badge
              shape='square'
              size='sm'
              variant={open ? 'primary' : 'default'}
              {...badgeProps}
            >
              +{hiddenCount}
            </Badge>
          </button>
          {open && (
            <FloatingPortal>
              <div
                {...getFloatingProps({
                  ref: refs.setFloating,
                  className: cn(
                    'z-50 min-w-40 rounded-md border border-gray-200 bg-white p-4 shadow-lg',
                    popoverClassName,
                  ),
                  style: floatingStyles,
                })}
              >
                <div className='flex flex-col gap-3 text-sm text-default'>
                  {hiddenItems.map((item, index) => (
                    <div key={getItemKey(item, index + maxVisible, displayKey)}>
                      {getDisplayValue(item, index + maxVisible)}
                    </div>
                  ))}
                </div>
              </div>
            </FloatingPortal>
          )}
        </>
      )}
    </div>
  );
};
