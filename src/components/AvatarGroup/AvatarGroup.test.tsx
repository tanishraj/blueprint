import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AvatarGroup } from './AvatarGroup';

const items = [
  { initials: 'AB' },
  { initials: 'CD' },
  { initials: 'EF' },
  { initials: 'GH' },
  { initials: 'IJ' },
  { initials: 'KL' },
];

describe('AvatarGroup', () => {
  it('renders limited avatars and overflow count', () => {
    render(<AvatarGroup items={items} max={4} />);

    const avatars = screen.getAllByRole('img');

    expect(avatars).toHaveLength(4);
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('renders all items when max is larger than total count', () => {
    render(<AvatarGroup items={items.slice(0, 3)} max={5} />);

    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.queryByText('+1')).not.toBeInTheDocument();
  });

  it('passes shared size and shape styles to items', () => {
    render(<AvatarGroup items={items.slice(0, 2)} size='sm' shape='square' />);

    const avatars = screen.getAllByRole('img');

    expect(avatars[0]).toHaveClass('size-6');
    expect(avatars[0]).toHaveClass('rounded');
  });

  it('applies variant style to overflow counter', () => {
    render(<AvatarGroup items={items} max={4} variant='primary' />);

    expect(screen.getByText('+2').parentElement).toHaveClass(
      'bg-primary-pressed',
    );
  });

  it('provides a default accessible label with the member count', () => {
    render(<AvatarGroup items={items.slice(0, 3)} />);

    expect(
      screen.getByRole('group', { name: /avatar group, 3 members/i }),
    ).toBeInTheDocument();
  });

  it('respects external labeling via aria-labelledby', () => {
    render(
      <>
        <span id='team-label'>Design reviewers</span>
        <AvatarGroup items={items.slice(0, 2)} aria-labelledby='team-label' />
      </>,
    );

    expect(
      screen.getByRole('group', { name: /design reviewers/i }),
    ).toBeInTheDocument();
  });

  it('exposes an accessible label for the overflow counter', () => {
    render(<AvatarGroup items={items} max={4} />);

    expect(screen.getByText(/2 more members/i)).toHaveClass('sr-only');
  });
});
