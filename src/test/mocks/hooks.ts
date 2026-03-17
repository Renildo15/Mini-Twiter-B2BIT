// src/test/mocks/hooks.ts
import { vi } from 'vitest';

export const mockRouter = {
  push: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

export const mockAuth = {
  isAuthenticated: false,
  logout: vi.fn(),
  token: 'fake-token',
};

vi.mock('@/src/hooks/useAuth', () => ({
  useAuth: () => mockAuth,
}));


export const mockLogout = {
  mutate: vi.fn(),
};

vi.mock('@/src/hooks/useLogout', () => ({
  useLogout: () => mockLogout,
}));

export const mockSearch = {
  setSearchTerm: vi.fn(),
};

vi.mock('@/src/provider/search-provider', () => ({
  useSearch: () => mockSearch,
}));