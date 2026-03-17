'use client'

import { Dispatch, SetStateAction } from "react";

interface IModalDeletePostProps {
    handleDelete: ()=> void;
    isPending: boolean;
    setShowConfirm: Dispatch<SetStateAction<boolean>>
}

export default function ModalDeletePost({handleDelete, isPending, setShowConfirm}:IModalDeletePostProps) {
    return (
        <div className="absolute inset-0 bg-white/90 rounded-lg flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg border border-[#E2E8F0]">
            <p className="text-[#314158] mb-3">Tem certeza que deseja deletar este post?</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isPending ? 'Deletando...' : 'Sim, deletar'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-[#62748E] rounded-lg text-sm hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
    )
}