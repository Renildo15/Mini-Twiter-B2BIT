'use client'

import { useAuth } from "@/src/hooks/useAuth";
import { useLogout } from "@/src/hooks/useLogout";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isAuthenticated, logout, token } = useAuth();
  const router = useRouter()
  const {mutate} = useLogout();

  const handleLogout = () => {
    mutate(token ?? '', {
      onSuccess: () => {
        logout()
      },
      onError: (error) => {
          console.log(error)
          alert(error)
        }
    })
  }
   return (
    <header className="flex justify-between items-center bg-[#FAFAFA] border-b border-[#E2E8F0] py-3 px-10 mb-9 sticky top-0 z-50">
      
      <h3 className="text-[#0D93F2] text-[18px] font-bold">
        Mini Twitter
      </h3>

      <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 w-149.25">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M8.625 15.75C12.56 15.75 15.75 12.56 15.75 8.625C15.75 4.68997 12.56 1.5 8.625 1.5C4.68997 1.5 1.5 4.68997 1.5 8.625C1.5 12.56 4.68997 15.75 8.625 15.75Z"
            stroke="#62748E"
            strokeWidth="1.5"
          />
          <path
            d="M16.5 16.5L15 15"
            stroke="#62748E"
            strokeWidth="1.5"
          />
        </svg>

        <input
          type="search"
          placeholder="Buscar por post..."
          className="flex-1 outline-none text-[14px] text-[#62748E] placeholder:text-[#94A3B8] bg-transparent"
        />
      </div>
      {!isAuthenticated ?(
        <div className="flex gap-2">
          <button onClick={() => router.push("/auth?tab=register")} className="cursor-pointer border border-[#E2E8F0] px-7.5 py-2 text-[#62748E] text-[16px] leading-6 rounded-[9999px] min-w-39 font-bold">Registra-se</button>
          <button onClick={() => router.push("/auth?tab=login")} className="cursor-pointer bg-[#0D93F2] px-7.5 py-2 text-white text-[16px] leading-6 rounded-[9999px] min-w-39 font-bold shadow-[0_6px_14px_rgba(59,130,246,0.45)]">Login</button>
        </div>
      ): (
        <button onClick={handleLogout} className="bg-[#0D93F2] p-3 rounded-full cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.4165 6.29995C7.67484 3.29995 9.2165 2.07495 12.5915 2.07495H12.6998C16.4248 2.07495 17.9165 3.56662 17.9165 7.29162V12.725C17.9165 16.45 16.4248 17.9416 12.6998 17.9416H12.5915C9.2415 17.9416 7.69984 16.7333 7.42484 13.7833"
              stroke="#FAFAFA"
              strokeWidth="1.5"
            />
            <path
              d="M12.4999 10H3.0166"
              stroke="#FAFAFA"
              strokeWidth="1.5"
            />
            <path
              d="M4.87516 7.20825L2.0835 9.99992L4.87516 12.7916"
              stroke="#FAFAFA"
              strokeWidth="1.5"
            />
          </svg>
        </button> 
      )}
      

    </header>
  );
}