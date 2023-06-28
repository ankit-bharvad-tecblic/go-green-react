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
  useAddCommodityGradeMutation,
  useAddCommodityTypeMasterMutation,
  useGetCommodityTypeMasterMutation,
  useUpdateCommodityGradeMutation,
  useUpdateCommodityTypeMasterMutation,
  useUpdateAreaMasterMutation,
  useAddAreaMasterMutation,
  useGetAreaMasterMutation,
  useGetDistrictMasterMutation,
  useGetEarthQuakeZoneTypeMasterMutation,
} from "../../features/master-api-slice";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import CustomSelector from "../../components/Elements/CustomSelector";

const AddEditFormArea = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [commodityTypeMaster, setCommodityTypeMaster] = useState([]);
  const [addEditFormFieldsList, setAddEditFormFieldsList] =
    useState(addEditFormFields);
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    district: [],
    earthQuack: [],
  });

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

  const [getDistrictMaster] = useGetDistrictMasterMutation();
  const [getAreaMaster, { isLoading: getAreaMasterApiIsLoading }] =
    useGetAreaMasterMutation();

  const [addAreaMaster, { isLoading: addAreaMasterApiIsLoading }] =
    useAddAreaMasterMutation();

  const [updateAreaMaster, { isLoading: updateAreaMasterApiIsLoading }] =
    useUpdateAreaMasterMutation();
  const addData = async (data) => {
    try {
      const response = await addAreaMaster(data).unwrap();
      console.log("add area master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-location/area-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };
  // get all district data
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
      const response = await updateAreaMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update area master res", response);
        toasterAlert(response);
        navigate("/manage-location/area-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    if (details?.id) {
      let obj = {
        earthquake_zone_type_id: details.earthquake_zone_type_id,
        district_name: details.district.district_name,
        is_active: details.is_active,
        is_block: details.is_block,
        area_name: details.area_name,
      };

      console.log(obj);

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
  }, [details]);
  useEffect(() => {
    getAllDistrict();

    // setAddEditFormFieldsList(addEditFormFields);
  }, []);

  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {addEditFormFieldsList &&
            addEditFormFieldsList.map((item, i) => (
              <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
                <Box gap="10" display={{ base: "flex" }} alignItems="center">
                  {" "}
                  <Text textAlign="right" w="250px">
                    {item.label}
                  </Text>{" "}
                  {generateFormField({
                    ...item,
                    label: "",
                    isChecked: details?.active,
                    style: {
                      mb: 2,
                      mt: 2,
                      w: 300,
                    },

                    selectedValue:
                      item.type === "select" &&
                      item?.options?.find(
                        (opt) => opt.label === details?.district.district_name
                      ),
                    selectType: "value",
                    isClearable: false,
                  })}
                </Box>
              </MotionSlideUp>
            ))}

          <Box>
            <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <Box gap="10" display={{ base: "flex" }} alignItems="center">
                <Text textAlign="right" w="250px">
                  District NAME
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
                    mb: 2,
                    mt: 2,
                    w: 300,
                  }}
                />
              </Box>
            </MotionSlideUp>
            {/* <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <Box gap="10" display={{ base: "flex" }} alignItems="center">
                <Text textAlign="right" w="250px">
                  test
                </Text>{" "}
                <CustomSelector
                  name="select"
                  label=""
                  options={[]}
                  selectedValue={[].find(
                    (opt) => opt.label === details?.district.district_name
                  )}
                  isClearable={false}
                  selectType={"value"}
                  style={{
                    mb: 2,
                    mt: 2,
                    w: 300,
                  }}
                />
              </Box>
            </MotionSlideUp>{" "}
            <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <Box gap="10" display={{ base: "flex" }} alignItems="center">
                <Text textAlign="right" w="250px">
                  test
                </Text>{" "}
                <CustomSelector
                  name="select"
                  label=""
                  options={[]}
                  selectedValue={[].find(
                    (opt) => opt.label === details?.district.district_name
                  )}
                  isClearable={false}
                  selectType={"value"}
                  style={{
                    mb: 2,
                    mt: 2,
                    w: 300,
                  }}
                />
              </Box>
            </MotionSlideUp>{" "} */}
          </Box>
          <Box display="flex" justifyContent="flex-end" mt="10" px="0">
            <Button
              type="submit"
              //w="full"
              backgroundColor={"primary.700"}
              _hover={{ backgroundColor: "primary.700" }}
              color={"white"}
              borderRadius={"full"}
              isLoading={
                addAreaMasterApiIsLoading || updateAreaMasterApiIsLoading
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
};

export default AddEditFormArea;

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
