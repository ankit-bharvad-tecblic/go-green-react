import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import generateFormField from "../../components/Elements/GenerateFormField";
import {} from "../../features/master-api-slice";
import { addEditFormFields, schema } from "./fields";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

function AddEditFormDepartmentMaster() {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [addDepartmentMaster, { isLoading: addDepartmentMasterApiIsLoading }] =
    useAddDepartmentMasterMutation();
  const [
    updateDepartmentMaster,
    { isLoading: updateDepartmentMasterApiIsLoading },
  ] = useUpdateBankMasterMutation();

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

  const addData = async (data) => {
    try {
      const response = await addDepartmentMaster(data).unwrap();
      console.log("add bank master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/bank-master/bank-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const updateData = async (data) => {
    try {
      const response = await updateDepartmentMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update bank master res", response);
        toasterAlert(response);
        navigate("/bank-master/bank-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    if (details?.id) {
      let obj = {
        bank_name: details?.bank_name,
        region: details?.region.region_name,
        state: details?.state.state_name,
        bank_address: details?.bank_address,
        active: details.active,
      };
      console.log("details", details);
      console.log("obj", obj);

      Object.keys(obj).forEach(function (key) {
        console.log("key value test : " + key + " : " + obj[key]);
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
    getAllStateMaster();
    getRegionMasterList();
    // getBank();
  }, [details]);
  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box w={{ base: "100%", md: "80%", lg: "90%", xl: "60%" }}>
            {addEditFormFieldsList &&
              addEditFormFieldsList.map((item, i) => (
                <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
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
                      style: { mb: 1, mt: 1 },
                    })}
                  </Box>
                </MotionSlideUp>
              ))}
          </Box>

          <Box display="flex" gap={2} justifyContent="flex-end" mt="10" px="0">
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
                addDepartmentMasterApiIsLoading ||
                updateDepartmentMasterApiIsLoading
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
}
export default AddEditFormDepartmentMaster;
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
