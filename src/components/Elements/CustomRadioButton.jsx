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
                  _active={{
                    color: "primary.800",
                    backgroundColor: "primary.800",
                  }}
                  _selected={{ colorScheme: "primary.800" }}
                  _focus={{ color: "primary.800" }}
                  _hover={{ color: "primary.800" }}
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
