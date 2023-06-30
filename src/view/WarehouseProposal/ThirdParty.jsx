import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  Textarea,
  list,
} from "@chakra-ui/react";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { BreadcrumbLinks } from "./BreadcrumbLinks";
import BreadcrumbCmp from "../../components/BreadcrumbCmp/BreadcrumbCmp";
import CustomSelector from "../../components/Elements/CustomSelector";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MotionSlideUp } from "../../utils/animation";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import CustomInput from "../../components/Elements/CustomInput";
import {
  useGetAreaMasterMutation,
  useGetDistrictMasterMutation,
  useGetRegionMasterMutation,
  useGetStateMasterMutation,
  useGetZoneMasterMutation,
} from "../../features/master-api-slice";
import CustomTextArea from "../../components/Elements/CustomTextArea";
import CustomFileInput from "../../components/Elements/CustomFileInput";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";

const commonStyle = {
  mt: 2,
  w: {
    base: "100%",
    sm: "80%",
    md: "60%",
    lg: "55%",
  },
  comm_details_style: {
    w: "90%",
  },
};

const formFieldsName = {
  tp_warehouse_details: {
    warehouse_name: "warehouse_name",
    region_name: "region_name",
    state_name: "state_name",
    zone_name: "zone_name",
    district_name: "district_name",
    area_name: "area_name",
    warehouse_address: "warehouse_address",
    pin_code: "pin_code",
    no_of_chamber: "no_of_chamber",
    warehouse_in_factory_premises: "warehouse_in_factory_premises",
    no_of_warehouse_in_area: "no_of_warehouse_in_area",
    supervisor_for_day_shift: "supervisor_for_day_shift",
    supervisor_for_night_shift: "supervisor_for_night_shift",
    security_guard_for_day_shift: "security_guard_for_day_shift",
    security_guard_for_night_shift: "security_guard_for_night_shift",
  },
  tp_commodity_details: {
    expected_commodity_name: "expected_commodity_name",
    commodity_inward_type: "commodity_inward_type",
    pre_stack_commodity: "pre_stack_commodity",
    pre_stack_commodity_quantity: "pre_stack_commodity_quantity",
    cc_banker: "cc_banker",
  },
  tp_commercial_details: {
    cm_proposal_business_form: "cm_proposal_business_form",
  },
  tp_clients_details: {
    intention_letter: "intention_letter",
    remarks: "remarks",
    assign_inspection_to: "assign_inspection_to",
  },
};

const schema = yup.object().shape({
  warehouse_name: yup.string().required("Warehouse name is required"),
  region_name: yup.string().required("Region name is required"),
  state_name: yup.string().required("State name is required"),
  zone_name: yup.string().required("Zone name is required"),
  district_name: yup.string().required("District name is required"),
  area_name: yup.string().required("Area name is required"),
  warehouse_address: yup.string().required("Warehouse address is required"),
  pin_code: yup.string().required("Pin code is required"),
  no_of_chamber: yup.string().required("No of chamber is required"),
  warehouse_in_factory_premises: yup
    .string()
    .required("Warehouse in factory premises is required"),
  no_of_warehouse_in_area: yup
    .string()
    .required("NO of Warehouse in area is required"),
  supervisor_for_day_shift: yup
    .string()
    .required("Supervisor for day shift is required"),
  supervisor_for_night_shift: yup
    .string()
    .required("Supervisor for night shift is required"),
  security_guard_for_day_shift: yup
    .string()
    .required("Security guard for day shift is required"),
  security_guard_for_night_shift: yup
    .string()
    .required("Security guard for night shift is required"),
  expected_commodity_name: yup
    .string()
    .required("Expected commodity name is required"),
  commodity_inward_type: yup
    .string()
    .required("Commodity inward type is required"),
  pre_stack_commodity: yup.string().required("Pre stack commodity is required"),
  pre_stack_commodity_quantity: yup
    .string()
    .required("Pre stack commodity quantity is required"),
  cc_banker: yup.string().required("CC Banker required is required"),
  cm_proposal_business_form: yup
    .string()
    .required("CM proposal business form is required"),
  intention_letter: yup.string().required("Intention letter is required"),
  remarks: yup.string().required("remarks is required"),
  assign_inspection_to: yup.string().required("Assign Inspection is required"),
});

const ThirdParty = () => {
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { setValue } = methods;

  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  const [getRegionMaster, { isLoading: getRegionMasterApiIsLoading }] =
    useGetRegionMasterMutation();

  const [getStateMaster, { isLoading: getStateApiIsLoading }] =
    useGetStateMasterMutation();

  const [getZoneMaster, { isLoading: getZoneApiIsLoading }] =
    useGetZoneMasterMutation();

  const [getDistrictMaster, { isLoading: getDistrictApiIsLoading }] =
    useGetDistrictMasterMutation();

  const [getAreaMaster, { isLoading: getAreaMasterApiIsLoading }] =
    useGetAreaMasterMutation();

  const getRegionMasterList = async () => {
    try {
      const response = await getRegionMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          regions: response?.results.map(({ region_name, id }) => ({
            label: region_name,
            id: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getStateList = async () => {
    try {
      const response = await getStateMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          states: response?.results.map(({ state_name, id }) => ({
            label: state_name,
            id: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getZonesList = async () => {
    try {
      const response = await getZoneMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          zones: response?.results.map(({ zone_name, id }) => ({
            label: zone_name,
            id: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDistrictMasterList = async () => {
    try {
      const response = await getDistrictMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          districts: response?.results.map(({ district_name, id }) => ({
            label: district_name,
            id: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAreaMasterList = async () => {
    try {
      const response = await getAreaMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          areas: response?.results.map(({ area_name, id }) => ({
            label: area_name,
            id: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getRegionMasterList();
    getStateList();
    getZonesList();
    getDistrictMasterList();
    getAreaMasterList();
  }, []);

  return (
    <Box bg="gray.50" p="0">
      {/* <Box p="2">
          <BreadcrumbCmp BreadcrumbList={BreadcrumbLinks} />
        </Box> */}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box mt="10">
            <Accordion allowMultiple>
              {/* ================ THIRD PARTY WAREHOUSE DETAILS ================= */}
              <MotionSlideUp duration={0.2 * 0.5} delay={0.1 * 0.5}>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <Box>
                        <AccordionButton bg="white" p="4" borderRadius={10}>
                          <Box
                            fontWeight="bold"
                            as="span"
                            flex="1"
                            textAlign="left"
                          >
                            THIRD PARTY WAREHOUSE DETAILS
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>

                        <AccordionPanel
                          height={"auto"}
                          bg="white"
                          mt="3"
                          pb={4}
                        >
                          <Box
                            //border="1px"
                            w={{
                              base: "100%",
                              sm: "100%",
                              md: "100%",
                              lg: "100%",
                              xl: "90%",
                            }}
                          >
                            {/* --------------  Warehouse Name -------------- */}
                            <Box>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Warehouse Name
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .warehouse_name
                                    }
                                    placeholder="Warehouse Name"
                                    type="text"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- Region -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">Region</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .region_name
                                    }
                                    label=""
                                    isLoading={getRegionMasterApiIsLoading}
                                    options={selectBoxOptions?.regions || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) => {
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      );
                                      setValue(
                                        formFieldsName.tp_warehouse_details
                                          .region_name,
                                        val.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- State -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">State</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .state_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.states || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    style={{ w: commonStyle.w }}
                                    isLoading={getStateApiIsLoading}
                                    handleOnChange={(val) => {
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      );
                                      setValue(
                                        formFieldsName.tp_warehouse_details
                                          .state_name,
                                        val.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- Zone -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">Zone</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .zone_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.zones || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={getZoneApiIsLoading}
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) => {
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      );
                                      setValue(
                                        formFieldsName.tp_warehouse_details
                                          .zone_name,
                                        val.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- District -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  <Text textAlign="right">District</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .district_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.districts || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={getDistrictApiIsLoading}
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) => {
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      );
                                      setValue(
                                        formFieldsName.tp_warehouse_details
                                          .district_name,
                                        val.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- Area -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">Area</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .area_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.areas || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={getAreaMasterApiIsLoading}
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) => {
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      );
                                      setValue(
                                        formFieldsName.tp_warehouse_details
                                          .area_name,
                                        val.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- Warehouse address -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Warehouse Address
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomTextArea
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .warehouse_address
                                    }
                                    placeholder="Warehouse Address"
                                    type="textarea"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------  Pin Code -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">Pin Code</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .pin_code
                                    }
                                    placeholder="Pin Code"
                                    type="text"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- No of chamber -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    No Of Chambers
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .no_of_chamber
                                    }
                                    placeholder="Pin Code"
                                    type="text"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------warehouse_in_factory_premises radio button -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Warehouse In Factory Premises
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <RadioGroup p="0" defaultValue="no">
                                    <Stack spacing={5} direction="row">
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value="yes"
                                      >
                                        Yes
                                      </Radio>
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value="no"
                                      >
                                        No
                                      </Radio>
                                    </Stack>
                                  </RadioGroup>
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------  No. Of warehouse in Area -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  <Text textAlign="right">
                                    No. Of warehouse in Area
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .no_of_warehouse_in_area
                                    }
                                    placeholder="Pin Code"
                                    type="number"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- supervisor_for_day_shift -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  <Text textAlign="right">
                                    Supervisor For day Shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <Box
                                    display="flex"
                                    gap="4"
                                    alignItems="center"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.tp_warehouse_details
                                          .supervisor_for_day_shift
                                      }
                                      label=""
                                      options={[
                                        {
                                          label: "1",
                                          value: 1,
                                        },
                                      ]}
                                      selectedValue={{}}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={false}
                                      style={{ w: commonStyle.w }}
                                      handleOnChange={(val) => {
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        );
                                        setValue(
                                          formFieldsName.tp_warehouse_details
                                            .supervisor_for_day_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="right"
                                      textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      Hire new supervisor
                                    </Text>{" "}
                                  </Box>
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- supervisor_for_night_shift -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  <Text textAlign="right">
                                    Supervisor For night Shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.tp_warehouse_details
                                          .supervisor_for_night_shift
                                      }
                                      label=""
                                      options={[
                                        {
                                          label: "1",
                                          value: 1,
                                        },
                                      ]}
                                      selectedValue={{}}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={false}
                                      style={{ w: commonStyle.w }}
                                      handleOnChange={(val) => {
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        );
                                        setValue(
                                          formFieldsName.tp_warehouse_details
                                            .supervisor_for_night_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="right"
                                      textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      Hire new supervisor
                                    </Text>{" "}
                                  </Box>
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- security_guard_for_day_shift -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  <Text textAlign="right">
                                    Security Guard For day shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.tp_warehouse_details
                                          .security_guard_for_day_shift
                                      }
                                      label=""
                                      options={[
                                        {
                                          label: "1",
                                          value: 1,
                                        },
                                      ]}
                                      selectedValue={{}}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={false}
                                      style={{ w: commonStyle.w }}
                                      handleOnChange={(val) => {
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        );
                                        setValue(
                                          formFieldsName.tp_warehouse_details
                                            .security_guard_for_day_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="right"
                                      textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      Hire new security guard
                                    </Text>{" "}
                                  </Box>
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- security_guard_for_night_shift -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  <Text textAlign="right">
                                    Security Guard For night shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.tp_warehouse_details
                                          .security_guard_for_night_shift
                                      }
                                      label=""
                                      options={[
                                        {
                                          label: "1",
                                          value: 1,
                                        },
                                      ]}
                                      selectedValue={{}}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={false}
                                      style={{ w: commonStyle.w }}
                                      handleOnChange={(val) => {
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        );
                                        setValue(
                                          formFieldsName.tp_warehouse_details
                                            .security_guard_for_night_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="right"
                                      textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      Hire new security guard
                                    </Text>{" "}
                                  </Box>
                                </GridItem>
                              </Grid>
                            </Box>
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            mt="10"
                            px="0"
                          >
                            <Button
                              type="button"
                              //w="full"
                              backgroundColor={"primary.700"}
                              _hover={{ backgroundColor: "primary.700" }}
                              color={"white"}
                              borderRadius={"full"}
                              isLoading={false}
                              my={"4"}
                              px={"10"}
                            >
                              Save as Draft
                            </Button>
                          </Box>
                        </AccordionPanel>
                      </Box>
                    </>
                  )}
                </AccordionItem>
              </MotionSlideUp>

              {/* ================ THIRD PARTY COMMODITY DETAILS ================= */}
              <MotionSlideUp duration={0.2 * 0.7} delay={0.1 * 0.7}>
                <AccordionItem mt="4">
                  {({ isExpanded }) => (
                    <>
                      <Box>
                        <AccordionButton bg="white" p="4" borderRadius={10}>
                          <Box
                            fontWeight="bold"
                            as="span"
                            flex="1"
                            textAlign="left"
                          >
                            THIRD PARTY COMMODITY DETAILS
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>

                        <AccordionPanel bg="white" mt="5" pb={4}>
                          {/* ================ Expected Commodity Name ================= */}
                          <Box>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="center"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                <Text textAlign="right">
                                  Expected Commodity Name
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .expected_commodity_name
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "1",
                                      value: 1,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: commonStyle.w }}
                                  handleOnChange={(val) => {
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    );
                                    setValue(
                                      formFieldsName.tp_commodity_details
                                        .expected_commodity_name,
                                      val.value,
                                      { shouldValidate: true }
                                    );
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          {/* ================ Commodity Inward Type ================= */}
                          <Box mt={commonStyle.mt}>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="center"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                <Text textAlign="right">
                                  Commodity Inward Type
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .commodity_inward_type
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: commonStyle.w }}
                                  handleOnChange={(val) => {
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    );
                                    setValue(
                                      formFieldsName.tp_commodity_details
                                        .commodity_inward_type,
                                      val.value,
                                      { shouldValidate: true }
                                    );
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          {/* ================ Pre-Stack Commodity ================= */}
                          <Box mt={commonStyle.mt}>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="center"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                <Text textAlign="right">
                                  Pre-Stack Commodity
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: commonStyle.w }}
                                  handleOnChange={(val) => {
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    );
                                    setValue(
                                      formFieldsName.tp_commodity_details
                                        .pre_stack_commodity,
                                      val.value,
                                      { shouldValidate: true }
                                    );
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          {/* ================ Pre-Stack Commodity Quantity(MT) ================= */}
                          <Box mt={commonStyle.mt}>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="center"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                <Text textAlign="right">
                                  Pre-Stack Commodity Quantity(MT)
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                <CustomInput
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="Pre-Stack Commodity Quantity(MT)"
                                  type="number"
                                  label=""
                                  style={{ w: commonStyle.w }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          {/* ================ Cc-Banker Commodity ================= */}
                          <Box mt={commonStyle.mt}>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="center"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                <Text textAlign="right">CC Banker</Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .cc_banker
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: commonStyle.w }}
                                  handleOnChange={(val) => {
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    );
                                    setValue(
                                      formFieldsName.tp_commodity_details
                                        .cc_banker,
                                      val.value,
                                      { shouldValidate: true }
                                    );
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          {/* ================ Bank Details ================= */}
                          <Box mt={commonStyle.mt}>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(12, 1fr)"
                              alignItems="center"
                              gap={4}
                              bgColor={"#DBFFF5"}
                              padding="20px"
                              borderRadius="10px"
                            >
                              <GridItem colSpan={12}>
                                <Text textAlign="left">Bank Details</Text>{" "}
                              </GridItem>
                              <GridItem colSpan={1}>
                                <Text textAlign="left"> Sr No </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="Sr No"
                                  type="number"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              <GridItem colSpan={3}>
                                <Text textAlign="left">Bank Name</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text textAlign="left">Branch Name </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              <GridItem colSpan={6}>
                                <Flex
                                  gap="10px"
                                  justifyContent="end"
                                  alignItems="center"
                                >
                                  <MdAddBox color="#A6CE39" fontSize="45px" />
                                  <MdIndeterminateCheckBox
                                    color="#FF4444"
                                    fontSize="45px"
                                  />
                                </Flex>
                              </GridItem>
                            </Grid>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            mt="10"
                            px="0"
                          >
                            <Button
                              type="button"
                              //w="full"
                              backgroundColor={"primary.700"}
                              _hover={{ backgroundColor: "primary.700" }}
                              color={"white"}
                              borderRadius={"full"}
                              isLoading={false}
                              my={"4"}
                              px={"10"}
                            >
                              Save as Draft
                            </Button>
                          </Box>
                        </AccordionPanel>
                      </Box>
                    </>
                  )}
                </AccordionItem>
              </MotionSlideUp>

              {/* ================ THIRD PARTY COMMERCIAL DETAILS ================= */}
              <MotionSlideUp duration={0.2 * 0.9} delay={0.1 * 0.9}>
                <AccordionItem mt="4">
                  {({ isExpanded }) => (
                    <>
                      <Box>
                        <AccordionButton bg="white" p="4" borderRadius={10}>
                          <Box
                            fontWeight="bold"
                            as="span"
                            flex="1"
                            textAlign="left"
                          >
                            THIRD PARTY COMMERCIAL DETAILS
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>

                        <AccordionPanel bg="white" mt="5" pb={4} py="4" px="8">
                          {/* ================ CM proposal business form ================= */}
                          <Box mt={commonStyle.mt}>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="center"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                <Text textAlign="right">
                                  CM proposal business form
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                <CustomFileInput
                                  name={
                                    formFieldsName.tp_commercial_details
                                      .cm_proposal_business_form
                                  }
                                  placeholder="Excel upload"
                                  label=""
                                  type=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                  style={{ w: commonStyle.w }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                        </AccordionPanel>
                      </Box>
                    </>
                  )}
                </AccordionItem>
              </MotionSlideUp>

              {/* ================ THIRD PARTY CLIENTS DETAILS ================= */}
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <AccordionItem mt="4">
                  {({ isExpanded }) => (
                    <>
                      <Box>
                        <AccordionButton bg="white" p="4" borderRadius={10}>
                          <Box
                            fontWeight="bold"
                            as="span"
                            flex="1"
                            textAlign="left"
                          >
                            THIRD PARTY CLIENTS DETAILS
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>

                        <AccordionPanel bg="white" mt="5" pb={4}>
                          {/* ================ Client List ================= */}
                          <Box>
                            <Grid
                              textAlign="right"
                              templateColumns={{
                                base: "1fr",
                                sm: "repeat(2, 1fr)",
                                md: "repeat(3, 1fr)",
                                lg: "repeat(4, 1fr)",
                              }}
                              alignItems="center"
                              gap={4}
                              bgColor={"#DBFFF5"}
                              padding="20px"
                              borderRadius="10px"
                            >
                              <GridItem
                                colSpan={{ base: 1, sm: 2, md: 3, lg: 4 }}
                              >
                                <Text textAlign="left">Client List</Text>{" "}
                              </GridItem>
                              {/* ================ Client Type ================= */}
                              <GridItem>
                                <Text textAlign="left">Client Type</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ Client Name ================= */}
                              <GridItem>
                                <Text textAlign="left"> Client Name </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="client name"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              {/* ================ Mobile Number ================= */}
                              <GridItem>
                                <Text textAlign="left"> Mobile Number </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="mobile number"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              {/* ================ Region ================= */}
                              <GridItem>
                                <Text textAlign="left">Region</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ State ================= */}
                              <GridItem>
                                <Text textAlign="left">State </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ Zone ================= */}
                              <GridItem>
                                <Text textAlign="left">Zone </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ District ================= */}
                              <GridItem>
                                <Text textAlign="left">District </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ Area ================= */}
                              <GridItem>
                                <Text textAlign="left">Area </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ Address ================= */}
                              <GridItem>
                                <Text textAlign="left"> Address </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="address"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              {/* ================ Client known to GGWPL official ================= */}
                              <GridItem>
                                <Text textAlign="left">
                                  Client known to GGWPL official
                                </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ Client Sourced by ================= */}
                              <GridItem>
                                <Text textAlign="left">Client Sourced by</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ Bank Name ================= */}
                              <GridItem>
                                <Text textAlign="left">Bank Name</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ Branch Name ================= */}
                              <GridItem>
                                <Text textAlign="left">Branch Name</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              {/* ================ Employee Name ================= */}
                              <GridItem>
                                <Text textAlign="left">Employee Name</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_commodity_details
                                      .pre_stack_commodity
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: "100%" }}
                                  handleOnChange={(val) =>
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    )
                                  }
                                />
                              </GridItem>
                              <GridItem colSpan={{ base: 1, sm: 2, md: 1, lg: 2 }}>
                                <Flex
                                  gap="10px"
                                  justifyContent="end"
                                  alignItems="center"
                                >
                                  <MdAddBox color="#A6CE39" fontSize="45px" />
                                  <MdIndeterminateCheckBox
                                    color="#FF4444"
                                    fontSize="45px"
                                  />
                                </Flex>
                              </GridItem>
                            </Grid>
                          </Box>
                          {/* ================ Intention Letter ================= */}
                          <Box mt={commonStyle.mt}>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="center"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                <Text textAlign="right">Intention Letter</Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                <CustomFileInput
                                  name={
                                    formFieldsName.tp_clients_details
                                      .intention_letter
                                  }
                                  placeholder="Excel upload"
                                  label=""
                                  type=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                  style={{ w: commonStyle.w }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          {/* ================ Remarks ================= */}
                          <Box mt={commonStyle.mt}>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="start"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                <Text textAlign="right">Remarks</Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2} textAlign={"left"}>
                                <Textarea
                                  width={commonStyle.w}
                                  name={
                                    formFieldsName.tp_clients_details.remarks
                                  }
                                  placeholder="Remarks"
                                  label=""
                                />
                              </GridItem>
                            </Grid>
                          </Box>

                          {/* ================ Assign Inspection to Commodity ================= */}
                          <Box mt={commonStyle.mt}>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="center"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                <Text textAlign="right">
                                  Assign Inspection to
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.tp_clients_details
                                      .assign_inspection_to
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: 1,
                                    },
                                    {
                                      label: "Pre-stock",
                                      value: 2,
                                    },
                                    {
                                      label: "Take over",
                                      value: 3,
                                    },
                                  ]}
                                  selectedValue={{}}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: commonStyle.w }}
                                  handleOnChange={(val) => {
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    );
                                    setValue(
                                      formFieldsName.tp_clients_details
                                        .assign_inspection_to,
                                      val.value,
                                      { shouldValidate: true }
                                    );
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            mt="10"
                            px="0"
                          >
                            <Button
                              type="button"
                              //w="full"
                              backgroundColor={"primary.700"}
                              _hover={{ backgroundColor: "primary.700" }}
                              color={"white"}
                              borderRadius={"full"}
                              isLoading={false}
                              my={"4"}
                              px={"10"}
                            >
                              Save as Draft
                            </Button>
                          </Box>
                        </AccordionPanel>
                      </Box>
                    </>
                  )}
                </AccordionItem>
              </MotionSlideUp>
            </Accordion>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt="10" px="0">
            <Button
              type="submit"
              //w="full"
              backgroundColor={"primary.700"}
              _hover={{ backgroundColor: "primary.700" }}
              color={"white"}
              borderRadius={"full"}
              isLoading={false}
              my={"4"}
              px={"10"}
            >
              Submit
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default ThirdParty;
