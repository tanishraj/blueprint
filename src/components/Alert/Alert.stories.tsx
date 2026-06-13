import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';

import { Alert, AlertProps } from './Alert';
import { AlertAppearances, AlertSizes, AlertVariants } from './types';

const variants = ['default', 'primary', 'info', 'success', 'warning', 'danger'];
const appearances = ['filled', 'outline', 'dashed'];
const sizes = ['sm', 'md', 'lg'];

const meta: Meta<AlertProps> = {
  title: 'components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Alert is used for contextual feedback messages that need to stand out from regular page content.

Use it for brief, actionable communication such as success confirmations, errors, warnings, or neutral notices.

- Use \`variant\` for semantic meaning (default, primary, info, success, warning, danger).
- Use \`appearance\` for visual surface treatment (filled, outline, dashed).
- Provide optional \`title\` and \`children\` to keep heading + body patterns consistent.
- Provide \`icon\` for quicker scanability in dense views.
- Provide \`onClose\` for dismissible alerts.

Accessibility:
- Keep message content text-based and concise for screen-reader clarity.
- If used as an inline message, avoid nested interactive controls inside the alert body unless needed.
`.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      options: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      description: 'Semantic variant representing alert context.',
      control: { type: 'select' },
      table: {
        category: 'Appearance',
      },
    },
    appearance: {
      options: ['filled', 'outline', 'dashed'],
      description: 'Container style variant for contrast and border treatment.',
      control: { type: 'select' },
      table: {
        category: 'Appearance',
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      description: 'Overall spacing and type scale.',
      control: { type: 'select' },
      table: {
        category: 'Appearance',
      },
    },
    inverted: {
      description: 'Switch to inverted color mode. Useful on dark surfaces.',
      control: 'boolean',
      table: {
        category: 'Appearance',
      },
    },
    title: {
      description: 'Short heading text rendered at the top of the alert.',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    children: {
      description: 'Body content for the alert details.',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    icon: {
      description:
        'Optional icon component shown at the left side of the message.',
      table: {
        category: 'Content',
      },
    },
    onClose: {
      description:
        'Optional dismiss callback. Renders the close icon when provided.',
      table: {
        category: 'Behavior',
      },
    },
  },
  args: {
    title: 'This is a concise alert message component',
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

export const AlertSize: Story = {
  render: args => {
    return (
      <div className='flex flex-col gap-4'>
        {sizes.map(size => {
          return (
            <Alert
              {...args}
              key={size}
              variant='primary'
              size={size as AlertSizes}
            />
          );
        })}
      </div>
    );
  },
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

export const AlertApperance: Story = {
  render: args => {
    return (
      <div className='flex flex-col gap-10'>
        {appearances.map(appearance => {
          return (
            <div key={appearance} className='flex flex-col gap-4'>
              <div className='flex flex-col gap-3'>
                <h3 className='uppercase font-bold text-default'>
                  {appearance}
                </h3>
                {variants.map(variant => {
                  return (
                    <Alert
                      {...args}
                      key={variant}
                      variant={variant as AlertVariants}
                      appearance={appearance as AlertAppearances}
                    />
                  );
                })}
              </div>
            </div>
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
