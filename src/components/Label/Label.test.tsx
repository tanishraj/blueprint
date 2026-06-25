import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './Label';

describe('Label', () => {
  it('displays text', () => {
    render(<Label text='This is a Label' />);

    expect(screen.getByText('This is a Label')).toBeInTheDocument();
  });

  it('displays required text', () => {
    render(<Label required text='This is a Label' />);

    expect(screen.getByText('This is a Label *')).toBeInTheDocument();
  });

  it('allows a custom className', () => {
    render(<Label className='cursor-pointer'>This is a Label</Label>);

    expect(screen.getByText('This is a Label')).toHaveClass('cursor-pointer');
  });

  it('displays children', () => {
    render(<Label required>This is a Label</Label>);

    expect(screen.getByText('This is a Label')).toBeInTheDocument();
  });
});
