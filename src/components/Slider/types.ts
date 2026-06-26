import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils/types';

import {
  sliderLabelStyles,
  sliderThumbStyles,
  sliderTrackStyles,
} from './Slider.styles';

export type SliderValue = number | [number, number];

export type SliderSizes = RemoveNull<
  VariantProps<typeof sliderTrackStyles>
>['size'];

export interface SliderProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'children' | 'defaultValue' | 'onChange'
> {
  caption?: ReactNode;
  captionClassName?: string;
  defaultValue?: SliderValue;
  disabled?: boolean;
  error?: ReactNode;
  formatValue?: (value: number) => ReactNode;
  label?: ReactNode;
  labelClassName?: string;
  max?: number;
  min?: number;
  onValueChange?: (value: SliderValue) => void;
  range?: boolean;
  showMaxLabel?: boolean;
  showMinLabel?: boolean;
  showValueLabel?: boolean;
  size?: SliderSizes;
  step?: number;
  thumbClassName?: string;
  trackClassName?: string;
  value?: SliderValue;
  valueClassName?: string;
}

export interface SliderState {
  max: number;
  min: number;
  values: [number, number?];
}

export type SliderLabelSizes = RemoveNull<
  VariantProps<typeof sliderLabelStyles>
>['size'];

export type SliderThumbSizes = RemoveNull<
  VariantProps<typeof sliderThumbStyles>
>['size'];
