import { PostsType, PostUpdateType } from '@/types/post';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  createPost,
  deletePost,
  getAllPosts,
  likePost,
  updatePost,
} from '../services/posts.service';

export function usePostsPagination(page: number = 1, searchTerm?: string) {
  return useQuery<PostsType>({
    queryKey: ['posts', page, searchTerm],
    queryFn: () => getAllPosts(page, searchTerm),
  });
}

export function usePostsInfintyScroll(searchTerm?: string) {
  return useInfiniteQuery<PostsType>({
    queryKey: ['posts', searchTerm],
    queryFn: ({ pageParam = 1 }) => getAllPosts(Number(pageParam), searchTerm),
    getNextPageParam: (lastPage) => {
      const hasMore = lastPage.page * lastPage.limit < lastPage.total;
      return hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
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

export function useLikePost() {
  return useMutation({
    mutationFn: (postId: number) => likePost(postId),
  });
}
