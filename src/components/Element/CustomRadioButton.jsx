import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CustomRadioButton = ({ name, labels, rules, color, Heading }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <FormControl isInvalid={!!error}>
      <Box>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Heading>{Heading}</Heading>
              <Stack direction="row">
                {/* {labels.map((label) => ( */}
                <Radio key={name} value={name} colorScheme={color}>
                  {name}
                </Radio>
              </Stack>
            </RadioGroup>
          )}
          rules={rules}
        />
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomRadioButton;
