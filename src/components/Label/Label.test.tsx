import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './Label';

describe('Label', () => {
  it('displays text', () => {
    render(<Label text='This is a Label' />);

    expect(screen.getByText('This is a Label')).toBeInTheDocument();
  });

  it('renders the required indicator separately', () => {
    render(<Label required text='This is a Label' />);

    expect(screen.getByText('This is a Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('allows a custom className', () => {
    render(<Label className='cursor-pointer'>This is a Label</Label>);

    expect(screen.getByText('This is a Label').closest('label')).toHaveClass(
      'cursor-pointer',
    );
  });

  it('displays children', () => {
    render(<Label required>This is a Label</Label>);

    expect(screen.getByText('This is a Label')).toBeInTheDocument();
  });

  it('renders valid falsy text content', () => {
    render(<Label text={0} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders the label text after children for bottom and right positions', () => {
    const { rerender } = render(
      <Label position='bottom' text='Label text'>
        <span>Field</span>
      </Label>,
    );

    let label = screen.getByText('Field').closest('label');

    expect(label?.firstChild).toBe(screen.getByText('Field'));
    expect(label?.lastChild).toContainElement(screen.getByText('Label text'));

    rerender(
      <Label position='right' text='Label text'>
        <span>Field</span>
      </Label>,
    );

    label = screen.getByText('Field').closest('label');

    expect(label?.firstChild).toBe(screen.getByText('Field'));
    expect(label?.lastChild).toContainElement(screen.getByText('Label text'));
  });
});
