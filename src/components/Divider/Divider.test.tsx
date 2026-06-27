import { Plus } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Divider } from './Divider';

describe('Divider Component', () => {
  it('renders a horizontal separator by default', () => {
    render(<Divider />);

    const divider = screen.getByRole('separator');

    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider).toHaveClass('h-px', 'w-full');
  });

  it('renders a vertical separator', () => {
    render(<Divider orientation='vertical' />);

    const divider = screen.getByRole('separator');

    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(divider).toHaveClass('w-px', 'self-stretch');
  });

  it('renders text content between horizontal lines', () => {
    const { container } = render(<Divider>Text</Divider>);

    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });

  it('treats numeric zero as valid divider content', () => {
    const { container } = render(<Divider>{0}</Divider>);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });

  it('renders icon content', () => {
    const { container } = render(
      <Divider>
        <Plus aria-label='Add' />
      </Divider>,
    );

    expect(screen.getByLabelText('Add')).toBeInTheDocument();
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });

  it('passes through custom class names', () => {
    render(<Divider className='my-divider' />);

    expect(screen.getByRole('separator')).toHaveClass('my-divider');
  });

  it('does not attach aria-orientation for non-separator roles', () => {
    render(<Divider role='presentation' />);

    expect(screen.getByRole('presentation')).not.toHaveAttribute(
      'aria-orientation',
    );
  });
});
