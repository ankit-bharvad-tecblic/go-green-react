import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch,
} from "@chakra-ui/react";

const CustomSwitch = ({ name, label, isChecked }) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [selectedVal, setSelectedVal] = useState(isChecked);

  const error = errors[name];

  console.log("isChecked value: " + isChecked);

  const handleActiveDeActive = (e) => {
    setValue(name, e.target.checked || "");
    setSelectedVal(e.target.checked);
  };

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Box>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Switch
              {...field}
              size="md"
              colorScheme="whatsapp"
              onChange={(e) => handleActiveDeActive(e)}
              isChecked={selectedVal}

              // id="active_row"
              // isReadOnly
              // isChecked={flexRender(
              //   cell.column.columnDef.cell,
              //   cell.getContext()
              // )}
            />
          )}
          // rules={rules}
        />
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomSwitch;

// <Select
// {...field}
// options={options || []}
// placeholder={label}
// isClearable={isClearable}
// //   value={selectedVal}
// value={selectedVal}
// onChange={handleSelectChange}
// styles={{
//   control: (base, state) => ({
//     ...base,
//     backgroundColor: "#F0F0F0",
//     borderColor: error ? "red" : "#A6CE39",
//     "&:hover": {
//       borderColor: error ? "red" : "#A6CE39",
//     },
//   }),
//   menu: (base) => ({
//     ...base,
//     // backgroundColor: "#A6CE39",
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isFocused ? "#A6CE39" : "white",
//     color: state.isFocused ? "green" : "black",
//     "&:hover": {
//       backgroundColor: "#C2DE8C",
//       color: "black",
//     },
//   }),
// }}
// formatOptionLabel={({ label, count }) => (
//   <Flex w={"100%"} justifyContent="space-between">
//     <Text color={"black"}>{label}</Text>
//     {count && (
//       <Text fontSize={"0.8rem"} color="black">
//         ({count})
//       </Text>
//     )}
//   </Flex>
// )}
// />
