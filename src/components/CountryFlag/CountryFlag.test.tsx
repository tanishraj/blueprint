import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CountryFlag } from './CountryFlag';

describe('CountryFlag', () => {
  it('renders a flag image for a valid two-letter code', () => {
    render(<CountryFlag code='IN' name='India' />);

    const image = screen.getByAltText('India flag');

    expect(image).toHaveAttribute('src', 'https://flagcdn.com/24x18/in.png');
    expect(image).toHaveAttribute('width', '24');
    expect(image).toHaveAttribute('height', '18');
  });

  it('uses the code in alt text when country name is not provided', () => {
    render(<CountryFlag code='US' />);

    expect(screen.getByAltText('US flag')).toBeInTheDocument();
  });

  it('renders the requested size', () => {
    render(<CountryFlag code='AE' name='United Arab Emirates' size='lg' />);

    const image = screen.getByAltText('United Arab Emirates flag');

    expect(image).toHaveAttribute('src', 'https://flagcdn.com/32x24/ae.png');
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '24');
  });

  it('returns null for invalid codes', () => {
    const { container, rerender } = render(<CountryFlag code='IND' name='India' />);

    expect(container).toBeEmptyDOMElement();

    rerender(<CountryFlag code='' name='India' />);

    expect(container).toBeEmptyDOMElement();
  });
});
