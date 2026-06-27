import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from './Text';
import type { TextProps } from './types';

const sizes = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
] as const;
const weights = ['regular', 'medium', 'semibold', 'bold'] as const;
const tones = [
  'default',
  'caption',
  'placeholder',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
  'inverted',
] as const;
const alignments = ['left', 'center', 'right', 'justify'] as const;
const transforms = ['none', 'uppercase', 'lowercase', 'capitalize'] as const;
const elements = [
  'span',
  'p',
  'div',
  'label',
  'strong',
  'em',
  'small',
] as const;

const meta: Meta<TextProps> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component: `
Text is the typography primitive for rendering token-based text across the UI kit. Use it for semantic text elements with consistent size, weight, tone, alignment, and truncation styles.
        `.trim(),
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    as: {
      options: elements,
      control: { type: 'select' },
      table: {
        category: 'Semantics',
        type: { summary: elements.join(' | ') },
        defaultValue: { summary: 'span' },
      },
    },
    size: {
      options: sizes,
      control: { type: 'select' },
      table: {
        category: 'Appearance',
        type: { summary: sizes.join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    weight: {
      options: weights,
      control: { type: 'radio' },
      table: {
        category: 'Appearance',
        type: { summary: weights.join(' | ') },
        defaultValue: { summary: 'regular' },
      },
    },
    tone: {
      options: tones,
      control: { type: 'select' },
      table: {
        category: 'Appearance',
        type: { summary: tones.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    align: {
      options: alignments,
      control: { type: 'radio' },
      table: {
        category: 'Layout',
        type: { summary: alignments.join(' | ') },
        defaultValue: { summary: 'left' },
      },
    },
    transform: {
      options: transforms,
      control: { type: 'select' },
      table: {
        category: 'Appearance',
        type: { summary: transforms.join(' | ') },
        defaultValue: { summary: 'none' },
      },
    },
    italic: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    truncate: {
      control: 'boolean',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
  },
  args: {
    align: 'left',
    as: 'span',
    children: 'Text example',
    italic: false,
    size: 'md',
    tone: 'default',
    transform: 'none',
    truncate: false,
    weight: 'regular',
  },
};

export default meta;
type Story = StoryObj<TextProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => (
    <div className='w-[min(36rem,calc(100vw-4rem))]'>
      <Text {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='grid w-[min(48rem,calc(100vw-4rem))] gap-4'>
      {sizes.map(size => (
        <div
          className='grid grid-cols-[4rem_1fr] items-baseline gap-5'
          key={size}
        >
          <Text size='sm' tone='caption' weight='medium'>
            {size}
          </Text>
          <Text size={size} weight='semibold'>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className='grid w-[min(36rem,calc(100vw-4rem))] gap-4'>
      {weights.map(weight => (
        <Text key={weight} size='2xl' weight={weight}>
          {weight} text weight
        </Text>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className='grid w-[min(32rem,calc(100vw-4rem))] gap-4 rounded bg-base p-6'>
      {tones.map(tone => (
        <Text key={tone} tone={tone} weight='medium'>
          {tone} tone
        </Text>
      ))}
    </div>
  ),
};

export const Truncated: Story = {
  render: () => (
    <div className='w-64 rounded border border-default bg-base p-4'>
      <Text truncate>
        This is a long text value that should gracefully truncate within a
        constrained container.
      </Text>
    </div>
  ),
};
