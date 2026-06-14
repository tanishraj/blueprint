import { ChevronDown } from 'lucide-react';
import { type MouseEventHandler, FC, useId, useState } from 'react';

import { cn } from '@/utils';

import {
  accordionChevronStyles,
  accordionContentInnerStyles,
  accordionContentStyles,
  accordionHeaderButtonStyles,
  accordionItemStyles,
  accordionRootStyles,
  accordionTitleStyles,
} from './Accordion.styles';
import type { AccordionProps, AccordionType } from './types';

const toArray = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : [];
};

const getNextValue = (
  currentValue: string[],
  itemValue: string,
  type: AccordionType,
  collapsible: boolean,
) => {
  const isOpen = currentValue.indexOf(itemValue) !== -1;

  if (type === 'multiple') {
    return isOpen
      ? currentValue.filter(value => value !== itemValue)
      : [...currentValue, itemValue];
  }

  if (isOpen) {
    return collapsible ? [] : currentValue;
  }

  return [itemValue];
};

export const Accordion: FC<AccordionProps> = ({
  ref,
  size,
  items,
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  collapsible = true,
  className,
  ...restProps
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(
    toArray(defaultValue),
  );
  const rootId = useId();
  const openItems = isControlled ? toArray(value) : internalValue;
  const handleToggle = (itemValue: string) => {
    const nextValue = getNextValue(openItems, itemValue, type, collapsible);

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(type === 'multiple' ? nextValue : nextValue[0]);
  };
  const handleItemClick: MouseEventHandler<HTMLButtonElement> = event => {
    handleToggle(event.currentTarget.value);
  };

  return (
    <div
      {...restProps}
      ref={ref}
      className={cn(accordionRootStyles({ size }), className)}
    >
      {items.map((item, index) => {
        const isOpen = openItems.indexOf(item.value) !== -1;
        const isLast = index === items.length - 1;
        const triggerId = `${rootId}-${item.value}-trigger`;
        const contentId = `${rootId}-${item.value}-content`;

        return (
          <div
            key={item.value}
            className={cn(
              accordionItemStyles({
                last: isLast,
                disabled: Boolean(item.disabled),
              }),
            )}
          >
            <button
              id={triggerId}
              type='button'
              value={item.value}
              aria-controls={contentId}
              aria-expanded={isOpen}
              disabled={item.disabled}
              className={cn(accordionHeaderButtonStyles({ size }))}
              onClick={handleItemClick}
            >
              <span
                className={cn(
                  accordionTitleStyles({ disabled: Boolean(item.disabled) }),
                )}
              >
                {item.title}
              </span>
              <ChevronDown
                aria-hidden='true'
                className={cn(
                  accordionChevronStyles({
                    size,
                    open: isOpen,
                    disabled: Boolean(item.disabled),
                  }),
                )}
              />
            </button>
            {isOpen && (
              <div
                id={contentId}
                role='region'
                aria-labelledby={triggerId}
                className={cn(accordionContentStyles())}
              >
                <div className={cn(accordionContentInnerStyles({ size }))}>
                  {item.content}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
