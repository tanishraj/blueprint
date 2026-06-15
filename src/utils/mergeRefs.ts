import type { Ref, RefCallback, RefObject } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

const setRef = <T>(
  ref: PossibleRef<T>,
  node: T | null,
): ReturnType<RefCallback<T>> => {
  if (typeof ref === 'function') {
    return ref(node);
  }

  if (ref !== null && ref !== undefined) {
    (ref as RefObject<T | null>).current = node;
  }
};

export const mergeRefs =
  <T>(...refs: Array<PossibleRef<T>>) =>
  (node: T | null) => {
    const cleanups = refs.map(ref => setRef(ref, node));

    if (cleanups.some(cleanup => typeof cleanup === 'function')) {
      return () => {
        cleanups.forEach((cleanup, index) => {
          if (typeof cleanup === 'function') {
            cleanup();
          } else {
            setRef(refs[index], null);
          }
        });
      };
    }

    return undefined;
  };
