import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, Checkbox, FormControl, FormErrorMessage } from "@chakra-ui/react";
import * as yup from "yup";

const Customcheckbox = ({ name, label, color, size }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors, "error");

  const error = errors[name];

  return (
    <FormControl isInvalid={!!error}>
      <Box>
        <Controller
          control={control}
          name={name}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox {...field} size={size} colorScheme={color}>
              {label}
            </Checkbox>
          )}
        />
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default Customcheckbox;
