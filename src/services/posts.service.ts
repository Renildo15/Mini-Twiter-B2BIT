import { PostCreateType } from '@/types/post';
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

export function create(data: PostCreateType) {
  const token = localStorage.getItem('token');
  console.log(token);
  return apiFetch('/posts/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}
