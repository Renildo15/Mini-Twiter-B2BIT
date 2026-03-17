import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TextBottom from '@/src/components/Authentication/TextBottom';

describe('TextBottom', () => {
  it('Deve renderizar o texto principal', () => {
    render(<TextBottom />);

    const mainText = screen.getByText(/Ao clicar em continuar, você concorda com nossos/i);
    expect(mainText).toBeInTheDocument();
  });

  it('Deve renderizar o link de Termos de Serviço', () => {
    render(<TextBottom />);

    const termosLink = screen.getByRole('link', { name: /Termos de Serviço/i });
    expect(termosLink).toBeInTheDocument();
  });

  it('Deve renderizar o link de Política de Privacidade', () => {
    render(<TextBottom />);

    const privacidadeLink = screen.getByRole('link', { name: /Política de Privacidade/i });
    expect(privacidadeLink).toBeInTheDocument();
  });

  it('Deve renderizar a palavra "e" entre os links', () => {
    render(<TextBottom />);
    const span = screen.getByText(/Ao clicar em continuar, você concorda com nossos/i);
    expect(span.textContent).toContain('e');
  });
});
