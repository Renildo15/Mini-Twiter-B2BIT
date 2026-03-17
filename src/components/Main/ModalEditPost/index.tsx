'use client';

import { PostFormData, postSchema } from '@/src/schemas/postSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { PostType } from '@/types/post';
import PreviewImage from '../PreviewImage';

interface IModalEditPostProps {
  post: PostType;
  handleEdit: (data: PostFormData) => void;
  isPending: boolean;
  setShowEdit: (show: boolean) => void;
}

export default function ModalEditPost({
  post,
  handleEdit,
  isPending,
  setShowEdit,
}: IModalEditPostProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(post.image || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      image: post.image || '',
    },
  });

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('Imagem muito grande (máximo 5MB)');
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          setValue('image', base64);
          setImagePreview(base64);
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const removeImage = () => {
    setValue('image', '');
    setImagePreview(null);
  };

  return (
    <div className="absolute inset-0 bg-white/90 dark:bg-[#0F172B]/90 rounded-lg flex items-center justify-center z-20 p-4">
      <div className="bg-white dark:bg-[#0F172B]/90 p-6 rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#62748E] w-full max-w-lg">
        <h3 className="text-[#0D93F2] text-xl font-bold mb-4">Editar Post</h3>

        <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Título"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-[#0D93F2] ${
                errors.title ? 'border-red-500' : 'border-[#E2E8F0] dark:border-[#62748E]'
              }`}
              disabled={isPending}
              {...register('title')}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {imagePreview && <PreviewImage imagePreview={imagePreview} removeImage={removeImage} />}

          <div>
            <textarea
              placeholder="Conteúdo do post"
              rows={4}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-[#0D93F2] ${
                errors.content ? 'border-red-500' : 'border-[#E2E8F0] dark:border-[#62748E]'
              }`}
              disabled={isPending}
              {...register('content')}
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleImageClick}
            className="text-[#62748E] hover:text-[#0D93F2] transition-colors cursor-pointer"
          >
            {imagePreview ? 'Trocar imagem' : 'Adicionar imagem'}
          </button>

          <div className="flex gap-2 justify-end pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setShowEdit(false)}
              className="px-4 py-2 bg-gray-200 text-[#62748E] rounded-lg text-sm hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-[#0D93F2] text-white rounded-lg text-sm hover:bg-[#0a7acc] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isPending ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
