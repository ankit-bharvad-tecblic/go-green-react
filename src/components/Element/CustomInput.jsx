import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import * as yup from "yup";

const CustomInput = ({ name, label, color, size }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors, "error");

  const error = errors[name];
  return (
    <>
      <FormControl isInvalid={!!error}>
        <Box>
          <Controller
            control={control}
            name={name}
            defaultValue={false}
            render={({ field }) => (
              <Input
                {...field}
                label={label}
                size={size}
                colorScheme={color}
                _focus={{ boxShadow: "none", borderColor: "primary.700" }}
              />
            )}
          />
        </Box>
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default CustomInput;
