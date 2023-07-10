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
  useGetHsnMasterMutation,
  useUpdateCommodityVarietyMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { MotionSlideUp } from "../../utils/animation";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import CustomInput from "../../components/Elements/CustomInput";
import CustomSwitch from "../../components/Elements/CustomSwitch";
import CustomSelector from "../../components/Elements/CustomSelector";

const AddEditFormCommodityVariety = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details ---> ", details);

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    hsnCode: [],
    commodityType: [],
    commodityName: [],
  });

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
  const [getCommodityMaster] = useGetCommodityMasterMutation();
  const [getHsnMaster] = useGetHsnMasterMutation();
  const [getCommodityTypeMaster] = useGetCommodityTypeMasterMutation();

  const { setValue, getValues } = methods;
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

  const getAllCommodity = async () => {
    try {
      const response = await getCommodityMaster().unwrap();

      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.commodity_name,
        value: item.id,
      }));
      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        commodityName: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getHsnMasters = async () => {
    try {
      const response = await getHsnMaster().unwrap();
      console.log("response ", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);

      let arr = onlyActive?.map((item) => ({
        label: item.hsn_code,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        hsnCode: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCommodityType = async () => {
    try {
      const response = await getCommodityTypeMaster().unwrap();

      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.commodity_type,
        value: item.id,
      }));
      console.log(arr);
      setSelectBoxOptions((prev) => ({
        ...prev,
        commodityType: arr,
      }));
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
    getHsnMasters();
    getAllCommodity();
    if (details?.id) {
      console.log(details);
      let obj = {
        commodity_variety: details.commodity_variety,
        description: details.description,
        hsn_code: details.hsn_code,
        commodity_id: details.commodity_id.id,
        commodity_type: details.commodity_type,
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
    const breadcrumbArray = [
      {
        title: "Manage Commodity",
        link: "/commodity-master/commodity-variety",
      },
      {
        title: " Commodity variety master",
        link: "/commodity-master/commodity-variety",
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
                      })}
                    </Box>
                  </MotionSlideUp>
                ))}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Commodity Type
                    </Text>
                    <CustomSelector
                      name="commodity_type"
                      label=""
                      options={selectBoxOptions.commodityType}
                      selectedValue={selectBoxOptions.commodityType.find(
                        (opt) =>
                          opt.label === details?.commodity_type.commodity_type
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
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Commodity Name
                    </Text>
                    <CustomSelector
                      name="commodity_id"
                      label=""
                      options={selectBoxOptions.commodityName}
                      selectedValue={selectBoxOptions.commodityName.find(
                        (opt) => opt.label === details?.commodity_id
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
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Commodity Variety
                    </Text>
                    <CustomInput
                      name="commodity_variety"
                      placeholder="  Commodity Variety"
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
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Discription
                    </Text>
                    <CustomInput
                      name="description"
                      placeholder=" Discription"
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
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Final Expiry Date
                    </Text>
                    <CustomInput
                      name="fed"
                      placeholder=" Final Expiry Date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
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
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Fumigation Day
                    </Text>
                    <CustomInput
                      name="fumigation_day"
                      placeholder="  Fumigation Day"
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
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      HSN Code
                    </Text>
                    <CustomSelector
                      name="hsn_code"
                      label=""
                      options={selectBoxOptions.hsnCode}
                      selectedValue={selectBoxOptions.hsnCode.find(
                        (opt) => opt.label === details?.hsn_code
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
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Fumigation Required
                    </Text>
                    <CustomSwitch
                      name="fumigation_required"
                      // type="switch"
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      isChecked={details?.fumigation_required}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>

              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Lab Testing Required
                    </Text>
                    <CustomSwitch
                      name="lab_testing_required"
                      // type="switch"
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      isChecked={details?.lab_testing_required}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Block
                    </Text>
                    <CustomSwitch
                      name="is_block"
                      // type="switch"
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      isChecked={details?.is_block}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>

              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
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
                      isChecked={details?.is_active}
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
