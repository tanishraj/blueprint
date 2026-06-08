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
});
