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
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Erro na requisição");
    }
    throw new Error("Erro na requisição");
  }
}