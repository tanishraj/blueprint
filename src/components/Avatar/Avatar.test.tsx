import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UserRound } from 'lucide-react';

import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  it('renders initials in text mode', () => {
    render(<Avatar initials='AP' />);

    expect(screen.getByText('AP')).toBeInTheDocument();
  });

  it('applies variant styles to initials avatar', () => {
    render(<Avatar initials='AP' variant='primary' />);

    const avatar = screen.getByRole('img', { name: /ap avatar/i });

    expect(avatar).toHaveClass('bg-primary');
    expect(avatar).toHaveClass('text-white');
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

    const image = screen.getByAltText('');

    expect(image).toHaveAttribute('src', 'https://placehold.co/80x80');
  });

  it('hides image alt text when the wrapper already provides the accessible name', () => {
    render(
      <Avatar img={{ src: 'https://placehold.co/80x80', alt: 'Demo user' }} />,
    );

    expect(screen.getByRole('img', { name: /demo user/i })).toBeInTheDocument();
    expect(screen.getByAltText('')).toBeInTheDocument();
  });

  it('allows an explicit aria-label to override the default accessible name', () => {
    render(<Avatar aria-label='Assigned reviewer' icon={UserRound} />);

    expect(
      screen.getByRole('img', { name: /assigned reviewer/i }),
    ).toBeInTheDocument();
  });

  it('keeps the image decorative when a custom aria-label is provided', () => {
    render(
      <Avatar
        aria-label='Assigned reviewer'
        img={{ src: 'https://placehold.co/80x80', alt: 'Demo user' }}
      />,
    );

    expect(
      screen.getByRole('img', { name: /assigned reviewer/i }),
    ).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute(
      'src',
      'https://placehold.co/80x80',
    );
  });

  it('preserves external labeling via aria-labelledby', () => {
    render(
      <>
        <span id='reviewer-name'>Assigned reviewer</span>
        <Avatar aria-labelledby='reviewer-name' icon={UserRound} />
      </>,
    );

    expect(
      screen.getByRole('img', { name: /assigned reviewer/i }),
    ).toBeInTheDocument();
  });

  it('renders a status indicator when status is set', () => {
    const { container } = render(<Avatar initials='AU' status='danger' />);

    expect(container.querySelector('[data-avatar-status]')).toBeInTheDocument();
  });
});
