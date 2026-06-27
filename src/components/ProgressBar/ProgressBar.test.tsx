import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';

const formatValue = ({ value, max }: { max: number; value: number }) =>
  `${value} of ${max}`;

describe('ProgressBar Component', () => {
  it('renders a linear progressbar with label, caption, and value', () => {
    const { container } = render(
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
    expect(screen.getByText(/there will be a caption text here/i)).toHaveClass(
      'text-caption',
    );
    expect(container.querySelector('.bg-default-hovered')).toBeInTheDocument();
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
    expect(
      screen.getByRole('progressbar', { name: /install/i }),
    ).toHaveAttribute('aria-valuetext', '50 of 200');
  });

  it('merges caption and external aria-describedby values', () => {
    render(
      <>
        <span id='external-description'>External description</span>
        <ProgressBar
          aria-describedby='external-description'
          caption='There will be a caption text here'
          label='Label'
          value={30}
        />
      </>,
    );

    const progressbar = screen.getByRole('progressbar', { name: /label/i });
    const caption = screen.getByText(/there will be a caption text here/i);
    const describedBy = progressbar.getAttribute('aria-describedby');

    expect(describedBy).toContain('external-description');
    expect(describedBy).toContain(caption.getAttribute('id'));
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
    expect(container.querySelector('circle')).toHaveClass(
      '[stroke:var(--background-color-default-hovered)]',
    );
  });

  it('uses theme-aware default variant colors', () => {
    const { container } = render(
      <ProgressBar
        aria-label='Default progress'
        value={30}
        variant='default'
      />,
    );

    expect(container.querySelector('.bg-default-inverted')).toBeInTheDocument();
  });

  it('uses theme-aware inverted track colors', () => {
    const { container: linearContainer } = render(
      <ProgressBar aria-label='Linear inverted' inverted value={30} />,
    );

    expect(
      linearContainer.querySelector('.bg-default-hovered-inverted'),
    ).toBeInTheDocument();

    const { container: circularContainer } = render(
      <ProgressBar
        appearance='circular'
        aria-label='Circular inverted'
        inverted
        value={30}
      />,
    );

    expect(circularContainer.querySelector('circle')).toHaveClass(
      '[stroke:var(--background-color-default-hovered-inverted)]',
    );
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

  it('renders valid falsy label and caption content', () => {
    render(<ProgressBar caption={0} label={0} value={0} />);

    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getAllByText('0')).toHaveLength(2);
  });
});
