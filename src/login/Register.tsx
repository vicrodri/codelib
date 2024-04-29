import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiAuthResponse, AppError, AuthDetail } from "../model";
import { register } from "../services/authService";
import { useTitle } from "../utils/useTitle";

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const disabled = useMemo(() => {
    return name == null || name === "" || email == null || email === "" || password == null || password === ""
      ? true
      : false;
  }, [name, email, password]);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authDetail: AuthDetail = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const data: ApiAuthResponse = await register(authDetail);
      data.response?.accessToken ? navigate("/products") : toast.error(data.message);
    } catch (error) {
      error instanceof AppError
        ? toast.error(error.message)
        : toast.error("Sorry Failed to connect!", { closeButton: true, autoClose: 10000, position: "top-center" });
    }
  };

  useTitle("Register");
  return (
    <main>
      <section>
        <p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
          Register
        </p>
      </section>
      <form onSubmit={handleRegister}>
        <div className='mb-6'>
          <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Your name
          </label>
          <input
            type='name'
            id='name'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
            placeholder='Your name'
            required
            autoComplete='off'
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Your email
          </label>
          <input
            type='email'
            id='email'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
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
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
            required
            minLength={7}
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed'
          disabled={disabled}
        >
          Register
        </button>
      </form>
    </main>
  );
};
