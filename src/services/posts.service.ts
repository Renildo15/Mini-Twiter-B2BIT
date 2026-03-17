import { apiFetch } from '../lib/apiFetch';

export function getAllPosts(page: number = 1) {
  const token = localStorage.getItem('token');
  return apiFetch(`/posts/?page=${page}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
