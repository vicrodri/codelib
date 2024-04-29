import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../model";
import { Rating } from "./Rating";
import { useCart } from "../context";

interface cardProps {
  product: Product;
}

export const Card: FC<cardProps> = ({ product }: cardProps) => {
  const { id, name, overview, poster, price, best_seller, rating } = product;
  const { productList, addToCart, removeFromCart } = useCart();
  const [inCart, isInCart] = useState<boolean>(false);

  const handleAdd = () => {
    addToCart(product);
  };

  const handleRemove = () => {
    removeFromCart(product);
  };

  useEffect(() => {
    const localProduct = productList.find((item) => item.id === product.id);
    localProduct ? isInCart(true) : isInCart(false);
  }, [productList, product.id]);

  return (
    <>
      <div className='m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
        <Link to={`/products/${id}`} className='relative'>
          <img className='rounded-t-lg w-full h-64' src={poster} alt={name} />
          {best_seller === true ? (
            <span className='absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded'>
              Best Seller
            </span>
          ) : null}
        </Link>
        <div className='p-5'>
          <Link to={`/products/${id}`}>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h5>
          </Link>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{overview}</p>

          <Rating rating={rating} />

          <p className='flex justify-between items-center'>
            <span className='text-2xl dark:text-gray-200'>
              <span>$</span>
              <span>{price}</span>
            </span>
            {!inCart ? (
              <button
                onClick={handleAdd}
                className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed'
                disabled={!product.in_stock}
              >
                Add To Cart <i className='ml-1 bi bi-plus-lg'></i>
              </button>
            ) : (
              <button
                onClick={handleRemove}
                className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800'
              >
                Remove Item <i className='ml-1 bi bi-trash3'></i>
              </button>
            )}
          </p>
        </div>
      </div>
    </>
  );
};
