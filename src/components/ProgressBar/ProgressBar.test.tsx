import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';

const formatValue = ({ value, max }: { max: number; value: number }) =>
  `${value} of ${max}`;

describe('ProgressBar Component', () => {
  it('renders a linear progressbar with label, caption, and value', () => {
    render(
      <ProgressBar
        caption='There will be a caption text here'
        label='Label'
        value={30}
      />,
    );

    const progressbar = screen.getByRole('progressbar', { name: /label/i });

    expect(progressbar).toHaveAttribute('aria-valuenow', '30');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(
      screen.getByText(/there will be a caption text here/i),
    ).toBeInTheDocument();
  });

  it('clamps values between min and max', () => {
    render(<ProgressBar aria-label='Upload' max={80} min={20} value={120} />);

    const progressbar = screen.getByRole('progressbar', { name: /upload/i });

    expect(progressbar).toHaveAttribute('aria-valuenow', '80');
    expect(progressbar).toHaveAttribute('aria-valuemin', '20');
    expect(progressbar).toHaveAttribute('aria-valuemax', '80');
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('supports custom value formatting', () => {
    render(
      <ProgressBar
        aria-label='Install'
        max={200}
        value={50}
        valueFormatter={formatValue}
      />,
    );

    expect(screen.getByText('50 of 200')).toBeInTheDocument();
  });

  it('renders a circular progressbar', () => {
    const { container } = render(
      <ProgressBar appearance='circular' label='Completion' value={30} />,
    );

    expect(
      screen.getByRole('progressbar', { name: /completion/i }),
    ).toHaveAttribute('aria-valuenow', '30');
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelectorAll('circle')).toHaveLength(2);
  });

  it('can hide visible value text', () => {
    render(<ProgressBar aria-label='Sync' showValue={false} value={30} />);

    expect(
      screen.getByRole('progressbar', { name: /sync/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText('30%')).toBeNull();
  });

  it('renders the optional linear endpoint dot', () => {
    const { container } = render(
      <ProgressBar aria-label='Upload' showDot value={30} />,
    );

    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('passes through custom class names', () => {
    render(
      <ProgressBar
        aria-label='Custom'
        className='progress-root'
        indicatorClassName='progress-indicator'
        trackClassName='progress-track'
        value={30}
      />,
    );

    expect(screen.getByRole('progressbar')).toHaveClass('progress-root');
    expect(document.querySelector('.progress-track')).toBeInTheDocument();
    expect(document.querySelector('.progress-indicator')).toBeInTheDocument();
  });
});
