import axios from "axios";
import { api } from "./api";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiFetch(url: string, options?: any) {
  try {
    const response = await api({
      url,
      ...options,
    });

    return response.data;
  } catch (error) {
    console.log('Erro completo:', error);
    
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.error || 
                          error.response.data?.message || 
                          "Erro na requisição";
      
      throw new Error(errorMessage);
    }
    
    throw new Error("Erro na requisição");
  }
}