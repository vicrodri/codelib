import { FC } from "react";
import { Hero } from "./Hero";
import { FeaturedProducts } from "./FeaturedProducts";
import { Testimonials } from "./Testimonials";
import { Faq } from "./Faq";
import { useTitle } from "../utils/useTitle";

export const Home: FC = () => {
  useTitle("Access Latest Computer Science E-Books");

  return (
    <>
      <main>
        <Hero />
        <FeaturedProducts />
        <Testimonials />
        <Faq />
      </main>
    </>
  );
};
