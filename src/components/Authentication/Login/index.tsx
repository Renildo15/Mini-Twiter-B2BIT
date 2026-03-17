import { useForm } from 'react-hook-form';
import AuthInput from '../AuthInput';
import ContinueBtn from '../ContinueBtn';
import TextBottom from '../TextBottom';
import { LoginFormData, loginSchema } from '@/src/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/src/hooks/useLogin';
import { UserWithTokenType } from '@/types/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useLogin();
  const { login: contextLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  const onSubmit = async (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (response: UserWithTokenType) => {
        contextLogin(response.token, response.user);
        router.replace(from);
      },
      onError: (error) => {
        console.log(error);
        setError('root', {
          message: 'Email ou senha inválidos',
        });
      },
    });
  };

  return (
    <>
      <div>
        <h3 className="text-[#0D93F2] dark:text-white text-[30px] leading-9">Olá, de novo!</h3>
        <span className="text-[#62748E] dark:text-[#90A1B9] text-[16px] leading-6">
          Por favor, insira os seus dados para fazer login.
        </span>
      </div>
      {errors.root && <div className="text-red-500 text-sm mt-2">{errors.root.message}</div>}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          label="E-mail"
          placeholder="Insira seu e-mail"
          type="email"
          error={errors.email?.message}
          disabled={isPending}
          {...register('email')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
              stroke="#62748E"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
              stroke="#62748E"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </AuthInput>

        <AuthInput
          label="Senha"
          placeholder="Insira a sua senha"
          type="password"
          error={errors.password?.message}
          disabled={isPending}
          {...register('password')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.41998 13.9799 8.41998 11.9999C8.41998 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z"
              stroke="#62748E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.47003 3.71997 5.18003 5.79997 2.89003 9.39997C1.99003 10.81 1.99003 13.18 2.89003 14.59C5.18003 18.19 8.47003 20.27 12 20.27Z"
              stroke="#62748E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </AuthInput>

        <ContinueBtn type="submit" disabled={isPending}>
          {isPending ? 'Entrando...' : 'Continuar'}
        </ContinueBtn>
      </form>
      <TextBottom />
    </>
  );
}
