import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddBankCMLocationMasterMutation,
  useGetBankCMLocationMasterMutation,
  useUpdateBankCMLocationMasterMutation,
} from "../../features/master-api-slice";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { addEditFormFields, schema } from "./fields";

const AddEditBankCmLocationMaster = () => {
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

  const [getBankCMLocationMaster] = useGetBankCMLocationMasterMutation();

  const [
    addBankCMLocationMaster,
    { isLoading: addBankCMLocationMasterrApiIsLoading },
  ] = useAddBankCMLocationMasterMutation();

  const [
    updateBankCMLocationMaster,
    { isLoading: updateBankCMLocationMasterApiIsLoading },
  ] = useUpdateBankCMLocationMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addBankCMLocationMaster(data).unwrap();
      console.log("add EarthQuack master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/bank-master/bank-cm-location-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };
  const getBankCMLocation = async () => {
    try {
      // let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;

      const response = await getBankCMLocationMaster().unwrap();

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
      const response = await updateBankCMLocationMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update earthQuack master res", response);
        toasterAlert(response);
        navigate("/bank-master/bank-cm-location-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    getBankCMLocation();
    if (details?.id) {
      let obj = {
        branch_name: details.branch_name,
        Branch_Cm_Location_Name: details.Branch_Cm_Location_Name,
        CM_Charges: details.CM_Charges,
        Fix_Charges: details.Fix_Charges,
        Minimum_Commitment: details.Minimum_Commitment,
        is_active: details.is_active,
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
          <Box w={{ base: "100%", md: "80%", lg: "90%", xl: "60%" }}>
            {addEditFormFieldsList &&
              addEditFormFieldsList.map((item, i) => (
                <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
                  <Box gap="10" display={{ base: "flex" }} alignItems="center">
                    {" "}
                    <Text textAlign="right" w="200px">
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
                      isChecked: details?.is_active,
                      isClearable: false,
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
                addBankCMLocationMasterrApiIsLoading ||
                updateBankCMLocationMasterApiIsLoading
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

export default AddEditBankCmLocationMaster;
