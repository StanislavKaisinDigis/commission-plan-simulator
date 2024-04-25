import React, { useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import {
  TextField,
  IndexTable,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  Badge,
  useBreakpoints,
  InlineStack,
  Thumbnail,
  Divider,
  InlineGrid,
  Button,
  Box,
  ButtonGroup,
  Card,
} from "@shopify/polaris";
import { IndexFiltersMode } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { Category, Product } from "../models/model";
import { sortOptions, useSorting } from "../hooks/useSorting";
import { useFiltering } from "../hooks/useFiltering";
import { usePagination } from "../hooks/usePagination";

interface Props {
  initialProducts: Product[];
  setSelectedProducts: (value: string[]) => void;
  setComissionValue: (value: string) => void;
  comissionValue: string;
  categories: Category[];
}

export const ProductsTable: React.FC<Props> = ({
  initialProducts,
  setSelectedProducts,
  setComissionValue,
  comissionValue,
  categories,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  // const [filteredProducts, setFilteredProducts] =
  //   useState<Product[]>(initialProducts);

  const { onSort, sortSelected } = useSorting(setProducts);

  const {
    search,
    filters,
    appliedFilters,
    onFiltersClearAll,
    onSearchChange,
    onSearchClear,
  } = useFiltering(setProducts, initialProducts, categories);

  const pagination = usePagination(setProducts, products);
  const resourceName = {
    singular: "product",
    plural: "products",
  };
  const [selected, setSelected] = useState(0);

  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Filtering);

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products as unknown as { [key: number]: unknown }[]);

  useEffect(() => {
    if (selectedResources) {
      setSelectedProducts(selectedResources);
    }
  }, [selectedResources]);

  const handleChange = useCallback((newValue: string) => {
    setComissionValue(newValue);
  }, []);

  const rowMarkup = products.map(
    ({ id, name, price, imageUrl, category }, index) => (
      <IndexTable.Row
        id={id as unknown as string}
        key={id}
        selected={selectedResources.includes(id as unknown as string)}
        position={index}
      >
        <IndexTable.Cell>
          <InlineStack gap="400" wrap={false} blockAlign="center">
            <Thumbnail source={imageUrl} alt={name} size="small" />
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {name}
            </Text>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>{category}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            $ {price} USD
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InlineGrid columns={2} gap={"0"}>
            <Text as="span" alignment="end" numeric>
              $
            </Text>
            <Text as="span" alignment="end" numeric>
              {(Math.round(+comissionValue * +price) / 100).toString()}
            </Text>
          </InlineGrid>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card>
      <>
        <IndexFilters
          onClearAll={onFiltersClearAll}
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          queryValue={search}
          queryPlaceholder="Searching in all"
          onQueryChange={onSearchChange}
          onQueryClear={onSearchClear}
          onSort={onSort}
          cancelAction={{
            onAction: onSearchClear,
            disabled: false,
            loading: false,
          }}
          selected={selected}
          onSelect={setSelected}
          canCreateNewView
          filters={filters}
          appliedFilters={appliedFilters}
          tabs={[]}
          mode={mode}
          setMode={setMode}
        />

        <IndexTable
          selectable
          pagination={pagination}
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={products.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Product name" },
            { title: "Category" },
            { title: "Price", alignment: "center" },
            { title: "Commission sum", alignment: "center" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </>
      <Divider />
      <Box padding={"200"}>
        <InlineStack align="center">
          <Box width="180px" paddingInlineEnd={"200"}>
            <InlineGrid gap="400" columns={2} alignItems="center">
              <Box>
                <Badge size="large">Commission percent %</Badge>
              </Box>
              <TextField
                label=""
                type="number"
                value={comissionValue}
                onChange={handleChange}
                autoComplete="off"
                min={0}
                max={100}
              />
            </InlineGrid>
          </Box>
          <ButtonGroup>
            <Button
              onClick={() => {
                setComissionValue("0");
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </InlineStack>
      </Box>
    </Card>
  );
};
