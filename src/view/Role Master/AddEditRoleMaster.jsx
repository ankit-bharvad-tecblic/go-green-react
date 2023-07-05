import React, { useEffect, useState } from "react";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MotionSlideUp } from "../../utils/animation";
import { addEditFormFields, schema } from "./fields";
import {
  useAddRoleMasterMutation,
  useUpdateRoleMasterMutation,
} from "../../features/master-api-slice";
import generateFormField from "../../components/Elements/GenerateFormField";
import { Box, Button, Text } from "@chakra-ui/react";
const AddEditRoleMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // const [getRoleMaster] = useGetRoleMasterMutation();

  const [addRoleMaster, { isLoading: addRoleMasterApiIsLoading }] =
    useAddRoleMasterMutation();

  const [updateRoleMaster, { isLoading: updateRoleMasterApiIsLoading }] =
    useUpdateRoleMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addRoleMaster(data).unwrap();
      console.log("add Role master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-users/role-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };
  // const getRole = async () => {
  //   try {
  //     // let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;

  //     const response = await getRoleMaster().unwrap();

  //     console.log("Success:", response);
  //     // setCommodityTypeMaster();
  //     let arr = response?.results.map((type) => ({
  //       label: type.commodity_type,
  //       value: type.id,
  //     }));

  //     setAddEditFormFieldsList(
  //       addEditFormFields.map((field) => {
  //         if (field.type === "select") {
  //           return {
  //             ...field,
  //             options: arr,
  //           };
  //         } else {
  //           return field;
  //         }
  //       })
  //     );
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const updateData = async (data) => {
    try {
      const response = await updateRoleMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update earthQuack master res", response);
        toasterAlert(response);
        navigate("/manage-users/role-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    // getRole();

    setAddEditFormFieldsList(addEditFormFields);
    if (details?.id) {
      let obj = {
        role_name: details?.role_name,
        description: details?.description,
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
                isLoading={
                  addRoleMasterApiIsLoading || updateRoleMasterApiIsLoading
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

export default AddEditRoleMaster;

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
