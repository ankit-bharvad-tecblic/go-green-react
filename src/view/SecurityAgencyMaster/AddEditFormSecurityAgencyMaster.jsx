import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField from "../../components/Elements/GenerateFormField";
import { addEditFormFields, schema } from "./fields";
import { useGetSecurityAgencyMasterMutation } from "../../features/master-api-slice";

const AddEditFormSecurityAgencyMaster = () => {
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details ---> ", details);
  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  const [
    getSecurityAgencyMaster,
    { isLoading: getSecurityAgencyMasterApiIsLoading },
  ] = useGetSecurityAgencyMasterMutation();
  const getSecurityAgency = async () => {
    try {
      const response = await getSecurityAgencyMaster().unwrap();

      console.log("Success:", response);

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
    getSecurityAgency();

    if (details?.id) {
      let obj = {
        security_agency_name: details.security_agency_name,
        region__region_name: details?.region.region_name,
        state__state_name: details.state.state_name,
        district__district_name: details.district.district_name,
        area__area_name: details.area.area_name,
        address: details.address,
        pincode: details.pincode,
        contact_no: details.contact_no,
        service_cost: details.service_cost,

        remarks: details.remarks,

        active: details.active,
      };
      console.log(details);

      // setHandleSelectBoxVal

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

export default AddEditFormSecurityAgencyMaster;
