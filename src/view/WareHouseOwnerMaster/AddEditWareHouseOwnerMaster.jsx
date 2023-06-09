import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import {
  useAddWareHouseOwnerTypeMutation,
  useGetWarehouseTypeMasterMutation,
  useUpdateWareHouseOwnerTypeMutation,
} from "../../features/master-api-slice";
import { addEditFormFields, schema } from "./fields";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField from "../../components/Elements/GenerateFormField";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";

const AddEditWareHouseOwnerMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState();
  const [getWarehouseTypeMaster] = useGetWarehouseTypeMasterMutation();
  const [
    addWareHouseOwnerType,
    { isLoading: addWareHouseOwnerTypeApiIsLoading },
  ] = useAddWareHouseOwnerTypeMutation();

  const [
    updateWareHouseOwnerType,
    { isLoading: updateWareHouseOwnerTypeApiIsLoading },
  ] = useUpdateWareHouseOwnerTypeMutation();

  const details = location.state?.details;
  console.log("details", details);

  console.log("methods errors ---> ", methods.formState.errors);

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
      const response = await addWareHouseOwnerType(data).unwrap();
      console.log("add warehouse owner type master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/warehouse-master/warehouse-owner-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const getWarehouseType = async () => {
    try {
      const response = await getWarehouseTypeMaster().unwrap();
      console.log("success:", response);
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
      const response = await updateWareHouseOwnerType(data).unwrap();
      if (response.status === 200) {
        console.log("update warehouse owner type master res", response);
        toasterAlert(response);
        navigate("/warehouse-master/warehouse-owner-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    getWarehouseType();
    if (details?.id) {
      let obj = {
        // hiring_proposal_id: details.hiring_proposal_id.id,
        warehouse_owner_name: details.warehouse_owner_name,
        warehouse_owner_contact_no: details.warehouse_owner_contact_no,
        warehouse_owner_address: details.warehouse_owner_address,
        rent_amount: details.rent_amount,

        revenue_sharing_ratio: details.revenue_sharing_ratio,
      };
      console.log("details", details);

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
    const breadcrumbArray = [
      {
        title: "Manage Warehouse",
        link: "/warehouse-master/warehouse-owner-master",
      },
      {
        title: "Warehouse Owner Master",
        link: "/warehouse-master/warehouse-owner-master",
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
                        isChecked: details?.active,
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
                  addWareHouseOwnerTypeApiIsLoading ||
                  updateWareHouseOwnerTypeApiIsLoading
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

export default AddEditWareHouseOwnerMaster;
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
