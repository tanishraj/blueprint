import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../Button';
import { ConfirmationPopup } from './ConfirmationPopup';

describe('ConfirmationPopup Component', () => {
  it('renders a trigger and opens on click', () => {
    render(
      <ConfirmationPopup
        description='Are you sure you want to continue?'
        title='Title'
        trigger={<Button>Open</Button>}
      />,
    );

    const trigger = screen.getByRole('button', { name: /open/i });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Title' });

    expect(dialog).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to continue?'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  it('links the dialog to its title and description', () => {
    render(
      <ConfirmationPopup
        description='Popup description'
        open
        title='Popup title'
      />,
    );

    const dialog = screen.getByRole('dialog', { name: 'Popup title' });
    const title = screen.getByText('Popup title');
    const description = screen.getByText('Popup description');

    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    expect(dialog).toHaveAttribute('aria-describedby', description.id);
  });

  it('falls back to a default accessible dialog name when title is omitted', () => {
    render(<ConfirmationPopup description='Description only' open />);

    expect(
      screen.getByRole('dialog', { name: 'Confirmation popup' }),
    ).toBeInTheDocument();
  });

  it('renders controlled content when open', () => {
    render(
      <ConfirmationPopup
        description='Description'
        open
        title='Controlled popup'
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Controlled popup')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('calls onOpenChange and onClose from the close button', () => {
    const handleOpenChange = vi.fn();
    const handleClose = vi.fn();

    render(
      <ConfirmationPopup
        onClose={handleClose}
        onOpenChange={handleOpenChange}
        open
        title='Popup'
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /close confirmation popup/i }),
    );

    expect(handleOpenChange).toHaveBeenCalledWith(false);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel and closes by default', () => {
    const handleCancel = vi.fn();
    const handleOpenChange = vi.fn();

    render(
      <ConfirmationPopup
        onCancel={handleCancel}
        onOpenChange={handleOpenChange}
        open
        title='Popup'
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onAction and can stay open when closeOnAction is false', () => {
    const handleAction = vi.fn();
    const handleOpenChange = vi.fn();

    render(
      <ConfirmationPopup
        closeOnAction={false}
        onAction={handleAction}
        onOpenChange={handleOpenChange}
        open
        title='Popup'
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /action/i }));

    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).not.toHaveBeenCalledWith(false);
  });

  it('applies the semantic variant to the icon and action button', () => {
    render(<ConfirmationPopup open title='Popup' variant='success' />);

    expect(
      screen
        .getByRole('dialog')
        .querySelector('[data-confirmation-popup-title-icon]'),
    ).toHaveClass('text-success');
    expect(screen.getByRole('button', { name: /action/i })).toHaveClass(
      'bg-success',
    );
  });

  it('can hide the arrow, close button, and cancel button', () => {
    render(
      <ConfirmationPopup
        open
        showArrow={false}
        showCancelButton={false}
        showCloseButton={false}
        title='Popup'
      />,
    );

    expect(
      screen
        .getByRole('dialog')
        .querySelector('[data-confirmation-popup-arrow]'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /close confirmation popup/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /cancel/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  it('applies the selected size to the popup panel and default buttons', () => {
    render(<ConfirmationPopup open size='lg' title='Popup' />);

    expect(screen.getByRole('dialog')).toHaveClass('p-4');
    expect(
      screen
        .getByRole('dialog')
        .querySelector('[data-confirmation-popup-title-icon]'),
    ).toHaveClass('size-3.5');
    expect(screen.getByRole('button', { name: /action/i })).toHaveClass(
      'text-base',
    );
  });
});
