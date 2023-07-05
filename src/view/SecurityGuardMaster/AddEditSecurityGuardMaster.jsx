import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import {
  useAddSecurityGuardMasterMutation,
  useGetSecurityGuardMasterMutation,
  useUpdateSecurityGuardMasterMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { MotionSlideUp } from "../../utils/animation";

const AddEditSecurityGuardMaster = () => {
  const navigate = useNavigate();
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
    if (details?.id) {
      updateData({ ...data, id: details.id });
    } else {
      addData(data);
    }
  };
  // for clear data in form
  const clearForm = () => {
    const defaultValues = methods.getValues();
    Object.keys(defaultValues).forEach((key) => {
      methods.setValue(key, "");
    });
  };

  const [getSecurityGuardMaster] = useGetSecurityGuardMasterMutation();
  const [
    addSecurityGuardMaster,
    { isLoading: addSecurityGuardMasterApiIsLoading },
  ] = useAddSecurityGuardMasterMutation();

  const [
    updateSecurityGuardMaster,
    { isLoading: updateSecurityGuardMasterApiIsLoading },
  ] = useUpdateSecurityGuardMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addSecurityGuardMaster(data).unwrap();
      console.log("add security guard res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/security-guard-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

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
  const updateData = async (data) => {
    try {
      const response = await updateSecurityGuardMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update security guard master res", response);
        toasterAlert(response);
        navigate("/security-guard-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
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
    <Box
      bg="white"
      borderRadius={10}
      p="10"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box maxHeight="280px" overflowY="auto">
            <Box w={{ base: "100%", md: "80%", lg: "90%", xl: "60%" }}>
              {addEditFormFieldsList &&
                addEditFormFieldsList.map((item, i) => (
                  <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
                    <Box gap="4" display={{ base: "flex" }} alignItems="center">
                      {" "}
                      <Text textAlign="right" w="550px">
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
                              opt.label ===
                              details?.commodity_type?.commodity_type
                          ),
                        selectType: "label",
                        isChecked: details?.active,
                        isClearable: false,
                        style: { mb: 1, mt: 1 },
                      })}
                    </Box>
                  </MotionSlideUp>
                ))}
            </Box>
            <Box
              display="flex"
              gap={2}
              justifyContent="flex-end"
              mt="10"
              px="0"
            >
              <Button
                type="button"
                backgroundColor={"white"}
                borderWidth={"1px"}
                borderColor={"#F82F2F"}
                _hover={{ backgroundColor: "" }}
                color={"#F82F2F"}
                borderRadius={"full"}
                my={"4"}
                px={"10"}
                onClick={clearForm}
              >
                Clear
              </Button>
              <Button
                type="submit"
                //w="full"
                backgroundColor={"primary.700"}
                _hover={{ backgroundColor: "primary.700" }}
                color={"white"}
                borderRadius={"full"}
                isLoading={
                  addSecurityGuardMasterApiIsLoading ||
                  updateSecurityGuardMasterApiIsLoading
                }
                my={"4"}
                px={"10"}
              >
                {details?.id ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddEditSecurityGuardMaster;

const toasterAlert = (obj) => {
  let msg = obj?.message;
  let status = obj?.status;
  if (status === 400) {
    const errorData = obj.data;
    let errorMessage = "";

    Object.keys(errorData).forEach((key) => {
      const messages = errorData[key];
      messages.forEach((message) => {
        errorMessage += `${key} : ${message} \n`;
      });
    });
    showToastByStatusCode(status, errorMessage);
    return false;
  }
  showToastByStatusCode(status, msg);
};
