// components/Timeline.tsx
'use client';
import PostForm from '../PostForm';
import PostCard from '../PostCard';
import Pagination from '../Pagination';
import { usePostsPagination } from '@/src/hooks/usePost';
import { useState } from 'react';
import { useSearch } from '@/src/provider/search-provider';

export default function PostsPagination() {
  const { searchTerm } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = usePostsPagination(currentPage, searchTerm);

  const posts = data?.posts || [];
  const total = data?.total || 0;
  const limit = data?.limit || 10;
  const totalPages = Math.ceil(total / limit);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
        <div className="text-[#62748E] text-center py-8">Nenhum post encontrado</div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}
    </div>
  );
}
