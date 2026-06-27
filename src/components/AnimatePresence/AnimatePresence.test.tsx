import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { type FC } from 'react';

import { AnimatePresence } from './AnimatePresence';
import { AnimatePresenceChild } from './AnimatePresenceChild';

// Mock child component to test animation handling
const MockChild: FC = () => (
  <AnimatePresenceChild>
    <div data-testid='child' className='duration-500 ease-out animate-fadeOut'>
      Child
    </div>
  </AnimatePresenceChild>
);

describe('Presence', () => {
  it('renders children when present is true', () => {
    render(
      <AnimatePresence presence={true}>
        <MockChild />
      </AnimatePresence>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('unmounts after exit animation when present changes to false', async () => {
    const { rerender } = render(
      <AnimatePresence presence={true}>
        <MockChild />
      </AnimatePresence>,
    );

    // Verify the child is rendered
    expect(screen.getByTestId('child')).toBeInTheDocument();

    // Trigger the exit animation by setting present to false
    rerender(
      <AnimatePresence presence={false}>
        <MockChild />
      </AnimatePresence>,
    );

    // Simulate the animationend event
    fireEvent.animationEnd(screen.getByTestId('child'));

    // Wait for the child to be unmounted
    await waitFor(() => {
      expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });
  });

  it('does not unmount immediately when present changes to false', async () => {
    const { rerender } = render(
      <AnimatePresence presence={true}>
        <MockChild />
      </AnimatePresence>,
    );

    // Verify the child is rendered
    expect(screen.getByTestId('child')).toBeInTheDocument();

    // Trigger the exit animation by setting present to false
    rerender(
      <AnimatePresence presence={false}>
        <MockChild />
      </AnimatePresence>,
    );

    // Verify the child is still in the DOM (waiting for animation to complete)
    expect(screen.getByTestId('child')).toBeInTheDocument();

    // Simulate the animationend event
    fireEvent.animationEnd(screen.getByTestId('child'));

    // Wait for the child to be unmounted
    await waitFor(() => {
      expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });
  });

  it('unmounts after a transitionend event', async () => {
    const { rerender } = render(
      <AnimatePresence presence={true}>
        <AnimatePresenceChild>
          <div
            data-testid='transition-child'
            style={{ transitionDuration: '150ms' }}
          >
            Child
          </div>
        </AnimatePresenceChild>
      </AnimatePresence>,
    );

    rerender(
      <AnimatePresence presence={false}>
        <AnimatePresenceChild>
          <div
            data-testid='transition-child'
            style={{ transitionDuration: '150ms' }}
          >
            Child
          </div>
        </AnimatePresenceChild>
      </AnimatePresence>,
    );

    fireEvent.transitionEnd(screen.getByTestId('transition-child'));

    await waitFor(() => {
      expect(screen.queryByTestId('transition-child')).not.toBeInTheDocument();
    });
  });

  it('unmounts immediately when there is no motion duration', async () => {
    const { rerender } = render(
      <AnimatePresence presence={true}>
        <AnimatePresenceChild>
          <div data-testid='static-child'>Child</div>
        </AnimatePresenceChild>
      </AnimatePresence>,
    );

    rerender(
      <AnimatePresence presence={false}>
        <AnimatePresenceChild>
          <div data-testid='static-child'>Child</div>
        </AnimatePresenceChild>
      </AnimatePresence>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('static-child')).not.toBeInTheDocument();
    });
  });

  it('keeps the child mounted when presence becomes true before exit completes', async () => {
    const { rerender } = render(
      <AnimatePresence presence={true}>
        <MockChild />
      </AnimatePresence>,
    );

    rerender(
      <AnimatePresence presence={false}>
        <MockChild />
      </AnimatePresence>,
    );

    rerender(
      <AnimatePresence presence={true}>
        <MockChild />
      </AnimatePresence>,
    );

    fireEvent.animationEnd(screen.getByTestId('child'));

    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });
});
