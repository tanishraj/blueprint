import { Briefcase, Settings, User } from 'lucide-react';
import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { Tabs } from './Tabs';
import { TabsList } from './TabsList';
import type { TabsProps } from './types';

const sizes = ['sm', 'md', 'lg'] as const;
const variants = ['underline', 'pill'] as const;
const orientations = ['horizontal', 'vertical'] as const;
const noopOnClose = () => undefined;
const panelClassName = 'rounded border border-default bg-base p-4';

const TabsPlayground = (args: TabsProps) => {
  const [, updateArgs] = useArgs<TabsProps>();
  const handleValueChange = useCallback(
    (nextValue: number) => updateArgs({ value: nextValue }),
    [updateArgs],
  );

  return (
    <Tabs {...args} value={args.value ?? 0} onValueChange={handleValueChange}>
      <TabsList className={args.orientation === 'vertical' ? 'mr-4' : ''}>
        <Tab onClose={noopOnClose} startAdornment={<Briefcase />} statusDot>
          Tab
        </Tab>
        <Tab onClose={noopOnClose} startAdornment={<User />} statusDot>
          Tab
        </Tab>
        <Tab onClose={noopOnClose} startAdornment={<Settings />} statusDot>
          Tab
        </Tab>
      </TabsList>
      <TabPanel>
        <div className={panelClassName}>First tab content</div>
      </TabPanel>
      <TabPanel>
        <div className={panelClassName}>Second tab content</div>
      </TabPanel>
      <TabPanel>
        <div className={panelClassName}>Third tab content</div>
      </TabPanel>
    </Tabs>
  );
};

const meta: Meta<TabsProps> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'Tabs organizes related content into horizontal or vertical tab lists with underline or pill styling, optional adornments, status dots, and close affordances.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'radio' },
      options: [0, 1, 2],
      table: {
        category: 'State',
      },
    },
    defaultValue: {
      control: { type: 'radio' },
      options: [0, 1, 2],
      table: {
        category: 'State',
      },
    },
    variant: {
      control: { type: 'radio' },
      options: variants,
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: { type: 'radio' },
      options: sizes,
      table: {
        category: 'Appearance',
      },
    },
    orientation: {
      control: { type: 'radio' },
      options: orientations,
      table: {
        category: 'Layout',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    onValueChange: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Advanced',
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
    disabled: false,
    orientation: 'horizontal',
    size: 'md',
    value: 0,
    variant: 'underline',
  },
};

export default meta;
type Story = StoryObj<TabsProps>;

export const Default: Story = {
  name: 'Playground',
  render: TabsPlayground,
};

export const Variants: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-6'>
      {variants.map(variant => (
        <Tabs key={variant} defaultValue={0} variant={variant}>
          <TabsList>
            <Tab onClose={noopOnClose} startAdornment={<Briefcase />} statusDot>
              Tab
            </Tab>
            <Tab onClose={noopOnClose} startAdornment={<User />} statusDot>
              Tab
            </Tab>
            <Tab onClose={noopOnClose} startAdornment={<Settings />} statusDot>
              Tab
            </Tab>
          </TabsList>
          <TabPanel>
            <div className={panelClassName}>{variant} content</div>
          </TabPanel>
          <TabPanel>
            <div className={panelClassName}>{variant} content</div>
          </TabPanel>
          <TabPanel>
            <div className={panelClassName}>{variant} content</div>
          </TabPanel>
        </Tabs>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-6'>
      {sizes.map(size => (
        <Tabs key={size} defaultValue={0} size={size}>
          <TabsList>
            <Tab onClose={noopOnClose} startAdornment={<Briefcase />} statusDot>
              Tab
            </Tab>
            <Tab onClose={noopOnClose} startAdornment={<User />} statusDot>
              Tab
            </Tab>
            <Tab onClose={noopOnClose} startAdornment={<Settings />} statusDot>
              Tab
            </Tab>
          </TabsList>
          <TabPanel>
            <div className={panelClassName}>{size} content</div>
          </TabPanel>
          <TabPanel>
            <div className={panelClassName}>{size} content</div>
          </TabPanel>
          <TabPanel>
            <div className={panelClassName}>{size} content</div>
          </TabPanel>
        </Tabs>
      ))}
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-8'>
      <Tabs defaultValue={0} orientation='horizontal'>
        <TabsList>
          <Tab onClose={noopOnClose} startAdornment={<Briefcase />} statusDot>
            Tab
          </Tab>
          <Tab onClose={noopOnClose} startAdornment={<User />} statusDot>
            Tab
          </Tab>
          <Tab onClose={noopOnClose} startAdornment={<Settings />} statusDot>
            Tab
          </Tab>
        </TabsList>
        <TabPanel>
          <div className={panelClassName}>Horizontal content</div>
        </TabPanel>
        <TabPanel>
          <div className={panelClassName}>Horizontal content</div>
        </TabPanel>
        <TabPanel>
          <div className={panelClassName}>Horizontal content</div>
        </TabPanel>
      </Tabs>

      <Tabs defaultValue={0} orientation='vertical'>
        <TabsList className='mr-4'>
          <Tab onClose={noopOnClose} startAdornment={<Briefcase />} statusDot>
            Tab
          </Tab>
          <Tab onClose={noopOnClose} startAdornment={<User />} statusDot>
            Tab
          </Tab>
          <Tab onClose={noopOnClose} startAdornment={<Settings />} statusDot>
            Tab
          </Tab>
        </TabsList>
        <TabPanel>
          <div className={panelClassName}>Vertical content</div>
        </TabPanel>
        <TabPanel>
          <div className={panelClassName}>Vertical content</div>
        </TabPanel>
        <TabPanel>
          <div className={panelClassName}>Vertical content</div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-6'>
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab onClose={noopOnClose} startAdornment={<Briefcase />} statusDot>
            Tab
          </Tab>
          <Tab
            disabled
            onClose={noopOnClose}
            startAdornment={<User />}
            statusDot
          >
            Tab
          </Tab>
          <Tab onClose={noopOnClose} startAdornment={<Settings />} statusDot>
            Tab
          </Tab>
        </TabsList>
        <TabPanel>
          <div className={panelClassName}>Enabled tabs</div>
        </TabPanel>
        <TabPanel>
          <div className={panelClassName}>Disabled tab</div>
        </TabPanel>
        <TabPanel>
          <div className={panelClassName}>Enabled tabs</div>
        </TabPanel>
      </Tabs>

      <Tabs defaultValue={0} disabled>
        <TabsList>
          <Tab onClose={noopOnClose} startAdornment={<Briefcase />} statusDot>
            Tab
          </Tab>
          <Tab onClose={noopOnClose} startAdornment={<User />} statusDot>
            Tab
          </Tab>
          <Tab onClose={noopOnClose} startAdornment={<Settings />} statusDot>
            Tab
          </Tab>
        </TabsList>
        <TabPanel>
          <div className={panelClassName}>All tabs disabled</div>
        </TabPanel>
        <TabPanel>
          <div className={panelClassName}>All tabs disabled</div>
        </TabPanel>
        <TabPanel>
          <div className={panelClassName}>All tabs disabled</div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};
