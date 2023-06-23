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
import { useGetSecurityGuardMasterMutation } from "../../features/master-api-slice";

const AddEditSecurityGuardMaster = () => {
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [commodityTypeMaster, setCommodityTypeMaster] = useState([]);
  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details ---> ", details);

  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  const [getSecurityGuardMaster] = useGetSecurityGuardMasterMutation();

  const getSecurityGuard = async () => {
    try {
      // let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;

      const response = await getSecurityGuardMaster().unwrap();

      console.log("Success:", response);
      // setCommodityTypeMaster();
      let arr = response?.results.map((type) => ({
        label: type.commodity_type,
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
    getSecurityGuard();
    if (details?.id) {
      let obj = {
        security_guard_name: details.security_guard_name,
        region__region_name: details.region.region_name,
        state__state_name: details.state.state_name,
        district__district_name: details.district.district_name,
        address_of_security_guard: details.address_of_security_guard,
        dob_of_security_guard: details.dob_of_security_guard,
        contact_number: details.contact_number,
        alternate_contact_number: details.alternate_contact_number,
        experience_as_security_guard: details.experience_as_security_guard,

        active: details.active,
      };

      // setHandleSelectBoxVal

      console.log(obj);

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
};

export default AddEditSecurityGuardMaster;
