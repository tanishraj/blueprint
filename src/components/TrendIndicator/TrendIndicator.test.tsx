import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TrendIndicator } from './TrendIndicator';
import { ETrend } from './types';

describe('TrendIndicator', () => {
  it('renders a positive trend icon', () => {
    render(<TrendIndicator variant={ETrend.positive} />);

    expect(
      screen.getByRole('figure', { name: 'Positive Trend' }),
    ).toBeInTheDocument();
  });

  it('renders the inverted trend label', () => {
    render(<TrendIndicator inverted variant={ETrend.positive} />);

    expect(
      screen.getByRole('figure', { name: 'Negative Trend' }),
    ).toBeInTheDocument();
  });

  it('renders value and label', () => {
    render(
      <TrendIndicator
        label='Compared to last month'
        value='12%'
        variant={ETrend.positive}
      />,
    );

    expect(screen.getByText('12%')).toHaveClass('text-default');
    expect(screen.getByText('Compared to last month')).toBeInTheDocument();
  });

  it('can colorize value text by trend variant', () => {
    render(
      <TrendIndicator
        colorizeValueText
        value='12%'
        variant={ETrend.positive}
      />,
    );

    expect(screen.getByText('12%')).toHaveClass('text-success');
  });

  it('renders zero values instead of treating them as empty', () => {
    render(<TrendIndicator value={0} variant={ETrend.neutral} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(
      screen.getByRole('figure', { name: 'Neutral Trend' }),
    ).toBeInTheDocument();
  });

  it('does not set figure semantics when no variant is provided', () => {
    render(<TrendIndicator label='Flat performance' value='0%' />);

    expect(screen.queryByRole('figure')).not.toBeInTheDocument();
    expect(screen.getByText('Flat performance')).toBeInTheDocument();
  });
});
