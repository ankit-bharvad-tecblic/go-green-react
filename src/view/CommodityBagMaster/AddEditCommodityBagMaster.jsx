import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addEditFormFields, schema } from "./fields";
import {
  useAddCommodityBagMasterMutation,
  useGetCommodityMasterMutation,
  useGetCommodityTypeMasterMutation,
  useUpdateCommodityBagMasterMutation,
} from "../../features/master-api-slice";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import { Box, Button, Text } from "@chakra-ui/react";
import { MotionSlideUp } from "../../utils/animation";
import generateFormField from "../../components/Elements/GenerateFormField";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import CustomSelector from "../../components/Elements/CustomSelector";

const AddEditCommodityBagMaster = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { setValue, getValues } = methods;

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    types: [],
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
  const [getCommodityTypeMaster] = useGetCommodityTypeMasterMutation();
  const [
    getCommodityMaster,
    { isLoading: getCommodityTypeMasterApiIsLoading },
  ] = useGetCommodityMasterMutation();
  const [
    addCommodityBagMaster,
    { isLoading: addCommodityBagMasterApiIsLoading },
  ] = useAddCommodityBagMasterMutation();

  const [
    updateCommodityBagMaster,
    { isLoading: updateCommodityBagMasterApiIsLoading },
  ] = useUpdateCommodityBagMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addCommodityBagMaster(data).unwrap();
      console.log("add commodity bag master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/commodity-master/commodity-bag-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const getCommodityTypeMasterList = async () => {
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
        types: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCommodityType = async () => {
    try {
      const response = await getCommodityMaster().unwrap();

      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
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
      const response = await updateCommodityBagMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update commodity bag master res", response);
        toasterAlert(response);
        navigate("/commodity-master/commodity-bag-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    getCommodityType();
    getCommodityTypeMasterList();
    if (details?.id) {
      console.log(details);
      let obj = {
        bag_size: details.bag_size,
        tolerance_size: details.tolerance_size,
        space: details?.space,
        stack_height: details?.stack_height,
        commodity_type: details.commodity_type,
        commodity_id: details?.commodity_id.id,
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
        link: "/commodity-master/commodity-bag-master",
      },
      {
        title: " Commodity Bag master",
        link: "/commodity-master/commodity-bag-master",
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
              {/* This code is for the commodity type master list  */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Commodity Type
                    </Text>
                    <CustomSelector
                      name="commodity_type"
                      label=""
                      options={selectBoxOptions.types}
                      selectedValue={selectBoxOptions.types.find(
                        (opt) => opt.label === details?.bank.commodity_type
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
                  addCommodityBagMasterApiIsLoading ||
                  updateCommodityBagMasterApiIsLoading
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

export default AddEditCommodityBagMaster;

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
