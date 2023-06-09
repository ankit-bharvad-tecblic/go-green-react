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
  useAddDistrictMasterMutation,
  useGetDistrictMasterMutation,
  useGetRegionMasterMutation,
  useGetStateMasterMutation,
  useGetZoneMasterMutation,
  useUpdateDistrictMasterMutation,
} from "../../features/master-api-slice";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import CustomSelector from "../../components/Elements/CustomSelector";
import CustomSwitch from "../../components/Elements/CustomSwitch";
import { useFetchLocationDrillDownMutation } from "../../features/warehouse-proposal.slice";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";

import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
const AddEditFormDistrictMaster = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { setValue, getValues } = methods;

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
  const [getStateMaster] = useGetStateMasterMutation();
  const [getZoneMaster] = useGetZoneMasterMutation();
  const [addDistrictMaster, { isLoading: addDistrictMasterApiIsLoading }] =
    useAddDistrictMasterMutation();
  const [updateZoneMaster, { isLoading: updateDistrictMasterApiIsLoading }] =
    useUpdateDistrictMasterMutation();
  const [locationDrillDownState, setLocationDrillDownState] = useState({});

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    earthQuack: [],
    regions: [],
    substate: [],
    districts: [],
    states: [],
  });

  const addData = async (data) => {
    try {
      const response = await addDistrictMaster(data).unwrap();
      console.log("add district master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-location/district-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const updateData = async (data) => {
    try {
      const response = await updateZoneMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update update master res", response);
        toasterAlert(response);
        navigate("/manage-location/district-master");
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

      if (details?.substate?.state?.region?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          regions: [
            ...arr,
            {
              label: details.substate?.state?.region?.region_name,
              value: details.substate?.state?.region?.id,
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
      if (details?.substate?.state?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          states: [
            ...arr,
            {
              label: details?.substate?.state?.state_name,
              value: details?.substate?.state?.id,
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
      if (details?.substate?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          substate: [
            ...arr,
            {
              label: details?.substate?.substate_name,
              value: details?.substate?.id,
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
  };

  // Region State  Zone District Area  onChange drill down api end //

  useEffect(() => {
    //  getDistrict();

    console.log(details);

    if (details?.id) {
      regionOnChange({ value: details.substate?.state?.region?.id });
      stateOnChange({ value: details.substate?.state?.id });
      zoneOnChange({ value: details.substate?.id });
      let obj = {
        district_name: details.district_name,
        substate: details.substate?.id,
        region: details.substate?.state?.region?.id,
        state: details.substate?.state?.id,
        is_active: details.is_active,
      };

      // setHandleSelectBoxVal

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }

    const breadcrumbArray = [
      {
        title: "Manage Locations",
        link: "/manage-location/district-master",
      },
      {
        title: "District Master",
        link: "/manage-location/district-master",
      },
      {
        title: details?.id ? "Edit" : "Add",
      },
    ];
    dispatch(setBreadCrumb(breadcrumbArray));
    setAddEditFormFieldsList(addEditFormFields);
  }, [details]);

  useEffect(() => {
    // getAllStateMaster();
    getRegionMasterList();
    // getAllZone();
  }, []);

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
                              opt.label === details?.substate.substate_name
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
              </Box>
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
                  addDistrictMasterApiIsLoading ||
                  updateDistrictMasterApiIsLoading
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

export default AddEditFormDistrictMaster;
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
