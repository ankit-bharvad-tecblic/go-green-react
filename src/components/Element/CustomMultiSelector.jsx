import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import Select from "react-select";
import * as yup from "yup";

const CustomMultiSelector = ({ name, label, options, rules }) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const error = errors[name];
  const selectedValue = watch(name) || [];

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setValue(name, selectedValues);
  };

  return (
    <FormControl isInvalid={!!error}>
      <Box>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              placeholder={label}
              isMulti
              isClearable
              value={options.filter((option) =>
                selectedValue.includes(option.value)
              )}
              onChange={handleSelectChange}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#F0F0F0",
                  borderColor: error ? "red" : "#A6CE39",
                  "&:hover": {
                    borderColor: error ? "red" : "#A6CE39",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#A6CE39",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#A6CE39" : "white",
                  color: state.isFocused ? "green" : "black",
                  "&:hover": {
                    backgroundColor: "#A6CE39",
                    color: "green",
                  },
                  display: "flex",
                  justifyContent: "space-between",
                  paddingRight: "10px",
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "skyblue",
                  borderRadius: "10px",
                  alignItems: "center",
                  display: "flex",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "skyblue",
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "black",
                  "&:hover": {
                    backgroundColor: "skyblue",
                    color: "green",
                  },
                }),
              }}
              formatOptionLabel={({ label, count }) => (
                <Flex w={"100%"} justifyContent="space-between">
                  <Text color={"black"}>{label}</Text>
                  <Text fontSize={"0.8rem"} color="black">
                    ({count})
                  </Text>{" "}
                </Flex>
              )}
            />
          )}
          rules={rules}
        />
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};
export default CustomMultiSelector;
