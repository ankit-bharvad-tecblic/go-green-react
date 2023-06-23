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
  useAddCommodityTypeMasterMutation,
  useAddCommodityVarietyMutation,
  useGetCommodityMasterMutation,
  useGetCommodityTypeMasterMutation,
  useUpdateCommodityTypeMasterMutation,
  useUpdateCommodityVarietyMutation,
} from "../../features/master-api-slice";

const AddEditFormCommodityVariety = () => {
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [commodityTypeMaster, setCommodityTypeMaster] = useState([]);
  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const details = location.state?.details;
  console.log("details ---> ", details);

  const [
    UpdateCommodityVariety,
    {
      /* error: activeDeActiveApiErr,*/ isLoading:
        UpdateCommodityVarietyLoading,
    },
  ] = useUpdateCommodityVarietyMutation();

  const [
    AddCommodityVariety,
    { /* error: activeDeActiveApiErr,*/ isLoading: AddCommodityVarietyLoading },
  ] = useAddCommodityVarietyMutation();

  const updateCommodityVarietyData = async (data) => {
    try {
      const response = await UpdateCommodityVariety(data).unwrap();
      console.log("update commodity master res", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addCommodityVarityData = async (data) => {
    try {
      const response = await AddCommodityVariety(data).unwrap();
      console.log("update commodity master res", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data) => {
    if (details?.id) {
      updateCommodityVarietyData(data);
    } else {
      addCommodityVarityData(data);
    }
    console.log("data==>", data);
  };

  const [
    getCommodityMaster,
    {
      error: getCommodityTypeMasterApiErr,
      isLoading: getCommodityTypeMasterApiIsLoading,
    },
  ] = useGetCommodityMasterMutation();

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

      const response = await getCommodityMaster().unwrap();

      console.log("Success:", response);
      // setCommodityTypeMaster();
      let arr = response?.results.map((type) => ({
        label: type.commodity_name,
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
        commodity_variety: details.commodity_variety,
        description: details.description,
        hsn_code: details.hsn_code,
        fumigation_required: details.fumigation_required,
        fumigation_day: details.fumigation_day,
        lab_testing_required: details.lab_testing_required,
        fed: details.fed,
        is_block: details.is_block,
        is_active: details.is_active,
        commodity_id: details.commodity_id,
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
                  isChecked: details[item.name], 
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

export default AddEditFormCommodityVariety;
