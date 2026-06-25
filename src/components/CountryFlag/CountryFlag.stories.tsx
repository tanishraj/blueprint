import type { Meta, StoryObj } from '@storybook/react-vite';

import { CountryFlag } from './CountryFlag';
import type { CountryFlagProps } from './types';

const meta: Meta<CountryFlagProps> = {
  title: 'Components/CountryFlag',
  component: CountryFlag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
CountryFlag renders a lightweight country flag image using a two-letter ISO country code and \`flagcdn\`.

- Use \`code\` for the flag source.
- Use \`name\` for accessible alt text.
- Use \`size\` for the standard flag dimensions.
        `.trim(),
      },
    },
  },
  argTypes: {
    code: {
      control: 'text',
      description: 'Two-letter country code used to build the flag URL.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'IN' },
      },
    },
    name: {
      control: 'text',
      description: 'Country name used in the image alt text.',
      table: {
        category: 'Content',
      },
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Preset flag dimensions.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Layout',
      },
    },
  },
  args: {
    code: 'IN',
    name: 'India',
    size: 'md',
  },
};

export default meta;

type Story = StoryObj<CountryFlagProps>;

export const Playground: Story = {};

export const WithCountryName: Story = {
  args: {
    code: 'GB',
    name: 'United Kingdom',
    size: 'md',
  },
};

export const CountryExamples: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
      <div className='flex flex-col items-center gap-2'>
        <CountryFlag code='US' name='United States' size='md' />
        <span className='text-xs text-caption'>US</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <CountryFlag code='IN' name='India' size='md' />
        <span className='text-xs text-caption'>IN</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <CountryFlag code='JP' name='Japan' size='md' />
        <span className='text-xs text-caption'>JP</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <CountryFlag code='AE' name='United Arab Emirates' size='md' />
        <span className='text-xs text-caption'>AE</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <CountryFlag code='US' name='United States' size='xs' />
        <span className='text-xs text-caption'>xs</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <CountryFlag code='US' name='United States' size='sm' />
        <span className='text-xs text-caption'>sm</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <CountryFlag code='US' name='United States' size='md' />
        <span className='text-xs text-caption'>md</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <CountryFlag code='US' name='United States' size='lg' />
        <span className='text-xs text-caption'>lg</span>
      </div>
    </div>
  ),
};
