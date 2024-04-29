import { FC, useEffect, useState } from "react";

import Logo from "../assets/react.svg";
import { Link } from "react-router-dom";
import { getLocalStorageItem, getSessionStorageItem, setLocalStorageItem } from "../utils/Utils";
import { Search } from "../productList";
import { DropdownLoggedIn, DropdownLoggedOut } from "./UserDropdown";
import { useCart } from "../context";

export const Header: FC = () => {
  const localDarkMode = getLocalStorageItem<boolean>("darkMode");
  const [darkMode, setDarkMode] = useState<boolean>(localDarkMode ? localDarkMode : false);
  const [searchVisible, isSearchVisible] = useState<boolean>(false);
  const [dropdownVisible, isDropdownVisible] = useState<boolean>(false);

  const { productList } = useCart();

  const token = getSessionStorageItem<string>("token");

  useEffect(() => {
    setLocalStorageItem<boolean>("darkMode", darkMode);

    darkMode === true
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <>
      <header>
        <nav className='bg-white border-gray-200 dark:bg-gray-900 max-h-16'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4'>
            <Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
              <img src={Logo} className='h-8' alt='CodeLib Logo' />
              <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>CodeLib</span>
            </Link>
            <div className='flex items-center space-x-6 rtl:space-x-reverse'>
              <span
                onClick={() => setDarkMode(!darkMode)}
                className='bi bi-gear-wide-connected cursor-pointer text-xl text-gray-700 dark:text-white'
              ></span>
              <span
                onClick={() => {
                  isSearchVisible(!searchVisible);
                }}
                className='bi bi-search cursor-pointer text-xl text-gray-700 dark:text-white'
              ></span>
              <Link to='/cart' className='text-gray-700 dark:text-white mr-5'>
                <span className='text-2xl bi bi-cart-fill relative'>
                  <span className='text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full '>
                    {productList.length}
                  </span>
                </span>
              </Link>
              <span
                onClick={() => {
                  isDropdownVisible(!dropdownVisible);
                }}
                className='bi bi-person-circle cursor-pointer text-xl text-gray-700 dark:text-white'
              ></span>
            </div>
          </div>
          {dropdownVisible === true ? (
            <div className='flex flex-wrap justify-end items-center mx-auto max-w-screen-xl p-4 max-h-0'>
              {token ? (
                <DropdownLoggedIn isVisible={(visible: boolean) => isDropdownVisible(visible)} />
              ) : (
                <DropdownLoggedOut isVisible={(visible: boolean) => isDropdownVisible(visible)} />
              )}
            </div>
          ) : null}
        </nav>

        {searchVisible === true ? <Search /> : null}
      </header>
    </>
  );
};
