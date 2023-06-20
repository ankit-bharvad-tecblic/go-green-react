import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUpFilterFields,
  setUpFilterQuery,
} from "../../features/filter.slice";

import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField from "../Elements/GenerateFormField";

const schema = yup.object().shape({
  InputFeild: yup.string().required("please fill the field"),
  radioOption: yup.string().required("Please select an option"),
});

const Index = () => {
  const dispatch = useDispatch();
  const { fields } = useSelector(
    (state) => state.dataTableFiltersReducer.filtersFields
  );
  const methods = useForm({
    // resolver: yupResolver(schema),
  });
  console.log("filterFields", fields);
  const closeFilter = () => {
    dispatch(setUpFilterFields({ isShow: false }));
    // dispatch(setUpFilterQuery(""));
    let filters = [];

    let filterString = filters.join("&");

    dispatch(setUpFilterQuery(filterString));
  };

  const onSubmit = (data) => {
    console.log("data==>", data);

    let filters = [];
    for (let key in data) {
      if (data[key]) {
        filters.push(`filter=${key}&${key}=${data[key]}`);
      }
    }
    let filterString = filters.join("&");

    dispatch(setUpFilterQuery(filterString));

    console.log("filterString", filterString);
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems={"center"} py="2">
        <Text fontWeight={"bold"}>Filters</Text>
        <Box>
          <Button onClick={() => closeFilter()} p="1">
            <CloseIcon rotate={120} boxSize={3} />
          </Button>
        </Box>
      </Flex>

      <Box py="4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {fields &&
              fields.map((item) =>
                generateFormField({ ...item, style: { mb: 4 } })
              )}

            <Button
              type="submit"
              w="full"
              backgroundColor={"primary.700"}
              _hover={{ backgroundColor: "primary.700" }}
              color={"white"}
              borderRadius={"full"}
              my={"4"}
              px={"10"}
            >
              Filter
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Index;

// =================== ELEMENTS ======================

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
