import { useState } from "react";
import { useCart } from "../context";
import { CartCard } from "./CartCard";
import { Checkout } from "./Checkout";

export const CartList = () => {
  const { productList, total } = useCart();
  const [checkout, setCheckout] = useState<boolean>(false);
  return (
    <>
      <section>
        <p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
          {`My Cart (${productList.length})`}
        </p>
      </section>

      <section>
        {productList.map((item) => (
          <CartCard key={item.id} product={item} />
        ))}
      </section>

      <section className='max-w-4xl m-auto'>
        <div className='flex flex-col p-2 border-b dark:border-slate-700 text-lg dark:text-slate-100'>
          <p className='flex justify-between my-2'>
            <span className='font-semibold'>Total Amount:</span>
            <span>${total}</span>
          </p>
        </div>
        <div className='text-right my-5'>
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700'
            onClick={() => setCheckout(true)}
          >
            PLACE ORDER <i className='ml-2 bi bi-arrow-right'></i>
          </button>
        </div>
      </section>
      {checkout === true ? <Checkout hideCheckout={() => setCheckout(false)} /> : null}
    </>
  );
};
