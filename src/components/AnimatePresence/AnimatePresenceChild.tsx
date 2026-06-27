import {
  cloneElement,
  type JSX,
  type ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

import { AnimatePresenceContext } from './Context';

interface PresenceChildProps {
  children: ReactElement;
}

export function AnimatePresenceChild({ children }: PresenceChildProps) {
  const context = useContext(AnimatePresenceContext);
  const [node, setNode] = useState<HTMLElement | null>(null);

  if (!context) {
    throw new Error('AnimatePresenceChild must be used within AnimatePresence');
  }

  useEffect(() => {
    if (node) {
      context.registerNode(node);
    }

    return () => {
      if (node) {
        context.unregisterNode(node);
      }
    };
  }, [context, node]);

  return cloneElement(children, {
    ref: setNode,
  } as JSX.IntrinsicAttributes);
}
