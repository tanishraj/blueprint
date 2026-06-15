import {
  cloneElement,
  type FC,
  isValidElement,
  type MouseEvent,
  type ReactElement,
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
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';

import { cn } from '@/utils';

import {
  popoverBodyStyles,
  popoverArrowStyles,
  popoverCloseButtonStyles,
  popoverCloseIconStyles,
  popoverHeaderStyles,
  popoverIconStyles,
  popoverPanelStyles,
  popoverRootStyles,
  popoverTitleStyles,
  popoverTitleWrapperStyles,
  popoverTriggerStyles,
} from './Popover.styles';
import type { PopoverProps, PopoverVariants } from './types';

interface PopoverTriggerElementProps {
  'aria-expanded'?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<Element>) => void;
  ref?: (node: HTMLElement | null) => void;
}

const variantIconMap = {
  default: Info,
  primary: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
} satisfies Record<NonNullable<PopoverVariants>, typeof Info>;

export const Popover: FC<PopoverProps> = ({
  trigger,
  title = 'Title',
  children = 'Slot Area',
  open,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom',
  align = 'center',
  variant = 'default',
  closeLabel = 'Close popover',
  closeOnEscape = true,
  closeOnOutsideClick = true,
  showArrow = true,
  showCloseButton = true,
  showSlotBorder = true,
  className,
  contentClassName,
  triggerClassName,
  ...restProps
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const Icon = variantIconMap[variant];
  const floatingPlacement = (
    align === 'center' ? placement : `${placement}-${align}`
  ) as Placement;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement: floatingPlacement,
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 8 }),
      // eslint-disable-next-line react-hooks/refs -- Floating UI arrow middleware accepts the ref object directly.
      arrow({ element: arrowRef }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    escapeKey: closeOnEscape,
    outsidePress: closeOnOutsideClick,
  });
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const renderTrigger = () => {
    if (!trigger) {
      return null;
    }

    if (isValidElement<PopoverTriggerElementProps>(trigger)) {
      const triggerElement =
        trigger as ReactElement<PopoverTriggerElementProps>;

      return cloneElement(
        triggerElement,
        getReferenceProps({
          ref: refs.setReference,
          'aria-expanded': isOpen,
          className: cn(triggerElement.props.className, triggerClassName),
          onClick: event => {
            triggerElement.props.onClick?.(event);
          },
        }),
      );
    }

    return (
      <button
        {...getReferenceProps({
          ref: refs.setReference,
          'aria-expanded': isOpen,
          className: cn(popoverTriggerStyles(), triggerClassName),
        })}
        type='button'
      >
        {trigger}
      </button>
    );
  };

  return (
    <div className={cn(popoverRootStyles(), className)}>
      {renderTrigger()}
      {isOpen && (
        <FloatingPortal>
          <div
            {...getFloatingProps({
              ...restProps,
              ref: refs.setFloating,
              className: cn(popoverPanelStyles(), contentClassName),
              style: {
                ...floatingStyles,
                ...restProps.style,
              },
            })}
          >
            {showArrow && (
              <FloatingArrow
                ref={arrowRef}
                className={cn(popoverArrowStyles())}
                context={context}
                data-popover-arrow=''
                height={7}
                stroke='currentColor'
                strokeWidth={0.5}
                width={14}
              />
            )}
            <div className={cn(popoverHeaderStyles())}>
              <div className={cn(popoverTitleWrapperStyles())}>
                <Icon
                  aria-hidden='true'
                  className={cn(popoverIconStyles({ variant }))}
                  data-popover-title-icon=''
                />
                {title && (
                  <div className={cn(popoverTitleStyles())}>{title}</div>
                )}
              </div>
              {showCloseButton && (
                <button
                  aria-label={closeLabel}
                  className={cn(popoverCloseButtonStyles())}
                  onClick={handleClose}
                  type='button'
                >
                  <X
                    aria-hidden='true'
                    className={cn(popoverCloseIconStyles())}
                  />
                </button>
              )}
            </div>
            <div className={cn(popoverBodyStyles({ showSlotBorder }))}>
              {children}
            </div>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
};
