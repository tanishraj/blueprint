import { Home, Share } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Link } from './Link';

describe('Link Component', () => {
  it('renders an anchor with href', () => {
    render(<Link href='/docs'>Docs</Link>);

    expect(screen.getByRole('link', { name: /docs/i })).toHaveAttribute(
      'href',
      '/docs',
    );
  });

  it('renders leading and trailing icons', () => {
    const { container } = render(
      <Link href='/home' leadingIcon={Home} trailingIcon={Share}>
        Home
      </Link>,
    );

    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });

  it('renders the external icon when external is true', () => {
    const { container } = render(
      <Link external href='https://example.com'>
        External
      </Link>,
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('adds safe rel defaults for new tabs', () => {
    render(
      <Link href='https://example.com' target='_blank'>
        External
      </Link>,
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'noreferrer noopener',
    );
  });

  it('preserves custom rel values while adding safe new-tab rel tokens', () => {
    render(
      <Link href='https://example.com' rel='author' target='_blank'>
        External
      </Link>,
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'author noreferrer noopener',
    );
  });

  it('supports truncation styling', () => {
    render(
      <Link href='/docs' truncate>
        Very long link label
      </Link>,
    );

    expect(screen.getByText('Very long link label')).toHaveClass('truncate');
  });

  it('applies underline and variant styles', () => {
    render(
      <Link href='/docs' underline='always' variant='default'>
        Docs
      </Link>,
    );

    expect(screen.getByRole('link')).toHaveClass('underline', 'text-default');
  });

  it('disables href and click handling when disabled', () => {
    const handleClick = vi.fn();

    render(
      <Link disabled href='/docs' onClick={handleClick}>
        Docs
      </Link>,
    );

    const link = screen.getByText('Docs').closest('a');

    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');

    fireEvent.click(link!);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
