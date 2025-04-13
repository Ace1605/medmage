import { Flex, FormControl, FormLabel, Grid } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";

// dayjs.locale("en");

export const DateTimeRangePicker = () => {
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

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

  useEffect(() => {
    console.log("Start:", startDateTime?.format?.());
    console.log("End:", endDateTime?.format?.());
  }, [startDateTime, endDateTime]);

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
            Start Date Time
          </FormLabel>
          <Datetime
            value={startDateTime}
            onChange={handleStartDateChange}
            dateFormat="YYYY-MM-DD"
            timeFormat="hh:mm A"
            inputProps={{
              placeholder: "Select start date and time",
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
            End Date Time
          </FormLabel>
          <Datetime
            value={endDateTime ? endDateTime : ""}
            isValidDate={disableDatesBeforeStart}
            onChange={handleEndDateChange}
            dateFormat="YYYY-MM-DD"
            timeFormat="hh:mm A"
            inputProps={{
              placeholder: "Select end date and time",
            }}
            closeOnSelect
          />
        </FormControl>
      </Flex>
    </Grid>
  );
};
