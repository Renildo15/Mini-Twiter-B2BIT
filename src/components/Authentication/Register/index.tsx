'use client';
import { useForm } from 'react-hook-form';
import AuthInput from '../AuthInput';
import ContinueBtn from '../ContinueBtn';
import TextBottom from '../TextBottom';
import { RegisterFormData, registerSchema } from '@/src/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/src/hooks/useRegister';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = async (data: RegisterFormData) => {
    mutate(data, {
      onSuccess: () => {
        window.location.href = '/auth';
      },
      onError: (error) => {
        console.log(error);
        setError('root', {
          message: error.message,
        });
      },
    });
  };

  return (
    <>
      <div>
        <h3 className="text-[#0D93F2] text-[30px] leading-9">Olá, vamos começar!</h3>
        <span className="text-[#62748E] text-[16px] leading-6">
          Por favor, insira os dados solicitados para fazer cadastro.
        </span>
      </div>
      {errors.root && <div className="text-red-500 text-sm mt-2">{errors.root.message}</div>}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          label="Nome"
          placeholder="Insira o seu e-mail"
          type="text"
          error={errors.name?.message}
          disabled={isPending}
          {...register('name')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
              stroke="#62748E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
              stroke="#62748E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </AuthInput>
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
          {isPending ? 'Criando...' : 'Continuar'}
        </ContinueBtn>
      </form>
      <TextBottom />
    </>
  );
}
