import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";

function CustomDatepicker({ name, placeholder, type, style, max }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  useEffect(() => {
    console.log("start end date: " + startDate, endDate);
  }, [startDate, endDate]);
  return (
    <Box>
      <FormControl {...style} isInvalid={!!error}>
        <FormLabel>Creation Date Start</FormLabel>
        <Box>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <ReactDatePicker
                {...field}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                type={type}
                placeholder={placeholder}
              />
            )}
          />
        </Box>
        <FormErrorMessage>{error && error?.message}</FormErrorMessage>
      </FormControl>
      <FormControl {...style} isInvalid={!!error}>
        <FormLabel>Creation Date End</FormLabel>
        <Box>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <ReactDatePicker
                {...field}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                type={type}
                style={{ backgroundColor: "pink" }}
                placeholder={placeholder}
              />
            )}
          />
        </Box>
        <FormErrorMessage>{error && error?.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}

export default CustomDatepicker;
