import { RegisterType } from '@/types/auth';
import { apiFetch } from '../lib/apiFetch';

export function register(data: RegisterType) {
  return apiFetch('auth/register/', {
    method: 'POST',
    data,
  });
}
