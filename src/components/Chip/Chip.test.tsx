import { User } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Chip } from './Chip';

describe('Chip Component', () => {
  it('renders chip text', () => {
    render(<Chip>Chip</Chip>);

    expect(screen.getByText('Chip')).toBeInTheDocument();
  });

  it('uses circle shape by default', () => {
    render(<Chip>Chip</Chip>);

    expect(screen.getByText('Chip').parentElement).toHaveClass('rounded-full');
  });

  it('supports square shape', () => {
    render(<Chip shape='square'>Chip</Chip>);

    expect(screen.getByText('Chip').parentElement).toHaveClass('rounded');
  });

  it('supports outline appearance', () => {
    render(
      <Chip appearance='outline' variant='primary'>
        Chip
      </Chip>,
    );

    expect(screen.getByText('Chip').parentElement).toHaveClass(
      'border-primary',
      'text-primary',
    );
  });

  it('renders icon chips with Avatar', () => {
    render(<Chip icon={User}>Profile</Chip>);

    const avatar = screen.getByRole('img', { name: /chip icon/i });

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('size-5', '[&_svg]:size-3.5');
    expect(avatar.querySelector('svg')).toBeInTheDocument();
  });

  it('uses an inverted Avatar on colored variants', () => {
    render(
      <Chip icon={User} variant='primary'>
        Profile
      </Chip>,
    );

    expect(screen.getByRole('img', { name: /chip icon/i })).toHaveClass(
      'bg-primary-inverted',
    );
  });

  it('flips Avatar contrast for inverted filled chips', () => {
    render(
      <Chip icon={User} inverted variant='primary'>
        Profile
      </Chip>,
    );

    expect(screen.getByRole('img', { name: /chip icon/i })).toHaveClass(
      'bg-primary',
    );
  });

  it('uses a smaller Avatar for small icon chips', () => {
    render(
      <Chip icon={User} size='sm'>
        Profile
      </Chip>,
    );

    expect(screen.getByRole('img', { name: /chip icon/i })).toHaveClass(
      'size-4',
    );
  });

  it('uses a contained larger Avatar for large icon chips', () => {
    render(
      <Chip icon={User} size='lg'>
        Profile
      </Chip>,
    );

    expect(screen.getByRole('img', { name: /chip icon/i })).toHaveClass(
      'size-6',
    );
  });

  it('calls onClose when removable chip is closed', () => {
    const handleClose = vi.fn();

    render(<Chip onClose={handleClose}>Closable</Chip>);
    fireEvent.click(screen.getByRole('button', { name: /remove chip/i }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('disables the close button when chip is disabled', () => {
    render(
      <Chip disabled onClose={vi.fn()}>
        Disabled
      </Chip>,
    );

    expect(screen.getByRole('button', { name: /remove chip/i })).toBeDisabled();
  });
});
