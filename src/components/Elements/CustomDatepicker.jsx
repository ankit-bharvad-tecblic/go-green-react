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
  const [startDate, setStartDate] = useState(new Date("2023/02/08"));
  const [endDate, setEndDate] = useState(new Date("2023/02/10"));
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  useEffect(() => {
    console.log("staer end date: " + startDate, endDate);
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
                // width={{ base: "90%" }}
                border="1px"
                borderColor="gray.10"
                backgroundColor={"white"}
                height={"15px "}
                borderRadius={"lg"}
                _placeholder={{ color: "gray.300" }}
                _hover={{
                  borderColor: "primary.700",
                  backgroundColor: "primary.200",
                }}
                _focus={{
                  borderColor: "primary.700",
                  backgroundColor: "primary.200",
                  boxShadow: "none",
                }}
                max={max}
                p={{ base: "4" }}
                fontWeight={{ base: "normal" }}
                fontStyle={"normal"}
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
                // width={{ base: "90%" }}
                border="1px"
                borderColor="gray.10"
                backgroundColor={"white"}
                height={"15px "}
                borderRadius={"lg"}
                _placeholder={{ color: "gray.300" }}
                _hover={{
                  borderColor: "primary.700",
                  backgroundColor: "primary.200",
                }}
                _focus={{
                  borderColor: "primary.700",
                  backgroundColor: "primary.200",
                  boxShadow: "none",
                }}
                max={max}
                p={{ base: "4" }}
                fontWeight={{ base: "normal" }}
                fontStyle={"normal"}
                placeholder={placeholder}
              />
            )}
          />
        </Box>
        <FormErrorMessage>{error && error?.message}</FormErrorMessage>
      </FormControl>
      {/* <Box>
        <Text>Creation Date Start</Text>
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </Box> */}

      {/* <Box>
        <Text>Creation Date End</Text>
        <ReactDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </Box> */}
    </Box>
  );
}

export default CustomDatepicker;
