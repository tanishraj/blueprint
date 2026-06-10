import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';

import { Alert, AlertProps } from './Alert';

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
  },
  args: {
    title: 'This is a Plus UI alert message component',
    children:
      'Lorem ipsum dolor sit amet, his rebum salutatus id, purto vitae signi ferumque ea per. An quod erant sed. Viris aliquam impedit et est has veri deleniti sensi busid, summo paulo cetero no vel.',
    icon: Info,
    variant: 'danger',
    appearance: 'filled',
    size: 'sm',
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
