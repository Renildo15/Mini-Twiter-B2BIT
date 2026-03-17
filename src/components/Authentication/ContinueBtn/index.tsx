import { ButtonHTMLAttributes } from 'react';

interface ContinueBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function ContinueBtn({ children, ...props }: ContinueBtnProps) {
  return (
    <button
      type="submit"
      className="bg-[#0D93F2] p-4 rounded-[999px] cursor-pointer text-white"
      {...props}
    >
      {children || 'Continuar'}
    </button>
  );
}
