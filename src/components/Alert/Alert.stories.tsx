import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';

import { Alert, AlertProps } from './Alert';
import { AlertVariants } from './types';

const variants = ['default', 'primary', 'info', 'success', 'warning', 'danger'];
const appearances = ['filled', 'outline', 'dashed'];
const sizes = ['sm', 'md', 'lg'];

const meta: Meta<AlertProps> = {
  title: 'components/Alert',
  component: Alert,
  parameters: {},
  argTypes: {
    variant: {
      options: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      control: { type: 'select' },
    },
    appearance: {
      options: ['filled', 'outline', 'dashed'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    inverted: Boolean,
  },
  args: {
    title: 'This is a Blueprint alert message component',
    children:
      'Lorem ipsum dolor sit amet, his rebum salutatus id, purto vitae signi ferumque ea per. An quod erant sed. Viris aliquam impedit et est has veri deleniti sensi busid, summo paulo cetero no vel.',
    icon: Info,
    variant: 'default',
    appearance: 'filled',
    size: 'sm',
    inverted: false,
    onClose: () => {
      console.log('Alert Closed.');
    },
  },
};

export default meta;
type Story = StoryObj<AlertProps>;

export const Default: Story = {
  render: args => <Alert {...args} />,
};

export const AlertVariant: Story = {
  render: args => {
    return (
      <div className='flex flex-col gap-4'>
        {variants.map(variant => {
          return (
            <Alert {...args} key={variant} variant={variant as AlertVariants} />
          );
        })}
      </div>
    );
  },
};

export const AlertOutline: Story = {
  render: args => {
    return (
      <div className='flex flex-col gap-4'>
        {variants.map(variant => {
          return (
            <Alert
              {...args}
              key={variant}
              variant={variant as AlertVariants}
              appearance='outline'
            />
          );
        })}
      </div>
    );
  },
};

export const AlertDashed: Story = {
  render: args => {
    return (
      <div className='flex flex-col gap-4'>
        {variants.map(variant => {
          return (
            <Alert
              {...args}
              key={variant}
              variant={variant as AlertVariants}
              appearance='dashed'
            />
          );
        })}
      </div>
    );
  },
};

export const AlertFilledInverted: Story = {
  render: args => {
    return (
      <div className='flex flex-col gap-4'>
        {variants.map(variant => {
          return (
            <Alert
              {...args}
              key={variant}
              variant={variant as AlertVariants}
              appearance='filled'
              inverted
            />
          );
        })}
      </div>
    );
  },
};
