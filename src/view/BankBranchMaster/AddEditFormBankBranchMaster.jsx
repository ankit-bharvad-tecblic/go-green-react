import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import generateFormField from "../../components/Elements/GenerateFormField";
import {
  useAddBankBranchMasterMutation,
  useGetBankBranchMasterMutation,
  useUpdateBankBranchMasterMutation,
} from "../../features/master-api-slice";
import { addEditFormFields, schema } from "./fields";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

function AddEditFormBankBranchMaster() {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details-->", details);

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

  const [getBankBranchMaster] = useGetBankBranchMasterMutation();
  const [addBankBranchMaster, { isLoading: addBankBranchMasterApiIsLoading }] =
    useAddBankBranchMasterMutation();
  const [
    updateBankBranchMaster,
    { isLoading: updateBankBranchMasterApiIsLoading },
  ] = useUpdateBankBranchMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addBankBranchMaster(data).unwrap();
      console.log("add bank branch master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/bank-master/bank-branch-master");
      }
    } catch (error) {
      console.log("Error: " + error);
      toasterAlert(error);
    }
  };

  const getBankBranch = async () => {
    try {
      const response = await getBankBranchMaster().unwrap();
      console.log("response==>", response);
      let arr = response?.results.map((type) => ({
        label: type.branch_name,
        value: type.id,
      }));

      setAddEditFormFieldsList(
        addEditFormFields.map((field) => {
          if (field.type === "select") {
            return {
              ...field,
              option: arr,
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

  const getAllStateMaster = async () => {
    try {
      const response = await getStateMaster().unwrap();
      console.log("response ", response);
      let arr = response?.results.map((item) => ({
        label: item.state_name,
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
      const response = await updateBankBranchMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update bank branch master res", response);
        toasterAlert(response);
        navigate("/bank-master/bank-branch-master");
      }
    } catch (error) {
      console.log("Error:", error);
      toasterAlert(error);
    }
  };
  useEffect(() => {
    getAllStateMaster();
    getBankBranch();
    if (details?.id) {
      let obj = {
        branch_name: details.branch_name,
        bank: details.bank,
        region: details.region,
        state: details.state,
        branch_address: details.branch_address,
        district: details.district,
        pincode: details.pincode,
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
            addEditFormFieldsList.map((item, i) => (
              <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
                <Box gap="10" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="250px">
                    {item.label}
                  </Text>
                  {generateFormField({
                    ...item,
                    label: "",
                    // options: item.type === "select" && commodityTypeMaster,
                    isChecked: details?.active,
                    style: { mb: 2, mt: 2 },
                  })}
                </Box>
              </MotionSlideUp>
            ))}

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
                addBankBranchMasterApiIsLoading ||
                updateBankBranchMasterApiIsLoading
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

export default AddEditFormBankBranchMaster;

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
