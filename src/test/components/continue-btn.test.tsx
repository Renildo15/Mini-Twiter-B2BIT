import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContinueBtn from '@/src/components/Authentication/ContinueBtn';

describe('ContinueBtn', () => {
  it('Deve renderizar com o texto padrão "Continuar" quando não recebe children', () => {
    render(<ContinueBtn />);

    const button = screen.getByRole('button', { name: /continuar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Continuar');
  });

  it('Deve renderizar com o texto personalizado quando recebe children', () => {
    render(<ContinueBtn>Entrar</ContinueBtn>);

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Entrar');
  });

  it('Deve estar desabilitado quando a prop disabled for true', () => {
    render(<ContinueBtn disabled />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('Deve estar habilitado por padrão', () => {
    render(<ContinueBtn />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
});
