import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiAuthResponse, AppError, AuthDetail } from "../model";
import { toast } from "react-toastify";
import { login } from "../services";
import { useTitle } from "../utils/useTitle";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const disabled = useMemo(() => {
    return email == null || email === "" || password == null || password === "" ? true : false;
  }, [email, password]);

  const logUserIn = async (authDetail: AuthDetail) => {
    try {
      const data: ApiAuthResponse = await login(authDetail);
      data.response?.accessToken ? navigate("/products") : toast.error(data.message);
    } catch (error) {
      error instanceof AppError
        ? toast.error(error.message)
        : toast.error("Sorry Failed to connect!", { closeButton: true, autoClose: 10000, position: "top-center" });
    }
  };
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authDetail: AuthDetail = {
      email: email,
      password: password,
    };

    await logUserIn(authDetail);
  };

  const handleGuestLogin = async () => {
    const authDetail: AuthDetail = {
      email: `${import.meta.env.VITE_GUEST_USER}`,
      password: `${import.meta.env.VITE_GUEST_PWD}`,
    };

    await logUserIn(authDetail);
  };

  useTitle("Login");
  return (
    <main>
      <section>
        <p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
          Login
        </p>
      </section>
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => void handleLogin(event)}>
        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Your email
          </label>
          <input
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='my@mail.com'
            required
            autoComplete='off'
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Your password
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed'
          disabled={disabled}
        >
          Log In
        </button>
      </form>
      <button
        onClick={() => void handleGuestLogin()}
        className='mt-3 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Login As Guest
      </button>
    </main>
  );
};
