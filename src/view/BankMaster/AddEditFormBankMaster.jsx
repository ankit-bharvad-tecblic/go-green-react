import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import generateFormField from "../../components/Elements/GenerateFormField";
import { useGetBankMasterMutation } from "../../features/master-api-slice";
import { addEditFormFields, schema } from "./fields";

function AddEditFormBankMaster() {
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  }); 

  const [getBankMaster] = useGetBankMasterMutation();
  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details ---> ", details);

  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  const getBank = async () => {
    try {
      const response = await getBankMaster().unwrap();

      console.log("Success:", response);

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
    getBank();
    if (details?.id) {
      let obj = {
        bank_name: details.bank_name,
        region__region_name: details?.region?.region_name,
        state__state_name: details?.state?.state_name,
        bank_address: details.bank_address,
        active: details.active,
      };
      console.log("details", details);
      console.log("obj", obj);

      Object.keys(obj).forEach(function (key) {
        console.log("key value test : " + key + " : " + obj[key]);
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
                  isChecked: details?.active,
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

export default AddEditFormBankMaster;
