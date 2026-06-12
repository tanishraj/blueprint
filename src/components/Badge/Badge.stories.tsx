import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, BadgeProps } from './Badge';

const meta: Meta<BadgeProps> = {
  title: 'components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    inverted: {
      control: 'boolean',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<BadgeProps>;

const variants = ['default', 'info', 'success', 'warning', 'danger'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

// Helper component for descriptive row labels
const Label = ({ children }: { children: React.ReactNode }) => (
  <span className='w-32 text-sm font-medium text-slate-500 capitalize'>
    {children}
  </span>
);

export const Default: Story = {
  render: args => <Badge {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex items-center gap-6'>
        <Label>Standard</Label>
        <div className='flex items-center gap-4'>
          {variants.map(variant => (
            <Badge key={variant} variant={variant} size='md' />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AllInvertedVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex items-center gap-6'>
        <Label>Inverted</Label>
        <div className='flex items-center gap-4'>
          {variants.map(variant => (
            <Badge key={variant} variant={variant} size='md' inverted />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-6 p-4'>
      {sizes.map(size => (
        <div key={size} className='flex items-center gap-6'>
          <Label>Size {size}</Label>
          <div className='flex items-center gap-4'>
            {variants.map(variant => (
              <Badge key={variant} variant={variant} size={size} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
