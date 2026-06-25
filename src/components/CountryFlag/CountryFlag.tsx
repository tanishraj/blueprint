import type { FC } from 'react';

import type { CountryFlagProps, CountryFlagSize } from './types';

const FLAG_SIZES: Record<CountryFlagSize, { width: number; height: number }> = {
  xs: { width: 16, height: 12 },
  sm: { width: 20, height: 15 },
  md: { width: 24, height: 18 },
  lg: { width: 32, height: 24 },
};

export const CountryFlag: FC<CountryFlagProps> = ({
  code,
  name,
  size = 'md',
  className,
  loading = 'lazy',
  ...restProps
}) => {
  if (!code || code.length !== 2) {
    return null;
  }

  const { width, height } = FLAG_SIZES[size];

  return (
    <img
      {...restProps}
      alt={name ? `${name} flag` : `${code} flag`}
      className={className}
      height={height}
      loading={loading}
      src={`https://flagcdn.com/${width}x${height}/${code.toLowerCase()}.png`}
      width={width}
    />
  );
};
