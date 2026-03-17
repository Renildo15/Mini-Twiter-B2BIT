'use client'
import { useAuth } from '@/src/hooks/useAuth';
import { useDeletePost, useLikePost, useUpdatePost } from '@/src/hooks/usePost';
import { formatDate } from '@/src/utils/format-date';
import { PostType } from '@/types/post';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import ModalDeletePost from '../ModalDeletePost';
import { PostFormData } from '@/src/schemas/postSchema';
import ModalEditPost from '../ModalEditPost';

interface IPostCardPorps {
  post: PostType;
}

export default function PostCard({ post }: IPostCardPorps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  function formatUserName(name: string) {
    return `@${name.replace(' ', '').toLowerCase()}`;
  }
  const {isAuthenticated, user} = useAuth()
  const { mutate: deleteMutate, isPending: isDeletePending } = useDeletePost();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdatePost();
  const { mutate: likeMutate, isPending: isLikePending } = useLikePost();
  const queryClient = useQueryClient();

   const handleDelete = () => {
    deleteMutate(post.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        setShowConfirm(false);
      },
      onError: (error) => {
        console.error('Erro ao deletar post:', error);
        alert('Erro ao deletar post. Tente novamente.');
      },
    });
  };

  const handleEdit = (data: PostFormData) => {
    updateMutate(
      { id: post.id, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
          setShowEdit(false);
        },
        onError: (error) => {
          console.error('Erro ao editar post:', error);
          alert('Erro ao editar post. Tente novamente.');
        },
      }
    );
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      alert('Faça login para curtir posts');
      return;
    }

    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);

    likeMutate(post.id, {
      onError: (error) => {
        setLiked(!newLikedState);
        setLikesCount(prev => newLikedState ? prev - 1 : prev + 1);
        console.error('Erro ao curtir post:', error);
      },
    });
  };

  return (
    <div className="w-full bg-white rounded-lg border border-[#E2E8F0] p-4 relative">
      {showConfirm && (
        <ModalDeletePost
          handleDelete={handleDelete}
          isPending={isDeletePending}
          setShowConfirm={setShowConfirm}
        />
      )}

      {showEdit && (
        <ModalEditPost
          post={post}
          handleEdit={handleEdit}
          isPending={isUpdatePending}
          setShowEdit={setShowEdit}
        />
      )}
      <div className="mb-3">
        <span className="text-[#314158] text-[16px] leading-6 font-bold">{post.authorName}</span>
        <span className="text-[#62748E] text-[14px] leading-5">
          {' '}
          {formatUserName(post.authorName)} · {formatDate(post.createdAt)}
        </span>
      </div>
      <div className="mb-3">
        <span className="text-[#314158] text-[18px] leading-7 font-bold">{post.title}</span>
        <p className="text-[#314158] text-[16px] leading-6.5">{post.content}</p>
      </div>
      {post.image && (
        <div className="mb-3">
          <Image
            src={post.image}
            alt=""
            width={100}
            height={100}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
              onClick={handleLike}
              disabled={isLikePending}
              className={`flex flex-row items-center group hover:scale-110 transition-transform duration-200 cursor-pointer ${
                isLikePending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? "#EB5757" : "none"}>
              <path
                d="M12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.38 3.1001 10.99 3.9801 12 5.3401C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901C22 15.6901 15.52 19.8201 12.62 20.8101Z"
                stroke="#EB5757"
                strokeWidth="1.5"
                className={`transition-all duration-200 ${
                    liked ? '' : 'group-hover:fill-red-500/30'
                  }`}
              />
            </svg>
            <span className="text-[#62748E] text-sm font-medium min-w-5">
              {likesCount}
          </span>
          </button>
        </div>
        {isAuthenticated && post.authorId === user?.id && (
          <>
            <button 
              onClick={() => setShowEdit(true)}
              className="group hover:scale-110 transition-transform duration-200 cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13.26 3.6L5.84 11.12C5.54 11.42 5.25 12 5.19 12.42L4.85 14.92C4.71 16.13 5.6 16.99 6.8 16.8L9.29 16.42C9.71 16.35 10.3 16.05 10.61 15.75L18.03 8.23C19.53 6.7 20.21 4.96 17.78 2.57C15.36 0.19 13.64 0.94 12.09 2.47L13.26 3.6Z"
                  stroke="#62748E"
                  strokeWidth="1.5"
                  className="group-hover:stroke-blue-500 transition-all duration-200"
                />
                <path
                  d="M10.91 4.7C11.41 7.49 13.66 9.68 16.46 10.1"
                  stroke="#62748E"
                  strokeWidth="1.5"
                  className="group-hover:stroke-blue-500 transition-all duration-200"
                />
                <path
                  d="M3 22H21"
                  stroke="#62748E"
                  strokeWidth="1.5"
                  className="group-hover:stroke-blue-500 transition-all duration-200"
                />
              </svg>
            </button>

            <button
              onClick={() => setShowConfirm(true)}
              disabled={isDeletePending}
              className="group hover:scale-110 transition-transform duration-200 cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98"
                  stroke="#62748E"
                  strokeWidth="1.5"
                  className="group-hover:stroke-red-500 transition-all duration-200"
                />
                <path
                  d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                  stroke="#62748E"
                  strokeWidth="1.5"
                  className="group-hover:stroke-red-500 transition-all duration-200"
                />
                <path
                  d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14"
                  stroke="#62748E"
                  strokeWidth="1.5"
                  className="group-hover:stroke-red-500 transition-all duration-200"
                />
                <path
                  d="M10.33 16.5H13.66"
                  stroke="#62748E"
                  strokeWidth="1.5"
                  className="group-hover:stroke-red-500 transition-all duration-200"
                />
                <path
                  d="M9.5 12.5H14.5"
                  stroke="#62748E"
                  strokeWidth="1.5"
                  className="group-hover:stroke-red-500 transition-all duration-200"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
