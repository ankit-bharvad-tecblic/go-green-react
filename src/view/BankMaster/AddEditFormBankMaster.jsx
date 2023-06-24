import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import generateFormField from "../../components/Elements/GenerateFormField";
import {
  useAddBankMasterMutation,
  useGetBankMasterMutation,
  useUpdateBankMasterMutation,
} from "../../features/master-api-slice";
import { addEditFormFields, schema } from "./fields";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

function AddEditFormBankMaster() {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [getBankMaster] = useGetBankMasterMutation();
  const [addBankMaster, { isLoading: addBankMasterApiIsLoading }] =
    useAddBankMasterMutation();
  const [updateBankMaster, { isLoading: updateBankMasterApiIsLoading }] =
    useUpdateBankMasterMutation();


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

  const addData = async (data) => {
    try {
      const response = await addBankMaster(data).unwrap();
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

  const updateData = async (data) => {
    try {
      const response = await updateBankMaster(data).unwrap();
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
                    style: { mb: 2, mt: 2 },
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
                addBankMasterApiIsLoading || updateBankMasterApiIsLoading
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

export default AddEditFormBankMaster;

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
