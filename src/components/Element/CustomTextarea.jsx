import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import * as yup from "yup";

const CustomTextarea = ({ name, label, size }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <FormControl isInvalid={!!error}>
      <Box>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder={label}
              size={size}
              borderColor={error ? "red" : "primary.700"}
              _hover={{ borderColor: error ? "red" : "primary.700" }}
            />
          )}
        />
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomTextarea;
