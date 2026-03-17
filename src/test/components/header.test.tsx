// src/test/components/header.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockRouter, mockAuth, mockLogout, mockSearch } from '../mocks/hooks';
import Header from '@/src/components/Main/Header';

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Header Renderização básica', () => {
    it('Deve renderizar o header com logo', () => {
      render(<Header />);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(screen.getByText('Mini Twitter')).toBeInTheDocument();
    });

    it('Deve renderizar a barra de busca', () => {
      render(<Header />);

      const searchInput = screen.getByPlaceholderText('Buscar por post...');
      expect(searchInput).toBeInTheDocument();
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });
  });

  describe('Usuário não autenticado', () => {
    beforeEach(() => {
      mockAuth.isAuthenticated = false;
    });

    it('Deve renderizar botões de Registrar-se e Login', () => {
      render(<Header />);

      expect(screen.getByRole('button', { name: /registrar-se/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    });

    it('Deve navegar para registro ao clicar em Registrar-se', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const registerButton = screen.getByRole('button', { name: /registrar-se/i });
      await user.click(registerButton);

      expect(mockRouter.push).toHaveBeenCalledWith('/auth?tab=register');
    });

    it('Deve navegar para login ao clicar em Login', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      await user.click(loginButton);

      expect(mockRouter.push).toHaveBeenCalledWith('/auth?tab=login');
    });
  });

  describe('Usuário autenticado', () => {
    beforeEach(() => {
      mockAuth.isAuthenticated = true;
    });

    it('Deve renderizar botão de logout', () => {
      render(<Header />);

      const logoutButton = screen.getByRole('button');
      expect(logoutButton).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /registrar-se/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
    });

    it('Deve chamar logout ao clicar no botão de logout', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const logoutButton = screen.getByRole('button');
      await user.click(logoutButton);

      expect(mockLogout.mutate).toHaveBeenCalledWith(
        'fake-token',
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });

    it('Deve executar logout no onSuccess da mutation', () => {
      render(<Header />);

      const logoutButton = screen.getByRole('button');
      fireEvent.click(logoutButton);

      const onSuccess = mockLogout.mutate.mock.calls[0][1].onSuccess;
      onSuccess();

      expect(mockAuth.logout).toHaveBeenCalled();
    });
  });

  describe('Busca', () => {
    it('Deve atualizar inputValue e setSearchTerm quando o usuário digita', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const searchInput = screen.getByPlaceholderText('Buscar por post...');
      await user.type(searchInput, 'react');

      expect(searchInput).toHaveValue('react');
      expect(mockSearch.setSearchTerm).toHaveBeenCalledWith('react');
    });

    it('Deve chamar setSearchTerm a cada caractere digitado', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const searchInput = screen.getByPlaceholderText('Buscar por post...');
      await user.type(searchInput, 'test');

      expect(mockSearch.setSearchTerm).toHaveBeenCalledTimes(4);
      expect(mockSearch.setSearchTerm).toHaveBeenNthCalledWith(1, 't');
      expect(mockSearch.setSearchTerm).toHaveBeenNthCalledWith(2, 'te');
      expect(mockSearch.setSearchTerm).toHaveBeenNthCalledWith(3, 'tes');
      expect(mockSearch.setSearchTerm).toHaveBeenNthCalledWith(4, 'test');
    });
  });

  describe('Acessibilidade', () => {
    it('Deve ter role="banner" para o header', () => {
      render(<Header />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('Deve ter input com role="searchbox"', () => {
      render(<Header />);

      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('Deve ter placeholder no input de busca', () => {
      render(<Header />);

      const searchInput = screen.getByPlaceholderText('Buscar por post...');
      expect(searchInput).toHaveAttribute('placeholder', 'Buscar por post...');
    });
  });

  describe('Tratamento de erros', () => {
    it('Deve mostrar alerta quando logout falha', () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(<Header />);

      const logoutButton = screen.getByRole('button');
      fireEvent.click(logoutButton);

      const onError = mockLogout.mutate.mock.calls[0][1].onError;
      onError(new Error('Erro no logout'));

      expect(consoleMock).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalled();

      alertMock.mockRestore();
      consoleMock.mockRestore();
    });
  });
});
