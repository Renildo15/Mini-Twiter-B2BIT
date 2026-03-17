import { PostsType } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/posts.service";

export function usePosts() {
  return useQuery<PostsType>({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });
}
