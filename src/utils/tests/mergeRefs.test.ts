import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { mergeRefs } from '../mergeRefs';

describe('mergeRefs', () => {
  it('updates callback and object refs', () => {
    const callbackRef = vi.fn();
    const objectRef = createRef<HTMLDivElement>();
    const mergedRef = mergeRefs<HTMLDivElement>(callbackRef, objectRef);
    const node = document.createElement('div');

    const cleanup = mergedRef(node);

    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledWith(node);
    expect(objectRef.current).toBe(node);
    expect(cleanup).toBeUndefined();
  });

  it('returns cleanup and resets refs when a callback ref provides cleanup', () => {
    const callbackCleanup = vi.fn();
    const callbackWithCleanup = vi.fn(() => callbackCleanup);
    const callbackWithoutCleanup = vi.fn();
    const objectRef = createRef<HTMLDivElement>();
    const mergedRef = mergeRefs<HTMLDivElement>(
      callbackWithCleanup,
      callbackWithoutCleanup,
      objectRef,
    );
    const node = document.createElement('div');

    const cleanup = mergedRef(node);

    expect(typeof cleanup).toBe('function');
    expect(callbackWithCleanup).toHaveBeenCalledWith(node);
    expect(callbackWithoutCleanup).toHaveBeenCalledWith(node);
    expect(objectRef.current).toBe(node);

    cleanup?.();

    expect(callbackCleanup).toHaveBeenCalledTimes(1);
    expect(callbackWithCleanup).toHaveBeenCalledTimes(1);
    expect(callbackWithoutCleanup).toHaveBeenCalledTimes(2);
    expect(callbackWithoutCleanup).toHaveBeenLastCalledWith(null);
    expect(objectRef.current).toBeNull();
  });

  it('ignores undefined refs', () => {
    const objectRef = createRef<HTMLDivElement>();
    const mergedRef = mergeRefs<HTMLDivElement>(undefined, objectRef);
    const node = document.createElement('div');

    mergedRef(node);

    expect(objectRef.current).toBe(node);
  });
});
