import { createContext } from 'react';

interface AnimatePresenceContextProps {
  registerNode: (node: HTMLElement) => void;
  unregisterNode: (node: HTMLElement) => void;
}

export const AnimatePresenceContext =
  createContext<AnimatePresenceContextProps | null>(null);
