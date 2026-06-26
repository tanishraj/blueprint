import type { CountryFlagProps, CountryFlagSize } from './types';

const FLAG_SIZES: Record<CountryFlagSize, { width: number; height: number }> = {
  xs: { width: 16, height: 12 },
  sm: { width: 20, height: 15 },
  md: { width: 24, height: 18 },
  lg: { width: 32, height: 24 },
};

function getNormalizedCountryCode(code?: string) {
  const normalizedCode = code?.trim().toLowerCase();

  return normalizedCode && /^[a-z]{2}$/.test(normalizedCode)
    ? normalizedCode
    : null;
}

export function CountryFlag({
  code,
  name,
  size = 'md',
  className,
  loading = 'lazy',
  decoding = 'async',
  ...restProps
}: CountryFlagProps) {
  const normalizedCode = getNormalizedCountryCode(code);

  if (!normalizedCode) {
    return null;
  }

  const { width, height } = FLAG_SIZES[size];
  const accessibleCountryName = name?.trim() || normalizedCode.toUpperCase();

  return (
    <img
      {...restProps}
      alt={`${accessibleCountryName} flag`}
      className={className}
      decoding={decoding}
      height={height}
      loading={loading}
      src={`https://flagcdn.com/${width}x${height}/${normalizedCode}.png`}
      width={width}
    />
  );
}
