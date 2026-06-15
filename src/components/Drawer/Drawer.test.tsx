import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

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
    expect(screen.getByText('Drawer title')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('calls onClose from close button', () => {
    const handleClose = vi.fn();

    render(
      <Drawer onClose={handleClose} open title='Drawer title'>
        Content
      </Drawer>,
    );

    fireEvent.click(screen.getByRole('button', { name: /^close drawer$/i }));

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
  });
});
