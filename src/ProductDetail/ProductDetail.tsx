import { FC, useEffect, useState } from "react";
import { AppError, Product } from "../model";
import { Rating } from "../common";
import { useParams } from "react-router-dom";
import { useTitle } from "../utils/useTitle";
import { useCart } from "../context";
import { getProduct } from "../services";
import { toast } from "react-toastify";

export const ProductDetail: FC = () => {
  const [product, setProduct] = useState<Partial<Product>>({});
  const [inCart, isInCart] = useState<boolean>(false);
  const { id } = useParams();
  const { productList, addToCart, removeFromCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
  };

  const handleRemove = () => {
    removeFromCart(product);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id || "0");
        data.response?.productList ? setProduct(data.response?.productList[0]) : toast.error(data.message);
      } catch (error) {
        error instanceof AppError
          ? toast.error(error.message)
          : toast.error("Sorry Failed to connect!", { closeButton: true, autoClose: 10000, position: "top-center" });
      }
    };
    void fetchProduct();
  }, []);

  useEffect(() => {
    const localProduct = productList.find((item) => item.id === product.id);
    localProduct ? isInCart(true) : isInCart(false);
  }, [productList, product.id]);

  useTitle(product.name ? product.name : "");

  return (
    <>
      <main>
        <section>
          <h1 className='mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200'>
            {product.name}
          </h1>
          <p className='mb-5 text-lg text-center text-gray-900 dark:text-slate-200'>{product.overview}</p>
          <div className='flex flex-wrap justify-around'>
            <div className='max-w-xl my-3'>
              <img className='rounded' src={product.poster} alt={product.name} />
            </div>
            <div className='max-w-xl my-3'>
              <p className='text-3xl font-bold text-gray-900 dark:text-slate-200'>
                <span className='mr-1'>$</span>
                <span className=''>{product.price}</span>
              </p>
              <p className='my-3'>
                <Rating rating={product.rating ?? 0} />
              </p>
              <p className='my-4 select-none'>
                {product.best_seller ? (
                  <span className='font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2'>
                    BEST SELLER
                  </span>
                ) : null}
                {product.in_stock ? (
                  <span className='font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2'>
                    INSTOCK
                  </span>
                ) : (
                  <span className='font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2'>
                    OUT OF STOCK
                  </span>
                )}
                <span className='font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2'>
                  {product.size} MB
                </span>
              </p>
              <p className='my-3'>
                {!inCart ? (
                  <button
                    onClick={handleAdd}
                    className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed`}
                    disabled={product.in_stock ? false : true}
                  >
                    Add To Cart <i className='ml-1 bi bi-plus-lg'></i>
                  </button>
                ) : (
                  <button
                    onClick={handleRemove}
                    className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}
                  >
                    Remove Item <i className='ml-1 bi bi-trash3'></i>
                  </button>
                )}
              </p>
              <p className='text-lg text-gray-900 dark:text-slate-200'>{product.long_description}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
