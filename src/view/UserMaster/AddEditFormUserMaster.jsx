import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
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
import CustomTextArea from "../../components/Elements/CustomTextArea";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
function AddEditFormUserMaster() {
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  // const [isTableVisible, setTableVisible] = useState(false);
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
    // handleSubmit: handleTableSubmit,

    formState: { errors: tableErrors },
  } = tableDataMethods;

  const [selectedData, setSelectedData] = useState([]);
  const [sections, setSections] = useState([]);
  const [client_location_list, setClient_location_list] = useState([]);
  const [selectedLocationList, setSelectedLocationList] = useState({
    region: {},
    state: {},
    substate: {},
    district: {},
    area: {},
  });
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    substate: [],
    districts: [],
    states: [],
    areas: [],
    roles: [],
    areas: [],
    reportingManager: [],
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
    console.log("client_location_list", tableData);
    const user_location = tableData?.map((el) => {
      return {
        region: el?.region?.value,
        state: el?.state?.value,
        substate: el?.substate?.value,
        district: el?.district?.value,
        area: el?.area?.value,
      };
    });
    if (details?.id) {
      let final_data = {
        ...data,
        user_location,
        id: details.id,
      };
      updateData(final_data);
    } else {
      let final_data = {
        ...data,
        user_location,
      };
      addData(final_data);
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

  // These is for reporting manager list code
  const getReportingManagerList = async () => {
    try {
      const response = await getUserMaster().unwrap();
      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.employee_name,
        value: item.id,
        count: item.designation,
      }));
      // let arr = onlyActive?.map((item) => ({
      //   label: item.employee_name,
      //   value: item.reporting_manager ? item.reporting_manager : null,
      // }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        reportingManager: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
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
    tableDataMethods.setValue("region", val?.value, {
      shouldValidate: true,
    });
    tableDataMethods.setValue("state", null, {
      shouldValidate: false,
    });

    tableDataMethods.setValue("substate", null, {
      shouldValidate: false,
    });

    tableDataMethods.setValue("district", null, {
      shouldValidate: false,
    });

    tableDataMethods.setValue("area", null, {
      shouldValidate: false,
    });

    setSelectedLocationList((prev) => ({
      ...prev,
      region: val,
      state: null,
      substate: null,
      district: null,
      area: null,
    }));

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
    tableDataMethods.setValue("state", val?.value, {
      shouldValidate: true,
    });

    tableDataMethods.setValue("substate", null, {
      shouldValidate: false,
    });

    tableDataMethods.setValue("district", null, {
      shouldValidate: false,
    });

    tableDataMethods.setValue("area", null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      region: locationDrillDownState.region,
      state: val?.value,
    }));

    setSelectedLocationList((prev) => ({
      ...prev,
      state: val,
      substate: null,
      district: null,
      area: null,
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
    tableDataMethods.setValue("substate", val?.value, {
      shouldValidate: true,
    });

    tableDataMethods.setValue("district", null, {
      shouldValidate: false,
    });

    tableDataMethods.setValue("area", null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      region: locationDrillDownState.region,
      state: locationDrillDownState.state,
      substate: val?.value,
    }));

    setSelectedLocationList((prev) => ({
      ...prev,
      substate: val,
      district: null,
      area: null,
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
    tableDataMethods.setValue("district", val?.value, {
      shouldValidate: true,
    });

    tableDataMethods.setValue("area", null, {
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

    setSelectedLocationList((prev) => ({
      ...prev,
      district: val,
      area: null,
    }));

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
    tableDataMethods.setValue("area", val?.value, {
      shouldValidate: true,
    });
    setSelectedLocationList((prev) => ({
      ...prev,

      area: val,
    }));
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
  const reset = () => {
    // Reset all form fields
    tableDataMethods.setValue("region", "", { shouldDirty: true });
    tableDataMethods.setValue("state", "", { shouldDirty: true });
    tableDataMethods.setValue("substate", "", { shouldDirty: true });
    tableDataMethods.setValue("district", "", { shouldDirty: true });
    tableDataMethods.setValue("area", "", { shouldDirty: true });

    // Set the edit index to null
    setEditIndex(null);
  };
  const handleFormSubmit = (data) => {
    console.log(data);
    console.log("selectedLocationList", selectedLocationList);
    // Check if all fields are selected
    // const isAllFieldsSelected =
    //   tableDataMethods.getValues("region") &&
    //   tableDataMethods.getValues("state") &&
    //   tableDataMethods.getValues("substate") &&
    //   tableDataMethods.getValues("district") &&
    //   tableDataMethods.getValues("area");

    //  setClient_location_list((prev) => [{ ...prev, data }]);
    setTableData((prev) => [...prev, selectedLocationList]);
    // selectedLocationList
    setSelectedLocationList((prev) => ({
      ...prev,
      region: {},
      state: {},
      substate: {},
      district: {},
      area: {},
    }));

    // if ( false && isAllFieldsSelected) {
    //   // Collect form data
    //   const formData = {
    //     region: getNameById("regions", tableDataMethods.getValues("region")),
    //     state: getNameById("states", tableDataMethods.getValues("state")),
    //     substate: getNameById(
    //       "substate",
    //       tableDataMethods.getValues("substate")
    //     ),
    //     district: getNameById(
    //       "districts",
    //       tableDataMethods.getValues("district")
    //     ),
    //     area: getNameById("areas", tableDataMethods.getValues("area")),
    //   };

    //   // Add new row or update existing row
    //   if (editIndex !== null) {
    //     const updatedTableData = [...tableData];
    //     updatedTableData[editIndex] = formData;
    //     setTableData(updatedTableData);
    //     setEditIndex(null);
    //   } else {
    //     setTableData((prevTableData) => [...prevTableData, formData]);
    //   }

    //   // Show the table

    //   // Reset the form
    //   reset();
    // }
    reset();
  };

  useMemo(() => {
    console.log(tableData);
  }, []);

  const handleEditRow = (index) => {
    const rowData = tableData[index];

    // const arr = [
    //   { id: 1, name: 'Alice' },
    //   { id: 1, name: 'Bob' },
    //   { id: 3, name: 'Charlie' },
    // ];

    // const indexToUpdate = index; // Index of the object to update

    // // Create a new object with the updated values
    // const updatedObject = { id: 1, name: 'Updated Bob' };

    // // Create a new array by spreading the original elements and replacing the object at the specified index
    // const newArr = [
    //   ...arr.slice(0, indexToUpdate), // Spread the elements before the index
    //   updatedObject, // Updated object
    //   ...arr.slice(indexToUpdate + 1), // Spread the elements after the index
    // ];

    // Assign the new array to the 'arr' variable

    setSelectedLocationList(() => ({
      ...prev,
      region: rowData.region,
      state: rowData.state,
      substate: rowData.substate,
      district: rowData.district,
      area: rowData.area,
    }));

    const regionId = getIdByLabel("regions", rowData.region);
    regionOnChange({ value: regionId });
    const stateId = getIdByLabel("states", rowData.state);
    stateOnChange({ value: stateId });
    const substateId = getIdByLabel("substate", rowData.substate);
    const districtId = getIdByLabel("districts", rowData.district);
    const areaId = getIdByLabel("areas", rowData.area);

    tableDataMethods.setValue("region", regionId, { shouldDirty: true });
    tableDataMethods.setValue("state", stateId, { shouldDirty: true });
    tableDataMethods.setValue("substate", substateId, { shouldDirty: true });
    tableDataMethods.setValue("district", districtId, { shouldDirty: true });
    tableDataMethods.setValue("area", areaId, { shouldDirty: true });
    // setTableData((prev) => [{ ...prev, selectedLocationList }]);
    setEditIndex(index);
  };

  const handleDeleteRow = (index) => {
    setTableData((prevTableData) => {
      const updatedData = [...prevTableData];
      updatedData.splice(index, 1);
      return updatedData;
    });
    setClient_location_list((prev) => {
      const updatedData = [...prev];
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
    getReportingManagerList();
    if (details?.id) {
      // regionOnChange({ value: details?.region?.id });
      //  stateOnChange({ value: details.state?.id });
      //  zoneOnChange({ value: details.district?.substate?.id });
      //  districtOnChange({ value: details.district?.id });
      let obj = {
        email: details?.email,
        employee_name: details?.employee_name,
        address: details?.address,
        designation: details?.designation,
        phone: details?.phone,
        user_role: details?.user_role?.map((item) => item.id) || [],
        reporting_manager: details?.reporting_manager.employee_name,
        pin_code: details?.pin_code,
        region: details?.region?.id,
        state: details?.state?.id,
        substate: details?.substate?.id,
        district: details?.district?.id,
        area: details?.area?.id,
        last_login: details?.last_login,
        is_active: details?.is_active,
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

  // const temp = [{ id: 1 }, { id: 2 }];
  // let tempmap = [2, 4];

  // const commonValues = temp
  //   .filter((item) => tempmap.includes(item.id))
  //   .map((item) => ({ id: item.id }));
  // console.log(commonValues, "here 4");
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
          <Box>
            {/*  maxHeight="calc( 100vh - 260px )" overflowY="auto" */}
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
                    <CustomTextArea
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
              {/* This is for reporting manager code */}

              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Reporting Manager
                    </Text>

                    <ReactCustomSelect
                      name="reporting_manager"
                      label=""
                      options={selectBoxOptions.reportingManager}
                      selectedValue={selectBoxOptions.reportingManager.find(
                        (opt) =>
                          opt.label === details?.reporting_manager.employee_name
                      )}
                      handleOnChange={(val) => {
                        setValue("reporting_manager", val.value, {
                          shouldValidate: true,
                        });
                        console.log("selected val", val);
                      }}
                      isClearable={false}
                      selectType={"value"}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                    {/* <CustomSelector
                      name="reporting_manager"
                      label=""
                      options={selectBoxOptions.reportingManager}
                      selectedValue={selectBoxOptions.reportingManager.find(
                        (opt) =>
                          opt.label === details?.reporting_manager.employee_name
                      )}
                      isClearable={false}
                      selectType={"value"}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    /> */}
                    {/* <CustomSelector
                      name="reporting_manager"
                      label=""
                      options={selectBoxOptions.reportingManager}
                      selectedValue={selectBoxOptions.reportingManager.find(
                        (opt) =>
                          opt.label ===
                          details?.reporting_manager?.employee_name
                      )}
                      isClearable={false}
                      selectType="value"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      formatOptionLabel={({ label, reportingManager }) => (
                        <Box>
                          <Text>{label}</Text>
                          {reportingManager && (
                            <Text fontSize="sm" color="gray.500">
                              Reporting Manager:{" "}
                              {reportingManager.employee_name}
                            </Text>
                          )}
                        </Box>
                      )}
                    /> */}
                  </Box>
                </MotionSlideUp>
              </Box>

              {/* Role called code */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Role
                    </Text>
                    {/* {console.log(getValues("user_role"), "here 3")}
                    {console.log(
                      selectBoxOptions?.roles?.filter((opt) =>
                        getValues("user_role").includes(opt.value)
                      ),
                      "here 2"
                    )} */}
                    <ReactCustomSelect
                      name="user_role"
                      label=""
                      options={selectBoxOptions?.roles || []}
                      // selectedValue={getValues("user_role")}
                      selectedValue={selectBoxOptions.roles?.filter((opt) =>
                        getValues("user_role")?.includes(opt.value)
                      )}
                      isClearable={false}
                      isMultipleSelect={true}
                      isLoading={false}
                      style={{ w: "100%" }}
                      handleOnChange={(val) => {
                        console.log("selectedOption @@@@@@@@@@@------> ", val);
                        let temp = val.map((item) => item.value);
                        console.log(temp, "here");
                        setValue("user_role", temp, { shouldValidate: true });
                      }}
                    />
                    {/* <CustomSelector
                      isMulti={true}
                      name="user_role"
                      label=""
                      isChecked="details?.active"
                      options={selectBoxOptions.roles}
                      selectedValue={selectBoxOptions.roles?.find(
                        (opt) => opt.label === details?.user_role?.role_name
                      )}
                      isClearable={false}
                      selectType={"value"}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    /> */}
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
              bottom={8}
              right={10}
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
                {/* {details?.id ? "Update" : "Add"} */}
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>

      {/* This is form for the state master and all  */}
      <FormProvider {...tableDataMethods}>
        <form onSubmit={tableDataMethods.handleSubmit(handleFormSubmit)}>
          {/* This is the start of the area zone state  */}
          <Box m="5">
            <Text fontWeight={"semibold"} fontSize={"23px"}>
              Data Accessibility
            </Text>
            <Box backgroundColor={"#DBFFF5"}>
              <Grid
                templateColumns="repeat(auto-fit, minmax(180px, 1fr))"
                gap={5}
                p={4}
              >
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Text>Region</Text>
                  <ReactCustomSelect
                    name="region"
                    label=""
                    isLoading={fetchLocationDrillDownApiIsLoading}
                    options={selectBoxOptions?.regions || []}
                    // selectedValue={
                    //   selectBoxOptions?.regions?.filter(
                    //     (item) =>
                    //       item.value === tableDataMethods.getValues("region")
                    //   )[0] || {}
                    // }
                    selectedValue={selectedLocationList?.region}
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
                    <Text>State</Text>
                    <ReactCustomSelect
                      name="state"
                      label=""
                      isLoading={fetchLocationDrillDownApiIsLoading}
                      options={selectBoxOptions?.states || []}
                      // selectedValue={
                      //   selectBoxOptions?.states?.filter(
                      //     (item) =>
                      //       item.value === tableDataMethods.getValues("state")
                      //   )[0] || {}
                      // }
                      selectedValue={selectedLocationList?.state}
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
                    <Text>Sub State</Text>
                    <ReactCustomSelect
                      name="substate"
                      label=""
                      isLoading={fetchLocationDrillDownApiIsLoading}
                      options={selectBoxOptions?.substate || []}
                      // selectedValue={
                      //   selectBoxOptions?.substate?.filter(
                      //     (item) =>
                      //       item.value ===
                      //       tableDataMethods.getValues("substate")
                      //   )[0] || {}
                      // }
                      selectedValue={selectedLocationList?.substate}
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
                  <Text>District</Text>{" "}
                  <ReactCustomSelect
                    name="district"
                    label=""
                    isLoading={fetchLocationDrillDownApiIsLoading}
                    options={selectBoxOptions?.districts || []}
                    // selectedValue={
                    //   selectBoxOptions?.districts?.filter(
                    //     (item) =>
                    //       item.value === tableDataMethods.getValues("district")
                    //   )[0] || {}
                    // }
                    selectedValue={selectedLocationList?.district}
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
                  <Text>Area</Text>{" "}
                  <ReactCustomSelect
                    name="area"
                    label=""
                    isLoading={fetchLocationDrillDownApiIsLoading}
                    options={selectBoxOptions?.areas || []}
                    // selectedValue={
                    //   selectBoxOptions?.areas?.filter(
                    //     (item) =>
                    //       item.value === tableDataMethods.getValues("area")
                    //   )[0] || {}
                    // }
                    selectedValue={selectedLocationList?.area}
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
              </Grid>
              <Flex justifyContent={"end"} px={5} alignItems={"center"}>
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
                  // onClick={handleFormSubmit}
                >
                  {editIndex !== null ? "Update" : "Add"}
                </Button>
              </Flex>
            </Box>
          </Box>

          {/* This is for table code  */}

          <Box mt={5}>
            {/* Display the table */}
            {/* {isTableVisible && ( */}
            <Box m={5}>
              <TableContainer>
                <Table color="#000">
                  <Thead bg="#dbfff5" border="1px" borderColor="#000">
                    <Tr style={{ color: "#000" }}>
                      <Th color="#000">Sr no</Th>
                      <Th color="#000">Region</Th>
                      <Th color="#000">State</Th>
                      <Th color="#000">Sub-State</Th>
                      <Th color="#000">District</Th>
                      <Th color="#000">Area</Th>
                      <Th color="#000">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody style={{ backgroundColor: "#ffffff" }}>
                    {tableData &&
                      tableData.map((data, index) => (
                        <Tr key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{data.region?.label}</Td>
                          <Td>{data.state?.label}</Td>
                          <Td>{data.substate?.label}</Td>
                          <Td>{data.district?.label}</Td>
                          <Td>{data.area?.label}</Td>
                          <Td>
                            <Flex gap="20px" justifyContent="center">
                              <Box color={"primary.700"}>
                                <BiEditAlt
                                  // color="#A6CE39"
                                  fontSize="26px"
                                  cursor="pointer"
                                  onClick={() => {
                                    handleEditRow(index);
                                  }}
                                />
                              </Box>
                              <Box color="red">
                                <AiOutlineDelete
                                  cursor="pointer"
                                  fontSize="26px"
                                  onClick={() => {
                                    handleDeleteRow(index);
                                  }}
                                />
                              </Box>
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            {/* )} */}
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
