import { render, screen } from '@testing-library/react';
import { CircleHelp } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { MetricCard } from './MetricCard';
import { ETrend } from './types';

describe('MetricCard', () => {
  it('renders label and value', () => {
    render(<MetricCard label={{ text: 'Revenue' }} value={{ text: '$100M' }} />);

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$100M')).toBeInTheDocument();
  });

  it('renders hint and trend indicators', () => {
    render(
      <MetricCard
        hint={{ text: 'vs last month', trend: ETrend.positive }}
        value={{ text: '$100M', trend: ETrend.positive }}
      />,
    );

    expect(screen.getByText('vs last month')).toBeInTheDocument();
    expect(screen.getAllByRole('figure')).toHaveLength(2);
    expect(
      screen.getAllByRole('figure', { name: 'Positive Trend' }),
    ).toHaveLength(2);
  });

  it('renders inverted trend label correctly', () => {
    render(
      <MetricCard
        value={{ text: '$100M', trend: ETrend.positive, trendInverted: true }}
      />,
    );

    expect(
      screen.getByRole('figure', { name: 'Negative Trend' }),
    ).toBeInTheDocument();
  });

  it('renders multiple metric items under one label', () => {
    render(
      <MetricCard
        items={[
          { value: { text: '$36' }, hint: { text: 'May 2024' } },
          { value: { text: '$26' }, hint: { text: 'Jun 2024' } },
        ]}
        label={{ text: 'Revenue' }}
      />,
    );

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$36')).toBeInTheDocument();
    expect(screen.getByText('May 2024')).toBeInTheDocument();
    expect(screen.getByText('$26')).toBeInTheDocument();
    expect(screen.getByText('Jun 2024')).toBeInTheDocument();
  });

  it('applies divider styles', () => {
    const { container } = render(
      <MetricCard showDivider value={{ text: '$100M' }} />,
    );

    expect(container.firstChild).toHaveClass('border-l');
    expect(container.firstChild).toHaveClass('border-gray-300');
    expect(container.firstChild).toHaveClass('pl-6');
  });

  it('supports end adornments in the label', () => {
    render(
      <MetricCard
        label={{
          text: 'Revenue',
          endAdornment: <CircleHelp data-testid='metric-help-icon' />,
        }}
        value={{ text: '$100M' }}
      />,
    );

    expect(screen.getByTestId('metric-help-icon')).toBeInTheDocument();
  });

  it('maps semantic colors to local tokens', () => {
    render(
      <MetricCard
        hint={{ text: 'Alert', color: 'error' }}
        value={{ text: 'Warning', color: 'warning' }}
      />,
    );

    expect(screen.getByText('Warning')).toHaveClass('text-warning');
    expect(screen.getByText('Alert')).toHaveClass('text-danger');
  });

  it('uses large support text when no main value exists', () => {
    render(<MetricCard value={{ supportText: 'Active', supportTextSize: 'lg' }} />);

    expect(screen.getByText('Active')).toHaveClass('text-lg');
    expect(screen.getByText('Active')).toHaveClass('font-semibold');
  });

  it('keeps support text small when a value is present', () => {
    render(
      <MetricCard value={{ text: '100', supportText: 'items', supportTextSize: 'lg' }} />,
    );

    expect(screen.getByText('items')).toHaveClass('text-sm');
    expect(screen.getByText('items')).toHaveClass('font-normal');
  });
});
