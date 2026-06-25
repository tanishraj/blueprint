import type { Meta, StoryObj } from '@storybook/react-vite';

import { TrendIndicator } from './TrendIndicator';
import { ETrend, type TrendIndicatorProps } from './types';

const meta: Meta<TrendIndicatorProps> = {
  title: 'Components/TrendIndicator',
  component: TrendIndicator,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the trend indicator icon.',
    },
    strokeWidth: {
      control: 'select',
      options: ['thin', 'thick', 'thicker'],
      description: 'Stroke width of the trend indicator icon.',
    },
    variant: {
      control: 'radio',
      options: [ETrend.positive, ETrend.negative, ETrend.neutral],
    },
  },
};

export default meta;
type Story = StoryObj<TrendIndicatorProps>;

export const Playground: Story = {
  args: {
    variant: ETrend.positive,
    value: '383',
    label: '',
    size: 'lg',
    strokeWidth: 'thicker',
  },
};
