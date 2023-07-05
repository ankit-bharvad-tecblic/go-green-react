import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField from "../../components/Elements/GenerateFormField";
import { addEditFormFields, schema } from "./fields";
import {
  useUpdateAreaMasterMutation,
  useAddAreaMasterMutation,
  useGetAreaMasterMutation,
  useGetDistrictMasterMutation,
  useGetZoneMasterMutation,
  useGetStateMasterMutation,
  useGetRegionMasterMutation,
} from "../../features/master-api-slice";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import CustomSelector from "../../components/Elements/CustomSelector";
import CustomSwitch from "../../components/Elements/CustomSwitch";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import { useDispatch } from "react-redux";

const AddEditFormArea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [getZoneMaster] = useGetZoneMasterMutation();
  const [getStateMaster] = useGetStateMasterMutation();
  const [getRegionMaster] = useGetRegionMasterMutation();

  const [addEditFormFieldsList, setAddEditFormFieldsList] =
    useState(addEditFormFields);
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    district: [],
    earthQuack: [],
    regions: [],
    zones: [],
    district: [],
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
  // for clear data in form
  const clearForm = () => {
    const defaultValues = methods.getValues();
    Object.keys(defaultValues).forEach((key) => {
      methods.setValue(key, "");
    });
  };

  const [getDistrictMaster] = useGetDistrictMasterMutation();

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
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.district_name,
        value: item.id,
      }));

      setSelectBoxOptions((prev) => ({ ...prev, district: arr }));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //API of all zone data
  const getAllZone = async () => {
    try {
      const response = await getZoneMaster().unwrap();

      console.log("Success:", response);
      console.log(details);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.zone_name,
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
      console.log(arr);
      setSelectBoxOptions((prev) => ({
        ...prev,
        zones: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // All state Call
  const getAllStateMaster = async () => {
    try {
      const response = await getStateMaster().unwrap();
      console.log("response ", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.state_name,
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
      setSelectBoxOptions((prev) => ({
        ...prev,
        states: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // All region call
  const getRegionMasterList = async () => {
    try {
      const response = await getRegionMaster().unwrap();
      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.region_name,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        regions: arr,
      }));
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
        district_name: details.district.district_name,
        zone: details.zone.zone_name,
        region: details.region.region_name,
        state: details.state.state_name,
        is_active: details?.is_active,
        is_block: details?.is_block,
        area_name: details.area_name,
      };

      console.log(obj);

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }

    // set breadcrumbArray
    const breadcrumbArray = [
      {
        title: "Manage Locations",
        link: "/manage-location/area-master",
      },
      {
        title: "Area Master",
        link: "/manage-location/area-master",
      },
      {
        title: details?.id ? "Edit" : "Add",
      },
    ];
    dispatch(setBreadCrumb(breadcrumbArray));
  }, [details]);

  useEffect(() => {
    getAllDistrict();
    getAllStateMaster();
    getRegionMasterList();
    getAllZone();

    return () => {
      dispatch(setBreadCrumb([]));
    };

    // setAddEditFormFieldsList(addEditFormFields);
  }, []);

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
                        isChecked: details?.is_active,

                        style: {
                          mb: 1,
                          mt: 1,
                        },

                        selectedValue:
                          item.type === "select" &&
                          item?.options?.find(
                            (opt) =>
                              opt.label === details?.district.district_name
                          ),
                        selectType: "value",
                        isClearable: false,
                      })}
                    </Box>
                  </MotionSlideUp>
                ))}
              <Box></Box>
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Region
                    </Text>
                    <CustomSelector
                      name="region"
                      label=""
                      options={selectBoxOptions.regions}
                      selectedValue={selectBoxOptions.regions.find(
                        (opt) => opt.label === details?.region.region_name
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
                      State
                    </Text>
                    <CustomSelector
                      name="state"
                      label=""
                      options={selectBoxOptions.states}
                      selectedValue={selectBoxOptions.states?.find(
                        (opt) => opt?.label === details?.state?.state_name
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
                      Zone
                    </Text>
                    <CustomSelector
                      name="zone"
                      label=""
                      options={selectBoxOptions.zones}
                      selectedValue={selectBoxOptions.zones.find(
                        (opt) => opt.label === details?.zone?.zone_name
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
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="4" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="550px">
                    District
                  </Text>{" "}
                  <CustomSelector
                    name="district"
                    label=""
                    // isChecked="details?.active"
                    options={selectBoxOptions.district}
                    selectedValue={selectBoxOptions.district.find(
                      (opt) => opt.label === details?.district.district_name
                    )}
                    isClearable={false}
                    selectType={"value"}
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                  />
                </Box>
              </MotionSlideUp>{" "}
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="4" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="550px">
                    Active
                  </Text>
                  <CustomSwitch
                    name="is_active"
                    // type="switch"
                    label=""
                    isChecked={details?.is_active}
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                  />
                </Box>
              </MotionSlideUp>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="4" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="550px">
                    Block
                  </Text>
                  <CustomSwitch
                    name="is_block"
                    // type="switch"
                    label=""
                    isChecked={details?.is_block}
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                  />
                </Box>
              </MotionSlideUp>
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
                  addAreaMasterApiIsLoading || updateAreaMasterApiIsLoading
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

{
  /* <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
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
            </MotionSlideUp>{" "} */
}
