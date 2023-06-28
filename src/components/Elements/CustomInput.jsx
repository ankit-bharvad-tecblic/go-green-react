import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

function CustomInput({ name, placeholder, type, label, style }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log("errors", errors);
  const error = errors[name];

  return (
    <FormControl {...style} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Box>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              {...field}
              type={type}
              // width={{ base: "90%" }}
              border="1px"
              borderColor="gray.10"
              backgroundColor={"white"}
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
              p={{ base: "4" }}
              fontWeight={{ base: "normal" }}
              fontStyle={"normal"}
              placeholder={placeholder}
            />
          )}
        />
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}

export default CustomInput;
