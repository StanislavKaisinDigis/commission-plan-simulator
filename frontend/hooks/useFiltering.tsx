import { ChoiceList, FilterInterface } from "@shopify/polaris";
import { useCallback, useMemo, useRef, useState } from "react";
import { Category, Product } from "../models/model";

export const useFiltering = (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  allProducts: Product[],
  categories: Category[]
) => {
  const choices = useMemo(() => {
    const choices = categories.map((category) => ({
      label: category.name,
      value: category.name,
    }));
    return choices;
  }, [categories]);

  const [search, setSearch] = useState<string | undefined>(undefined);

  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const filteredProducts = useRef(allProducts);

  const updateProductsWithCurrentFilters = useCallback(() => {
    const newFilteredProducts = categoryFilter.length
      ? filteredProducts.current.filter((cur) =>
          categoryFilter.includes(cur.category)
        )
      : filteredProducts.current;

    setProducts(newFilteredProducts);
  }, [categoryFilter, setProducts]);

  const onCategoryFilterChange = useCallback(
    (value: string[]) => {
      setCategoryFilter(value);
      const newFilteredProducts = value.length
        ? allProducts.filter((cur) => value.includes(cur.category))
        : allProducts;
      setProducts(newFilteredProducts);
      filteredProducts.current = newFilteredProducts;
    },
    [setProducts]
  );

  const onCategoryFilterRemove = useCallback(() => setCategoryFilter([]), []);

  const onFiltersClearAll = useCallback(() => {
    onCategoryFilterRemove();
  }, [onCategoryFilterRemove]);

  const onSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      if (!value) {
        updateProductsWithCurrentFilters();
        return;
      }

      setProducts((products) =>
        products.filter((product) => {
          const searchObj = { name: product.name, category: product.category };
          const lowerColumns = Object.values(searchObj).map((cur) =>
            cur.toLocaleLowerCase()
          );
          const lowerValue = value.toLocaleLowerCase();
          return lowerColumns.some((cur) => cur.includes(lowerValue));
        })
      );
    },
    [setProducts, updateProductsWithCurrentFilters]
  );

  const onSearchClear = useCallback(() => {
    setSearch("");
    updateProductsWithCurrentFilters();
  }, [updateProductsWithCurrentFilters]);

  const filters: FilterInterface[] = [
    {
      key: "category",
      label: "Category",
      filter: (
        <ChoiceList
          title="Category"
          choices={choices}
          selected={categoryFilter}
          onChange={onCategoryFilterChange}
          allowMultiple
        />
      ),
      pinned: true,
      hideClearButton: true,
    },
  ];

  const appliedFilters = useMemo(() => {
    if (!categoryFilter) {
      return [];
    }
    return [
      {
        key: "taggedWith",
        label: `Selected categories: ${categoryFilter.join(", ")}`,
        onRemove: onCategoryFilterRemove,
      },
    ];
  }, [categoryFilter, onCategoryFilterRemove]);

  return {
    search,
    filters,
    appliedFilters,
    onFiltersClearAll,
    onSearchChange,
    onSearchClear,
    updateProductsWithCurrentFilters,
  };
};
