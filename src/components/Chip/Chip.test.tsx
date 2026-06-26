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
    const { container } = render(<Chip icon={User}>Profile</Chip>);
    const avatar = container.querySelector('[role="presentation"]');

    expect(avatar).toBeInTheDocument();
    if (!avatar) {
      throw new Error('Expected decorative avatar to be rendered.');
    }

    expect(avatar).toHaveClass('size-5', '[&_svg]:size-3.5');
    expect(avatar.querySelector('svg')).toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: /chip icon/i }),
    ).not.toBeInTheDocument();
  });

  it('uses an inverted Avatar on colored variants', () => {
    const { container } = render(
      <Chip icon={User} variant='primary'>
        Profile
      </Chip>,
    );

    expect(container.querySelector('[role="presentation"]')).toHaveClass(
      'bg-primary-inverted',
    );
  });

  it('flips Avatar contrast for inverted filled chips', () => {
    const { container } = render(
      <Chip icon={User} inverted variant='primary'>
        Profile
      </Chip>,
    );

    expect(container.querySelector('[role="presentation"]')).toHaveClass(
      'bg-primary',
    );
  });

  it('uses a smaller Avatar for small icon chips', () => {
    const { container } = render(
      <Chip icon={User} size='sm'>
        Profile
      </Chip>,
    );

    expect(container.querySelector('[role="presentation"]')).toHaveClass(
      'size-4',
    );
  });

  it('uses a contained larger Avatar for large icon chips', () => {
    const { container } = render(
      <Chip icon={User} size='lg'>
        Profile
      </Chip>,
    );

    expect(container.querySelector('[role="presentation"]')).toHaveClass(
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

  it('does not bubble the remove click to the chip wrapper', () => {
    const handleClick = vi.fn();
    const handleClose = vi.fn();

    render(
      <Chip onClick={handleClick} onClose={handleClose}>
        Closable
      </Chip>,
    );

    fireEvent.click(screen.getByRole('button', { name: /remove chip/i }));

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
