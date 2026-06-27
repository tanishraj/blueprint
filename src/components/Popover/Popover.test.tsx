import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../Button';
import { Popover } from './Popover';

describe('Popover Component', () => {
  it('renders trigger and opens on click', () => {
    render(<Popover trigger={<Button>Open</Button>}>Popover content</Popover>);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Open'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('renders controlled content when open', () => {
    render(
      <Popover open title='Popover title'>
        Slot Area
      </Popover>,
    );

    expect(screen.getByRole('dialog')).toHaveClass(
      'bg-default',
      'border-default',
      'text-default',
    );
    expect(screen.getByText('Popover title')).toBeInTheDocument();
    expect(screen.getByText('Slot Area')).toBeInTheDocument();
  });

  it('uses theme-aware classes for the arrow and default icon', () => {
    render(
      <Popover open title='Popover title'>
        Slot Area
      </Popover>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Popover title' });

    expect(dialog.querySelector('[data-popover-arrow]')).toHaveClass(
      'fill-[var(--background-color-default)]',
      'text-[var(--border-color-default)]',
    );
    expect(dialog.querySelector('[data-popover-title-icon]')).toHaveClass(
      'text-default',
    );
  });

  it('links dialog labelling to the title and body content', () => {
    render(
      <Popover open title='Popover title'>
        Slot Area
      </Popover>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Popover title' });
    const title = screen.getByText('Popover title');
    const body = screen.getByText('Slot Area');

    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    expect(dialog).toHaveAttribute('aria-describedby', body.id);
  });

  it('falls back to a default accessible name when title is omitted', () => {
    render(<Popover open>Content</Popover>);

    expect(screen.getByRole('dialog', { name: 'Popover' })).toBeInTheDocument();
  });

  it('calls onOpenChange from close button', () => {
    const handleOpenChange = vi.fn();

    render(
      <Popover onOpenChange={handleOpenChange} open>
        Content
      </Popover>,
    );

    fireEvent.click(screen.getByRole('button', { name: /close popover/i }));

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on Escape', () => {
    const handleOpenChange = vi.fn();

    render(
      <Popover onOpenChange={handleOpenChange} open>
        Content
      </Popover>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on outside pointer down', () => {
    const handleOpenChange = vi.fn();

    render(
      <>
        <button type='button'>Outside</button>
        <Popover onOpenChange={handleOpenChange} open>
          Content
        </Popover>
      </>,
    );

    fireEvent.pointerDown(screen.getByRole('button', { name: /outside/i }));

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('applies floating positioning and variant classes', () => {
    render(
      <Popover align='end' open placement='right' variant='success'>
        Content
      </Popover>,
    );

    expect(screen.getByRole('dialog')).toHaveStyle({
      position: 'absolute',
    });
    expect(
      screen.getByRole('dialog').querySelector('[data-popover-title-icon]'),
    ).toHaveClass('text-success');
  });

  it('can hide the arrow and slot border', () => {
    render(
      <Popover open showArrow={false} showSlotBorder={false}>
        Content
      </Popover>,
    );

    expect(
      screen.getByRole('dialog').querySelector('[data-popover-arrow]'),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Content')).not.toHaveClass('border');
  });

  it('adds dialog trigger aria wiring to the trigger element', () => {
    render(<Popover trigger={<Button>Open</Button>}>Popover content</Popover>);

    const trigger = screen.getByRole('button', { name: 'Open' });

    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
  });
});
