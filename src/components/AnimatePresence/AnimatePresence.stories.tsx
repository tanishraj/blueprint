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
              'animate-in fade-in [--tw-animation-duration:500ms]': isPresent,
              'animate-out fade-out [--tw-animation-duration:500ms]':
                !isPresent,
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
              className='mt-4 rounded-sm bg-slate-100 p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:[--tw-animation-duration:300ms] data-[state=open]:[--tw-animation-duration:500ms] data-[state=closed]:[--tw-exit-translate-x:-100%] data-[state=open]:[--tw-enter-translate-x:-100%]'
            >
              First Child (Slide Animation From Left)
            </div>
          </AnimatePresenceChild>
          <AnimatePresenceChild>
            <div
              data-state={isPresent ? 'open' : 'closed'}
              className='mt-4 rounded-sm bg-slate-100 p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:[--tw-animation-duration:300ms] data-[state=open]:[--tw-animation-duration:500ms] data-[state=closed]:[--tw-exit-translate-x:100%] data-[state=open]:[--tw-enter-translate-x:100%]'
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
