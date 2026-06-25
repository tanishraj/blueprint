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

    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText('Compared to last month')).toBeInTheDocument();
  });
});
