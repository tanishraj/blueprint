import { type VariantProps } from 'class-variance-authority';

import { RemoveNull } from '@/utils';

import { checkboxControlStyles } from './Checkbox.styles';

export type CheckboxSizes = RemoveNull<
  VariantProps<typeof checkboxControlStyles>
>['size'];

export type CheckboxShapes = RemoveNull<
  VariantProps<typeof checkboxControlStyles>
>['shape'];
