import { useEffect } from "react";

export const useTitle = (title: string): null => {
  useEffect(() => {
    document.title = `${title} / CodeLib`;
  }, [title]);

  return null;
};
