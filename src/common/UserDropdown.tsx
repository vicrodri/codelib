import { Link, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { getUser, logout } from "../services";
import { ApiUserResponse, User } from "../model";
import { toast } from "react-toastify";

interface DropDownProps {
  isVisible: (visible: boolean) => void;
}

const emptyUser: User = { name: "", email: "", id: 0 };

export const DropdownLoggedIn: FC<DropDownProps> = ({ isVisible }: DropDownProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(emptyUser);

  useEffect(() => {
    const fetchUser = async () => {
      const data: ApiUserResponse = await getUser();

      data.response?.user ? setUser(data.response.user) : toast.error(data.message);
    };
    void fetchUser();
  }, []);

  const handleLogout = () => {
    isVisible(false);

    logout();

    navigate("/");
  };
  return (
    <div
      id='dropdownAvatar'
      className='select-none absolute top-14 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
    >
      <div className='py-3 px-4 text-sm text-gray-900 dark:text-white'>
        <div className='font-medium truncate'>{user.name}</div>
      </div>
      <ul className='py-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownUserAvatarButton'>
        <li>
          <Link
            to='/products'
            className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={() => isVisible(false)}
          >
            All eBooks
          </Link>
        </li>
        <li>
          <Link
            to='/dashboard'
            className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={() => isVisible(false)}
          >
            Dashboard
          </Link>
        </li>
      </ul>
      <div className='py-1'>
        <span
          onClick={handleLogout}
          className='cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export const DropdownLoggedOut: FC<DropDownProps> = ({ isVisible }: DropDownProps) => {
  return (
    <div
      id='dropdownAvatar'
      className='select-none absolute top-14 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
    >
      <ul className='py-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownUserAvatarButton'>
        <li>
          <Link
            to='/products'
            className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={() => isVisible(false)}
          >
            All eBooks
          </Link>
        </li>
        <li>
          <Link
            to='/login'
            className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={() => isVisible(false)}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to='/register'
            className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={() => isVisible(false)}
          >
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
