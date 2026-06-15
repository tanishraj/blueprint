import { type FC, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  container?: HTMLElement | null | undefined;
  containerId?: string | undefined;
  containerRef?: RefObject<HTMLElement | null> | undefined;
  disabled?: boolean;
}

const getPortalContainer = ({
  container,
  containerId,
  containerRef,
}: Pick<PortalProps, 'container' | 'containerId' | 'containerRef'>) => {
  if (container) {
    return container;
  }

  if (containerRef?.current) {
    return containerRef.current;
  }

  if (containerId && typeof document !== 'undefined') {
    return document.getElementById(containerId);
  }

  if (typeof document !== 'undefined') {
    return document.body;
  }

  return null;
};

export const Portal: FC<PortalProps> = ({
  children,
  container,
  containerId,
  containerRef,
  disabled = false,
}) => {
  if (disabled) {
    return <>{children}</>;
  }

  const target = getPortalContainer({ container, containerId, containerRef });

  if (!target) {
    return null;
  }

  return createPortal(children, target);
};
