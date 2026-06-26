import { fireEvent, render, screen } from '@testing-library/react';
import { EyeOff, SearchX } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { EmptyState } from './EmptyState';
import {
  emptyStateActionsStyles,
  emptyStateBodyStyles,
  emptyStateContentStyles,
  emptyStateDetailsStyles,
  emptyStateRootStyles,
} from './EmptyState.styles';

describe('EmptyState', () => {
  it('renders title, description, and icon', () => {
    const { container } = render(
      <EmptyState
        description='There is nothing to show.'
        icon={<SearchX />}
        title='No data available'
      />,
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.getByText('There is nothing to show.')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders rich description content', () => {
    render(
      <EmptyState
        description={
          <span>
            Update filters or <a href='/help'>read the guide</a>.
          </span>
        }
        title='No results'
      />,
    );

    expect(
      screen.getByRole('link', { name: 'read the guide' }),
    ).toHaveAttribute('href', '/help');
  });

  it('renders a custom React node icon', () => {
    render(
      <EmptyState icon={<div data-testid='custom-icon'>!</div>} size='lg' />,
    );

    expect(screen.getByTestId('custom-icon')).toHaveClass('size-20');
  });

  it('preserves numeric content values', () => {
    render(
      <EmptyState description={0} icon={0} title={0}>
        {0}
      </EmptyState>,
    );

    expect(screen.getAllByText('0')).toHaveLength(4);
  });

  it('applies custom copy styles', () => {
    render(
      <EmptyState
        copyClassName='custom-copy-class'
        description='Styled description'
        title='Styled copy'
      />,
    );

    expect(screen.getByText('Styled copy').parentElement).toHaveClass(
      'custom-copy-class',
    );
  });

  it('renders children below the description', () => {
    render(
      <EmptyState description='Request access.' title='No workspace'>
        <button>Open Request</button>
      </EmptyState>,
    );

    expect(
      screen.getByRole('button', { name: 'Open Request' }),
    ).toBeInTheDocument();
  });

  it('renders configurable action buttons', () => {
    const onPrimaryClick = vi.fn();
    const onSecondaryClick = vi.fn();

    render(
      <EmptyState
        actions={[
          {
            actionKey: 'primary',
            children: 'Create Chart',
            onClick: onPrimaryClick,
          },
          {
            actionKey: 'secondary',
            appearance: 'outline',
            children: 'Import Chart',
            onClick: onSecondaryClick,
            variant: 'default',
          },
        ]}
        title='No chart selected'
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create Chart' }));
    fireEvent.click(screen.getByRole('button', { name: 'Import Chart' }));

    expect(onPrimaryClick).toHaveBeenCalledOnce();
    expect(onSecondaryClick).toHaveBeenCalledOnce();
  });

  it.each([
    ['sm', 'size-14'],
    ['md', 'size-16'],
    ['lg', 'size-20'],
  ] as const)(
    'applies %s sizing to the wrapper and icon',
    (size, iconClass) => {
      const { container } = render(
        <EmptyState icon={<SearchX />} size={size} title='Sized state' />,
      );

      expect(container.firstChild).toHaveClass(emptyStateRootStyles({ size }));
      expect(container.querySelector('svg')).toHaveClass(iconClass);
    },
  );

  it('supports a horizontal layout', () => {
    render(
      <EmptyState
        actions={[{ actionKey: 'reset', children: 'Reset Filters' }]}
        data-testid='empty-state'
        description='Try a different filter.'
        icon={<EyeOff />}
        orientation='horizontal'
        title='No matches'
      />,
    );

    const wrapper = screen.getByTestId('empty-state');
    const content = wrapper.firstChild;
    const button = screen.getByRole('button', { name: 'Reset Filters' });
    const body = content?.firstChild;
    const details = button.parentElement?.parentElement;

    expect(wrapper).toHaveClass(
      emptyStateRootStyles({ orientation: 'horizontal' }),
    );
    expect(content).toHaveClass(
      emptyStateContentStyles({ orientation: 'horizontal' }),
    );
    expect(body).toHaveClass(
      emptyStateBodyStyles({ orientation: 'horizontal' }),
    );
    expect(details).toHaveClass(
      emptyStateDetailsStyles({ orientation: 'horizontal' }),
    );
    expect(button.parentElement).toHaveClass(
      emptyStateActionsStyles({ orientation: 'horizontal' }),
    );
  });

  it('passes through custom classes and html attributes', () => {
    render(
      <EmptyState
        className='custom-empty-state'
        data-testid='empty-state'
        title='Custom'
      />,
    );

    expect(screen.getByTestId('empty-state')).toHaveClass('custom-empty-state');
  });
});
