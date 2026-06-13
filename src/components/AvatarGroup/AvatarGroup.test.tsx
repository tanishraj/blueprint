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

    expect(screen.getByText('+2')).toHaveClass('bg-primary-pressed');
  });
});
