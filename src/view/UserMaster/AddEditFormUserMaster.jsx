import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
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
import { addEditFormFields, schema } from "./fields";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { MotionSlideUp } from "../../utils/animation";
import CustomSelector from "../../components/Elements/CustomSelector";
import CustomInput from "../../components/Elements/CustomInput";
import CustomSwitch from "../../components/Elements/CustomSwitch";

import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
function AddEditFormUserMaster() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    states: [],
    district: [],
    zones: [],
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
  useEffect(() => {
    setAddEditFormFieldsList(addEditFormFields);
    if (details?.id) {
      let obj = {
        email: details.email,
        first_name: details.first_name,
        phone: details.phone,
        user_role: details.user_role,
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
              {/* <Box>
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
              </Box> */}
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
              </Box>
              {/* // This is for role dropdown */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Role
                    </Text>
                    <CustomSelector
                      name="user_role"
                      label=""
                      isChecked="details?.active"
                      options={selectBoxOptions.district}
                      selectedValue={selectBoxOptions.district.find(
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
