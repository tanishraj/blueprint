import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Tooltip } from './Tooltip';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;

describe('Tooltip Component', () => {
  it('renders anchor tooltip content when forced open', () => {
    render(
      <>
        <button
          data-tooltip-content='I am a tooltip'
          data-tooltip-id='tooltip-hover'
          type='button'
        >
          Hover me
        </button>
        <Tooltip id='tooltip-hover' isOpen />
      </>,
    );

    expect(screen.getByRole('tooltip')).toHaveTextContent('I am a tooltip');
  });

  it('renders custom content when forced open', () => {
    render(
      <>
        <button data-tooltip-id='tooltip-open' type='button'>
          Target
        </button>
        <Tooltip id='tooltip-open' isOpen variant='secondary'>
          <div>Custom tooltip content</div>
        </Tooltip>
      </>,
    );

    expect(screen.getByRole('tooltip')).toHaveTextContent(
      'Custom tooltip content',
    );
    expect(screen.getByRole('tooltip')).toHaveClass('lqc-tooltip');
  });

  it('applies the expected variant styling', () => {
    render(
      <>
        <button
          data-tooltip-content='Focused tooltip'
          data-tooltip-id='tooltip-focus'
          type='button'
        >
          Focus me
        </button>
        <Tooltip id='tooltip-focus' isOpen place='right' variant='primary' />
      </>,
    );

    expect(screen.getByRole('tooltip')).toHaveStyle({
      backgroundColor: 'var(--background-color-primary)',
      color: 'var(--text-color-white)',
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Focused tooltip');
  });

  it('merges custom className and custom styles with the variant defaults', () => {
    render(
      <>
        <button
          data-tooltip-content='Custom tooltip'
          data-tooltip-id='tooltip-custom'
          type='button'
        >
          Trigger
        </button>
        <Tooltip
          className='custom-tooltip'
          id='tooltip-custom'
          isOpen
          style={{ maxWidth: '420px' }}
          variant='secondary'
        />
      </>,
    );

    const tooltip = screen.getByRole('tooltip');

    expect(tooltip).toHaveClass('lqc-tooltip');
    expect(tooltip).toHaveClass('custom-tooltip');
    expect(tooltip.style.backgroundColor).toBe(
      'var(--background-color-default-hovered)',
    );
    expect(tooltip.style.border).toBe('1px solid var(--border-color-default)');
    expect(tooltip.style.maxWidth).toBe('420px');
  });
});
