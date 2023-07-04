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
  useAddZoneMasterMutation,
  useUpdateZoneMasterMutation,
  useGetStateMasterMutation,
  useAddStateMasterMutation,
  useUpdateStateMasterMutation,
  useGetRegionMasterMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { motion } from "framer-motion";
import { MotionScaleIn, MotionSlideUp, slideUp } from "../../utils/animation";

const AddEditFormStateMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

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
  const [getRegionMaster] = useGetRegionMasterMutation();
  const [getStateMaster, { isLoading: getStateMasterApiIsLoading }] =
    useGetStateMasterMutation();

  const [addStateMaster, { isLoading: addStateMasterApiIsLoading }] =
    useAddStateMasterMutation();

  const [updateStateMaster, { isLoading: updateStateMasterApiIsLoading }] =
    useUpdateStateMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addStateMaster(data).unwrap();
      console.log("add state master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-location/state-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const getAllRegionMaster = async () => {
    try {
      const response = await getRegionMaster().unwrap();
      console.log("response ", response);
      let arr = response?.results.map((item) => ({
        label: item.region_name,
        value: item.id,
      }));

      console.log(arr);

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
      const response = await updateStateMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update state master res", response);
        toasterAlert(response);
        navigate("/manage-location/state-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    if (details?.id) {
      console.log(details);
      let obj = {
        state_name: details.state_name,
        region: details.region.region_name,
        state_code: details.state_code,
        tin_no: details.tin_no,
        gstn: details.gstn,
        nav_code: details.nav_code,
        ho_overhead: details.ho_overhead,
        state_overhead: details.state_overhead,
        state_india_office_addr: details.state_india_office_addr,
        is_active: details.is_active,
      };

      console.log(obj);

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
  }, [details]);

  useEffect(() => {
    setAddEditFormFieldsList(addEditFormFields);
  }, []);
  useEffect(() => {
    getAllRegionMaster();
  }, []);

  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box maxHeight="370px" overflowY="auto">
            <Box w={{ base: "100%", md: "80%", lg: "90%", xl: "60%" }}>
              {addEditFormFieldsList &&
                addEditFormFieldsList.map((item, i) => (
                  <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
                    <Box
                      w="full"
                      gap="4"
                      display={{ base: "flex" }}
                      alignItems="center"
                    >
                      {" "}
                      <Text textAlign="right" w="550px">
                        {item.label}
                      </Text>{" "}
                      {generateFormField({
                        ...item,
                        label: "",
                        isChecked: details?.is_active,
                        style: {
                          mb: 1,
                          mt: 1,
                        },

                        selectedValue:
                          item.type === "select" &&
                          item?.options?.find((opt) => {
                            console.log("opt", opt);
                            console.log("details", details);
                            return opt.label === details?.region.region_name;
                          }),
                        selectType: "value",
                        isClearable: false,
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
                backgroundColor={"primary.700"}
                _hover={{ backgroundColor: "primary.700" }}
                color={"white"}
                borderRadius={"full"}
                isLoading={
                  addStateMasterApiIsLoading || updateStateMasterApiIsLoading
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

export default AddEditFormStateMaster;

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
