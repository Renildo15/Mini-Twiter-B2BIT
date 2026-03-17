import { PostsType } from '@/types/post';
import { useMutation, useQuery } from '@tanstack/react-query';
import { create, getAllPosts } from '../services/posts.service';

export function usePosts(page: number = 1, searchTerm?: string) {
  return useQuery<PostsType>({
    queryKey: ['posts', page, searchTerm],
    queryFn: () => getAllPosts(page, searchTerm),
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: create,
  });
}
