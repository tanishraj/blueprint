import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Slider } from './Slider';

const percentFormatter = (value: number) => `${value}%`;

describe('Slider Component', () => {
  it('renders a single slider with label', () => {
    render(<Slider label='Slider Label' max={10} value={5} />);

    expect(screen.getByText('Slider Label')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '5');
  });

  it('supports uncontrolled single-value changes', () => {
    render(<Slider defaultValue={2} max={10} />);

    const slider = screen.getByRole('slider');
    slider.focus();
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    expect(slider).toHaveAttribute('aria-valuenow', '6');
  });

  it('calls onValueChange for single sliders', () => {
    const handleValueChange = vi.fn();

    render(<Slider max={10} onValueChange={handleValueChange} value={4} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });

    expect(handleValueChange).toHaveBeenCalledWith(5);
  });

  it('renders range mode with two slider inputs', () => {
    render(<Slider label='Slider Label' max={10} range value={[0, 5]} />);

    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('calls onValueChange for range sliders', () => {
    const handleValueChange = vi.fn();

    render(
      <Slider
        max={10}
        onValueChange={handleValueChange}
        range
        value={[0, 5]}
      />,
    );

    fireEvent.keyDown(screen.getAllByRole('slider')[1], { key: 'ArrowRight' });

    expect(handleValueChange).toHaveBeenCalledWith([0, 6]);
  });

  it('renders caption and error text', () => {
    const { rerender } = render(
      <Slider caption='There will be a caption text here' max={10} value={5} />,
    );

    expect(
      screen.getByText('There will be a caption text here'),
    ).toBeInTheDocument();

    rerender(
      <Slider error='There will be an error text here' max={10} value={5} />,
    );

    expect(
      screen.getByText('There will be an error text here'),
    ).toBeInTheDocument();
  });

  it('supports disabled state', () => {
    render(<Slider disabled max={10} value={5} />);

    screen.getAllByRole('slider').forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  it('renders visible min and max labels when enabled', () => {
    render(<Slider max={10} range showMaxLabel value={[0, 5]} />);

    expect(screen.getAllByText('0').length).toBeGreaterThan(0);
    expect(screen.getAllByText('10').length).toBeGreaterThan(0);
  });

  it('supports custom value formatting', () => {
    render(
      <Slider formatValue={percentFormatter} max={10} showMaxLabel value={5} />,
    );

    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
  });
});
