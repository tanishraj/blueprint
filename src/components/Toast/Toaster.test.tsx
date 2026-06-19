import { render } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import * as ReactDOM from 'react-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ToasterProps } from 'sonner';

import { Toaster } from './Toaster';

vi.mock('react-dom', async () => {
  const actual = await vi.importActual<typeof import('react-dom')>('react-dom');

  return {
    ...actual,
    createPortal: vi.fn(content => content),
  };
});

vi.mock('sonner', () => ({
  Toaster: ({ children, ...props }: PropsWithChildren<ToasterProps>) => (
    <div data-testid='mock-sonner' data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}));

describe('Toaster', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with the default Sonner props', () => {
    const { getByTestId } = render(<Toaster />);
    const sonner = getByTestId('mock-sonner');
    const props = JSON.parse(sonner.getAttribute('data-props') || '{}');

    expect(props.position).toBe('bottom-right');
    expect(props.className).toBe('toast');
    expect(props.toastOptions.className).toBe(
      'w-full rounded-md border-none p-0 shadow-lg',
    );
  });

  it('passes additional props to Sonner', () => {
    const { getByTestId } = render(<Toaster theme='dark' closeButton />);
    const sonner = getByTestId('mock-sonner');
    const props = JSON.parse(sonner.getAttribute('data-props') || '{}');

    expect(props.theme).toBe('dark');
    expect(props.closeButton).toBe(true);
    expect(props.position).toBe('bottom-right');
  });

  it('uses createPortal in the client environment', () => {
    render(<Toaster />);

    expect(ReactDOM.createPortal).toHaveBeenCalledWith(
      expect.anything(),
      document.body,
    );
  });
});
