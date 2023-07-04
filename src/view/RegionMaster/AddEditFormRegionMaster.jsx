import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField from "../../components/Elements/GenerateFormField";
import { addEditFormFields, schema } from "./fields";
import {
  useAddRegionMasterMutation,
  useUpdateRegionMasterMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { MotionSlideUp } from "../../utils/animation";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";

const AddEditFormRegionMaster = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details ---> ", details);

  const [updateRegionMaster, { isLoading: updateCommodityGradeLoading }] =
    useUpdateRegionMasterMutation();

  const [addRegionMaster, { isLoading: addCommodityGradeLoading }] =
    useAddRegionMasterMutation();

  const updateData = async (data) => {
    try {
      const response = await updateRegionMaster({
        ...data,
        id: details.id,
      }).unwrap();
      if (response.status === 200) {
        toasterAlert(response);
        navigate(`/manage-location/region-master`);
      }
      console.log("update region master res", response);
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const addData = async (data) => {
    try {
      const response = await addRegionMaster(data).unwrap();
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-location/region-master");
      }
      console.log("update region master res", response);
    } catch (error) {
      console.error("Error:", error);

      toasterAlert(error);
    }
  };

  const onSubmit = (data) => {
    console.log("data==>", data);
    if (details?.id) {
      updateData(data);
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

  useEffect(() => {
    setAddEditFormFieldsList(addEditFormFields);
    if (details?.id) {
      console.log(details);
      let obj = {
        region_name: details.region_name,
        is_active: details.is_active,
      };

      // setHandleSelectBoxVal

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }

    // set breadcrumbArray
    const breadcrumbArray = [
      {
        title: "Manage Locations",
        link: "/manage-location/region-master",
      },
      {
        title: "Region Master",
        link: "/manage-location/region-master",
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
          <Box maxHeight="370px" overflowY="auto">
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
                my={"4"}
                px={"10"}
                isLoading={
                  updateCommodityGradeLoading || addCommodityGradeLoading
                }
              >
                {details?.id ? " Update" : "Add"}
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddEditFormRegionMaster;

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
