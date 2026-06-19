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
    expect(button).toHaveClass(
      'w-fit',
      'text-primary',
      'px-4',
      'py-2',
      'rounded-full',
    );
  });

  it('supports squared shape', () => {
    render(<Button shape='squared'>Squared</Button>);

    const button = screen.getByRole('button', { name: /squared/i });

    expect(button).toHaveClass('rounded');
    expect(button).not.toHaveClass('rounded-full');
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

    const button = screen.getByRole('button', { name: /loading/i });
    const content = button.querySelector('[data-slot="button-content"]');
    const spinner = button.querySelector('[data-slot="button-spinner"]');

    expect(button).toBeDisabled();
    expect(content).toHaveClass('invisible');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
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

  it('is disabled when disabled is set without changing content layout', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: /disabled/i });
    const content = button.querySelector('[data-slot="button-content"]');

    expect(button).toBeDisabled();
    expect(content).not.toHaveClass('invisible');
    expect(
      button.querySelector('[data-slot="button-spinner"]'),
    ).not.toBeInTheDocument();
  });
});
