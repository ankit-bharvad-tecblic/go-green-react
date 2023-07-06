import { Box, Button, Text, calc } from "@chakra-ui/react";
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
  useGetStateMasterMutation,
  useAddStateMasterMutation,
  useUpdateStateMasterMutation,
  useGetRegionMasterMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { motion } from "framer-motion";
import { MotionScaleIn, MotionSlideUp, slideUp } from "../../utils/animation";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import { useFetchLocationDrillDownMutation } from "../../features/warehouse-proposal.slice";

const AddEditFormStateMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { setValue, getValues } = methods;

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);
  const [isClear, setIsClear] = useState(false);
  const details = location.state?.details;
  console.log("details ---> ", details);

  const [locationDrillDownState, setLocationDrillDownState] = useState({});

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    earthQuack: [],
    regions: [],
    zones: [],
    districts: [],
    states: [],
  });

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

  const [getStateMaster, { isLoading: getStateMasterApiIsLoading }] =
    useGetStateMasterMutation();

  const [addStateMaster, { isLoading: addStateMasterApiIsLoading }] =
    useAddStateMasterMutation();

  const [updateStateMaster, { isLoading: updateStateMasterApiIsLoading }] =
    useUpdateStateMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addStateMaster(data).unwrap();
      console.log("add state master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-location/state-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const getAllRegionMaster = async () => {
    try {
      const response = await getRegionMaster().unwrap();
      console.log("response ", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.region_name,
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateData = async (data) => {
    try {
      const response = await updateStateMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update state master res", response);
        toasterAlert(response);
        navigate("/manage-location/state-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

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
  };

  useEffect(() => {
    if (details?.id) {
      console.log(details);
      let obj = {
        state_name: details.state_name,
        region: details.region.id,
        state_code: details.state_code,
        tin_no: details.tin_no,
        gstn: details.gstn,
        nav_code: details.nav_code,
        ho_overhead: details.ho_overhead,
        state_overhead: details.state_overhead,
        state_india_office_addr: details.state_india_office_addr,
        is_active: details.is_active,
      };

      console.log(obj);

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }

    const breadcrumbArray = [
      {
        title: "Manage Locations",
        link: "/manage-location/state-master",
      },
      {
        title: "State Master",
        link: "/manage-location/state-master",
      },
      {
        title: details?.id ? "Edit" : "Add",
      },
    ];
    dispatch(setBreadCrumb(breadcrumbArray));
  }, [details]);

  useEffect(() => {
    setAddEditFormFieldsList(addEditFormFields);
  }, []);
  useEffect(() => {
    getAllRegionMaster();
    getRegionMasterList();
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
                  </Box>
                </MotionSlideUp>
              </Box>
              {addEditFormFieldsList &&
                addEditFormFieldsList.map((item, i) => (
                  <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
                    <Box
                      w="full"
                      gap="4"
                      display={{ base: "flex" }}
                      alignItems="center"
                    >
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
                          item?.options?.find((opt) => {
                            console.log("opt", opt);
                            console.log("details", details);
                            return opt.label === details?.region.region_name;
                          }),
                        selectType: "value",
                        isClearable: false,
                      })}
                    </Box>
                  </MotionSlideUp>
                ))}
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
                backgroundColor={"primary.700"}
                _hover={{ backgroundColor: "primary.700" }}
                color={"white"}
                borderRadius={"full"}
                isLoading={
                  addStateMasterApiIsLoading || updateStateMasterApiIsLoading
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

export default AddEditFormStateMaster;

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
