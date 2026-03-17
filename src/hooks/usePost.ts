import { PostsType } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../services/posts.service';

export function usePosts(page: number = 1, searchTerm?: string) {
  return useQuery<PostsType>({
    queryKey: ['posts', page, searchTerm],
    queryFn: () => getAllPosts(page, searchTerm),
  });
}
