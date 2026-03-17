import { useMutation } from '@tanstack/react-query';
import { register } from '../services/user.service';

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}