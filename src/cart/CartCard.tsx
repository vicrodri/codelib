import { Link } from "react-router-dom";
import { Product } from "../model";
import { FC } from "react";
import { useCart } from "../context";

interface cardProps {
  product: Product;
}

export const CartCard: FC<cardProps> = ({ product }: cardProps) => {
  const { name, poster, price } = product;
  const { removeFromCart } = useCart();

  return (
    <div className='flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5 '>
      <div className='flex'>
        <Link to='/'>
          <img className='w-32 rounded' src={poster} alt={name} />
        </Link>
        <div className=''>
          <Link to='/'>
            <p className='text-lg ml-2 dark:text-slate-200'>{name}</p>
          </Link>
          <button onClick={() => removeFromCart(product)} className='text-base ml-2 text-red-400'>
            Remove
          </button>
        </div>
      </div>
      <div className='text-lg m-2 dark:text-slate-200'>
        <span>${price}</span>
      </div>
    </div>
  );
};
