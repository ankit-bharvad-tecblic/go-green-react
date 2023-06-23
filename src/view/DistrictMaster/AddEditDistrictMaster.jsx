import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
    useAddCommodityGradeMutation,
  useAddCommodityTypeMasterMutation,
  useAddRegionMasterMutation,
  useGetCommodityTypeMasterMutation,
  useUpdateCommodityGradeMutation,
  useUpdateCommodityTypeMasterMutation,
  useUpdateRegionMasterMutation,
} from "../../features/master-api-slice";

const AddEditFormDistrictMaster = () => {
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [commodityTypeMaster, setCommodityTypeMaster] = useState([]);
  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details ---> ", details);

  const [
    UpdateRegionMaster,
    { /* error: activeDeActiveApiErr,*/ isLoading: UpdateCommodityGradeLoading },
  ] = useUpdateRegionMasterMutation();

  const [
    AddRegionMaster,
    { /* error: activeDeActiveApiErr,*/ isLoading: AddCommodityGradeLoading },
  ] = useAddRegionMasterMutation();

  const updateCommodityGradeData = async (data) => {
    try {
      const response = await UpdateRegionMaster(data).unwrap();
      console.log("update commodity master res", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addCommodityGradeData = async (data) => {
    try {
      const response = await AddRegionMaster(data).unwrap();
      console.log("update commodity master res", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data) => {
    if (details?.id) {
      updateCommodityGradeData(data);
    } else {
      addCommodityGradeData(data);
    }
    console.log("data==>", data);
  };

  const [
    getCommodityTypeMaster,
    {
      error: getCommodityTypeMasterApiErr,
      isLoading: getCommodityTypeMasterApiIsLoading,
    },
  ] = useGetCommodityTypeMasterMutation();

  const getCommodityType = async () => {
    //params filter
    // if (filter.filter.length || filter.search) {
    // if (filterQuery) {
    // paramString = Object.entries(filter)
    //   .map(([key, value]) => {
    //     if (Array.isArray(value)) {
    //       return value
    //         .map((item) => `${key}=${encodeURIComponent(item)}`)
    //         .join("&");
    //     }
    //     return `${key}=${encodeURIComponent(value)}`;
    //   })
    //   .join("&");
    // }

    try {
      // let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;

      const response = await getCommodityTypeMaster().unwrap();

      console.log("Success:", response);
      // setCommodityTypeMaster();
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

      // setData(response?.results || []);
      // setFilter((old) => ({
      //   ...old,
      //   totalPage: Math.ceil(response?.total / old?.limit),
      // }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCommodityType();
    if (details?.id) {
      let obj = {
        region_name: details.region_name,
        active: details.is_active,
      };

      // setHandleSelectBoxVal

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
  }, [details]);

  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {addEditFormFieldsList &&
            addEditFormFieldsList.map((item) => (
              <Box gap="10" display={{ base: "flex" }} alignItems="center">
                {" "}
                <Text textAlign="right" w="250px">
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
                        opt.label === details?.commodity_type?.commodity_type
                    ),
                  selectType: "label",
                  isChecked: details?.active,
                  isClearable: false,
                  style: { mb: 2, mt: 2 },
                })}
              </Box>
            ))}

          <Box display="flex" justifyContent="flex-end" mt="10" px="0">
            <Button
              type="submit"
              //w="full"
              backgroundColor={"primary.700"}
              _hover={{ backgroundColor: "primary.700" }}
              color={"white"}
              borderRadius={"full"}
              my={"4"}
              px={"10"}
            >
              Update
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddEditFormDistrictMaster;
