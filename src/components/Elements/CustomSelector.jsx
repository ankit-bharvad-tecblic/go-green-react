import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import Select from "react-select";

const CustomSelector = ({
  name,
  label,
  options,
  rules,
  selectedValue,
  isClearable,
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const [selectedVal, setSelectedVal] = useState(selectedValue);

  const error = errors[name];
  const selectedValue_xyz = watch(name);

  console.log("selectedValue value: " + selectedValue);

  const handleSelectChange = (selectedOption) => {
    console.log("handleSelectChange", selectedOption);
    setValue(name, selectedOption?.value || "");
    setSelectedVal(selectedOption);
  };

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Box>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              {...field}
              options={options || []}
              placeholder={label}
              isClearable={isClearable}
              //   value={selectedVal}
              value={selectedVal}
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
                  // backgroundColor: "#A6CE39",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#A6CE39" : "white",
                  color: state.isFocused ? "green" : "black",
                  "&:hover": {
                    backgroundColor: "#C2DE8C",
                    color: "black",
                  },
                }),
              }}
              formatOptionLabel={({ label, count }) => (
                <Flex w={"100%"} justifyContent="space-between">
                  <Text color={"black"}>{label}</Text>
                  {count && (
                    <Text fontSize={"0.8rem"} color="black">
                      ({count})
                    </Text>
                  )}
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

export default CustomSelector;
