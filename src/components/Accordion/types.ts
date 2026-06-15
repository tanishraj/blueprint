import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { type RemoveNull } from '@/utils';

import { accordionRootStyles } from './Accordion.styles';

export type AccordionSizes = RemoveNull<
  VariantProps<typeof accordionRootStyles>
>['size'];

export type AccordionType = 'single' | 'multiple';

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps
  extends
    ComponentPropsWithRef<'div'>,
    RemoveNull<VariantProps<typeof accordionRootStyles>> {
  items: AccordionItem[];
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  collapsible?: boolean;
}
