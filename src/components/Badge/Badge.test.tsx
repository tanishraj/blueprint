import { Check } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders text when children are text-like', () => {
    render(<Badge>In Progress</Badge>);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('falls back to an accessible name for icon-only variants', () => {
    render(<Badge icon={Check} />);
    expect(
      screen.getByRole('img', { name: /badge, default/i }),
    ).toBeInTheDocument();
  });

  it('supports an explicit aria-label for icon-only badges', () => {
    render(
      <Badge
        variant='success'
        aria-label='Success status badge'
        icon={Check}
      />,
    );
    expect(
      screen.getByRole('img', { name: /success status badge/i }),
    ).toBeInTheDocument();
  });

  it('renders icon with text when icon is supplied', () => {
    const { container } = render(
      <Badge variant='warning' icon={Check}>
        Needs attention
      </Badge>,
    );

    expect(container.querySelector('svg')).toBeTruthy();
    expect(screen.getByText('Needs attention')).toBeInTheDocument();
  });

  it('does not render an icon when icon is not supplied', () => {
    const { container } = render(
      <Badge variant='warning'>Needs attention</Badge>,
    );

    expect(container.querySelector('svg')).toBeNull();
    expect(screen.getByText('Needs attention')).toBeInTheDocument();
  });
});
