import { apiFetch } from "../lib/apiFetch";

export function login(data: { email: string; password: string }) {
  return apiFetch('auth/login/', {
    method: 'POST',
    data,
  });
}