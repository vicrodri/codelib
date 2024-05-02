import { FC, useEffect, useState } from "react";
import { Card } from "../common";
import { ApiProductResponse, AppError, Product } from "../model";
import { getFeaturedProductList } from "../services";
import { toast } from "react-toastify";

export const FeaturedProducts: FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: ApiProductResponse = await getFeaturedProductList();
        data.response ? setFeaturedProducts(data.response.products) : toast.error(data.message);
      } catch (error) {
        error instanceof AppError
          ? toast.error(error.message)
          : toast.error("Sorry Failed to connect!", { closeButton: true, autoClose: 10000, position: "top-center" });
      }
    };
    void fetchProducts();
  }, []);

  return (
    <>
      <section className='my-20'>
        <h1 className='text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8'>
          Featured eBooks
        </h1>
        <div className='flex flex-wrap justify-center lg:flex-row'>
          {featuredProducts?.map((item) => (
            <Card key={item.id} product={item} />
          ))}
        </div>
      </section>
    </>
  );
};
