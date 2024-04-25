import React, { useCallback, useMemo, useState } from "react";
import {
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  InlineGrid,
  InlineStack,
  Select,
} from "@shopify/polaris";
import { RangeDatePicker } from "./RangeDatePicker";
import { SelectedStaff, Staff } from "../models/model";

interface Props {
  staff: Staff[];
  setStaff: ({ staffId, start, end }: SelectedStaff) => void;
  getOrders: ({ staffId, start, end }: SelectedStaff) => void;
  selectedProducts: string[];
}

const initialData = { month: 1, year: 2023 };
const today = new Date();
const initialDataInterval = {
  start: new Date(today.getFullYear(), 0, 1),
  end: today,
};

export const SelectStaffForm: React.FC<Props> = ({
  staff,
  setStaff,
  getOrders,
  selectedProducts,
}) => {
  const [{ month, year }, setDate] = useState(initialData);
  const [selectedDates, setSelectedDates] = useState(initialDataInterval);
  const [selected, setSelected] = useState(null);
  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    []
  );
  const options = useMemo(() => {
    return staff.map((s) => ({
      label: s.name,
      value: s.id.toString(),
    }));
  }, [staff]);

  const handleCancel = () => {
    setSelected(null);
    setSelectedDates(initialDataInterval);
    setDate(initialData);
    setStaff({
      staffId: null,
      ...selectedDates,
    });
  };

  const handleSimulate = () => {
    setStaff({
      staffId: selected,
      ...selectedDates,
    });
    getOrders({
      staffId: selected,
      ...selectedDates,
    });
  };

  const disabled = selected ? (selectedProducts.length ? false : true) : true;

  return (
    <Card>
      <FormLayout>
        <FormLayout.Group>
          <BlockStack gap="500">
            <InlineGrid gap="400" columns={2} alignItems="center">
              <Select
                label="Select staff member"
                options={options}
                onChange={handleSelectChange}
                value={selected}
                placeholder="-"
              />
              <RangeDatePicker
                month={month}
                year={year}
                setDate={setDate}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
              />
            </InlineGrid>
            <ButtonGroup fullWidth>
              <Button onClick={handleSimulate} disabled={disabled}>
                Simulate
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </ButtonGroup>
          </BlockStack>
        </FormLayout.Group>
      </FormLayout>
    </Card>
  );
};
