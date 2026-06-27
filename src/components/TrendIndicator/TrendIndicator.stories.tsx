import type { Meta, StoryObj } from '@storybook/react-vite';

import { TrendIndicator } from './TrendIndicator';
import { ETrend, type TrendIndicatorProps } from './types';

const meta: Meta<TrendIndicatorProps> = {
  title: 'Components/TrendIndicator',
  component: TrendIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'TrendIndicator pairs a numeric or textual value with a directional trend icon and optional supporting label.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the trend indicator icon.',
      table: {
        category: 'Appearance',
      },
    },
    strokeWidth: {
      control: 'select',
      options: ['thin', 'thick', 'thicker'],
      description: 'Stroke width of the trend indicator icon.',
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      control: 'radio',
      options: [ETrend.positive, ETrend.negative, ETrend.neutral],
      table: {
        category: 'Appearance',
      },
    },
    value: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    label: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    colorizeValueText: {
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    inverted: {
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
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
    colorizeValueText: false,
    inverted: false,
  },
};
