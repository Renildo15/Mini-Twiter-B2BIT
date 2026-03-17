'use client';

import { useCreatePost } from '@/src/hooks/usePost';
import { PostFormData, postSchema } from '@/src/schemas/postSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';
import PreviewImage from '../PreviewImage';

export default function PostForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      image: '',
    },
  });

  const { mutate, isPending } = useCreatePost();
  const queryClient = useQueryClient();

  const onSubmit = async (data: PostFormData) => {
    const postData = {
      ...data,
      title: data.title || data.content.substring(0, 50) + (data.content.length > 50 ? '...' : ''),
    };

    mutate(postData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        reset();
        setImagePreview(null);
      },
      onError: (error) => {
        console.log(error);
        setError('root', { message: error.message });
      },
    });
  };

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
    >
      {errors.root && <div className="text-red-500 text-sm mb-2">{errors.root.message}</div>}

      {imagePreview && (
        <PreviewImage
          imagePreview={imagePreview}
          removeImage={removeImage}
        />
      )}

      <textarea
        className={`w-full pt-2 pb-9 px-3 outline-none focus:border-[#0D93F2] transition-all text-[#62748E] text-[18px] leading-7 resize-none ${
          errors.content ? 'border-red-500' : ''
        }`}
        placeholder="E aí, o que está rolando?"
        disabled={isPending}
        rows={4}
        {...register('content')}
      />
      {errors.content && <p className="text-red-500 text-xs mb-2">{errors.content.message}</p>}

      <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3">
        <button
          type="button"
          onClick={handleImageClick}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          disabled={isPending}
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <mask id="path-1-inside-1_2001_159" fill="white">
              <path d="M3.44007 25.3468L3.4134 25.3735C3.0534 24.5868 2.82673 23.6935 2.7334 22.7068C2.82673 23.6801 3.08007 24.5601 3.44007 25.3468Z" />
            </mask>
            <path
              d="M3.44007 25.3468L4.14718 26.0539L4.63853 25.5625L4.34937 24.9307L3.44007 25.3468ZM3.4134 25.3735L2.50409 25.7896L3.10293 27.0982L4.12051 26.0806L3.4134 25.3735ZM2.7334 22.7068L3.72883 22.6113L1.73784 22.801L2.7334 22.7068ZM3.44007 25.3468L2.73295 24.6397L2.70628 24.6664L3.4134 25.3735L4.12051 26.0806L4.14718 26.0539L3.44007 25.3468ZM3.4134 25.3735L4.32271 24.9573C4.01597 24.287 3.81338 23.5052 3.72895 22.6126L2.7334 22.7068L1.73784 22.801C1.84008 23.8818 2.09083 24.8865 2.50409 25.7896L3.4134 25.3735ZM2.7334 22.7068L1.73796 22.8022C1.84243 23.8917 2.12658 24.8797 2.53076 25.7629L3.44007 25.3468L4.34937 24.9307C4.03355 24.2405 3.81103 23.4686 3.72883 22.6113L2.7334 22.7068Z"
              fill="#0D93F2"
              mask="url(#path-1-inside-1_2001_159)"
            />
            <path
              d="M11.9995 8.49341C13.1996 8.49341 14.1731 9.46618 14.1733 10.6663C14.1733 11.8666 13.1998 12.8401 11.9995 12.8401C10.7994 12.8398 9.82666 11.8664 9.82666 10.6663C9.82692 9.46634 10.7996 8.49367 11.9995 8.49341Z"
              stroke="#0D93F2"
              strokeWidth="2"
            />
            <path
              d="M24.0515 17.4255C24.7168 16.8541 25.8433 16.8541 26.5085 17.4255L26.5144 17.4304L26.6873 17.5769L28.3337 18.9695V21.5867C28.3337 23.8145 27.6732 25.4727 26.573 26.573C25.4727 27.6732 23.8145 28.3337 21.5867 28.3337H10.4138C7.69456 28.3337 5.79013 27.3526 4.72241 25.6931L5.69019 25.0437L10.6775 21.697L10.6794 21.696C11.3828 21.2213 12.3885 21.2882 12.9822 21.8064L12.9929 21.8162L13.0046 21.825L13.4578 22.199V22.198C14.8732 23.3999 17.095 23.3959 18.5046 22.1853L24.0515 17.4255ZM3.67554 22.0037C3.71729 22.9627 3.9036 23.817 4.20288 24.5789L4.46753 25.2527C4.41774 25.1572 4.3689 25.0599 4.32397 24.9607H4.32495L4.32104 24.9539L4.17163 24.6023C3.89178 23.8808 3.72073 23.0413 3.67749 22.0789L3.67554 22.0037ZM28.3142 9.79761C28.3185 9.87117 28.3232 9.94533 28.3259 10.0203C28.3233 9.94555 28.3184 9.87139 28.3142 9.79761ZM3.67358 10.0193C3.67478 9.98626 3.67697 9.95341 3.67847 9.92065C3.677 9.95346 3.67475 9.98631 3.67358 10.0193ZM9.56909 3.69995C9.5834 3.69879 9.5977 3.69715 9.61206 3.69604C9.5977 3.69712 9.58341 3.69881 9.56909 3.69995ZM22.3894 3.69604C22.3992 3.6968 22.4089 3.69819 22.4187 3.69897C22.4089 3.69821 22.3992 3.69678 22.3894 3.69604ZM9.92065 3.67847C9.95341 3.67697 9.98626 3.67478 10.0193 3.67358C9.98631 3.67475 9.95346 3.677 9.92065 3.67847ZM21.9783 3.67358C22.0133 3.67484 22.0481 3.67687 22.0828 3.67847C22.048 3.6769 22.0132 3.67481 21.9783 3.67358Z"
              stroke="#0D93F2"
              strokeWidth="2"
            />
          </svg>
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-[#0D93F2] text-white rounded-[9999px] w-23 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0a7acc] transition-colors duration-200"
        >
          {isPending ? 'Postando...' : 'Postar'}
        </button>
      </div>
    </form>
  );
}
