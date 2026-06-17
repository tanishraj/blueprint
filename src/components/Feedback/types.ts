import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { RemoveNull } from '@/utils';

import { feedbackOptionStyles } from './Feedback.styles';

export type FeedbackSizes = RemoveNull<
  VariantProps<typeof feedbackOptionStyles>
>['size'];

export type FeedbackVariant = 'face' | 'emoji';

export interface FeedbackOption {
  emoji?: ReactNode;
  label: string;
  value: number;
}

export type FeedbackGetLabelText = (
  option: FeedbackOption,
  index: number,
  total: number,
) => string;

export interface FeedbackProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'defaultValue' | 'onChange'
> {
  defaultValue?: number;
  disabled?: boolean;
  getLabelText?: FeedbackGetLabelText;
  name?: string;
  onValueChange?: (value: number) => void;
  options?: FeedbackOption[];
  readOnly?: boolean;
  size?: FeedbackSizes;
  value?: number;
  variant?: FeedbackVariant;
}
