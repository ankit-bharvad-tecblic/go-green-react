import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import generateFormField from "../../components/Elements/GenerateFormField";
import {
  useAddWareHouseSubTypeMutation,
  useGetWareHouseSubTypeMutation,
  useUpdateWareHouseSubTypeMutation,
} from "../../features/master-api-slice";
import { addEditFormFields, schema } from "./fields";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

function AddEditFormWareHouseSubTypeMaster() {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);
  const [getWareHouseSubType] = useGetWareHouseSubTypeMutation();
  const [addWareHouseSubType, { isLoading: addWareHouseSubTypeApiIsLoading }] =
    useAddWareHouseSubTypeMutation();

  const [
    updateWareHouseSubType,
    { isLoading: updateWareHouseSubTypeApiIsLoading },
  ] = useUpdateWareHouseSubTypeMutation();

  const details = location.state?.details;
  console.log("details", details);

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

  const addData = async (data) => {
    try {
      const response = await addWareHouseSubType(data).unwrap();
      console.log("add warehouse sub type master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/warehouse-master/warehouse-sub-type-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };
  const getWareHouseSub = async (data) => {
    try {
      const response = await getWareHouseSubType().unwrap();

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
      const response = await updateWareHouseSubType(data).unwrap();
      if (response.status === 200) {
        console.log("update warehouse sub type master res", response);
        toasterAlert(response);
        navigate("/warehouse-master/warehouse-sub-type-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    getWareHouseSub();
    if (details?.id) {
      let obj = {
        warehouse_subtype: details.warehouse_subtype,
        description: details.description,
        is_active: details.is_active,
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
    <Box
      bg="white"
      borderRadius={10}
      p="10"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box maxHeight="280px" overflowY="auto">
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
                        isChecked: details?.is_active,
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
                  addWareHouseSubTypeApiIsLoading ||
                  updateWareHouseSubTypeApiIsLoading
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
}

export default AddEditFormWareHouseSubTypeMaster;

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
