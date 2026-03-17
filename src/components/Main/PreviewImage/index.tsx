import Image from 'next/image';

interface IPreviewImageProps {
  imagePreview: string;
  removeImage: () => void;
}

export default function PreviewImage({ imagePreview, removeImage }: IPreviewImageProps) {
  return (
    <div className="relative w-full h-40">
      <Image
        src={imagePreview}
        alt="Preview"
        fill
        className="rounded-lg object-cover"
        unoptimized={true}
      />
      <button
        type="button"
        onClick={removeImage}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}
