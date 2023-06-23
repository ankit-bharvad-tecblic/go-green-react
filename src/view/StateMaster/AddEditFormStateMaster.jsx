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

  const [getStateMaster, { isLoading: getStateMasterApiIsLoading }] =
    useGetStateMasterMutation();

  const [addZoneMaster, { isLoading: addZoneMasterApiIsLoading }] =
    useAddZoneMasterMutation();

  const [updateZoneMaster, { isLoading: updateZoneMasterApiIsLoading }] =
    useUpdateZoneMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addZoneMaster(data).unwrap();
      console.log("add commodity master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/location-master/zone-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const updateData = async (data) => {
    try {
      const response = await updateZoneMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update commodity master res", response);
        toasterAlert(response);
        navigate("/location-master/zone-master");
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
        state_code: details.state_code,
        tin_no: details.tin_no,
        gstn: details.gstn,
        nav_code: details.nav_code,
        state_india_office_addr: details.state_india_office_addr,
        active: details.active,
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

  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {addEditFormFieldsList &&
            addEditFormFieldsList.map((item, i) => (
              <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
                <Box
                  w="full"
                  gap="10"
                  display={{ base: "flex" }}
                  alignItems="center"
                >
                  {" "}
                  <Text textAlign="right" w="210px">
                    {item.label}
                  </Text>{" "}
                  {generateFormField({
                    ...item,
                    label: "",
                    isChecked: details?.active,
                    style: {
                      mb: 2,
                      mt: 2,
                      w: 300,
                    },

                    selectedValue:
                      item.type === "select" &&
                      item?.options?.find(
                        (opt) => opt.label === details?.state.state_name
                      ),
                    selectType: "value",
                    isClearable: false,
                  })}
                </Box>
              </MotionSlideUp>
            ))}

          <Box display="flex" justifyContent="flex-end" mt="10" px="0">
            <Button
              type="submit"
              //w="full"
              backgroundColor={"primary.700"}
              _hover={{ backgroundColor: "primary.700" }}
              color={"white"}
              borderRadius={"full"}
              isLoading={
                addZoneMasterApiIsLoading || updateZoneMasterApiIsLoading
              }
              my={"4"}
              px={"10"}
            >
              {details?.id ? "Update" : "Add"}
            </Button>
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