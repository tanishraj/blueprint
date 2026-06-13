import { Plus } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button Component', () => {
  it('renders with variant and size styles', () => {
    render(
      <Button variant='primary' size='md'>
        Test Button
      </Button>,
    );
    const button = screen.getByRole('button', { name: /test button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-fit', 'text-primary', 'px-3', 'py-2');
  });

  it('can fill the available container width', () => {
    render(<Button fullWidth>Test Button</Button>);

    expect(screen.getByRole('button', { name: /test button/i })).toHaveClass(
      'w-full',
    );
  });

  it('can render with inverted colors', () => {
    render(
      <Button inverted variant='primary' appearance='filled'>
        Test Button
      </Button>,
    );

    expect(screen.getByRole('button', { name: /test button/i })).toHaveClass(
      'bg-primary-inverted',
      'text-white-inverted',
    );
  });

  it('renders icon in loading state', () => {
    render(
      <Button loading leadingIcon={Plus}>
        Loading
      </Button>,
    );

    expect(screen.queryByText('Loading')).toBeNull();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders leading and trailing icons around text', () => {
    render(
      <Button leadingIcon={Plus} trailingIcon={Plus}>
        Label
      </Button>,
    );

    const button = screen.getByRole('button', { name: /label/i });

    expect(button).toBeInTheDocument();
    expect(button.querySelectorAll('svg')).toHaveLength(2);
  });

  it('supports button content without text', () => {
    render(<Button leadingIcon={Plus}>{undefined}</Button>);

    const button = screen.getByRole('button');

    expect(button.querySelectorAll('svg')).toHaveLength(1);
  });
});
