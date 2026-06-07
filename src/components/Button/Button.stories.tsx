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
    const sizes = ['sm', 'md', 'lg'] as const;
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
        {sizes.map((size, sizeIndex) => (
          <div key={size} className='flex flex-col gap-10'>
            <h2 className='text-default font-bold'>Size: {size}</h2>
            {appearances.map(appearance => (
              <div key={appearance} className='flex items-center gap-5'>
                <h4 className='text-base text-default font-bold'>
                  Appearence: <div>{appearance}</div>
                </h4>
                <div className='flex gap-5'>
                  {variants.map(variant => (
                    <Button
                      {...args}
                      key={`${appearance}-${variant}`}
                      appearance={appearance}
                      variant={variant}
                      size={size}
                    >
                      Button
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            {sizeIndex !== size.length && (
              <div className='border border-default' />
            )}
          </div>
        ))}
      </div>
    );
  },
};
