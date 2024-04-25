import { useCallback, useLayoutEffect, useMemo, useState } from "react";

import { IndexTablePaginationProps } from "@shopify/polaris/build/ts/src/components/IndexTable";
import { Category, Product } from "../models/model";

// how much items will be on one page
const pageSize = 6;

export const usePagination = (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  allProducts: Product[]
): IndexTablePaginationProps => {
  const [page, setPage] = useState(0);

  const maxPage = useMemo(() => Math.floor(allProducts.length / pageSize), []);
  const hasNext = useMemo(() => page < maxPage, [maxPage, page]);
  const hasPrevious = useMemo(() => page > 0, [page]);

  const updateProductsWithPage = useCallback(
    (page: number) => {
      const nextProductsCursor = page * pageSize;
      setProducts(
        allProducts.slice(nextProductsCursor, nextProductsCursor + pageSize)
      );
    },
    [setProducts]
  );

  const onNext = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    updateProductsWithPage(newPage);
  }, [page, updateProductsWithPage]);

  const onPrevious = useCallback(() => {
    const newPage = page - 1;
    setPage(newPage);
    updateProductsWithPage(newPage);
  }, [page, updateProductsWithPage]);

  useLayoutEffect(() => {
    setProducts(allProducts.slice(0, pageSize));
  }, [setProducts]);

  return {
    hasNext,
    hasPrevious,
    onNext,
    onPrevious,
  };
};
