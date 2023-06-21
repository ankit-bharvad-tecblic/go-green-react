import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField from "../../components/Elements/GenerateFormField";
import { addEditFormFields, schema } from "./fields";

const AddEditFormCommodityMaster = () => {
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [handleSelectBoxVal, setHandleSelectBoxVal] = useState({
    active: {},
  });
  const details = location.state?.details;
  console.log("details ---> ", details);

  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  useEffect(() => {
    if (details?.id) {
      let obj = {
        commodity_name: details.commodity_name,
        commodity_type: details.commodity_type.commodity_type,
        maximum_bag_size: details.maximum_bag_size,
        minimum_bag_size: details.minimum_bag_size,
        rent_on_bag: details.rent_on_bag,
        active: details.active,
      };

      // setHandleSelectBoxVal

      Object.keys(obj).forEach(function (key) {
        if (key === "active") {
        } else {
          methods.setValue(key, obj[key], { shouldValidate: true });
        }
      });
    }
  }, [details]);

  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {addEditFormFields &&
            addEditFormFields.map((item) => (
              <Box gap="10" display={{ base: "flex" }} alignItems="center">
                {" "}
                <Text textAlign="right" w="250px">
                  {item.label}
                </Text>{" "}
                {generateFormField({
                  ...item,
                  label: "",
                  //   selectedValue: details?.active ? "True" : "False",
                  selectedValue:
                    item.type === "select" &&
                    item?.options?.find((opt) => {
                      console.log("opt ", opt.value === details?.active);
                      return opt.value === details?.active ? "True" : "False";
                    }),
                  isClearable: false,
                  style: { mb: 4, mt: 3 },
                })}
              </Box>
            ))}

          <Button
            type="submit"
            //w="full"
            backgroundColor={"primary.700"}
            _hover={{ backgroundColor: "primary.700" }}
            color={"white"}
            borderRadius={"full"}
            my={"4"}
            px={"10"}
          >
            Update
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddEditFormCommodityMaster;
