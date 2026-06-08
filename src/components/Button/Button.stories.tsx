import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react';
import type { SVGProps } from 'react';

import { Button, ButtonProps } from './Button';

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    {...props}
  >
    <path d='M8 3.5v9M3.5 8h9' />
  </svg>
);

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
const states = [
  { label: 'Default', props: {} },
  { label: 'Loading', props: { loading: true } },
  { label: 'Disabled', props: { disabled: true } },
] as const;

const variantGridClass =
  'grid grid-cols-[6rem_repeat(6,max-content)] items-center gap-5';

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
    leadingIcon: {
      options: ['None', 'Plus'],
      mapping: {
        None: undefined,
        Plus: PlusIcon,
      },
      control: { type: 'select' },
    },
    trailingIcon: {
      options: ['None', 'Plus'],
      mapping: {
        None: undefined,
        Plus: PlusIcon,
      },
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

export const ButtonSizes: Story = {
  args: {
    leadingIcon: PlusIcon,
    trailingIcon: PlusIcon,
  },

  render: args => {
    return (
      <div className='space-y-5'>
        {sizes.map((size, sizeIndex) => (
          <div key={size} className='flex flex-col gap-10'>
            <h2 className='text-default font-bold'>Size: {size}</h2>
            <div className={variantGridClass}>
              <span className='text-base text-default font-bold'>
                Appearance
              </span>
              {variants.map(variant => (
                <span
                  key={variant}
                  className='text-sm text-default font-bold capitalize'
                >
                  {variant}
                </span>
              ))}
              {appearances.map(appearance => (
                <Fragment key={appearance}>
                  <h4 className='text-base text-default font-bold capitalize'>
                    {appearance}
                  </h4>
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
                </Fragment>
              ))}
            </div>
            {sizeIndex !== sizes.length - 1 && (
              <div className='border border-default' />
            )}
          </div>
        ))}
      </div>
    );
  },
};

export const ButtonStates: Story = {
  args: {
    leadingIcon: PlusIcon,
    trailingIcon: PlusIcon,
  },
  render: args => (
    <div className='flex flex-col gap-10'>
      {states.map(({ label, props }, index) => (
        <section key={label} className='flex flex-col gap-5'>
          <h2 className='text-default font-bold'>{label}</h2>
          <div className={variantGridClass}>
            <span className='text-base text-default font-bold'>Appearance</span>
            {variants.map(variant => (
              <span
                key={variant}
                className='text-sm text-default font-bold capitalize'
              >
                {variant}
              </span>
            ))}
            {appearances.map(appearance => (
              <Fragment key={`${label}-${appearance}`}>
                <h4 className='text-base text-default font-bold capitalize'>
                  {appearance}
                </h4>
                {variants.map(variant => (
                  <Button
                    {...args}
                    {...props}
                    key={`${label}-${appearance}-${variant}`}
                    appearance={appearance}
                    variant={variant}
                  >
                    Button
                  </Button>
                ))}
              </Fragment>
            ))}
          </div>
          {index !== states.length - 1 && (
            <div className='border border-default' />
          )}
        </section>
      ))}
    </div>
  ),
};
