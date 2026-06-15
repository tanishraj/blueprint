import {
  cloneElement,
  type FC,
  type JSX,
  type ReactElement,
  type Ref,
  use,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { mergeRefs } from '../../utils';
import { AnimatePresenceContext } from './Context';

interface PresenceChildProps {
  children: ReactElement;
}

export const AnimatePresenceChild: FC<PresenceChildProps> = ({ children }) => {
  const context = use(AnimatePresenceContext);
  const presenceRef = useRef<HTMLElement | null>(null);

  if (!context) {
    throw new Error('PresenceChild must be used within a Presence component');
  }

  useEffect(() => {
    if (presenceRef.current) {
      context.registerRef(presenceRef);
    }

    return () => {
      context.unregisterRef(presenceRef);
    };
  }, [context]);

  // Safely access the existing ref from child props
  const existingRef = (children.props as { ref?: Ref<HTMLElement | null> }).ref;

  const notifyExistingRef = useMemo(
    () => mergeRefs<HTMLElement | null>(existingRef ?? null),
    [existingRef],
  );

  useEffect(() => {
    notifyExistingRef(presenceRef.current);

    return () => {
      notifyExistingRef(null);
    };
  }, [notifyExistingRef]);

  // eslint-disable-next-line react-hooks/refs -- cloning with a ref is safe here because the callback never reads during render
  return cloneElement(children, {
    ref: presenceRef,
  } as JSX.IntrinsicAttributes);
};
