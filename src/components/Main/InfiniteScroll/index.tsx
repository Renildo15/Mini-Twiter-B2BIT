'use client';

import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

export default function InfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  children,
}: InfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading]);

  return (
    <>
      {children}
      <div ref={observerRef} className="h-10 w-full" />
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D93F2]"></div>
        </div>
      )}
      {!hasMore && (
        <div className="text-center text-[#62748E] py-4">Você já viu todos os posts! 🚀</div>
      )}
    </>
  );
}
