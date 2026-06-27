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
    render(
      <Alert title='Connectivity issue' onClose={onClose}>
        Try reconnecting.
      </Alert>,
    );

    fireEvent.click(screen.getByRole('button', { name: /dismiss alert/i }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('defaults to alert semantics and supports custom className', () => {
    render(
      <Alert className='custom-alert-class' title='Saved'>
        Changes were saved.
      </Alert>,
    );

    expect(screen.getByRole('alert')).toHaveClass('custom-alert-class');
  });

  it('does not render empty title or description wrappers', () => {
    const { container } = render(<Alert icon={X} />);

    expect(container.querySelector('svg')).toBeTruthy();
    expect(container).not.toHaveTextContent(/\S/);
  });

  it('renders outline dismiss buttons with variant color classes', () => {
    render(
      <Alert
        appearance='outline'
        title='Sync issue'
        variant='primary'
        onClose={vi.fn()}
      >
        Retry sync.
      </Alert>,
    );

    expect(screen.getByRole('button', { name: /dismiss alert/i })).toHaveClass(
      'text-primary',
    );
  });
});
