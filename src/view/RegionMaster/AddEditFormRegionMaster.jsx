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
  useAddCommodityGradeMutation,
  useAddCommodityTypeMasterMutation,
  useAddRegionMasterMutation,
  useGetCommodityTypeMasterMutation,
  useUpdateCommodityGradeMutation,
  useUpdateCommodityTypeMasterMutation,
  useUpdateRegionMasterMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

const AddEditFormRegionMaster = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [commodityTypeMaster, setCommodityTypeMaster] = useState([]);
  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details ---> ", details);

  const [updateRegionMaster, { isLoading: updateCommodityGradeLoading }] =
    useUpdateRegionMasterMutation();

  const [addRegionMaster, { isLoading: addCommodityGradeLoading }] =
    useAddRegionMasterMutation();

  const updateData = async (data) => {
    try {
      const response = await updateRegionMaster({
        ...data,
        id: details.id,
      }).unwrap();
      if (response.status === 200) {
        toasterAlert(response);
        navigate(`/location-master/region-master`);
      }
      console.log("update commodity master res", response);
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const addData = async (data) => {
    try {
      const response = await addRegionMaster(data).unwrap();
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/location-master/region-master");
      }
      console.log("update commodity master res", response);
    } catch (error) {
      console.error("Error:", error);
      x;
      toasterAlert(error);
    }
  };

  const onSubmit = (data) => {
    console.log("data==>", data);
    if (details?.id) {
      updateData(data);
    } else {
      addData(data);
    }
  };

  useEffect(() => {
    setAddEditFormFieldsList(addEditFormFields);
    if (details?.id) {
      console.log(details);
      let obj = {
        region_name: details.region_name,
        active: details.active,
      };

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
              isLoading={
                updateCommodityGradeLoading || addCommodityGradeLoading
              }
            >
              {details?.id ? " Update" : "Add"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddEditFormRegionMaster;

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