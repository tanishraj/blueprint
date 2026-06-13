import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';

import { ButtonGroup } from './ButtonGroup';
import type { ButtonGroupItem, ButtonGroupProps } from './types';

type ButtonGroupVariant =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';
type ButtonGroupAppearance = 'filled' | 'outline' | 'dashed' | 'ghost';
type ButtonGroupSize = 'sm' | 'md' | 'lg';
type ButtonGroupOrientation = 'horizontal' | 'vertical';

const variants: ButtonGroupVariant[] = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
];
const appearances: ButtonGroupAppearance[] = [
  'filled',
  'outline',
  'dashed',
  'ghost',
];
const sizes: ButtonGroupSize[] = ['sm', 'md', 'lg'];
const orientations: ButtonGroupOrientation[] = ['horizontal', 'vertical'];

const buildSegmentedButtons = (
  count: number,
  options?: {
    variant?: ButtonGroupVariant;
    appearance?: ButtonGroupAppearance;
    size?: ButtonGroupSize;
    loadingIndexes?: readonly number[];
    showTrailingIcon?: boolean;
  },
): ButtonGroupItem[] =>
  Array.from({ length: count }, (_, index) => {
    const item: ButtonGroupItem = {
      children: 'Button',
      leadingIcon: Plus,
      variant: options?.variant ?? (index === 0 ? 'primary' : 'default'),
      appearance: options?.appearance ?? (index === 0 ? 'filled' : 'outline'),
      size: options?.size,
    };
    const hasTrailingIcon = options?.showTrailingIcon && index === 0;
    const isLoading = (options?.loadingIndexes ?? []).indexOf(index) !== -1;

    return {
      ...item,
      ...(hasTrailingIcon ? { trailingIcon: Plus } : {}),
      ...(isLoading ? { loading: true } : {}),
    };
  });

const defaultButtons = buildSegmentedButtons(3, { showTrailingIcon: true });

const meta: Meta<ButtonGroupProps> = {
  title: 'components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
ButtonGroup arranges multiple buttons into a single segmented control. Use item-level props to control appearance, size, loading, icons, and state.
        `.trim(),
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return <Story />;
      }

      return (
        <div className='w-full min-h-screen flex items-center justify-center'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    buttons: {
      control: 'object',
      description: 'Button definitions for the group (item-level values).',
      table: {
        category: 'Content',
      },
    },
    orientation: {
      control: { type: 'select' },
      options: orientations,
      description: 'Group layout direction.',
      table: {
        category: 'Layout',
      },
    },
    size: {
      control: { type: 'select' },
      options: sizes,
      description: 'Shared size for all buttons in the group.',
      table: {
        category: 'Appearance',
      },
    },
    inverted: {
      control: 'boolean',
      description: 'Applies inverted colors to the group buttons.',
      table: {
        category: 'Appearance',
      },
    },
    role: {
      control: 'text',
      description: 'Wrapper role (defaults to group).',
      table: {
        category: 'Accessibility',
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the wrapper.',
      table: {
        category: 'Accessibility',
      },
    },
  },
  args: {
    orientation: 'horizontal',
    size: 'md',
    inverted: false,
    buttons: defaultButtons,
  },
};

export default meta;
type Story = StoryObj<ButtonGroupProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <ButtonGroup {...args} />,
};

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      {variants.map(variant => (
        <div
          key={variant}
          className='flex flex-col items-center gap-3 text-center'
        >
          <ButtonGroup buttons={buildSegmentedButtons(3, { variant })} />
          <span className='min-h-4 text-xs text-slate-500 capitalize'>
            {variant}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Appearances: Story = {
  name: 'Appearances',
  render: () => (
    <div className='flex flex-wrap items-start justify-center gap-8'>
      {appearances.map(appearance => (
        <div
          key={appearance}
          className='flex flex-col items-center gap-3 text-center'
        >
          <ButtonGroup
            buttons={buildSegmentedButtons(3, {
              appearance,
              variant: 'primary',
              showTrailingIcon: true,
            })}
          />
          <span className='min-h-4 text-xs text-slate-500 capitalize'>
            {appearance}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className='flex flex-wrap items-end justify-center gap-8'>
      {sizes.map(size => (
        <div
          key={size}
          className='flex flex-col items-center gap-3 text-center'
        >
          <ButtonGroup
            buttons={buildSegmentedButtons(3, {
              size,
              variant: 'default',
            })}
          />
          <span className='min-h-4 text-xs text-slate-500'>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Orientations: Story = {
  name: 'Orientations',
  render: () => (
    <div className='flex flex-col items-start gap-8'>
      {orientations.map(orientation => (
        <div
          key={orientation}
          className='flex w-full flex-col items-start gap-3'
        >
          <ButtonGroup
            buttons={buildSegmentedButtons(3, {
              variant: 'primary',
              appearance: 'outline',
            })}
            orientation={orientation}
          />
          <span className='min-h-4 text-xs text-slate-500 capitalize'>
            {orientation}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  name: 'Loading',
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      <div className='flex flex-col items-center gap-3 text-center'>
        <ButtonGroup
          buttons={buildSegmentedButtons(3, {
            loadingIndexes: [1],
            variant: 'info',
          })}
        />
        <span className='min-h-4 text-xs text-slate-500'>Item Loading</span>
      </div>
      <div className='flex flex-col items-center gap-3 text-center'>
        <ButtonGroup
          buttons={buildSegmentedButtons(4, {
            loadingIndexes: [0, 2],
            variant: 'warning',
          })}
        />
        <span className='min-h-4 text-xs text-slate-500'>Multiple Loading</span>
      </div>
    </div>
  ),
};

export const Inverted: Story = {
  name: 'Inverted',
  render: () => (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      <ButtonGroup
        buttons={buildSegmentedButtons(3, {
          variant: 'primary',
          appearance: 'filled',
        })}
        inverted
      />
      <ButtonGroup
        buttons={buildSegmentedButtons(3, {
          variant: 'danger',
          appearance: 'outline',
        })}
        inverted
      />
    </div>
  ),
};
