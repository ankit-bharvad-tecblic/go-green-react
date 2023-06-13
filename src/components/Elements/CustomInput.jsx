import { Box, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function CustomInput({ name, placeholder, type }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log("errors", errors);
  const error = errors[name];

  return (
    <FormControl isInvalid={!!error}>
      <Box>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              {...field}
              type={type}
              width={{ base: "90%" }}
              backgroundColor={"gray.200"}
              borderRadius={"2xl"}
              _active={{
                backgroundColor: "primary.200",
                borderColor: "primary.700",
              }}
              _placeholder={{ color: "gray.300" }}
              _hover={{
                borderColor: "primary.700",
                backgroundColor: "primary.200",
              }}
              _focus={{
                borderColor: "primary.700",
                backgroundColor: "primary.200",
              }}
              p={{ base: "6" }}
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
