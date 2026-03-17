import { ButtonHTMLAttributes } from 'react';

interface ContinueBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function ContinueBtn({ children, ...props }: ContinueBtnProps) {
  return (
    <button
      type="submit"
      className="bg-[#0D93F2] p-4 rounded-[999px] cursor-pointer text-white hover:bg-[#0a7acc] transition-colors duration-200"
      {...props}
    >
      {children || 'Continuar'}
    </button>
  );
}
