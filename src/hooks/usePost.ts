import { PostsType } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../services/posts.service';

export function usePosts(page: number = 1) {
  return useQuery<PostsType>({
    queryKey: ['posts', page],
    queryFn: () => getAllPosts(page),
  });
}
