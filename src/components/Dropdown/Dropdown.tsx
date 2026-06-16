import {
  cloneElement,
  type FC,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  type Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { ChevronDown, Plus } from 'lucide-react';

import { cn } from '@/utils';

import { Button } from '../Button';
import { dropdownArrowStyles, dropdownRootStyles } from './Dropdown.styles';
import { DropdownList } from './DropdownList';
import type { DropdownIcon, DropdownItem, DropdownProps } from './types';

interface DropdownTriggerElementProps {
  'aria-expanded'?: boolean;
  'aria-haspopup'?: DropdownProps['aria-haspopup'];
  className?: string;
  onClick?: (event: MouseEvent<Element>) => void;
  ref?: (node: HTMLElement | null) => void;
}

const defaultItems: DropdownItem[] = [
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
  { label: 'Sign out', value: 'sign-out' },
];

const resolveDefaultAriaLabel = (children: ReactNode) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  return 'Dropdown';
};

export const Dropdown: FC<DropdownProps> = ({
  children = 'Dropdown',
  chevronIcon: ChevronIcon = ChevronDown as DropdownIcon,
  clickOutsideToClose = true,
  closeOnSelect = true,
  defaultOpen = false,
  icon: Icon = Plus as DropdownIcon,
  iconOnly = false,
  inline = false,
  items = defaultItems,
  align = 'center',
  menuClassName,
  menuContent,
  menuOffset = [6, 0],
  menuPlacement,
  menuProps,
  onItemSelect,
  onOpenChange,
  open,
  placement = 'bottom',
  portalTarget,
  renderAs = 'button',
  selectedValue,
  showChevron = true,
  trigger,
  triggerAction = 'click',
  triggerClassName,
  usePortal = true,
  withArrow = false,
  leadingIcon,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-haspopup': ariaHasPopup = 'menu',
  className,
  disabled,
  loading,
  onClick,
  ...restProps
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const floatingPlacement =
    menuPlacement ??
    ((align === 'center' ? placement : `${placement}-${align}`) as Placement);
  const resolvedLeadingIcon = iconOnly ? Icon : leadingIcon;
  const resolvedTrailingIcon =
    iconOnly || !showChevron ? undefined : ChevronIcon;
  const resolvedChildren = iconOnly ? undefined : children;
  const fallbackAriaLabel = resolveDefaultAriaLabel(children);
  const resolvedAriaLabel =
    ariaLabel ?? (iconOnly || loading ? fallbackAriaLabel : undefined);
  const isDisabled = Boolean(disabled || loading);
  const resolvedTrigger =
    typeof trigger === 'function' ? trigger(isOpen) : trigger;
  const hasCustomTrigger =
    resolvedTrigger !== undefined && resolvedTrigger !== null;
  const iconProps = {
    ...(resolvedLeadingIcon ? { leadingIcon: resolvedLeadingIcon } : {}),
    ...(resolvedTrailingIcon ? { trailingIcon: resolvedTrailingIcon } : {}),
  };

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement: floatingPlacement,
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: menuOffset[0], alignmentAxis: menuOffset[1] }),
      flip(),
      shift({ padding: 8 }),
      // eslint-disable-next-line react-hooks/refs -- Floating UI arrow middleware accepts the ref object directly.
      ...(withArrow ? [arrow({ element: arrowRef })] : []),
    ],
  });

  const isHoverTrigger = triggerAction === 'hover';
  const click = useClick(context, { enabled: !isDisabled && !isHoverTrigger });
  const hover = useHover(context, {
    enabled: !isDisabled && isHoverTrigger,
    handleClose: safePolygon(),
  });
  const dismiss = useDismiss(context, {
    outsidePress: clickOutsideToClose,
  });
  const role = useRole(context, { role: 'menu' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    dismiss,
    role,
  ]);

  const renderTrigger = () => {
    const triggerProps = getReferenceProps({
      ref: refs.setReference,
      'aria-expanded': isOpen,
      'aria-haspopup': ariaHasPopup,
      'aria-label': resolvedAriaLabel,
      className: triggerClassName,
      onClick,
    });

    if (hasCustomTrigger) {
      if (isValidElement<DropdownTriggerElementProps>(resolvedTrigger)) {
        const triggerElement =
          resolvedTrigger as ReactElement<DropdownTriggerElementProps>;
        const triggerPropsClassName =
          typeof triggerProps['className'] === 'string'
            ? triggerProps['className']
            : undefined;
        const triggerPropsOnClick = triggerProps['onClick'];

        return (
          <span className={cn(dropdownRootStyles(), className)}>
            {cloneElement(triggerElement, {
              ...triggerProps,
              className: cn(
                triggerElement.props.className,
                triggerPropsClassName,
              ),
              onClick: event => {
                triggerElement.props.onClick?.(event);
                if (typeof triggerPropsOnClick === 'function') {
                  triggerPropsOnClick(event);
                }
              },
            })}
          </span>
        );
      }

      if (renderAs === 'unstyled') {
        return (
          <span className={cn(dropdownRootStyles(), className)}>
            <span {...triggerProps}>{resolvedTrigger}</span>
          </span>
        );
      }
    }

    return (
      <span className={cn(dropdownRootStyles(), className)}>
        <Button
          {...restProps}
          {...iconProps}
          {...triggerProps}
          disabled={disabled}
          loading={loading}
          type={type}
        >
          {resolvedTrigger ?? resolvedChildren}
        </Button>
      </span>
    );
  };

  const content =
    typeof menuContent === 'function' ? menuContent(closeMenu) : menuContent;

  const menu = isOpen ? (
    <DropdownList
      {...getFloatingProps({
        ...menuProps,
        ref: refs.setFloating,
        className: menuClassName,
        style: inline
          ? menuProps?.style
          : {
              ...floatingStyles,
              ...menuProps?.style,
            },
      })}
      closeMenu={closeMenu}
      closeOnSelect={closeOnSelect}
      items={items}
      {...(withArrow && !inline
        ? {
            leadingSlot: (
              <FloatingArrow
                ref={arrowRef}
                className={cn(dropdownArrowStyles())}
                context={context}
                height={7}
                stroke='currentColor'
                strokeWidth={0.5}
                width={14}
              />
            ),
          }
        : {})}
      {...(onItemSelect ? { onItemSelect } : {})}
      {...(selectedValue !== undefined ? { selectedValue } : {})}
    >
      {content}
    </DropdownList>
  ) : null;

  const shouldUsePortal = usePortal && !inline;

  return (
    <>
      {renderTrigger()}
      {shouldUsePortal ? (
        <FloatingPortal {...(portalTarget ? { root: portalTarget } : {})}>
          {menu}
        </FloatingPortal>
      ) : (
        menu
      )}
    </>
  );
};
