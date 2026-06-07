import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    variant: {
      options: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      control: { type: 'select' },
    },
    appearance: {
      options: ['filled', 'outline', 'dashed', 'ghost'],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    children: 'Button',
    size: 'md',
    variant: 'primary',
    appearance: 'filled',
    disabled: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  render: args => <Button {...args} />,
};

export const ButtonMetrics: Story = {
  render: args => {
    const variants = [
      'default',
      'primary',
      'info',
      'success',
      'warning',
      'danger',
    ] as const;
    const appearances = ['filled', 'outline', 'dashed', 'ghost'] as const;

    return (
      <div className='space-y-5'>
        {appearances.map(appearance => (
          <div key={appearance} className='flex gap-5'>
            {variants.map(variant => (
              <Button
                {...args}
                key={`${appearance}-${variant}`}
                appearance={appearance}
                variant={variant}
              >
                Button
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
