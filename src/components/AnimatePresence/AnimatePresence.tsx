import {
  type ReactElement,
  startTransition,
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

const parseTimeList = (value: string) => value.split(',').map(parseTimeValue);

const getTotalDuration = (durations: string, delays: string) => {
  const durationValues = parseTimeList(durations);
  const delayValues = parseTimeList(delays);

  return durationValues.reduce((maxDuration, durationValue, index) => {
    const delayValue =
      delayValues[index] ?? delayValues[delayValues.length - 1] ?? 0;

    return Math.max(maxDuration, durationValue + delayValue);
  }, 0);
};

const getMaxMotionDuration = (node: HTMLElement) => {
  if (typeof window === 'undefined') {
    return 0;
  }

  const computedStyle = window.getComputedStyle(node);

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
};

const waitForNodeExit = (node: HTMLElement) => {
  const maxMotionDuration = getMaxMotionDuration(node);

  if (maxMotionDuration === 0) {
    return Promise.resolve();
  }

  return new Promise<void>(resolve => {
    let hasResolved = false;
    let fallbackTimeout: ReturnType<typeof window.setTimeout> | null = null;

    function cleanup() {
      node.removeEventListener('animationend', handleMotionEnd);
      node.removeEventListener('transitionend', handleMotionEnd);

      if (fallbackTimeout) {
        window.clearTimeout(fallbackTimeout);
        fallbackTimeout = null;
      }
    }

    function complete() {
      if (hasResolved) {
        return;
      }

      hasResolved = true;
      cleanup();
      resolve();
    }

    function handleMotionEnd(event: AnimationEvent | TransitionEvent) {
      if (event.target === node) {
        complete();
      }
    }

    node.addEventListener('animationend', handleMotionEnd);
    node.addEventListener('transitionend', handleMotionEnd);
    fallbackTimeout = window.setTimeout(complete, maxMotionDuration + 50);
  });
};

export function AnimatePresence({ children, presence }: AnimatePresenceProps) {
  const [isPresent, setIsPresent] = useState(presence);
  const registeredNodes = useRef(new Set<HTMLElement>());
  const latestPresence = useRef(presence);

  const contextValue = useMemo(
    () => ({
      registerNode(node: HTMLElement) {
        registeredNodes.current.add(node);
      },
      unregisterNode(node: HTMLElement) {
        registeredNodes.current.delete(node);
      },
    }),
    [],
  );

  useEffect(() => {
    latestPresence.current = presence;

    if (presence) {
      startTransition(() => {
        setIsPresent(true);
      });

      return;
    }

    let isCancelled = false;

    const runExitAnimation = async () => {
      const animationTargets = Array.from(registeredNodes.current);

      if (animationTargets.length > 0) {
        await Promise.all(animationTargets.map(waitForNodeExit));
      }

      if (isCancelled || latestPresence.current) {
        return;
      }

      setIsPresent(false);
    };

    void runExitAnimation();

    return () => {
      isCancelled = true;
    };
  }, [presence]);

  if (!isPresent) {
    return null;
  }

  return (
    <AnimatePresenceContext value={contextValue}>
      {children}
    </AnimatePresenceContext>
  );
}
