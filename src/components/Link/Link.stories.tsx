import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Link2, Share, SquareArrowOutUpRight } from 'lucide-react';

import { Link } from './Link';
import type { LinkProps } from './types';

const variants = [
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const underlineOptions = ['none', 'hover', 'always'] as const;
const iconOptions = ['None', 'Home', 'Link', 'Share'] as const;

type LinkStoryProps = LinkProps;

const iconMapping = {
  None: undefined,
  Home,
  Link: Link2,
  Share,
};

const meta: Meta<LinkStoryProps> = {
  title: 'components/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Link is an inline navigation primitive for text links with optional leading and trailing icons, external-link indicators, truncation, disabled state, and inverted color mode.
        `,
      },
      layout: 'centered',
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return <Story />;
      }

      return (
        <div className='flex min-h-screen w-full items-center justify-center p-8'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    children: {
      description: 'Visible link label.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    href: {
      description: 'Link destination.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    variant: {
      description: 'Visual semantic color for the link.',
      control: { type: 'select' },
      options: variants,
      table: {
        category: 'Appearance',
        type: { summary: variants.join(' | ') },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Text and icon size.',
      control: { type: 'radio' },
      options: sizes,
      table: {
        category: 'Appearance',
        type: { summary: sizes.join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    underline: {
      description: 'Underline treatment.',
      control: { type: 'radio' },
      options: underlineOptions,
      table: {
        category: 'Appearance',
        type: { summary: underlineOptions.join(' | ') },
        defaultValue: { summary: 'hover' },
      },
    },
    leadingIcon: {
      description: 'Optional icon rendered before the label.',
      control: { type: 'select' },
      options: iconOptions,
      mapping: iconMapping,
      table: {
        category: 'Content',
        type: { summary: iconOptions.join(' | ') },
      },
    },
    trailingIcon: {
      description: 'Optional icon rendered after the label.',
      control: { type: 'select' },
      options: iconOptions,
      mapping: iconMapping,
      table: {
        category: 'Content',
        type: { summary: iconOptions.join(' | ') },
      },
    },
    external: {
      description: 'Render the external-link trailing icon.',
      control: 'boolean',
      table: {
        category: 'Content',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    truncate: {
      description: 'Truncate long labels with ellipsis.',
      control: 'boolean',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: 'Disable navigation and click handling.',
      control: 'boolean',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inverted: {
      description: 'Use inverted color tokens for dark surfaces.',
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    target: {
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top'],
      table: {
        category: 'Behavior',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    children: 'Link',
    href: '/components',
    variant: 'primary',
    size: 'md',
    underline: 'hover',
    leadingIcon: Home,
    external: true,
    truncate: false,
    disabled: false,
    inverted: false,
  },
};

export default meta;
type Story = StoryObj<LinkStoryProps>;

export const Default: Story = {
  name: 'Playground',
  render: args => <Link {...args} />,
};

export const Variants: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-x-12 gap-y-5'>
      {variants.map(variant => (
        <Link
          key={variant}
          external
          href='/components'
          leadingIcon={Home}
          underline='always'
          variant={variant}
        >
          {variant}
        </Link>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col items-start gap-5'>
      {sizes.map(size => (
        <Link
          key={size}
          external
          href='/components'
          leadingIcon={Home}
          size={size}
        >
          {size.toUpperCase()} Link
        </Link>
      ))}
    </div>
  ),
};

export const Truncated: Story = {
  render: () => (
    <div className='flex w-32 flex-col items-start gap-5'>
      <Link external href='/components' leadingIcon={Home} truncate>
        Link Truncated
      </Link>
      <Link
        external
        href='/components'
        leadingIcon={Home}
        truncate
        underline='always'
      >
        Link Truncated
      </Link>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex flex-col items-start gap-5'>
      <Link external href='/components' leadingIcon={Home}>
        Default
      </Link>
      <Link external href='/components' leadingIcon={Home} underline='always'>
        Underlined
      </Link>
      <Link disabled external href='/components' leadingIcon={Home}>
        Disabled
      </Link>
    </div>
  ),
};

export const Inverted: Story = {
  render: () => (
    <div className='grid gap-5 rounded-lg bg-slate-950 p-8'>
      {variants.map(variant => (
        <Link
          key={variant}
          external
          href='/components'
          inverted
          leadingIcon={SquareArrowOutUpRight}
          underline='always'
          variant={variant}
        >
          {variant}
        </Link>
      ))}
    </div>
  ),
};
