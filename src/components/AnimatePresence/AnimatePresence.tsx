import {
  type FC,
  type ReactElement,
  type RefObject,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AnimatePresenceContext } from './Context';

interface AnimatePresenceProps {
  children: ReactElement | ReactElement[];
  presence: boolean;
}

export const AnimatePresence: FC<AnimatePresenceProps> = ({
  children,
  presence,
}) => {
  const [isPresent, setIsPresent] = useState(presence);
  const registeredRefs = useRef<RefObject<HTMLElement | null>[]>([]);
  const latestPresence = useRef(presence);

  const registerRef = (ref: RefObject<HTMLElement | null>) => {
    registeredRefs.current.push(ref);
  };

  const unregisterRef = (ref: RefObject<HTMLElement | null>) => {
    registeredRefs.current = registeredRefs.current.filter(r => r !== ref);
  };

  const handleExitAnimation = useCallback(async () => {
    const animationPromises = registeredRefs.current.map(ref => {
      return new Promise<void>(resolve => {
        const node = ref.current;
        if (node) {
          const handleAnimationEnd = (event: AnimationEvent) => {
            if (event.target === node) {
              node.removeEventListener('animationend', handleAnimationEnd);
              resolve();
            }
          };
          node.addEventListener('animationend', handleAnimationEnd);
        } else {
          resolve();
        }
      });
    });

    try {
      await Promise.all(animationPromises);

      if (latestPresence.current) {
        return;
      }

      setIsPresent(false);
    } catch (error) {
      console.error('HandleExitAnimation failed!!', error);
    }
  }, []);

  useEffect(() => {
    latestPresence.current = presence;

    if (presence) {
      startTransition(() => {
        setIsPresent(true);
      });

      return;
    }

    startTransition(() => {
      void handleExitAnimation();
    });
  }, [presence, handleExitAnimation]);

  if (!isPresent) {
    return null;
  }

  return (
    <AnimatePresenceContext value={{ registerRef, unregisterRef }}>
      {children}
    </AnimatePresenceContext>
  );
};
