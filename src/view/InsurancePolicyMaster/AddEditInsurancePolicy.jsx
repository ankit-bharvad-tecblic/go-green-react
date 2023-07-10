import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addEditFormFields, schema } from "./fields";
import {
  useAddInsurancePolicyMasterMutation,
  useGetInsuranceCompanyMasterMutation,
  useGetInsurancePolicyMasterMutation,
  useUpdateInsurancePolicyMasterMutation,
} from "../../features/master-api-slice";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import { Box, Button, Text } from "@chakra-ui/react";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import generateFormField from "../../components/Elements/GenerateFormField";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import CustomSelector from "../../components/Elements/CustomSelector";
import CustomInput from "../../components/Elements/CustomInput";
import CustomFileInput from "../../components/Elements/CustomFileInput";

const AddEditInsurancePolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    states: [],
    companys: [],
    insuranceType: [
      {
        label: "Fire",
        value: "public",
      },
      {
        label: "Burglary",
        value: "private",
      },
    ],
  });
  const [getInsuranceCompanyMaster] = useGetInsuranceCompanyMasterMutation();
  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);
  const { setValue, getValues } = methods;
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
    getInsurancePolicyMaster,
    { isLoading: getInsurancePolicyMasterApiIsLoading },
  ] = useGetInsurancePolicyMasterMutation();

  const [
    addInsurancePolicyMaster,
    { isLoading: addInsurancePolicyMasterApiIsLoading },
  ] = useAddInsurancePolicyMasterMutation();

  const [
    updateInsurancePolicyMaster,
    { isLoading: updateInsurancePolicyMasterApiIsLoading },
  ] = useUpdateInsurancePolicyMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addInsurancePolicyMaster(data).unwrap();
      console.log("add insurance policy master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-insurance/insurance-policy-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const getInsurancePolicy = async () => {
    try {
      const response = await getInsurancePolicyMaster().unwrap();

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

  const getInsuranceList = async () => {
    try {
      const response = await getInsuranceCompanyMaster().unwrap();
      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.insurance_company_name,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        companys: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateData = async (data) => {
    try {
      const response = await updateInsurancePolicyMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update insurance policy master res", response);
        toasterAlert(response);
        navigate("/manage-insurance/insurance-policy-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    getInsurancePolicy();
    getInsuranceList();
    if (details?.id) {
      let obj = {
        insurance_company_name: details?.insurance_company_name,
        insurance_policy_number: details?.insurance_policy_number,
        policy_start_date: details?.policy_start_date,
        policy_end_date: details?.policy_end_date,
        insuranceType: details?.insuranceType,
        insurance_policy_amount: details?.insurance_policy_amount,
        is_active: details?.is_active,
      };

      // setHandleSelectBoxVal

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
    const breadcrumbArray = [
      {
        title: "Manage Insurance",
        link: "/manage-insurance/insurance-policy-master",
      },
      {
        title: " Insurance Policy Master",
        link: "/manage-insurance/insurance-policy-master",
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
              {/* This code for the insurance company code */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Insurance Company
                    </Text>
                    <CustomSelector
                      name="insurance_company_name"
                      label=""
                      options={selectBoxOptions.companys}
                      selectedValue={selectBoxOptions.companys.find(
                        (opt) => opt.label === details?.insurance_company_name
                      )}
                      isClearable={false}
                      selectType={"value"}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>

              {/* This is code for the insurance policy number */}

              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Insurance Policy Number
                    </Text>
                    <CustomInput
                      name="insurance_policy_number"
                      placeholder=" Insurance Policy Number"
                      type="text"
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>
              {/* This is code for the insurance policy  */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Insurance Type
                    </Text>
                    <ReactCustomSelect
                      name="insuranceType"
                      label=""
                      isLoading={false}
                      options={selectBoxOptions?.insuranceType || []}
                      selectedValue={
                        selectBoxOptions?.insuranceType?.filter(
                          (item) => item.value === getValues("insuranceType")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        setValue("insuranceType", val.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>
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
              {/* This code for the upload document */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Policy Upload
                    </Text>
                    <CustomFileInput
                      name={"upload_policy_agreement"}
                      placeholder="Policy Upload"
                      label=""
                      type=""
                      onChange={(e) => {
                        console.log(e, "file");
                        setValue("upload_policy_agreement", e, {
                          shouldValidate: true,
                        });
                      }}
                      value={getValues("upload_policy_agreement")}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>
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
                  addInsurancePolicyMasterApiIsLoading ||
                  updateInsurancePolicyMasterApiIsLoading
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

export default AddEditInsurancePolicy;


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