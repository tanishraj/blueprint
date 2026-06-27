import { Plus } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { Modal } from './Modal';

describe('Modal Component', () => {
  it('does not render when closed', () => {
    render(
      <Modal open={false} title='Modal'>
        Content
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog content when open', () => {
    render(
      <Modal open title='Modal title'>
        Modal content
      </Modal>,
    );

    expect(screen.getByRole('dialog')).toHaveClass(
      'bg-default',
      'text-default',
    );
    expect(screen.getByText('Modal title')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('links dialog labelling to the title and description', () => {
    render(
      <Modal description='Modal description' open title='Modal title'>
        Modal content
      </Modal>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Modal title' });
    const title = screen.getByText('Modal title');
    const description = screen.getByText('Modal description');

    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    expect(dialog).toHaveAttribute('aria-describedby', description.id);
    expect(description).toHaveClass('text-caption');
  });

  it('uses theme-aware divider classes for header and footer', () => {
    render(
      <Modal footer={<button type='button'>Save</button>} open title='Modal'>
        Content
      </Modal>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Modal' });
    const title = screen.getByText('Modal');
    const footerButton = screen.getByRole('button', { name: /save/i });

    expect(title.closest('[class*="border-b"]')).toHaveClass('border-default');
    expect(footerButton.closest('[class*="border-t"]')).toHaveClass(
      'border-default',
    );
    expect(dialog).toHaveClass('bg-default');
  });

  it('falls back to a default accessible name when title is omitted', () => {
    render(<Modal open>Modal content</Modal>);

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
  });

  it('renders an optional leading icon in the header', () => {
    render(
      <Modal leadingIcon={Plus} open title='Modal title'>
        Content
      </Modal>,
    );

    expect(screen.getByRole('dialog').querySelectorAll('svg')).toHaveLength(2);
  });

  it('centers the leading icon and title when no description is provided', () => {
    render(
      <Modal leadingIcon={Plus} open title='Modal title'>
        Content
      </Modal>,
    );

    const title = screen.getByText('Modal title');
    const headerContent = title.closest('.flex');
    const leadingIcon = screen
      .getByRole('dialog')
      .querySelector('.lucide-plus');

    expect(headerContent).toHaveClass('items-center');
    expect(leadingIcon).not.toHaveClass('mt-1');
  });

  it('aligns the leading icon with the title line when description is provided', () => {
    render(
      <Modal
        description='Modal description'
        leadingIcon={Plus}
        open
        title='Modal title'
      >
        Content
      </Modal>,
    );

    const title = screen.getByText('Modal title');
    const headerContent = title.closest('.flex');
    const leadingIcon = screen
      .getByRole('dialog')
      .querySelector('.lucide-plus');

    expect(headerContent).toHaveClass('items-start');
    expect(leadingIcon).toHaveClass('mt-1');
  });

  it('calls onClose from close button', () => {
    const handleClose = vi.fn();

    render(
      <Modal onClose={handleClose} open title='Modal title'>
        Content
      </Modal>,
    );

    const closeButton = screen.getByRole('button', { name: /^close modal$/i });

    expect(closeButton).toHaveClass('cursor-pointer');

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose from overlay click', () => {
    const handleClose = vi.fn();

    render(
      <Modal onClose={handleClose} open>
        Content
      </Modal>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /close modal overlay/i }),
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close from overlay when disabled', () => {
    const handleClose = vi.fn();

    render(
      <Modal closeOnOverlayClick={false} onClose={handleClose} open>
        Content
      </Modal>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /close modal overlay/i }),
    );

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape', () => {
    const handleClose = vi.fn();

    render(
      <Modal onClose={handleClose} open>
        Content
      </Modal>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('keeps the overlay behind the modal panel', () => {
    const { container } = render(<Modal open>Content</Modal>);

    expect(container.ownerDocument.body.querySelector('.isolate')).toHaveClass(
      'z-50',
    );
    expect(
      screen.getByRole('button', { name: /close modal overlay/i }),
    ).toHaveClass('z-10');
    expect(screen.getByRole('dialog').closest('.z-20')).toBeInTheDocument();
  });

  it('keeps the modal mounted while the exit animation runs', async () => {
    const { rerender } = render(<Modal open>Content</Modal>);

    expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');

    rerender(<Modal open={false}>Content</Modal>);

    const dialog = screen.getByRole('dialog');
    const overlay = screen.getByRole('button', {
      name: /close modal overlay/i,
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

    const { rerender } = render(<Modal open>Content</Modal>);

    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      rerender(<Modal open={false}>Content</Modal>);
    });

    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(document.body.style.overflow).toBe(originalOverflow);

    vi.useRealTimers();
  });

  it('does not lock body scroll when rendered into a custom container', () => {
    const target = document.createElement('div');
    target.id = 'modal-container-scroll-lock';
    document.body.appendChild(target);
    const originalOverflow = document.body.style.overflow;

    render(
      <Modal containerId='modal-container-scroll-lock' open>
        Content
      </Modal>,
    );

    expect(document.body.style.overflow).toBe(originalOverflow);
  });

  it('applies size classes', () => {
    render(
      <Modal open size='lg'>
        Content
      </Modal>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('max-w-5xl');
  });

  it('renders footer content', () => {
    render(
      <Modal footer={<button type='button'>Save</button>} open>
        Content
      </Modal>,
    );

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('can render into a custom container id', () => {
    const target = document.createElement('div');
    target.id = 'modal-container';
    document.body.appendChild(target);

    render(
      <Modal containerId='modal-container' open>
        Content
      </Modal>,
    );

    expect(target).toHaveTextContent('Content');
    expect(target.querySelector('.isolate')).toHaveClass('absolute', 'inset-0');
    expect(target.querySelector('.isolate')).not.toHaveClass('fixed');
  });
});
