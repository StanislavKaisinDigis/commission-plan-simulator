import { IndexFiltersProps } from "@shopify/polaris";
import { useCallback, useLayoutEffect, useState } from "react";

import { priceToNumber } from "../utils.ts/utils";
import { Product } from "../models/model";

export const sortOptions: IndexFiltersProps["sortOptions"] = [
  { label: "Product", value: "name asc", directionLabel: "A-Z" },
  { label: "Product", value: "name desc", directionLabel: "Z-A" },
  { label: "Category", value: "category asc", directionLabel: "A-Z" },
  { label: "Category", value: "category desc", directionLabel: "Z-A" },
  { label: "Price", value: "price asc", directionLabel: "Ascending" },
  { label: "Price", value: "price desc", directionLabel: "Descending" },
];

const initSort = ["name asc"];

export const useSorting = (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  const [sortSelected, setSortSelected] = useState(initSort);

  const onSort = useCallback(
    (value: string[]) => {
      setSortSelected(value);

      const sortValues = value[0].split(" ");
      const column = sortValues[0];
      const direction = sortValues[1];

      if (column === "name" || column === "category") {
        if (direction === "asc") {
          setProducts((products) =>
            [...products].sort((cur, next) =>
              cur[column].localeCompare(next[column])
            )
          );
        } else if (direction === "desc") {
          setProducts((products) =>
            [...products].sort((cur, next) =>
              next[column].localeCompare(cur[column])
            )
          );
        }
      } else if (column === "price") {
        if (direction === "asc") {
          setProducts((products) =>
            [...products].sort(
              (cur, next) =>
                priceToNumber(cur.price) - priceToNumber(next.price)
            )
          );
        } else if (direction === "desc") {
          setProducts((products) =>
            [...products].sort(
              (cur, next) =>
                priceToNumber(next.price) - priceToNumber(cur.price)
            )
          );
        }
      }
    },
    [setProducts]
  );

  useLayoutEffect(() => {
    onSort(initSort);
  }, [onSort]);

  return { sortSelected, onSort };
};
