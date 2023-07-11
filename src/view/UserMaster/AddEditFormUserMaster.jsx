import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import generateFormField from "../../components/Elements/GenerateFormField";
import {
  useAddUserMasterMutation,
  useGetAreaMasterMutation,
  useGetDistrictMasterMutation,
  useGetRegionMasterMutation,
  useGetRoleMasterMutation,
  useGetStateMasterMutation,
  useGetUserMasterMutation,
  useGetZoneMasterMutation,
  useUpdateUserMasterMutation,
} from "../../features/master-api-slice";
import { addEditFormFields, schema, tableschema } from "./fields";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { MotionSlideUp } from "../../utils/animation";
import CustomSelector from "../../components/Elements/CustomSelector";
import CustomInput from "../../components/Elements/CustomInput";
import CustomSwitch from "../../components/Elements/CustomSwitch";

import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import { useFetchLocationDrillDownMutation } from "../../features/warehouse-proposal.slice";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
function AddEditFormUserMaster() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const tableDataMethods = useForm({
    resolver: yupResolver(tableschema),
  });

  const {
    setValue,
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const {
    handleSubmit: handleTableSubmit,
    register: registerTable,
    formState: { errors: tableErrors },
  } = tableDataMethods;

  const [selectedData, setSelectedData] = useState([]);
  const [sections, setSections] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isTableVisible, setTableVisible] = useState(false);

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    substate: [],
    districts: [],
    states: [],
    areas: [],
    roles: [],
    areas: [],
    reporting_managers: [],
    users: [],
  });
  const [getStateMaster] = useGetStateMasterMutation();
  const [getRegionMaster] = useGetRegionMasterMutation();
  const [getDistrictMaster] = useGetDistrictMasterMutation();
  const [getZoneMaster] = useGetZoneMasterMutation();
  const [getRoleMaster] = useGetRoleMasterMutation();
  const [getUserMaster] = useGetUserMasterMutation();
  const [getAreaMaster] = useGetAreaMasterMutation();

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);
  const [locationDrillDownState, setLocationDrillDownState] = useState({});
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

  const [addUserMaster, { isLoading: addUserMasterApiIsLoading }] =
    useAddUserMasterMutation();
  const [updateUserMaster, { isLoading: updateUserMasterApiIsLoading }] =
    useUpdateUserMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addUserMaster(data).unwrap();
      console.log("add User master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-users/user-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };
  // const getAllStateMaster = async () => {
  //   try {
  //     const response = await getStateMaster().unwrap();
  //     console.log("response ", response);
  //     let onlyActive = response?.results?.filter((item) => item.is_active);
  //     let arr = onlyActive?.map((item) => ({
  //       label: item.state_name,
  //       value: item.id,
  //     }));

  //     console.log(arr);

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
  //     setSelectBoxOptions((prev) => ({
  //       ...prev,
  //       states: arr,
  //     }));
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const getRegionMasterList = async () => {
  //   try {
  //     const response = await getRegionMaster().unwrap();
  //     console.log("Success:", response);
  //     let onlyActive = response?.results?.filter((item) => item.is_active);

  //     let arr = onlyActive?.map((item) => ({
  //       label: item.region_name,
  //       value: item.id,
  //     }));

  //     console.log(arr);

  //     setSelectBoxOptions((prev) => ({
  //       ...prev,
  //       regions: arr,
  //     }));
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const getAllDistrict = async () => {
  //   try {
  //     const response = await getDistrictMaster().unwrap();

  //     console.log("Success:", response);
  //     let onlyActive = response?.results?.filter((item) => item.is_active);
  //     let arr = onlyActive?.map((item) => ({
  //       label: item.district_name,
  //       value: item.id,
  //     }));

  //     setSelectBoxOptions((prev) => ({ ...prev, district: arr }));
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const getAllRole = async () => {
    try {
      const response = await getRoleMaster().unwrap();

      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.role_name,
        value: item.id,
      }));

      setSelectBoxOptions((prev) => ({ ...prev, roles: arr }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //API of all zone data
  // const getAllZone = async () => {
  //   try {
  //     const response = await getZoneMaster().unwrap();

  //     console.log("Success:", response);
  //     console.log(details);
  //     let onlyActive = response?.results?.filter((item) => item.is_active);
  //     let arr = onlyActive?.map((item) => ({
  //       label: item.zone_name,
  //       value: item.id,
  //     }));
  //     console.log(arr);

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
  //     console.log(arr);
  //     setSelectBoxOptions((prev) => ({
  //       ...prev,
  //       zones: arr,
  //     }));
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const getAllArea = async () => {
  //   try {
  //     const response = await getAreaMaster().unwrap();

  //     console.log("Success:", response);
  //     let onlyActive = response?.results?.filter((item) => item.is_active);
  //     let arr = onlyActive?.map((item) => ({
  //       label: item.area_name,
  //       value: item.id,
  //     }));

  //     setSelectBoxOptions((prev) => ({ ...prev, areas: arr }));
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const [
    fetchLocationDrillDown,
    { isLoading: fetchLocationDrillDownApiIsLoading },
  ] = useFetchLocationDrillDownMutation();

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

  const updateData = async (data) => {
    try {
      const response = await updateUserMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update User master res", response);
        toasterAlert(response);
        navigate("/manage-users/user-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  // const handleFormSubmit = () => {
  //   // Collect form data
  //   const formData = {
  //     region: getNameById("region", getValues("region")),
  //     state: getNameById("state", getValues("state")),
  //     substate: getNameById("substate", getValues("substate")),
  //     district: getNameById("district", getValues("district")),
  //     area: getNameById("area", getValues("area")),
  //   };

  //   if (editIndex !== null) {
  //     // Update existing row
  //     setTableData((prevTableData) => {
  //       const updatedData = [...prevTableData];
  //       updatedData[editIndex] = formData;
  //       return updatedData;
  //     });
  //     setEditIndex(null);
  //   } else {
  //     // Add new row
  //     setTableData((prevTableData) => [...prevTableData, formData]);
  //   }
  // };

  const handleFormSubmit = () => {
    // Collect form data
    const formData = {
      region: getNameById("regions", getValues("region")),
      state: getNameById("states", getValues("state")),
      substate: getNameById("substate", getValues("substate")),
      district: getNameById("districts", getValues("district")),
      area: getNameById("areas", getValues("area")),
    };
    console.log(formData, "here");

    // Add new row
    setTableData((prevTableData) => [...prevTableData, formData]);

    // Show the table
    setTableVisible(true);
  };

  const handleEditRow = (index) => {
    const rowData = tableData[index];
    const regionId = getIdByLabel("regions", rowData.region);
    regionOnChange({ value: regionId });
    const stateId = getIdByLabel("states", rowData.state);
    stateOnChange({ value: stateId });
    const substateId = getIdByLabel("substate", rowData.substate);
    const districtId = getIdByLabel("districts", rowData.district);
    const areaId = getIdByLabel("areas", rowData.area);

    setValue("region", regionId, { shouldDirty: true });
    setValue("state", stateId, { shouldDirty: true });
    setValue("substate", substateId, { shouldDirty: true });
    setValue("district", districtId, { shouldDirty: true });
    setValue("area", areaId, { shouldDirty: true });

    setEditIndex(index);
  };

  const handleDeleteRow = (index) => {
    setTableData((prevTableData) => {
      const updatedData = [...prevTableData];
      updatedData.splice(index, 1);
      return updatedData;
    });
  };

  const getNameById = (fieldName, id) => {
    const fieldOptions = selectBoxOptions[fieldName];
    const selectedOption = fieldOptions?.find((option) => option.value === id);
    return selectedOption ? selectedOption.label : "";
  };

  const getIdByLabel = (fieldName, label) => {
    const fieldOptions = selectBoxOptions[fieldName];
    const selectedOption = fieldOptions?.find(
      (option) => option.label === label
    );
    return selectedOption ? selectedOption.value : "";
  };

  useEffect(() => {
    setAddEditFormFieldsList(addEditFormFields);
    if (details?.id) {
      regionOnChange({ value: details?.region?.id });
      stateOnChange({ value: details.state?.id });
      zoneOnChange({ value: details.district?.substate?.id });
      districtOnChange({ value: details.district?.id });
      let obj = {
        email: details.email,
        first_name: details.first_name,
        phone: details.phone,
        user_role: details.user_role,
        region: details?.region?.id,
        state: details?.state?.id,
        substate: details.substate?.id,
        district: details?.district?.id,
        area: details.area?.id,
        // last_login: details.last_login,
        is_active: details.is_active,
      };
      console.log("details", details);
      console.log("obj", obj);

      Object.keys(obj).forEach(function (key) {
        console.log("key value test : " + key + " : " + obj[key]);
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
    // getAllStateMaster();
    // getRegionMasterList();
    // getAllDistrict();
    // getAllZone();
    getAllRole();
    // getAllArea();
    // getAllReportingManager();
    // getAllUsers();
    const breadcrumbArray = [
      {
        title: "Manage Users",
        link: "/manage-users/user-master",
      },
      {
        title: "User Master",
        link: "/manage-users/user-master",
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
    // <Box bg={"white"}>
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
                        isChecked: details?.is_active,
                        style: { mb: 1, mt: 1 },
                      })}
                    </Box>
                  </MotionSlideUp>
                ))}

              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Address
                    </Text>
                    <CustomInput
                      name="address"
                      placeholder=" Address"
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
                      Pin Code
                    </Text>
                    <CustomInput
                      name="pin_code"
                      placeholder=" Pin code
                      "
                      type="number"
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
                      User Email
                    </Text>
                    <CustomInput
                      name="email"
                      placeholder=" User Mail
                      "
                      type="email"
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
                      Role
                    </Text>
                    <CustomSelector
                      isMulti={true}
                      name="user_role"
                      label=""
                      isChecked="details?.active"
                      options={selectBoxOptions.roles}
                      selectedValue={selectBoxOptions.roles.find(
                        (opt) => opt.label === details?.user_role
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
              {/* <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Password
                    </Text>
                    <CustomInput
                      name="password"
                      placeholder=" password
                      "
                      type="password"
                      InputDisabled={details?.id ? true : false}
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Box>
                </MotionSlideUp>
              </Box> */}
              {/* // This is for role dropdown */}

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
              mr="6"
              px="0"
              position={"absolute"}
              bottom={10}
              right={0}
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
                  addUserMasterApiIsLoading || updateUserMasterApiIsLoading
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

      {/* This is form for the state master and all  */}
      <FormProvider {...tableDataMethods}>
        <form onSubmit={tableDataMethods.handleSubmit(handleTableSubmit)}>
          {/* This is the start of the area zone state  */}
          <Box m="5">
            <Text fontWeight={"semibold"}>Data Accessibility</Text>
            <Box backgroundColor={"#DBFFF5"}>
              <Flex p={4} gap={5} flexWrap={"wrap"}>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Text w="100px">Region</Text>
                  <ReactCustomSelect
                    name="region"
                    label=""
                    isLoading={fetchLocationDrillDownApiIsLoading}
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
                </MotionSlideUp>

                <Box>
                  <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                    <Text w="100px">State</Text>
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
                  </MotionSlideUp>
                </Box>
                <Box>
                  <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                    <Text w="100px">Sub State</Text>
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
                  </MotionSlideUp>
                </Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Text w="100px">District</Text>{" "}
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
                </MotionSlideUp>

                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Text w="100px">Area</Text>{" "}
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
                </MotionSlideUp>
                <Button
                  type="submit"
                  //w="full"
                  backgroundColor={"primary.700"}
                  _hover={{ backgroundColor: "primary.700" }}
                  color={"white"}
                  borderRadius={"full"}
                  isLoading={
                    addUserMasterApiIsLoading || updateUserMasterApiIsLoading
                  }
                  my={"4"}
                  px={"10"}
                  onClick={handleFormSubmit}
                >
                  {editIndex !== null ? "Update" : "Add"}
                </Button>
              </Flex>
            </Box>
          </Box>

          {/* This is for table code  */}

          <Box m={5}>
            {/* Display the table */}
            {isTableVisible && (
              <Box m={5}>
                <TableContainer>
                  <Table>
                    <Thead style={{ backgroundColor: "#DBFFF5" }}>
                      <Tr>
                        <Th>Sr no</Th>
                        <Th>Region</Th>
                        <Th>State</Th>
                        <Th>Sub-State</Th>
                        <Th>District</Th>
                        <Th>Area</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody style={{ backgroundColor: "#ffffff" }}>
                      {tableData.map((data, index) => (
                        <Tr key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{data.region}</Td>
                          <Td>{data.state}</Td>
                          <Td>{data.substate}</Td>
                          <Td>{data.district}</Td>
                          <Td>{data.area}</Td>
                          <Td>
                            <Button
                              onClick={() => handleEditRow(index)}
                              size="sm"
                              colorScheme="teal"
                              mr={2}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteRow(index)}
                              size="sm"
                              colorScheme="red"
                            >
                              Delete
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </form>
      </FormProvider>
    </Box>
    // </Box>
  );
}

export default AddEditFormUserMaster;

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
  /* <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Region
                    </Text>
                    <CustomSelector
                      name="region_id"
                      label=""
                      options={selectBoxOptions.regions}
                      selectedValue={selectBoxOptions.regions.find(
                        (opt) => opt.label === details?.region_id.region_name
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
                      name="state_id"
                      label=""
                      options={selectBoxOptions.states}
                      selectedValue={selectBoxOptions.states.find(
                        (opt) => opt?.label === details?.state_id.state_name
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
                      name="zone_id"
                      label=""
                      options={selectBoxOptions.zones}
                      selectedValue={selectBoxOptions.zones.find(
                        (opt) => opt.label === details?.zone_id.zone_name
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
                      District
                    </Text>
                    <CustomSelector
                      name="district_id"
                      label=""
                      isChecked="details?.active"
                      options={selectBoxOptions.district}
                      selectedValue={selectBoxOptions.district.find(
                        (opt) =>
                          opt.label === details?.district_id.district_name
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
                      Area
                    </Text>
                    <CustomSelector
                      name="area_id"
                      label=""
                      options={selectBoxOptions.areas}
                      selectedValue={selectBoxOptions.areas.find(
                        (opt) => opt.label === details?.area?.area_name
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
              </Box> */
}
