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
  useAddCommodityVarietyMutation,
  useGetCommodityMasterMutation,
  useGetCommodityTypeMasterMutation,
  useGetCommodityVarietyMutation,
  useUpdateCommodityVarietyMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { MotionSlideUp } from "../../utils/animation";

const AddEditFormCommodityVariety = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const [
    getCommodityMaster,
    { isLoading: getCommodityTypeMasterApiIsLoading },
  ] = useGetCommodityMasterMutation();
  const [getCommodityVariety, { isLoading: getCommodityVarietyApiIsLoading }] =
    useGetCommodityVarietyMutation();

  const [addCommodityVariety, { isLoading: addCommodityVarietyApiIsLoading }] =
    useAddCommodityVarietyMutation();

  const [
    updateCommodityVariety,
    { isLoading: updateCommodityVarietyMasterApiIsLoading },
  ] = useUpdateCommodityVarietyMutation();
  const addData = async (data) => {
    try {
      const response = await addCommodityVariety(data).unwrap();
      console.log("add commodity variety res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/commodity-master/commodity-variety");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const getCommodityType = async () => {
    try {
      const response = await getCommodityMaster().unwrap();

      console.log("Success:", response);
      // setCommodityTypeMaster();
      let arr = response?.results.map((item) => ({
        label: item.commodity_name,
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
      const response = await updateCommodityVariety(data).unwrap();
      if (response.status === 200) {
        console.log("update commodity variety res", response);
        toasterAlert(response);
        navigate("/commodity-master/commodity-variety");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    getCommodityType();
    if (details?.id) {
      console.log(details);
      let obj = {
        commodity_variety: details.commodity_variety,
        description: details.description,
        hsn_code: details.hsn_code,
        commodity_id: details.commodity_id.id,
        fumigation_required: details.fumigation_required,
        fumigation_day: details.fumigation_day,
        lab_testing_required: details.lab_testing_required,
        fed: details.fed,
        is_block: details.is_block,
        is_active: details.is_active,
      };
      console.log(obj);
      // setHandleSelectBoxVal

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
                            return opt.value === details?.commodity_id.id;
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
                //w="full"
                backgroundColor={"primary.700"}
                _hover={{ backgroundColor: "primary.700" }}
                color={"white"}
                borderRadius={"full"}
                isLoading={
                  addCommodityVarietyApiIsLoading ||
                  updateCommodityVarietyMasterApiIsLoading
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

export default AddEditFormCommodityVariety;

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
