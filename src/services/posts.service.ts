import { apiFetch } from "../lib/apiFetch";

export function getAllPosts() {
    const token = localStorage.getItem('token');
    return apiFetch(`/posts/`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        }
    });
}