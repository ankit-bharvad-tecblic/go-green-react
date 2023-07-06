import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField from "../../components/Elements/GenerateFormField";
import { addEditFormFields, schema } from "./fields";
import {
  useAddInsuranceCompanyMasterMutation,
  useGetInsuranceCompanyMasterMutation,
  useUpdateInsuranceCompanyMasterMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { motion } from "framer-motion";
import { MotionScaleIn, MotionSlideUp, slideUp } from "../../utils/animation";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";

const AddEditFormInsuranceCompanyMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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

  const [
    getInsuranceCompanyMaster,
    { isLoading: getInsuranceCompanyMasterApiIsLoading },
  ] = useGetInsuranceCompanyMasterMutation();

  const [
    addInsuranceCompanyMaster,
    { isLoading: addInsuranceCompanyMasterApiIsLoading },
  ] = useAddInsuranceCompanyMasterMutation();

  const [
    updateInsuranceCompanyMaster,
    { isLoading: updateInsuranceCompanyMasterApiIsLoading },
  ] = useUpdateInsuranceCompanyMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addInsuranceCompanyMaster(data).unwrap();
      console.log("add insurance master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-insurance/insurance-company-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const getInsuranceCompany = async () => {
    try {
      const response = await getInsuranceCompanyMaster().unwrap();

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

  const updateData = async (data) => {
    try {
      const response = await updateInsuranceCompanyMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update insurance master res", response);
        toasterAlert(response);
        navigate("/manage-insurance/insurance-company-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    getInsuranceCompany();
    if (details?.id) {
      let obj = {
        insurance_company_name: details.insurance_company_name,
        insurance_company_address: details.insurance_company_address,

        is_active: details.is_active,
      };

      // setHandleSelectBoxVal

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
    const breadcrumbArray = [
      {
        title: "Manage Insurance",
        link: "/manage-insurance/insurance-company-master",
      },
      {
        title: " Insurance Company Master",
        link: "/manage-insurance/insurance-company-master",
      },
      {
        title: details?.id ? "Edit" : "Add",
      },
    ];
    dispatch(setBreadCrumb(breadcrumbArray));
  }, [details]);

  useEffect(() => {
    return () => {
      dispatch(setBreadCrumb([]));
    };
  }, []);

  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box maxHeight="calc( 100vh - 260px )" overflowY="auto">
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
                        isChecked: details?.is_active,
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
                  addInsuranceCompanyMasterApiIsLoading ||
                  updateInsuranceCompanyMasterApiIsLoading
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

export default AddEditFormInsuranceCompanyMaster;

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
