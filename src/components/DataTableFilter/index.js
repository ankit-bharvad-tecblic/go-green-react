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
  InputFeild: yup.string().trim().required("please fill the field"),
  radioOption: yup.string().trim().required("Please select an option"),
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

    // let filters = [];
    // for (let key in data) {
    //   if (data[key]) {
    //     filters.push(`filter=${key}&${key}=${data[key]?.trim()}`);
    //   }
    // }

    let filters = [];
    for (let key in data) {
      if (data[key]) {
        let value = data[key];
        if (typeof value === "string") {
          value = value.trim();
        }
        filters.push(`filter=${key}&${key}=${value}`);
      }
    }
    let filterString = filters.join("&");

    dispatch(setUpFilterQuery(filterString));

    console.log("filterString", filterString);
  };
  // for clear data in form
  const clearForm = () => {
    const defaultValues = methods.getValues();
    Object.keys(defaultValues).forEach((key) => {
      methods.setValue(key, "");
    });
    dispatch(setUpFilterQuery([]));
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
                generateFormField({
                  ...item,
                  selectType: "value",
                  style: { mb: 1, mx: 1, width: "90%", height: "70px" },
                  height: "20px",
                })
              )}

            <Button
              type="submit"
              w="90%"
              backgroundColor={"primary.700"}
              _hover={{ backgroundColor: "primary.700" }}
              color={"white"}
              borderRadius={"full"}
              my={"2"}
              px={"10"}
            >
              Filter
            </Button>
            <Button
              type="button"
              backgroundColor={"white"}
              borderWidth={"1px"}
              w="90%"
              borderColor={"#F82F2F"}
              _hover={""}
              color={"#F82F2F"}
              borderRadius={"full"}
              my={"1"}
              px={"10"}
              onClick={clearForm}
            >
              Clear
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
