import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleHelp, Search } from 'lucide-react';

import { Label } from './Label';
import { labelPosition } from './Label.styles';
import type { LabelProps } from './types';

const iconOptions = {
  none: undefined,
  searchIcon: <Search className='size-3' />,
  infoIcon: <CircleHelp className='size-3' />,
};

const iconMap = {
  none: 'None',
  searchIcon: 'Search',
  infoIcon: 'Information',
};

const meta: Meta<LabelProps> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'Label arranges descriptive text around a field or custom child, with size, weight, adornment, and required-state support.',
      },
    },
  },
  argTypes: {
    className: {
      control: false,
    },
    position: {
      options: Object.keys(labelPosition),
      control: {
        type: 'radio',
      },
      table: {
        category: 'Layout',
      },
    },
    endAdornment: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: {
        type: 'select',
        labels: iconMap,
      },
      table: {
        category: 'Content',
      },
    },
    text: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    required: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Playground: Story = {
  args: {
    text: 'Label text',
    variant: 'primary',
    position: 'top',
    size: 'md',
    children: <div>Children</div>,
    disabled: false,
    required: false,
  },
};
