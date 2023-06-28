import React, { useRef } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";

function CustomFileInput({ name, placeholder, type, label, style }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

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
            <Box>
              <Flex
                onClick={handleButtonClick}
                backgroundColor={"gray.200"}
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
                cursor={"pointer"}
                justifyContent="space-between"
              >
                <Text> {placeholder} </Text>
                <AiOutlineCloudUpload flex="none" fontSize={"20px"} />
              </Flex>
              <Input
                {...field}
                type="file"
                ref={fileInputRef}
                display={"none"}
                accept={type}
                // width={{ base: "90%" }}
              />
            </Box>
          )}
        />
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}

export default CustomFileInput;
