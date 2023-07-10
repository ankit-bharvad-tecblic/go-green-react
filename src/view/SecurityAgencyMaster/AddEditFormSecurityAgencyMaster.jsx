import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField from "../../components/Elements/GenerateFormField";
import { addEditFormFields, schema } from "./fields";
import {
  useAddSecurityAgencyMasterMutation,
  useGetRegionMasterMutation,
  useGetSecurityAgencyMasterMutation,
  useUpdateSecurityAgencyMasterMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { MotionSlideUp } from "../../utils/animation";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import { useFetchLocationDrillDownMutation } from "../../features/warehouse-proposal.slice";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import CustomInput from "../../components/Elements/CustomInput";
import CustomFileInput from "../../components/Elements/CustomFileInput";
import CustomSwitch from "../../components/Elements/CustomSwitch";
import CustomTextArea from "../../components/Elements/CustomTextArea";
const AddEditFormSecurityAgencyMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { setValue, getValues } = methods;

  const [locationDrillDownState, setLocationDrillDownState] = useState({});

  const [addEditFormFieldsList, setAddEditFormFieldsList] =
    useState(addEditFormFields);

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    // earthQuack: [],
    regions: [],
    substate: [],
    districts: [],
    states: [],
    areas: [],
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

  const [
    getSecurityAgencyMaster,
    { isLoading: getSecurityAgencyMasterApiIsLoading },
  ] = useGetSecurityAgencyMasterMutation();
  const [
    addSecurityAgencyMaster,
    { isLoading: addSecurityAgencyMasterIsLoading },
  ] = useAddSecurityAgencyMasterMutation();

  const [
    updateSecurityAgencyMaster,
    { isLoading: updateSecurityAgencyMasterApiIsLoading },
  ] = useUpdateSecurityAgencyMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addSecurityAgencyMaster(data).unwrap();
      console.log("add security agency master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/security-guard-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const getSecurityAgency = async () => {
    try {
      const response = await getSecurityAgencyMaster().unwrap();

      console.log("Success:", response);

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
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const updateData = async (data) => {
    try {
      const response = await updateSecurityAgencyMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update security agency master res", response);
        toasterAlert(response);
        navigate("/security-agency-master");
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
      setSelectBoxOptions((prev) => ({
        ...prev,
        regions: response?.region?.map(({ region_name, id }) => ({
          label: region_name,
          value: id,
        })),
      }));
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

    setValue("area", null, {
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

      setSelectBoxOptions((prev) => ({
        ...prev,
        states: response?.state
          ?.filter((item) => item.state_name !== "All - State")
          .map(({ state_name, id }) => ({
            label: state_name,
            value: id,
          })),
      }));
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

    setValue("area", null, {
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

      setSelectBoxOptions((prev) => ({
        ...prev,
        substate: response?.substate
          ?.filter((item) => item.substate_name !== "All - Zone")
          .map(({ substate_name, id }) => ({
            label: substate_name,
            value: id,
          })),
      }));
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

    setValue("area", null, {
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

      setSelectBoxOptions((prev) => ({
        ...prev,
        districts: response?.district
          ?.filter((item) => item.district_name !== "All - District")
          .map(({ district_name, id }) => ({
            label: district_name,
            value: id,
          })),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const districtOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("district", val?.value, {
      shouldValidate: true,
    });

    setValue("area", null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      region: locationDrillDownState.region,
      state: locationDrillDownState.state,
      substate: locationDrillDownState.substate,
      district: val?.value,
    }));

    const query = {
      region: locationDrillDownState.region,
      state: locationDrillDownState.state,
      substate: locationDrillDownState.substate,
      district: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      setSelectBoxOptions((prev) => ({
        ...prev,
        areas: response?.area
          ?.filter((item) => item.area_name !== "All - District")
          .map(({ area_name, id }) => ({
            label: area_name,
            value: id,
          })),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const areaOnChange = (val) => {
    setValue("area", val?.value, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    getSecurityAgency();

    if (details?.id) {
      regionOnChange({ value: details.district?.substate?.state?.region?.id });
      stateOnChange({ value: details.district?.substate?.state?.id });
      zoneOnChange({ value: details.district?.substate?.id });
      districtOnChange({ value: details.district?.id });
      areaOnChange({ value: details.area?.id });
      let obj = {
        security_agency_name: details.security_agency_name,
        district_name: details.district?.id,
        substate: details.district?.substate?.id,
        region: details.district?.substate?.state?.region.id,
        state: details.district?.substate?.state.id,
        area: details.dustrict?.id,
        address: details.address,
        pincode: details.pincode,
        agency_contact_no: details.agency_contact_no,
        service_cost: details.service_cost,
        contact_person_name: details.contact_person_name,
        remarks: details.remarks,

        active: details.active,
      };
      console.log(details);

      // setHandleSelectBoxVal

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
    const breadcrumbArray = [
      {
        title: "Manage Vendors",
        link: "/security-agency-master",
      },
      {
        title: " Security Agency Master",
        link: "/security-agency-master",
      },
      {
        title: details?.id ? "Edit" : "Add",
      },
    ];
    dispatch(setBreadCrumb(breadcrumbArray));
  }, [details]);
  useEffect(() => {
    getRegionMasterList();
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
                      Security agency Name
                    </Text>
                    <CustomInput
                      name="security_agency_name"
                      placeholder="Security agency Name"
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

              {/* All the state, subState,region,district,area master html code stat from here */}
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
              <Box>
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
              </Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Box gap="4" display={{ base: "flex" }} alignItems="center">
                  <Text textAlign="right" w="550px">
                    Area
                  </Text>{" "}
                  <ReactCustomSelect
                    name="area"
                    label=""
                    isLoading={fetchLocationDrillDownApiIsLoading}
                    options={selectBoxOptions?.areas || []}
                    selectedValue={
                      selectBoxOptions?.areas?.filter(
                        (item) => item.value === getValues("area")
                      )[0] || {}
                    }
                    isClearable={false}
                    selectType="label"
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                    handleOnChange={(val) => {
                      areaOnChange(val);
                    }}
                  />
                </Box>
              </MotionSlideUp>
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
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Upload agreement
                    </Text>
                    <CustomFileInput
                      name={"upload_agreement"}
                      placeholder="Agreement upload"
                      label=""
                      type=""
                      onChange={(e) => {
                        console.log(e, "file");
                        setValue("upload_agreement", e, {
                          shouldValidate: true,
                        });
                      }}
                      value={getValues("upload_agreement")}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Box>
                </MotionSlideUp>
                <Box>
                  <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                    <Box gap="4" display={{ base: "flex" }} alignItems="center">
                      <Text textAlign="right" w="550px">
                        Remarks
                      </Text>
                      <CustomTextArea
                        name="remarks"
                        placeholder=" Remarks"
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
                  addSecurityAgencyMasterIsLoading ||
                  updateSecurityAgencyMasterApiIsLoading
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

export default AddEditFormSecurityAgencyMaster;
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
