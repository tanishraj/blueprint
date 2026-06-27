import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Text } from './Text';

describe('Text Component', () => {
  it('renders text as a span by default', () => {
    render(<Text>Body text</Text>);

    const text = screen.getByText('Body text');

    expect(text.tagName).toBe('SPAN');
    expect(text).toHaveClass('text-base', 'font-regular', 'text-default');
  });

  it('supports semantic elements through the as prop', () => {
    render(<Text as='p'>Paragraph text</Text>);

    const text = screen.getByText('Paragraph text');

    expect(text.tagName).toBe('P');
  });

  it('applies size, weight, tone, alignment, and transform variants', () => {
    render(
      <Text
        align='center'
        size='2xl'
        tone='primary'
        transform='uppercase'
        weight='bold'
      >
        Styled text
      </Text>,
    );

    expect(screen.getByText('Styled text')).toHaveClass(
      'text-2xl',
      'font-bold',
      'text-primary',
      'text-center',
      'uppercase',
    );
  });

  it('supports italic and truncation styles', () => {
    render(
      <Text italic truncate>
        Truncated text
      </Text>,
    );

    expect(screen.getByText('Truncated text')).toHaveClass(
      'italic',
      'truncate',
    );
  });

  it('merges custom class names', () => {
    render(<Text className='tracking-wide'>Custom text</Text>);

    expect(screen.getByText('Custom text')).toHaveClass('tracking-wide');
  });
});
