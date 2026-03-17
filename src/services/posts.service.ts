import { apiFetch } from '../lib/apiFetch';

export function getAllPosts(page: number = 1, searchTerm: string = '') {
  const token = localStorage.getItem('token');
  const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';
  return apiFetch(`/posts/?page=${page}${searchParam}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
