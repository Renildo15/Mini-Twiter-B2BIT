import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthInput from '@/src/components/Authentication/AuthInput';

describe('AuthInput', () => {
  it('deve renderizar o label corretamente', () => {
    render(<AuthInput label="E-mail" type="email" placeholder="Digite seu e-mail" />);
    expect(screen.getByText('E-mail')).toBeInTheDocument();
  });

  it('deve renderizar o placeholder', () => {
    render(<AuthInput label="E-mail" type="email" placeholder="Digite seu e-mail" />);
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument();
  });

  it('deve renderizar mensagem de erro quando fornecida', () => {
    render(
      <AuthInput
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        error="E-mail inválido"
      />
    );
    expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
  });

  it('deve ter aria-invalid quando há erro', () => {
    render(
      <AuthInput
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        error="E-mail inválido"
        id="email"
      />
    );
    const input = screen.getByPlaceholderText('Digite seu e-mail');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('deve estar desabilitado quando disabled é true', () => {
    render(<AuthInput label="E-mail" type="email" placeholder="Digite seu e-mail" disabled />);
    const input = screen.getByPlaceholderText('Digite seu e-mail');
    expect(input).toBeDisabled();
  });
});
