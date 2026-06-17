import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import clsx from 'clsx';

import { AnimatePresence } from './AnimatePresence';
import { AnimatePresenceChild } from './AnimatePresenceChild';
import { Button } from '../Button';

const meta: Meta<typeof AnimatePresence> = {
  title: 'components/AnimatePresence',
  component: AnimatePresence,
  subcomponents: { AnimatePresenceChild },
};

// Basic Example
export const BasicExample = () => {
  const [isPresent, setIsPresent] = useState(false);
  const toggleOpen = useCallback(() => setIsPresent(prev => !prev), []);

  return (
    <div>
      <Button onClick={toggleOpen}>{isPresent ? 'Close' : 'Open'}</Button>

      <AnimatePresence presence={isPresent}>
        <AnimatePresenceChild>
          <div
            className={clsx('p-4 mt-4 rounded-sm bg-slate-200', {
              'animate-in fade-in duration-500': isPresent,
              'animate-out fade-out duration-500': !isPresent,
            })}
          >
            Basic Presence Example
            <p>This content fades in and out</p>
          </div>
        </AnimatePresenceChild>
      </AnimatePresence>
    </div>
  );
};

export const TailwindExample: StoryObj<typeof AnimatePresence> = {
  render: function useStory() {
    const [isPresent, setIsPresent] = useState(false);
    const toggleOpen = useCallback(() => setIsPresent(prev => !prev), []);

    return (
      <div>
        <Button onClick={toggleOpen}>Toggle Multiple</Button>

        <AnimatePresence presence={isPresent}>
          <AnimatePresenceChild>
            <div
              data-state={isPresent ? 'open' : 'closed'}
              className='p-4 mt-4 bg-slate-100 rounded-sm transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
            >
              First Child (Slide Animation From Left)
            </div>
          </AnimatePresenceChild>
          <AnimatePresenceChild>
            <div
              data-state={isPresent ? 'open' : 'closed'}
              className='p-4 mt-4 bg-slate-100 rounded-sm  transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'
            >
              Second Child (Slide Animation From Right)
            </div>
          </AnimatePresenceChild>
        </AnimatePresence>
      </div>
    );
  },
};

export default meta;
