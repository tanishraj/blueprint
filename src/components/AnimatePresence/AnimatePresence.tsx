import {
  type FC,
  type ReactElement,
  type RefObject,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
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

  const registerRef = useCallback((ref: RefObject<HTMLElement | null>) => {
    if (!registeredRefs.current.some(registeredRef => registeredRef === ref)) {
      registeredRefs.current.push(ref);
    }
  }, []);

  const unregisterRef = useCallback((ref: RefObject<HTMLElement | null>) => {
    registeredRefs.current = registeredRefs.current.filter(r => r !== ref);
  }, []);

  const getMaxMotionDuration = useCallback((node: HTMLElement) => {
    if (typeof window === 'undefined') {
      return 0;
    }

    const computedStyle = window.getComputedStyle(node);
    const parseTimeValue = (value: string) => {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return 0;
      }

      if (trimmedValue.endsWith('ms')) {
        return Number.parseFloat(trimmedValue);
      }

      if (trimmedValue.endsWith('s')) {
        return Number.parseFloat(trimmedValue) * 1000;
      }

      return Number.parseFloat(trimmedValue) || 0;
    };
    const parseTimeList = (value: string) =>
      value.split(',').map(parseTimeValue);
    const getTotalDuration = (durations: string, delays: string) => {
      const durationValues = parseTimeList(durations);
      const delayValues = parseTimeList(delays);

      return durationValues.reduce((maxDuration, durationValue, index) => {
        const delayValue =
          delayValues[index] ?? delayValues[delayValues.length - 1] ?? 0;

        return Math.max(maxDuration, durationValue + delayValue);
      }, 0);
    };

    return Math.max(
      getTotalDuration(
        computedStyle.animationDuration,
        computedStyle.animationDelay,
      ),
      getTotalDuration(
        computedStyle.transitionDuration,
        computedStyle.transitionDelay,
      ),
    );
  }, []);

  const handleExitAnimation = useCallback(async () => {
    if (registeredRefs.current.length === 0) {
      setIsPresent(false);
      return;
    }

    const animationPromises = registeredRefs.current.map(ref => {
      return new Promise<void>(resolve => {
        const node = ref.current;
        if (!node) {
          resolve();
          return;
        }
        const currentNode = node;

        const maxMotionDuration = getMaxMotionDuration(currentNode);

        if (maxMotionDuration === 0) {
          resolve();
          return;
        }

        let hasResolved = false;
        let fallbackTimeout: ReturnType<typeof window.setTimeout> | null = null;

        function complete() {
          if (hasResolved) {
            return;
          }

          hasResolved = true;
          cleanup();
          resolve();
        }

        function handleMotionEnd(event: AnimationEvent | TransitionEvent) {
          if (event.target === currentNode) {
            complete();
          }
        }

        function cleanup() {
          currentNode.removeEventListener('animationend', handleMotionEnd);
          currentNode.removeEventListener('transitionend', handleMotionEnd);

          if (fallbackTimeout) {
            window.clearTimeout(fallbackTimeout);
            fallbackTimeout = null;
          }
        }

        currentNode.addEventListener('animationend', handleMotionEnd);
        currentNode.addEventListener('transitionend', handleMotionEnd);
        fallbackTimeout = window.setTimeout(complete, maxMotionDuration + 50);
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
  }, [getMaxMotionDuration]);

  const contextValue = useMemo(
    () => ({ registerRef, unregisterRef }),
    [registerRef, unregisterRef],
  );

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
    <AnimatePresenceContext value={contextValue}>
      {children}
    </AnimatePresenceContext>
  );
};
