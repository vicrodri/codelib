import { ApiProductResponse, AppError, Product } from "../model";
import { buildApiUrl } from "../utils/Utils";

export const getProductList = async (criteria: string): Promise<ApiProductResponse> => {
  const url: string = criteria === "" ? buildApiUrl("444/products") : buildApiUrl(`444/products?name_like=${criteria}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data: Product[] = (await response.json()) as Product[];

  const apiResponse: ApiProductResponse = {
    code: response.status,
    response: {
      products:
        typeof data !== "string"
          ? data.map((item: Product) => ({
              id: item.id,
              best_seller: item.best_seller,
              in_stock: item.in_stock,
              name: item.name,
              overview: item.overview,
              image_local: item.image_local,
              long_description: item.long_description,
              poster: item.poster,
              price: item.price,
              rating: item.rating,
              size: item.size,
            }))
          : [],
    },
    message: typeof data === "string" ? data : null,
  };

  return apiResponse;
};

export const getProduct = async (id: string): Promise<ApiProductResponse> => {
  const url: string = buildApiUrl(`444/products/${id}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data: Product = (await response.json()) as Product;
  const apiResponse: ApiProductResponse = {
    code: response.status,
    response: {
      products: [
        {
          id: data.id,
          best_seller: data.best_seller,
          in_stock: data.in_stock,
          name: data.name,
          overview: data.overview,
          image_local: data.image_local,
          long_description: data.long_description,
          poster: data.poster,
          price: data.price,
          rating: data.rating,
          size: data.size,
        },
      ],
    },
    message: typeof data === "string" ? data : null,
  };
  return apiResponse;
};

export const getFeaturedProductList = async () => {
  const url = buildApiUrl("444/featured_products");
  const response = await fetch(url);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data: Product[] = (await response.json()) as Product[];

  const apiResponse: ApiProductResponse = {
    code: response.status,
    response: {
      products:
        typeof data !== "string"
          ? data.map((item: Product) => ({
              id: item.id,
              best_seller: item.best_seller,
              in_stock: item.in_stock,
              name: item.name,
              overview: item.overview,
              image_local: item.image_local,
              long_description: item.long_description,
              poster: item.poster,
              price: item.price,
              rating: item.rating,
              size: item.size,
            }))
          : [],
    },
    message: typeof data === "string" ? data : null,
  };

  return apiResponse;
};
