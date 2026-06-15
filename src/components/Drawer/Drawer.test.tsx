import { describe, expect, it, vi } from 'vitest';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { Drawer } from './Drawer';

describe('Drawer Component', () => {
  it('does not render when closed', () => {
    render(
      <Drawer open={false} title='Drawer'>
        Content
      </Drawer>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog content when open', () => {
    render(
      <Drawer open title='Drawer title'>
        Drawer content
      </Drawer>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveClass('bg-white');
    expect(screen.getByText('Drawer title')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('centers header content when only a title is provided', () => {
    render(
      <Drawer open title='Drawer title'>
        Drawer content
      </Drawer>,
    );

    expect(screen.getByText('Drawer title').closest('.flex')).toHaveClass(
      'items-center',
    );
  });

  it('top-aligns header content when a description is provided', () => {
    render(
      <Drawer description='Drawer description' open title='Drawer title'>
        Drawer content
      </Drawer>,
    );

    expect(screen.getByText('Drawer title').closest('.flex')).toHaveClass(
      'items-start',
    );
  });

  it('calls onClose from close button', () => {
    const handleClose = vi.fn();

    render(
      <Drawer onClose={handleClose} open title='Drawer title'>
        Content
      </Drawer>,
    );

    const closeButton = screen.getByRole('button', { name: /^close drawer$/i });

    expect(closeButton).toHaveClass('cursor-pointer');

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose from overlay click', () => {
    const handleClose = vi.fn();

    render(
      <Drawer onClose={handleClose} open>
        Content
      </Drawer>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /close drawer overlay/i }),
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('keeps the overlay behind the drawer panel', () => {
    const { container } = render(<Drawer open>Content</Drawer>);

    expect(container.ownerDocument.body.querySelector('.isolate')).toHaveClass(
      'z-50',
    );
    expect(
      screen.getByRole('button', { name: /close drawer overlay/i }),
    ).toHaveClass('z-10');
    expect(screen.getByRole('dialog')).toHaveClass('z-20');
  });

  it('keeps the drawer mounted while the exit animation runs', async () => {
    const { rerender } = render(<Drawer open>Content</Drawer>);

    expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');

    rerender(<Drawer open={false}>Content</Drawer>);

    const dialog = screen.getByRole('dialog');
    const overlay = screen.getByRole('button', {
      name: /close drawer overlay/i,
    });

    expect(dialog).toHaveAttribute('data-state', 'closed');

    fireEvent.animationEnd(overlay);
    fireEvent.animationEnd(dialog);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('keeps body scroll locked until the exit animation completes', () => {
    vi.useFakeTimers();
    const originalOverflow = document.body.style.overflow;

    const { rerender } = render(<Drawer open>Content</Drawer>);

    expect(document.body.style.overflow).toBe('hidden');

    rerender(<Drawer open={false}>Content</Drawer>);

    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(document.body.style.overflow).toBe(originalOverflow);

    vi.useRealTimers();
  });

  it('does not close from overlay when disabled', () => {
    const handleClose = vi.fn();

    render(
      <Drawer closeOnOverlayClick={false} onClose={handleClose} open>
        Content
      </Drawer>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /close drawer overlay/i }),
    );

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape', () => {
    const handleClose = vi.fn();

    render(
      <Drawer onClose={handleClose} open>
        Content
      </Drawer>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('applies placement and size classes', () => {
    render(
      <Drawer open placement='left' size='sm'>
        Content
      </Drawer>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('left-0', 'w-80');
  });

  it('removes the placement edge border for full-screen drawers', () => {
    const { rerender } = render(
      <Drawer open placement='right' size='md'>
        Content
      </Drawer>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('border-l');

    rerender(
      <Drawer open placement='right' size='full'>
        Content
      </Drawer>,
    );

    expect(screen.getByRole('dialog')).not.toHaveClass('border-l');
    expect(screen.getByRole('dialog')).toHaveClass('w-full');
  });

  it('applies full-distance slide classes based on placement', () => {
    const { rerender } = render(
      <Drawer open placement='right'>
        Content
      </Drawer>,
    );

    expect(screen.getByRole('dialog')).toHaveClass(
      'data-[state=open]:slide-in-from-right-full',
      'data-[state=closed]:slide-out-to-right-full',
    );

    rerender(
      <Drawer open placement='left'>
        Content
      </Drawer>,
    );

    expect(screen.getByRole('dialog')).toHaveClass(
      'data-[state=open]:slide-in-from-left-full',
      'data-[state=closed]:slide-out-to-left-full',
    );
  });

  it('renders footer content', () => {
    render(
      <Drawer footer={<button type='button'>Save</button>} open>
        Content
      </Drawer>,
    );

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('can render into a custom container id', () => {
    const target = document.createElement('div');
    target.id = 'drawer-container';
    document.body.appendChild(target);

    render(
      <Drawer containerId='drawer-container' open>
        Content
      </Drawer>,
    );

    expect(target).toHaveTextContent('Content');
    expect(target.querySelector('.isolate')).toHaveClass('absolute', 'inset-0');
    expect(target.querySelector('.isolate')).not.toHaveClass('fixed');
  });

  it('fills the viewport when no custom container is provided', () => {
    const { container } = render(<Drawer open>Content</Drawer>);

    expect(container.ownerDocument.body.querySelector('.isolate')).toHaveClass(
      'fixed',
      'inset-0',
    );
  });
});
