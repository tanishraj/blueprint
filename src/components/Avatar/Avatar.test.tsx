import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UserRound } from 'lucide-react';

import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  it('renders initials in text mode', () => {
    render(<Avatar initials='AP' />);

    expect(screen.getByText('AP')).toBeInTheDocument();
  });

  it('renders initials as single character for xs size', () => {
    render(<Avatar size='xs' initials='Alpha' />);

    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders icon for icon mode', () => {
    render(<Avatar icon={UserRound} />);

    const avatar = screen.getByRole('img', { name: /user avatar/i });

    expect(avatar).toBeInTheDocument();
  });

  it('renders an image for image mode', () => {
    render(
      <Avatar img={{ src: 'https://placehold.co/80x80', alt: 'Demo user' }} />,
    );

    const image = screen.getByAltText('Demo user');

    expect(image).toHaveAttribute('src', 'https://placehold.co/80x80');
  });

  it('renders a status indicator when status is set', () => {
    const { container } = render(<Avatar initials='AU' status='danger' />);

    expect(container.querySelector('[data-avatar-status]')).toBeInTheDocument();
  });
});
