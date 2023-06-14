import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
function CustomRadioButton({ name, options }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log("errors", errors);
  const error = errors[name];
  return (
    <FormControl isInvalid={!!error}>
      <Box my={"4"}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <RadioGroup {...field}>
              {options.map((option) => (
                <Radio
                  mx={"4"}
                  key={option.value}
                  value={option.value}
                  // _selected={{ colorScheme: "primary.800" }}
                  color="primary.800"
                  borderColor="gray.100"
                  colorScheme="white"
                  _focus={{
                    color: "primary.800",
                    borderColor: "primary.800",
                    backgroundColor: "none",
                  }}
                  _hover={{ color: "primary.800", borderColor: "primary.800" }}
                >
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}

export default CustomRadioButton;
