import { Flex, FormControl, FormLabel, Grid } from "@chakra-ui/react";

import React from "react";
import "dayjs/locale/en";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";

export const DateTimeRangePicker = (props) => {
  const {
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    dateSelect = false,
  } = props;

  const handleStartDateChange = (value) => {
    const selectedDate = moment.isMoment(value) ? value : moment(value);

    setStartDateTime(selectedDate);

    if (endDateTime && moment(endDateTime).isBefore(selectedDate)) {
      setEndDateTime(null);
    }
  };

  const handleEndDateChange = (value) => {
    const selectedDate = moment.isMoment(value) ? value : moment(value);

    if (startDateTime && selectedDate.isBefore(startDateTime)) {
      setEndDateTime(null);
      return;
    }

    setEndDateTime(selectedDate);
  };

  const disableDatesBeforeStart = (currentDate) => {
    return !currentDate.isBefore(startDateTime, "minute");
  };

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        sm: "1fr",
        md: "repeat( 1fr)",
      }}
      gap="15px"
    >
      <Flex alignItems="center" justifyContent="space-between" gap="10px">
        <FormControl>
          <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
            {dateSelect ? "Start Date " : "  Start Date Time"}
          </FormLabel>
          <Datetime
            value={startDateTime}
            onChange={handleStartDateChange}
            dateFormat="YYYY-MM-DD"
            timeFormat={dateSelect ? false : "hh:mm A"}
            inputProps={{
              placeholder: `Select start date ${dateSelect ? "" : " and time"}`,
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
            {dateSelect ? "End Date" : "End Date Time"}
          </FormLabel>
          <Datetime
            value={endDateTime ? endDateTime : ""}
            isValidDate={disableDatesBeforeStart}
            onChange={handleEndDateChange}
            dateFormat="YYYY-MM-DD"
            timeFormat={dateSelect ? false : "hh:mm A"}
            inputProps={{
              placeholder: `Select end date ${dateSelect ? "" : " and time"}`,
            }}
          />
        </FormControl>
      </Flex>
    </Grid>
  );
};
