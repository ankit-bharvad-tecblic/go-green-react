import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import generateFormField from "../../components/Elements/GenerateFormField";

import { useGetWarehouseTypeMasterMutation } from "../../features/master-api-slice";
import { addEditFormFields, schema } from "./fields";

function AddEditFormWareHouseTypeMaster() {
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [getWarehouseTypeMaster] = useGetWarehouseTypeMasterMutation();
  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState();

  const details = location.state?.details;
  console.log("details", details);

  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  const getWarehouseType = async () => {
    try {
      const response = await getWarehouseTypeMaster().unwrap();
      console.log("success:", response);
      let arr = response?.results.map((type) => ({
        // label: type.commodity_type,
        value: type.id,
      }));

      setAddEditFormFieldsList(
        addEditFormFields.map((field) => {
          if (field.type === "select") {
            return {
              ...field,
              options: arr,
            };
          } else {
            return field;
          }
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getWarehouseType();
    if (details?.id) {
      let obj = {
        warehouse_type_name: details.warehouse_type_name,
        description: details.description,
        active: details.active,
      };
      console.log("details", details);

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
  }, [details]);
  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {addEditFormFieldsList &&
            addEditFormFieldsList.map((item) => (
              <Box gap="10" display={{ base: "flex" }} alignItems="center">
                {" "}
                <Text textAlign="right" w="250px">
                  {item.label}
                </Text>{" "}
                {generateFormField({
                  ...item,
                  label: "",
                  // options: item.type === "select" && commodityTypeMaster,
                  selectedValue:
                    item.type === "select" &&
                    item?.options?.find(
                      (opt) =>
                        opt.label === details?.commodity_type?.commodity_type
                    ),
                  selectType: "label",
                  isChecked: details?.active,
                  isClearable: false,
                  style: { mb: 2, mt: 2 },
                })}
              </Box>
            ))}

          <Box display="flex" justifyContent="flex-end" mt="10" px="0">
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
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}

export default AddEditFormWareHouseTypeMaster;
