import { createContext, type RefObject } from 'react';

interface AnimatePresenceContextProps {
  registerRef: (ref: RefObject<HTMLElement | null>) => void;
  unregisterRef: (ref: RefObject<HTMLElement | null>) => void;
}

export const AnimatePresenceContext =
  createContext<AnimatePresenceContextProps | null>(null);
