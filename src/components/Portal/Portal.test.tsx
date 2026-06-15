import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Portal } from './Portal';

describe('Portal Component', () => {
  it('renders into document body by default', () => {
    render(
      <Portal>
        <span>Portal content</span>
      </Portal>,
    );

    expect(screen.getByText('Portal content')).toBeInTheDocument();
    expect(screen.getByText('Portal content').parentElement).toBe(
      document.body,
    );
  });

  it('renders into a container id', () => {
    const target = document.createElement('div');
    target.id = 'drawer-root';
    document.body.appendChild(target);

    render(<Portal containerId='drawer-root'>Inside id</Portal>);

    expect(target).toHaveTextContent('Inside id');
  });

  it('renders into a container ref', () => {
    const target = document.createElement('div');
    const ref = createRef<HTMLDivElement>();
    ref.current = target;

    render(<Portal containerRef={ref}>Inside ref</Portal>);

    expect(target).toHaveTextContent('Inside ref');
  });

  it('renders inline when disabled', () => {
    render(
      <div data-testid='wrapper'>
        <Portal disabled>Inline content</Portal>
      </div>,
    );

    expect(screen.getByTestId('wrapper')).toHaveTextContent('Inline content');
  });
});
