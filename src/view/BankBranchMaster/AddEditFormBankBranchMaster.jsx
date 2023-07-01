import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import generateFormField from "../../components/Elements/GenerateFormField";
import {
  useAddBankBranchMasterMutation,
  useGetBankBranchMasterMutation,
  useGetBankMasterMutation,
  useGetDistrictMasterMutation,
  useGetRegionMasterMutation,
  useGetStateMasterMutation,
  useUpdateBankBranchMasterMutation,
} from "../../features/master-api-slice";
import { addEditFormFields, schema } from "./fields";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import CustomSelector from "../../components/Elements/CustomSelector";
import CustomTextArea from "../../components/Elements/CustomTextArea";
import CustomSwitch from "../../components/Elements/CustomSwitch";
import CustomInput from "../../components/Elements/CustomInput";

function AddEditFormBankBranchMaster() {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [getBankMaster] = useGetBankMasterMutation();
  const [getStateMaster] = useGetStateMasterMutation();
  const [getRegionMaster] = useGetRegionMasterMutation();
  const [getDistrictMaster] = useGetDistrictMasterMutation();
  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details-->", details);
  // for clear data in form

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

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    banks: [],
    regions: [],
    states: [],
    district: [],
  });

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

  const getBankMasterList = async () => {
    try {
      const response = await getBankMaster().unwrap();
      console.log("Success:", response);

      let arr = response?.results.map((item) => ({
        label: item.bank_name,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        banks: arr,
      }));
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
      setSelectBoxOptions((prev) => ({
        ...prev,
        states: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getRegionMasterList = async () => {
    try {
      const response = await getRegionMaster().unwrap();
      console.log("Success:", response);

      let arr = response?.results.map((item) => ({
        label: item.region_name,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        regions: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAllDistrict = async () => {
    try {
      const response = await getDistrictMaster().unwrap();

      console.log("Success:", response);
      // setCommodityTypeMaster();
      let arr = response?.results.map((item) => ({
        label: item.district_name,
        value: item.id,
      }));

      setSelectBoxOptions((prev) => ({ ...prev, district: arr }));
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
    getRegionMasterList();
    getAllDistrict();
    getBankBranch();
    getBankMasterList();
    if (details?.id) {
      let obj = {
        branch_name: details.branch_name,
        bank: details?.bank.bank_name,
        region: details.region.region_name,
        state: details.state.state_name,
        branch_address: details.branch_address,
        district: details.district.district_name,
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
          <Box w={{ base: "100%", md: "80%", lg: "90%", xl: "60%" }}>
            {addEditFormFieldsList &&
              addEditFormFieldsList.map((item, i) => (
                <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
                  <Box gap="10" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="200px">
                      {item.label}
                    </Text>
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

            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="10" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="200px">
                    Bank
                  </Text>
                  <CustomSelector
                    name="bank"
                    label=""
                    options={selectBoxOptions.banks}
                    selectedValue={selectBoxOptions.banks.find(
                      (opt) => opt.label === details?.bank.bank_name
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

            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="10" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="200px">
                    Region
                  </Text>
                  <CustomSelector
                    name="region"
                    label=""
                    options={selectBoxOptions.regions}
                    selectedValue={selectBoxOptions.regions.find(
                      (opt) => opt.label === details?.region.region_name
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

            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="10" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="200px">
                    State
                  </Text>
                  <CustomSelector
                    name="state"
                    label=""
                    options={selectBoxOptions.states}
                    selectedValue={selectBoxOptions.states.find(
                      (opt) => opt?.label === details?.state?.state_name
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

            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="10" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="200px">
                    District
                  </Text>{" "}
                  <CustomSelector
                    name="district"
                    label=""
                    isChecked="details?.active"
                    options={selectBoxOptions.district}
                    selectedValue={selectBoxOptions.district.find(
                      (opt) => opt.label === details?.district.district_name
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

            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="10" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="200px">
                    Address
                  </Text>
                  <CustomTextArea
                    name="branch_address"
                    placeholder=" Address"
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

            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="10" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="200px">
                    Pincode
                  </Text>
                  <CustomInput
                    name="pincode"
                    placeholder=" pincode"
                    type="number"
                    label=""
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                  />
                </Box>
              </MotionSlideUp>
            </Box>

            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="10" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="200px">
                    Active
                  </Text>
                  <CustomSwitch
                    name="is_active"
                    // type="switch"
                    label=""
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                    // isChecked="regions?.active"
                  />
                </Box>
              </MotionSlideUp>
            </Box>
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
