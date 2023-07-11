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
import { usePostFileUploadMutation } from "../../features/master-api-slice";

function CustomFileInput({
  name,
  placeholder,
  type,
  label,
  style,
  onChange,
  value,
}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (!addBankMasterApiIsLoading) {
      fileInputRef.current.click();
    }
  };

  const [fileUploadHandle, { isLoading: addBankMasterApiIsLoading }] =
    usePostFileUploadMutation();

  const handleFileUpload = async (e) => {
    if (e?.target?.files[0]) {
      const formData = new FormData();
      formData.append("vaibhav_file_path", e.target.files[0]);

      const response = await fileUploadHandle(formData).unwrap();

      console.log(response, "file");
      if (response?.status === 200) {
        onChange(
          response?.data?.vaibhav_file_path || ""
        );
      }
    }
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
                border={"2px solid"}
                borderColor={error?"red":"gray.200"}
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
                p={{ base: "2" }}
                fontWeight={{ base: "normal" }}
                fontStyle={"normal"}
                cursor={"pointer"}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>
                  {" "}
                  {addBankMasterApiIsLoading
                    ? "Loading ..."
                    : value
                    ? value.split("/media/docs/")[1]
                    : placeholder
                    ? placeholder
                    : "File Upload"}{" "}
                </Text>
                <Box flex="none">
                <AiOutlineCloudUpload flex="none" fontSize={"20px"} />
                </Box>
              </Flex>
              <Input
                // {...field}
                type="file"
                ref={fileInputRef}
                height={"15px"}
                display={"none"}
                accept={type}
                onChange={handleFileUpload}
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
