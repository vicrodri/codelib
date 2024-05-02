import { FC } from "react";

interface ratingProps {
  rating: number;
}

export const Rating: FC<ratingProps> = (props: ratingProps) => {
  const ratingArray: boolean[] = Array(5)
    .fill(false)
    .map((_, index) => (index < props.rating ? true : false));

  return (
    <>
      {ratingArray?.map((item, index) =>
        item === true ? (
          <i key={index} className='text-lg bi bi-star-fill text-yellow-500 mr-1'></i>
        ) : (
          <i key={index} className='text-lg bi bi-star text-yellow-500 mr-1'></i>
        )
      )}
    </>
  );
};
