import { describe, expect, it } from 'vitest';

import { ETrend } from './types';
import { getGrowthTrend } from './utils';

describe('getGrowthTrend', () => {
  it('returns a positive trend when currentValue is greater than pastValue', () => {
    const { trend } = getGrowthTrend({ currentValue: 100, pastValue: 50 });

    expect(trend).toBe(ETrend.positive);
  });

  it('returns a negative trend when currentValue is lower than pastValue', () => {
    const { trend } = getGrowthTrend({ currentValue: 50, pastValue: 100 });

    expect(trend).toBe(ETrend.negative);
  });

  it('returns a neutral trend when currentValue matches pastValue', () => {
    const { trend } = getGrowthTrend({ currentValue: 100, pastValue: 100 });

    expect(trend).toBe(ETrend.neutral);
  });

  it('returns growth as percentage when requested', () => {
    const { growth } = getGrowthTrend({
      currentValue: 0.1,
      pastValue: 0.05,
      isPercentage: true,
    });

    expect(growth).toBe(100);
  });
});
