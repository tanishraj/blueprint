import { Plus, Settings } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup Component', () => {
  it('renders all configured buttons', () => {
    render(
      <ButtonGroup
        buttons={[
          { children: 'Save' },
          { children: 'Cancel' },
          { children: 'Sync' },
        ]}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('uses shared size and variant defaults for items', () => {
    render(
      <ButtonGroup
        buttons={[
          { children: 'Left' },
          { children: 'Right', leadingIcon: Settings },
        ]}
        size='lg'
      />,
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveClass('px-[18px]');
    expect(buttons[0]).toHaveClass('text-default');
    expect(buttons[1]).toHaveClass('text-default');
  });

  it('allows overriding shared props per button', () => {
    render(
      <ButtonGroup
        buttons={[
          { children: 'Danger', variant: 'danger', leadingIcon: Plus },
          { children: 'Primary' },
        ]}
      />,
    );

    expect(screen.getByRole('button', { name: /danger/i })).toHaveClass(
      'text-white',
    );
    expect(screen.getByRole('button', { name: /primary/i })).toHaveClass(
      'text-default',
    );
  });

  it('aligns according to orientation prop', () => {
    render(
      <ButtonGroup
        buttons={[{ children: 'Top' }, { children: 'Bottom' }]}
        orientation='vertical'
      />,
    );

    expect(screen.getByRole('group')).toHaveClass('flex-col');
  });

  it('supports fullWidth item-level override', () => {
    render(
      <ButtonGroup
        buttons={[
          { children: 'Wide', fullWidth: true },
          { children: 'Normal' },
        ]}
      />,
    );

    const groupButtons = screen.getAllByRole('button');

    expect(groupButtons[0]).toHaveClass('w-full');
  });

  it('allows item-specific disabled override', () => {
    render(
      <ButtonGroup
        buttons={[
          { children: 'Clickable', disabled: false },
          { children: 'Blocked', disabled: true },
        ]}
      />,
    );

    expect(
      screen.getByRole('button', { name: /clickable/i }),
    ).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /blocked/i })).toBeDisabled();
  });

  it('supports external labeling via aria-labelledby', () => {
    render(
      <>
        <span id='actions-label'>Primary actions</span>
        <ButtonGroup
          aria-labelledby='actions-label'
          buttons={[{ children: 'Save' }, { children: 'Cancel' }]}
        />
      </>,
    );

    expect(
      screen.getByRole('group', { name: /primary actions/i }),
    ).toBeInTheDocument();
  });

  it('merges wrapper className onto the group container', () => {
    render(
      <ButtonGroup
        className='justify-center'
        buttons={[{ children: 'Save' }, { children: 'Cancel' }]}
      />,
    );

    expect(screen.getByRole('group')).toHaveClass('justify-center');
  });
});
