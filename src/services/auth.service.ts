import { apiFetch } from "../lib/apiFetch";

export function login(data: { email: string; password: string }) {
  return apiFetch('auth/login/', {
    method: 'POST',
    data,
  });
}

export function logout() {
  return apiFetch('/user/logout/', {
    method: 'POST',
  });
}

export function getCurrentUser() {
  return apiFetch('/user/whoami/', {
    method: 'GET',
  });
}