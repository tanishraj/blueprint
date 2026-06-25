import type { ComponentPropsWithoutRef } from 'react';

export type CountryFlagSize = 'xs' | 'sm' | 'md' | 'lg';

export interface CountryFlagProps extends Omit<
  ComponentPropsWithoutRef<'img'>,
  'alt' | 'height' | 'src' | 'width'
> {
  code?: string;
  name?: string;
  size?: CountryFlagSize;
}
