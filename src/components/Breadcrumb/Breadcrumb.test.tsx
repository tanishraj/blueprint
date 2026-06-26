import { Home, SquareArrowOutUpRight } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Breadcrumb } from './Breadcrumb';

const items = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Library', href: '/library' },
  { label: 'Components', icon: SquareArrowOutUpRight },
];

const getItemWrapper = (label: string) => {
  const wrapper = screen.getByText(label).parentElement;

  expect(wrapper).toBeInTheDocument();

  return wrapper;
};

describe('Breadcrumb Component', () => {
  it('renders a labelled navigation landmark', () => {
    render(<Breadcrumb items={items} />);

    expect(
      screen.getByRole('navigation', { name: /breadcrumb/i }),
    ).toBeInTheDocument();
  });

  it('renders linked items and marks the final item as current by default', () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/',
    );
    expect(getItemWrapper('Components')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('supports an explicit current item', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Library', href: '/library', current: true },
          { label: 'Components', href: '/components' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: /library/i })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: /components/i })).toHaveAttribute(
      'href',
      '/components',
    );
  });

  it('renders slash separators when configured', () => {
    const { container } = render(<Breadcrumb items={items} separator='/' />);

    expect(container).toHaveTextContent('Home/Library/Components');
  });

  it('renders chevron icon separators by default', () => {
    const { container } = render(<Breadcrumb items={items} />);

    expect(container.querySelectorAll('svg')).toHaveLength(4);
    expect(container).not.toHaveTextContent('Home>Library>Components');
  });

  it('applies outline appearance styling', () => {
    render(<Breadcrumb items={items} appearance='outline' />);

    expect(screen.getByRole('navigation')).toHaveClass('min-h-12');
    expect(screen.getByRole('navigation')).toHaveClass('border');
  });

  it('renders disabled items as non-links', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Disabled', href: '/disabled', disabled: true },
          { label: 'Current' },
        ]}
      />,
    );

    expect(getItemWrapper('Disabled')).not.toHaveAttribute('href');
    expect(getItemWrapper('Disabled')).toHaveAttribute('aria-disabled', 'true');
    expect(getItemWrapper('Disabled')).toHaveClass('opacity-40');
  });

  it('respects aria-labelledby for the navigation landmark', () => {
    render(
      <>
        <span id='breadcrumb-label'>Project location</span>
        <Breadcrumb items={items} aria-labelledby='breadcrumb-label' />
      </>,
    );

    expect(
      screen.getByRole('navigation', { name: /project location/i }),
    ).toBeInTheDocument();
  });
});
