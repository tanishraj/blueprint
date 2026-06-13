import { X } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Alert } from './Alert';

describe('Alert Component', () => {
  it('renders title and body content', () => {
    render(<Alert title='Network issue'>API request failed.</Alert>);

    expect(screen.getByText('Network issue')).toBeInTheDocument();
    expect(screen.getByText('API request failed.')).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    const { container } = render(
      <Alert title='Warning' icon={X}>
        Review required
      </Alert>,
    );

    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('calls onClose handler when close icon is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Alert title='Connectivity issue' onClose={onClose}>
        Try reconnecting.
      </Alert>,
    );

    const closeIcon = container.querySelector('svg');

    expect(closeIcon).not.toBeNull();
    fireEvent.click(closeIcon as SVGElement);

    expect(onClose).toHaveBeenCalledOnce();
  });
});
