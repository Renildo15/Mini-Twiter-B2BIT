import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/src/components/Main/Footer';

describe('Footer', () => {
  it('Deve renderizar o componente Footer', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('Deve ter a estrutura correta de tags', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    const span = screen.getByText('Mini Twitter');

    expect(footer.tagName).toBe('FOOTER');
    expect(span.tagName).toBe('SPAN');
    expect(footer).toContainElement(span);
  });
});
