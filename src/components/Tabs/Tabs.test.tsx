import { Briefcase, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { Tabs } from './Tabs';
import { TabsList } from './TabsList';
import type { TabsOrientation, TabsSizes, TabsVariant } from './types';

interface RenderTabsOptions {
  disabled?: boolean;
  initialValue?: number;
  onValueChange?: (value: number) => void;
  orientation?: TabsOrientation;
  size?: TabsSizes;
  variant?: TabsVariant;
}

const renderTabs = ({
  disabled = false,
  initialValue = 0,
  onValueChange,
  orientation = 'horizontal',
  size = 'md',
  variant = 'underline',
}: RenderTabsOptions = {}) => {
  const Wrapper = () => {
    const [value, setValue] = useState(initialValue);

    return (
      <Tabs
        disabled={disabled}
        onValueChange={nextValue => {
          setValue(nextValue);
          onValueChange?.(nextValue);
        }}
        orientation={orientation}
        size={size}
        value={value}
        variant={variant}
      >
        <TabsList>
          <Tab onClose={() => undefined} startAdornment={<Briefcase />} statusDot>
            First
          </Tab>
          <Tab onClose={() => undefined} startAdornment={<User />} statusDot>
            Second
          </Tab>
          <Tab onClose={() => undefined} startAdornment={<Settings />} statusDot>
            Third
          </Tab>
        </TabsList>
        <TabPanel>First content</TabPanel>
        <TabPanel>Second content</TabPanel>
        <TabPanel>Third content</TabPanel>
      </Tabs>
    );
  };

  return render(<Wrapper />);
};

describe('Tabs Component', () => {
  const user = userEvent.setup();

  it('renders tablist, tabs, and the active panel', () => {
    renderTabs();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First content');
  });

  it('supports controlled tab changes', async () => {
    renderTabs();

    await user.click(screen.getByRole('tab', { name: /second/i }));

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second content');
    expect(screen.getByRole('tab', { name: /second/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('calls onValueChange when a tab is selected', async () => {
    const handleValueChange = vi.fn();

    renderTabs({ onValueChange: handleValueChange });
    await user.click(screen.getByRole('tab', { name: /third/i }));

    expect(handleValueChange).toHaveBeenCalledWith(2);
  });

  it('supports uncontrolled usage', async () => {
    render(
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab>First</Tab>
          <Tab>Second</Tab>
        </TabsList>
        <TabPanel>First content</TabPanel>
        <TabPanel>Second content</TabPanel>
      </Tabs>,
    );

    await user.click(screen.getByRole('tab', { name: /second/i }));

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second content');
  });

  it('supports horizontal keyboard navigation', async () => {
    renderTabs();

    const firstTab = screen.getByRole('tab', { name: /first/i });
    firstTab.focus();

    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second content');
    expect(screen.getByRole('tab', { name: /second/i })).toHaveFocus();
  });

  it('supports vertical keyboard navigation', async () => {
    renderTabs({ orientation: 'vertical' });

    const firstTab = screen.getByRole('tab', { name: /first/i });
    firstTab.focus();

    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second content');
    expect(screen.getByRole('tab', { name: /second/i })).toHaveFocus();
  });

  it('skips disabled tabs during keyboard navigation', async () => {
    render(
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab>First</Tab>
          <Tab disabled>Second</Tab>
          <Tab>Third</Tab>
        </TabsList>
        <TabPanel>First content</TabPanel>
        <TabPanel>Second content</TabPanel>
        <TabPanel>Third content</TabPanel>
      </Tabs>,
    );

    screen.getByRole('tab', { name: /first/i }).focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: /third/i })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Third content');
  });

  it('does not change selection when a disabled tab is clicked', async () => {
    render(
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab>First</Tab>
          <Tab disabled>Second</Tab>
        </TabsList>
        <TabPanel>First content</TabPanel>
        <TabPanel>Second content</TabPanel>
      </Tabs>,
    );

    await user.click(screen.getByRole('tab', { name: /second/i }));

    expect(screen.getByRole('tabpanel')).toHaveTextContent('First content');
  });

  it('renders close buttons and does not change the tab on close', async () => {
    const handleClose = vi.fn();

    render(
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab onClose={handleClose}>First</Tab>
          <Tab>Second</Tab>
        </TabsList>
        <TabPanel>First content</TabPanel>
        <TabPanel>Second content</TabPanel>
      </Tabs>,
    );

    await user.click(screen.getByRole('button', { name: /close tab/i }));

    expect(handleClose).toHaveBeenCalled();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First content');
  });

  it('renders adornments and status dot', () => {
    renderTabs();

    expect(screen.getAllByRole('tab')[0].querySelector('svg')).toBeInTheDocument();
    expect(
      screen.getAllByRole('tab')[0].querySelector('.bg-danger'),
    ).toBeInTheDocument();
  });

  it('applies the pill variant styles', () => {
    renderTabs({ variant: 'pill' });

    expect(screen.getAllByRole('tab')[0].className).toContain('rounded-full');
  });

  it.each([
    ['sm', 'h-6'],
    ['md', 'h-8'],
    ['lg', 'h-10'],
  ] as [TabsSizes, string][])(
    'applies the correct size classes for %s',
    (size, expectedClass) => {
      renderTabs({ size });

      expect(screen.getAllByRole('tab')[0].className).toContain(expectedClass);
    },
  );

  it('applies the vertical list styles', () => {
    renderTabs({ orientation: 'vertical' });

    expect(screen.getByRole('tablist').className).toContain('flex-col');
  });

  it('applies disabled styles to the whole group', () => {
    renderTabs({ disabled: true });

    screen.getAllByRole('tab').forEach(tab => {
      expect(tab.className).toContain('opacity-40');
    });
  });
});
