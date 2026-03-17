import { PostCreateType, PostUpdateType } from '@/types/post';
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

export function createPost(data: PostCreateType) {
  const token = localStorage.getItem('token');
  return apiFetch('/posts/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export function deletePost(id: number) {
  const token = localStorage.getItem('token');
  return apiFetch(`/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updatePost(data: PostUpdateType, id: number) {
  const token = localStorage.getItem('token');
  return apiFetch(`/posts/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export function likePost(postId: number) {
  const token = localStorage.getItem('token');
  return apiFetch(`/posts/${postId}/like`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
