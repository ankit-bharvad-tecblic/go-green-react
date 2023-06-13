import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, FormControl, FormErrorMessage } from "@chakra-ui/react";
import Select from "react-select";
import * as yup from "yup";

const CustomSelector = ({ name, label, options, rules }) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const error = errors[name];
  const selectedValue = watch(name);

  const handleSelectChange = (selectedOption) => {
    setValue(name, selectedOption?.value || "");
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
              isClearable
              value={options.find((option) => option.value === selectedValue)}
              onChange={handleSelectChange}
              styles={{
                control: (base, state) => ({
                  ...base,
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
                }),
              }}
            />
          )}
          rules={rules}
        />
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomSelector;
