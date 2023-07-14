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
  useAddCommodityTypeMasterMutation,
  useGetCommodityTypeMasterMutation,
  useUpdateCommodityTypeMasterMutation,
} from "../../features/master-api-slice";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import CustomSelector from "../../components/Elements/CustomSelector";

const AddEditFormCommodityType = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    getCommodityTypeMaster,
    { isLoading: getCommodityTypeMasterApiIsLoading },
  ] = useGetCommodityTypeMasterMutation();

  const [
    addCommodityTypeMaster,
    { isLoading: addCommodityTypeMasterApiIsLoading },
  ] = useAddCommodityTypeMasterMutation();

  const [
    updateCommodityTypeMaster,
    { isLoading: updateCommodityTypeMasterApiIsLoading },
  ] = useUpdateCommodityTypeMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addCommodityTypeMaster(data).unwrap();
      console.log("add commodity Type master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/commodity-master/commodity-type");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    PrimarycommodityType: [],
  });
  const options = [
    { value: "agri", label: "agri" },
    { value: "non_agri", label: "non_agri" },
  ];
  const getCommodityType = async () => {
    try {
      const response = await getCommodityTypeMaster().unwrap();

      console.log("Success:", response);
      // setCommodityTypeMaster();
      let arr = response?.results.map((type) => ({
        label: type.primary_commodity_name,
        value: type.id,
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
      const response = await updateCommodityTypeMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update commodity type master res", response);
        toasterAlert(response);
        navigate("/commodity-master/commodity-type");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    getCommodityType();
    console.log(details);
    if (details?.id) {
      let obj = {
        primary_commodity_name: details.primary_commodity_name,
        commodity_type: details.commodity_type,
        description: details.description,
        is_active: details.is_active,
      };

      console.log(obj);
      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
    const breadcrumbArray = [
      {
        title: "Manage Commodity",
        link: "/commodity-master/commodity-type",
      },
      {
        title: " Commodity Type Master",
        link: "/commodity-master/commodity-type",
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
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Primary commodity type
                    </Text>
                    <CustomSelector
                      name="primary_commodity_name"
                      label="" 
                      options={options}
                      selectedValue={selectBoxOptions.PrimarycommodityType?.find(
                        (opt) => opt.label === details?.primary_commodity_name
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
                          item?.options?.find(
                            (opt) =>
                              opt.label === details?.primary_commodity_name
                          ),
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
                  addCommodityTypeMasterApiIsLoading ||
                  updateCommodityTypeMasterApiIsLoading
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

export default AddEditFormCommodityType;

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
