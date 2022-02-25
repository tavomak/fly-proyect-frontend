import { useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import useNotify from 'hooks/useNotify';
import Button from 'components/Atoms/Button';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    signIn('credentials', { redirect: false, email, password })
      .then((response) => {
        if (response.status === 401) {
          setLoading(false);
          useNotify('error', '¡Mensaje no enviado, por favor intentalo de nuevo!');
        }
      });
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center">
        <Image src="/logoWeb.svg" alt="Estela estudio digital" width={120} height={120} />
      </div>
      <div className="form-group ">
        <label htmlFor="username" className="form-label w-100">
          <span className="d-block">
            Correo
          </span>
          <input
            className="form-control"
            id="username"
            name="username"
            type="text"
            placeholder="Ingresa tu email"
            {...register('email', {
              required: true,
            })}
          />
          {errors.email && (
            <span className="text-danger">Email Requerido</span>
          )}
        </label>
      </div>
      <div className="form-group ">
        <label htmlFor="password" className="form-label w-100">
          <span className="d-block">
            Password
          </span>
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            placeholder="Ingresa tu password"
            {...register('password', {
              required: true,
            })}
          />
          {errors.password && (
            <span className="text-danger">Password Requerido</span>
          )}
        </label>
      </div>
      <div className="form-group text-center">
        <Button
          className="btn btn-secondary mt-4 fs-5"
          text="Ingresar"
          loading={loading}
          submit
        />
      </div>
    </form>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default SignIn;
