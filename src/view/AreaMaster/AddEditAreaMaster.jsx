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
  useGetEarthQuakeZoneTypeMasterMutation,
} from "../../features/master-api-slice";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import CustomSelector from "../../components/Elements/CustomSelector";
import CustomSwitch from "../../components/Elements/CustomSwitch";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import { useDispatch } from "react-redux";
import { useFetchLocationDrillDownMutation } from "../../features/warehouse-proposal.slice";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import CustomInput from "../../components/Elements/CustomInput";

const AddEditFormArea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { setValue, getValues } = methods;

  const [locationDrillDownState, setLocationDrillDownState] = useState({});

  const [getZoneMaster] = useGetZoneMasterMutation();
  const [getStateMaster] = useGetStateMasterMutation();

  const [addEditFormFieldsList, setAddEditFormFieldsList] =
    useState(addEditFormFields);

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    earthQuack: [],
    regions: [],
    substate: [],
    districts: [],
    states: [],
  });

  let details = location.state?.details;
  console.log("details ---> ", details);

  const onSubmit = (data) => {
    console.log("data==>", data);
    if (details?.id) {
      updateData({ ...data, id: details.id });
    } else {
      addData(data);
    }
  };

  const { reset } = methods;

  // for clear data in form
  const clearForm = () => {
    const defaultValues = methods.getValues();
    console.log(defaultValues);

    Object.keys(defaultValues).forEach((key) => {
      methods.setValue(key, "");
    });

    methods.setValue("area_name", "");

    details = {};
    reset();

    console.log(details);
  };

  const [getEarthQuakeZoneTypeMaster] =
    useGetEarthQuakeZoneTypeMasterMutation();

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

  // Region State  Zone District Area  onChange drill down api start //

  // location drill down api hook
  const [
    fetchLocationDrillDown,
    { isLoading: fetchLocationDrillDownApiIsLoading },
  ] = useFetchLocationDrillDownMutation();

  const [getRegionMaster, { isLoading: getRegionMasterApiIsLoading }] =
    useGetRegionMasterMutation();

  const getRegionMasterList = async () => {
    try {
      const response = await fetchLocationDrillDown().unwrap();
      console.log("getRegionMasterList:", response);

      const arr = response?.region
        ?.filter((item) => item.region_name !== "ALL - Region")
        .map(({ region_name, id }) => ({
          label: region_name,
          value: id,
        }));
      if (details?.district?.substate?.state?.region?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          regions: [
            ...arr,
            {
              label: details?.district?.substate?.state?.region?.region_name,
              value: details?.district?.substate?.state?.region?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          regions: arr,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const regionOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("region", val?.value, {
      shouldValidate: true,
    });
    setValue("state", null, {
      shouldValidate: false,
    });

    setValue("substate", null, {
      shouldValidate: false,
    });

    setValue("district", null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      region: val?.value,
    }));

    const query = {
      region: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      const arr = response?.state
        ?.filter((item) => item.state_name !== "All - State")
        .map(({ state_name, id }) => ({
          label: state_name,
          value: id,
        }));
      if (details?.district?.substate?.state?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          states: [
            ...arr,
            {
              label: details?.district?.substate?.state?.state_name,
              value: details?.district?.substate?.state?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          states: arr,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const stateOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("state", val?.value, {
      shouldValidate: true,
    });

    setValue("substate", null, {
      shouldValidate: false,
    });

    setValue("district", null, {
      shouldValidate: false,
    });
 
    setLocationDrillDownState((prev) => ({
      region: locationDrillDownState.region,
      state: val?.value,
    }));

    const query = {
      region: locationDrillDownState.region,
      state: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      const arr = response?.substate
        ?.filter((item) => item.substate_name !== "All - Zone")
        .map(({ substate_name, id }) => ({
          label: substate_name,
          value: id,
        }));
      if (details?.district?.substate?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          substate: [
            ...arr,
            {
              label: details?.district?.substate?.substate_name,
              value: details?.district?.substate?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          substate: arr,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const zoneOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("substate", val?.value, {
      shouldValidate: true,
    });

    setValue("district", null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      region: locationDrillDownState.region,
      state: locationDrillDownState.state,
      substate: val?.value,
    }));

    const query = {
      region: locationDrillDownState.region,
      state: locationDrillDownState.state,
      substate: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      const arr = response?.district
        ?.filter((item) => item.district_name !== "All - District")
        .map(({ district_name, id }) => ({
          label: district_name,
          value: id,
        }));
      if (details?.district?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          districts: [
            ...arr,
            {
              label: details?.district?.district_name,
              value: details?.district?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          districts: arr,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const districtOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("district", val?.value, {
      shouldValidate: true,
    });
  };

  const getEarthquackList = async () => {
    try {
      const response = await getEarthQuakeZoneTypeMaster().unwrap();
      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.earthquake_zone_type,
        value: item.id,
      }));

      console.log(arr);

      if (details?.earthquake_zone_type?.is_active) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          earthquack: arr,
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          earthquack: [
            ...arr,
            {
              label: details?.earthquake_zone_type?.earthquake_zone_type,
              value: details?.earthquake_zone_type.id,
            },
          ],
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Region State  Zone District Area  onChange drill down api end //

  useEffect(() => {
    getEarthquackList();
    if (details?.id) {
      regionOnChange({ value: details.district?.substate?.state?.region?.id });
      stateOnChange({ value: details.district?.substate?.state?.id });
      zoneOnChange({ value: details.district?.substate?.id });
      districtOnChange({ value: details.district?.id });
      let obj = {
        earthquake_zone_type:
          details?.earthquake_zone_type?.earthquake_zone_type,
        district_name: details.district?.id,
        substate: details.district?.substate?.id,
        region: details.district?.substate?.state?.region.id,
        state: details.district?.substate?.state.id,
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
    // getAllDistrict();
    // getAllStateMaster();
    getRegionMasterList();
    // getAllZone();

    return () => {
      dispatch(setBreadCrumb([]));
    };

    // setAddEditFormFieldsList(addEditFormFields);
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
                      Region
                    </Text>
                    <ReactCustomSelect
                      name="region"
                      label=""
                      isLoading={getRegionMasterApiIsLoading}
                      options={selectBoxOptions?.regions || []}
                      selectedValue={
                        selectBoxOptions?.regions?.filter(
                          (item) => item.value === getValues("region")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        regionOnChange(val);
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
                    <ReactCustomSelect
                      name="state"
                      label=""
                      isLoading={fetchLocationDrillDownApiIsLoading}
                      options={selectBoxOptions?.states || []}
                      selectedValue={
                        selectBoxOptions?.states?.filter(
                          (item) => item.value === getValues("state")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        stateOnChange(val);
                      }}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Sub State
                    </Text>
                    <ReactCustomSelect
                      name="substate"
                      label=""
                      isLoading={fetchLocationDrillDownApiIsLoading}
                      options={selectBoxOptions?.substate || []}
                      selectedValue={
                        selectBoxOptions?.substate?.filter(
                          (item) => item.value === getValues("substate")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        zoneOnChange(val);
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
                  <ReactCustomSelect
                    name="district"
                    label=""
                    isLoading={fetchLocationDrillDownApiIsLoading}
                    options={selectBoxOptions?.districts || []}
                    selectedValue={
                      selectBoxOptions?.districts?.filter(
                        (item) => item.value === getValues("district")
                      )[0] || {}
                    }
                    isClearable={false}
                    selectType="label"
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                    handleOnChange={(val) => {
                      districtOnChange(val);
                    }}
                  />
                </Box>
              </MotionSlideUp>{" "}
              {/* This one for Earthquack zone id  */}
              {/* <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Earthquack Zone
                    </Text>
                    <CustomSelector
                      name="earthquake_zone_type"
                      label=""
                      options={selectBoxOptions.earthquack}
                      selectedValue={selectBoxOptions.earthquack?.find(
                        (opt) =>
                          opt.label ===
                          details?.earthquake_zone_type.earthquake_zone_type
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
              </Box> */}
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
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Area
                    </Text>
                    <CustomInput
                      name="area_name"
                      placeholder="Enter Area"
                      type="text"
                      label=""
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
                      Earthquack Zone
                    </Text>
                    <CustomSelector
                      name="earthquake_zone_type"
                      label=""
                      options={selectBoxOptions.earthquack}
                      selectedValue={selectBoxOptions.earthquack?.find(
                        (opt) =>
                          opt.label ===
                          details?.earthquake_zone_type.earthquake_zone_type
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
                    Active
                  </Text>
                  <CustomSwitch
                    name="is_active"
                    // type="switch"
                    label=""
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                    isChecked={details?.is_active}
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
