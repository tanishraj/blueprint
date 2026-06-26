import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';

import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Divider } from './Divider';
import type { DividerProps } from './types';

const orientations = ['horizontal', 'vertical'] as const;
const contentOptions = [
  'None',
  'Text',
  'Icon',
  'Button',
  'ButtonGroup',
] as const;

const renderContent = (content: (typeof contentOptions)[number]) => {
  if (content === 'Text') {
    return 'Text';
  }

  if (content === 'Icon') {
    return <Plus className='size-4 text-gray-950' />;
  }

  if (content === 'Button') {
    return (
      <Button appearance='filled' size='sm' variant='default'>
        Button
      </Button>
    );
  }

  if (content === 'ButtonGroup') {
    return (
      <ButtonGroup
        buttons={[
          { children: 'Button', appearance: 'outline' },
          { children: 'Button', appearance: 'outline' },
          { children: 'Button', appearance: 'outline' },
        ]}
        size='sm'
      />
    );
  }

  return undefined;
};

type DividerStoryProps = DividerProps & {
  content?: (typeof contentOptions)[number];
};

const meta: Meta<DividerStoryProps> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Divider separates content into sections. It supports horizontal and vertical orientation, with optional centered content such as text, icons, buttons, or grouped actions.
        `,
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return <Story />;
      }

      return (
        <div className='flex min-h-screen w-full items-center justify-center p-10'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    orientation: {
      description: 'Divider direction.',
      control: { type: 'radio' },
      options: orientations,
      table: {
        category: 'Appearance',
        type: { summary: orientations.join(' | ') },
        defaultValue: { summary: 'horizontal' },
      },
    },
    content: {
      description: 'Demo content rendered in the middle of the divider.',
      control: { type: 'select' },
      options: contentOptions,
      table: {
        category: 'Content',
        type: { summary: contentOptions.join(' | ') },
        defaultValue: { summary: 'None' },
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      description: 'Additional classes applied to the divider wrapper.',
      control: 'text',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    orientation: 'horizontal',
    content: 'None',
  },
};

export default meta;
type Story = StoryObj<DividerStoryProps>;

export const Default: Story = {
  name: 'Playground',
  render: ({ content, ...args }) => (
    <div
      className={
        args.orientation === 'vertical'
          ? 'h-80'
          : 'w-[min(42rem,calc(100vw-4rem))]'
      }
    >
      <Divider {...args}>{renderContent(content ?? 'None')}</Divider>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className='flex w-[min(48rem,calc(100vw-4rem))] flex-col gap-12'>
      <Divider />
      <Divider>Text</Divider>
      <Divider>
        <Plus className='size-5 text-gray-950' />
      </Divider>
      <Divider>
        <Button appearance='filled' size='sm' variant='default'>
          Button
        </Button>
      </Divider>
      <Divider>
        <ButtonGroup
          buttons={[
            { children: 'Button', appearance: 'outline' },
            { children: 'Button', appearance: 'outline' },
            { children: 'Button', appearance: 'outline' },
          ]}
          size='sm'
        />
      </Divider>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className='flex h-96 items-center justify-center gap-14'>
      <Divider orientation='vertical' />
      <Divider orientation='vertical'>Text</Divider>
      <Divider orientation='vertical'>
        <Plus className='size-5 text-gray-950' />
      </Divider>
      <Divider orientation='vertical'>
        <Button appearance='filled' size='sm' variant='default'>
          Button
        </Button>
      </Divider>
      <Divider orientation='vertical'>
        <ButtonGroup
          buttons={[
            { children: 'Button', appearance: 'outline' },
            { children: 'Button', appearance: 'outline' },
            { children: 'Button', appearance: 'outline' },
          ]}
          size='sm'
        />
      </Divider>
    </div>
  ),
};
