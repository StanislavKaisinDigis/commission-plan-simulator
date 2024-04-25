import React, { useCallback, useState } from "react";
import {
  BlockStack,
  Box,
  Card,
  DatePicker,
  Icon,
  Popover,
  TextField,
} from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";
import { formatDateRange } from "../utils.ts/utils";

interface Props {
  month: number;
  year: number;
  setDate: ({ month, year }: { month: number; year: number }) => void;
  selectedDates: {
    start: Date;
    end: Date;
  };
  setSelectedDates: ({ start, end }: { start: Date; end: Date }) => void;
}

export const RangeDatePicker: React.FC<Props> = ({
  month,
  year,
  setDate,
  selectedDates,
  setSelectedDates,
}) => {
  const [visible, setVisible] = useState(false);

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({ month, year }),
    []
  );

  function handleOnClose() {
    setVisible(false);
  }

  return (
    <BlockStack inlineAlign="center" gap="400">
      <Box minWidth="276px">
        <Popover
          active={visible}
          autofocusTarget="none"
          preferredAlignment="left"
          fullWidth
          preferInputActivator={false}
          preferredPosition="below"
          preventCloseOnChildOverlayClick
          onClose={handleOnClose}
          activator={
            <TextField
              role="combobox"
              label={"Select date range"}
              prefix={<Icon source={CalendarIcon} />}
              value={formatDateRange(selectedDates)}
              onFocus={() => setVisible(true)}
              autoComplete="off"
            />
          }
        >
          <Card>
            <DatePicker
              month={month}
              year={year}
              onChange={setSelectedDates}
              onMonthChange={handleMonthChange}
              selected={selectedDates}
              allowRange
            />
          </Card>
        </Popover>
      </Box>
    </BlockStack>
  );
};
