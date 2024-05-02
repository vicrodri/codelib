import { FC, useEffect, useState } from "react";
import { Card, FilterBar } from "../common";
import { ApiProductResponse, AppError, Product } from "../model";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "../utils/useTitle";
import { useFilter } from "../context";
import { getProductList } from "../services";
import { toast } from "react-toastify";

export const ProductList: FC = () => {
  const [visible, isVisible] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const { productList: ctxProductList, setInitialProductList } = useFilter();
  const criteria = searchParams.get("q") ?? "";

  const showFilterBarHandler = () => {
    isVisible(!visible);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: ApiProductResponse = await getProductList(criteria);
        data.response ? setInitialProductList(data.response.products) : toast.error(data.message);
      } catch (error) {
        error instanceof AppError
          ? toast.error(error.message)
          : toast.error("Sorry Failed to connect!", { closeButton: true, autoClose: 10000, position: "top-center" });
      }
    };
    void fetchProducts();
  }, [criteria]); //eslint-disable-line

  useTitle("Explore E-Books Collection");
  return (
    <>
      <main>
        <section className='my-5'>
          <div className='my-5 flex justify-between px-0.5'>
            <span className='text-2xl font-semibold dark:text-slate-100 mb-5'>
              All eBooks ({ctxProductList?.length})
            </span>
            <span>
              <button
                id='dropdownMenuIconButton'
                data-dropdown-toggle='dropdownDots'
                className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700'
                type='button'
                onClick={showFilterBarHandler}
              >
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
                </svg>
              </button>
            </span>
          </div>

          <div className='flex flex-wrap justify-center lg:flex-row'>
            {ctxProductList?.map((item: Product) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
        </section>

        {visible === true ? <FilterBar isVisible={showFilterBarHandler} /> : null}
      </main>
    </>
  );
};
