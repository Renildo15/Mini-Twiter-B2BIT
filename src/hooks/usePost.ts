import { PostsType, PostUpdateType } from '@/types/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost, deletePost, getAllPosts, updatePost } from '../services/posts.service';

export function usePosts(page: number = 1, searchTerm?: string) {
  return useQuery<PostsType>({
    queryKey: ['posts', page, searchTerm],
    queryFn: () => getAllPosts(page, searchTerm),
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}

export function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
  });
}

export function useUpdatePost() {
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PostUpdateType }) => updatePost(data, id),
  });
}
