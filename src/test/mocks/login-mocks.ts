// src/test/mocks/login-mocks.ts
import { vi } from 'vitest';

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
  }),
}));

export const mockLoginMutate = vi.fn();
vi.mock('@/src/hooks/useLogin', () => ({
  useLogin: () => ({
    mutate: mockLoginMutate,
    isPending: false,
  }),
}));

export const mockContextLogin = vi.fn();
vi.mock('@/src/hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockContextLogin,
  }),
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(() => async () => ({ values: {}, errors: {} })),
}));
