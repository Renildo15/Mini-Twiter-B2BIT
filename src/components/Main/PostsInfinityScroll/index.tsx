'use client';
import PostForm from '../PostForm';
import PostCard from '../PostCard';
import { usePostsInfintyScroll } from '@/src/hooks/usePost';
import { useSearch } from '@/src/provider/search-provider';
import InfiniteScroll from '../InfiniteScroll';

export default function PostsInfinityScroll() {
  const { searchTerm } = useSearch();
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsInfintyScroll(searchTerm);

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <PostForm />
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D93F2]"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <PostForm />
        <div className="text-red-500 text-center py-8">Erro ao carregar posts</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <PostForm />

      {posts.length === 0 ? (
        <div className="text-[#62748E] text-center py-8">
          {searchTerm ? 'Nenhum post encontrado para esta busca' : 'Nenhum post encontrado'}
        </div>
      ) : (
        <InfiniteScroll
          onLoadMore={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          isLoading={isFetchingNextPage}
        >
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
