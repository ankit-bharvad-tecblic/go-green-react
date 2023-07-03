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
  wms_warehouse_details: {
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
    standard_capacity: "standard_capacity",
    current_warehouse_capacity: "current_warehouse_capacity",
    current_utilizes_capacity: "current_utilizes_capacity",
    lock_in_period: "lock_in_period",
    lock_in_period_month: "lock_in_period_month",
    covered_area: "covered_area",
    supervisor_for_day_shift: "supervisor_for_day_shift",
    supervisor_for_night_shift: "supervisor_for_night_shift",
    security_guard_for_day_shift: "security_guard_for_day_shift",
    security_guard_for_night_shift: "security_guard_for_night_shift",
  },
  wms_commodity_details: {
    expected_commodity_name: "expected_commodity_name",
    commodity_inward_type: "commodity_inward_type",
    pre_stack_commodity: "pre_stack_commodity",
    pre_stack_commodity_quantity: "pre_stack_commodity_quantity",
    funding_required: "funding_required",
    bank_details: {
      bank_name: "bank_name",
      branch_name: "branch_name",
    },
  },
  wms_commercial_details: {
    minimum_rent: "minimum_rent",
    maximum_rent: "maximum_rent",
    avg_rent: "avg_rent",
    rent: "rent",
    total_rent_payable_months: "total_rent_payable_month",
    security_deposit_amount: "security_deposit_amount",
    advance_rent: "advance_rent",
    advance_rent_month: "advance_rent_month",
    gst: "gst",
    commencement_date: "commencement_date",
    agreement_period: "agreement_period",
    expiry_date: "expiry_date",
    notice_period: "notice_period",
    wms_charges_according_to_commodity: "wms_charges_according_to_commodity",
    your_project: "your_project",
  },
  wms_clients_details: {
    intention_letter: "intention_letter",
    remarks: "remarks",
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
  standard_capacity: yup.string().required("Standard capacity is required"),
  current_warehouse_capacity: yup
    .string()
    .required("Current warehouse capacity is required"),
  current_utilizes_capacity: yup
    .string()
    .required("Current utilized capacity is required"),
  lock_in_period: yup.string().required("Lock in period is required"),
  lock_in_period_month: yup
    .string()
    .required("Lock in period month is required"),
  covered_area: yup.string().required("Covered area is required"),
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
  funding_required: yup.string().required("Funding required is required"),
  minimum_rent: yup.string().required("Minimum rent is required"),
  maximum_rent: yup.string().required("Maximum rent is required"),
  avg_rent: yup.string().required("Avg rent is required"),
  rent: yup.string().required("rent is required"),
  total_rent_payable_month: yup
    .string()
    .required("Total rent payable month is required"),
  security_deposit_amount: yup
    .string()
    .required("Security deposit amount is required"),
  advance_rent: yup.string().required("Advance rent is required"),
  advance_rent_month: yup.string().required("Advance rent month is required"),
  gst: yup.string().required("gst is required"),
  commencement_date: yup.string().required("Commencement date is required"),
  agreement_period: yup.string().required("Agreement period is required"),
  expiry_date: yup.string().required("Expiry date is required"),
  notice_period: yup.string().required("Notice period is required"),
  wms_charges_according_to_commodity: yup
    .string()
    .required("WMS Charges according to commodity is required"),
  your_project: yup.string().required("Your project is required"),
  intention_letter: yup.string().required("Intention letter is required"),
  remarks: yup.string().required("remarks is required"),
});

const Wms = () => {
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });

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
              {/* ================ WMS WAREHOUSE DETAILS ================= */}
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
                            WMS WAREHOUSE DETAILS
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
                              xl: "70%",
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
                                      formFieldsName.wms_warehouse_details
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
                                      formFieldsName.wms_warehouse_details
                                        .region_name
                                    }
                                    label=""
                                    isLoading={getRegionMasterApiIsLoading}
                                    options={selectBoxOptions?.regions || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
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
                                      formFieldsName.wms_warehouse_details
                                        .state_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.states || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    style={{ w: commonStyle.w }}
                                    isLoading={getStateApiIsLoading}
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
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
                                      formFieldsName.wms_warehouse_details
                                        .zone_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.zones || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={getZoneApiIsLoading}
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
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
                                      formFieldsName.wms_warehouse_details
                                        .district_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.districts || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={getDistrictApiIsLoading}
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
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
                                      formFieldsName.wms_warehouse_details
                                        .area_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.areas || []}
                                    selectedValue={{}}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={getAreaMasterApiIsLoading}
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
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
                                      formFieldsName.wms_warehouse_details
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
                                      formFieldsName.wms_warehouse_details
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
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .no_of_chamber
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
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
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
                            {/* --------------  standard_capacity (in MT)-------------- */}
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
                                    Standard Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .standard_capacity
                                    }
                                    placeholder=" Standard Capacity (in MT)"
                                    type="text"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------  current_warehouse_capacity (in MT)-------------- */}
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
                                    Current Warehouse Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .current_warehouse_capacity
                                    }
                                    placeholder="Current Warehouse Capacity (in MT)"
                                    type="text"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------  current_Utilizes_capacity (in MT)-------------- */}
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
                                    Current Utilizes Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .current_utilizes_capacity
                                    }
                                    placeholder="Current Utilizes Capacity (in MT)"
                                    type="text"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------lock_in_period radio button -------------- */}{" "}
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
                                    {" "}
                                    Lock In Period
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
                            {/* --------------  lock_in_period_month------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  <Text textAlign="right">
                                    Lock In Period Month
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .lock_in_period_month
                                    }
                                    placeholder=" Lock In Period Month"
                                    type="text"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------  covered_area------------- */}
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
                                    Covered Area (In Sq.Ft)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .covered_area
                                    }
                                    placeholder="Covered Area (In Sq.Ft)"
                                    type="text"
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
                                        formFieldsName.wms_warehouse_details
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
                                      handleOnChange={(val) =>
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        )
                                      }
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
                                        formFieldsName.wms_warehouse_details
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
                                      handleOnChange={(val) =>
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        )
                                      }
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
                                        formFieldsName.wms_warehouse_details
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
                                      handleOnChange={(val) =>
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        )
                                      }
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
                                        formFieldsName.wms_warehouse_details
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
                                      handleOnChange={(val) =>
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        )
                                      }
                                    />
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="right"
                                      textDecoration="underline"
                                      cursor="pointer"
                                      sx={{textWrap:"nowrap"}}
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

              {/* ================ WMS COMMODITY DETAILS ================= */}
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
                            WMS COMMODITY DETAILS
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>

                        <AccordionPanel bg="white" mt="5" pb={4}>
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
                                      formFieldsName.wms_commodity_details
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
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
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
                                      formFieldsName.wms_commodity_details
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
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
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
                                      formFieldsName.wms_commodity_details
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
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
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
                                      formFieldsName.wms_commodity_details
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
                            {/* ================ Funding required ================= */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                templateColumns="repeat(4, 1fr)"
                                alignItems="center"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  <Text textAlign="right">
                                    Funding Required{" "}
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <RadioGroup p="0" defaultValue="2">
                                    <Stack spacing={5} direction="row">
                                      <Radio colorScheme="red" value="1">
                                        Yes
                                      </Radio>
                                      <Radio colorScheme="green" value="2">
                                        No
                                      </Radio>
                                    </Stack>
                                  </RadioGroup>
                                </GridItem>
                              </Grid>
                            </Box>
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
                                <Button>1</Button>
                              </GridItem>
                              <GridItem colSpan={3}>
                                <Text textAlign="left">Bank Name</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.wms_commodity_details
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
                                    formFieldsName.wms_commodity_details
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

              {/* ================ WMS COMMERCIAL DETAILS ================= */}
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
                            WMS COMMERCIAL DETAILS
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>

                        <AccordionPanel bg="white" mt="5" pb={4} py="4" px="8">
                          {/* {/ ================ Bank Details ================= /} */}
                          <Box mt={commonStyle.mt}>
                            <Flex
                              bgColor={"#DBFFF5"}
                              padding="20px"
                              borderRadius="10px"
                              gap="3"
                              alignItems="center"
                            >
                              {/* =============== SR No============= */}
                              <Box w="50px">
                                <Text mb="2" fontWeight="bold" textAlign="left">
                                  {" "}
                                  Sr No{" "}
                                </Text>{" "}
                                <Box
                                  textAlign="center"
                                  border="1px"
                                  p="2"
                                  borderColor="gray.10"
                                  borderRadius="6"
                                >
                                  1
                                </Box>
                              </Box>

                              {/* =============== Owner Name ============= */}
                              <Box w="170px">
                                <Text fontWeight="bold" textAlign="left">
                                  Owner Name
                                </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_warehouse_details
                                      .warehouse_name
                                  }
                                  placeholder="Warehouse Name"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </Box>

                              {/* =============== Mobile No ============= */}
                              <Box w="180px">
                                <Text fontWeight="bold" textAlign="left">
                                  Mobile No
                                </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_warehouse_details
                                      .warehouse_name
                                  }
                                  placeholder="Mobile No"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </Box>

                              {/* =============== Address ============= */}
                              <Box w="270px">
                                <Text fontWeight="bold" textAlign="left">
                                  Address
                                </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_warehouse_details
                                      .warehouse_name
                                  }
                                  placeholder="Address"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </Box>

                              {/* =============== Rent ============= */}

                              <Box w="160px">
                                <Text fontWeight="bold" textAlign="left">
                                  Rent
                                </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_warehouse_details
                                      .warehouse_name
                                  }
                                  placeholder="Rent"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </Box>

                              {/* =============== Add / Delete ============= */}
                              <Box w="180px">
                                <Box
                                  mt="7"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="flex-end"
                                  gap="2"
                                >
                                  <Button
                                    borderColor="gray.10"
                                    borderRadius="6"
                                    bg="primary.700"
                                    color="white"
                                    fontWeight="bold"
                                  >
                                    +
                                  </Button>

                                  <Button
                                    borderColor="gray.10"
                                    borderRadius="6"
                                    bg="red"
                                    color="white"
                                    fontWeight="bold"
                                  >
                                    -
                                  </Button>
                                </Box>
                              </Box>
                            </Flex>
                          </Box>
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
                            {/* -------------- minimum Rent(per/sq ft/month)-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                // textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                justifyContent="flex-start"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Minimum Rent(per/sq ft/month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .minimum_rent
                                    }
                                    placeholder="minimum Rent(per/sq ft/month)"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------Maximum Rent(per/sq ft/month)-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 2fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Maximum Rent(per/sq ft/month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .maximum_rent
                                    }
                                    placeholder="Warehouse Name"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* --------------Avg Rent(per/sq ft/month)-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 2fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Avg Rent(per/sq ft/month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .avg_rent
                                    }
                                    placeholder="Warehouse Name"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Rent (per/sq ft/month)-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 2fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Rent (per/sq ft/month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details.rent
                                    }
                                    placeholder="Warehouse Name"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Total rent payable (per month) -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 2fr)"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Total rent payable (per month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .total_rent_payable_months
                                    }
                                    placeholder="Total rent payable (per month)"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Security deposit amount -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                // textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                justifyContent="flex-start"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Security deposit amount
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .security_deposit_amount
                                    }
                                    placeholder="Security deposit amount"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Advance rent -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                // textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                justifyContent="flex-start"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Advance rent
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

                            {/* -------------- Advance rent(month) -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                // textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                justifyContent="flex-start"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  {" "}
                                  <Text textAlign="right">
                                    Advance rent(month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .advance_rent_month
                                    }
                                    placeholder="Advance rent(month)"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- GST-------------- */}
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
                                  <Text textAlign="right">GST</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_commercial_details.gst
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
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Commencement Date-------------- */}
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
                                    Commencement Date
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .commencement_date
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
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Agreement period (Month)-------------- */}
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
                                    Agreement period (Month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .agreement_period
                                    }
                                    placeholder=" Agreement period (Month)"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Expiry Date-------------- */}
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
                                    Expiry Date
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .expiry_date
                                    }
                                    placeholder="Expiry Date"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Notice period (Month)-------------- */}
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
                                    Notice period (Month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .notice_period
                                    }
                                    placeholder="Notice period (Month)"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- WMS Charges according to commodity -------------- */}
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
                                    WMS Charges according to commodity
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .wms_charges_according_to_commodity
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
                                    handleOnChange={(val) =>
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      )
                                    }
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Your projected                 -------------- */}
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
                                    Your projected
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomFileInput
                                    name={
                                      formFieldsName.wms_commercial_details.rent
                                    }
                                    // placeholder="Warehouse Name"
                                    type="text"
                                    label=""
                                    placeholder="Excel upload"
                                    style={{
                                      w: commonStyle.w,
                                    }}
                                  />
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

              {/* ================ WMS CLIENTS DETAILS ================= */}
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
                            WMS CLIENTS DETAILS
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
                              templateColumns="repeat(9, 1fr)"
                              alignItems="center"
                              gap={4}
                              bgColor={"#DBFFF5"}
                              padding="20px"
                              borderRadius="10px"
                            >
                              <GridItem colSpan={9}>
                                <Text textAlign="left">Client List</Text>{" "}
                              </GridItem>
                              <GridItem colSpan={1}>
                                <Text textAlign="left">Client Type</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.wms_commodity_details
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
                              <GridItem colSpan={1}>
                                <Text textAlign="left"> Client Name </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="client name"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              <GridItem colSpan={1}>
                                <Text textAlign="left"> Mobile Number </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="mobile number"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              <GridItem colSpan={1}>
                                <Text textAlign="left">Region</Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.wms_commodity_details
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
                              <GridItem colSpan={1}>
                                <Text textAlign="left">State </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.wms_commodity_details
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
                              <GridItem colSpan={1}>
                                <Text textAlign="left">Zone </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.wms_commodity_details
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
                              <GridItem colSpan={1}>
                                <Text textAlign="left">District </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.wms_commodity_details
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
                              <GridItem colSpan={1}>
                                <Text textAlign="left">Area </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.wms_commodity_details
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
                              <GridItem colSpan={1}>
                                <Text textAlign="left"> Address </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="address"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text textAlign="left"> WMS Charges </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="WMS charges"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text textAlign="left">Billing cycle </Text>{" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.wms_commodity_details
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
                              <GridItem colSpan={5}></GridItem>
                              <GridItem colSpan={2}>
                                <Text textAlign="left">
                                  {" "}
                                  Reservation Qty (Bales, MT){" "}
                                </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="Reservation Qty (Bales, MT)"
                                  type="text"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text textAlign="left">
                                  Reservation Period(Month)
                                </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="Reservation Period(Month)"
                                  type="date"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text textAlign="left">
                                  {" "}
                                  Reservation Start Date{" "}
                                </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="Reservation Start Date"
                                  type="date"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text textAlign="left">
                                  {" "}
                                  Reservation End Date{" "}
                                </Text>{" "}
                                <CustomInput
                                  name={
                                    formFieldsName.wms_commodity_details
                                      .pre_stack_commodity_quantity
                                  }
                                  placeholder="Reservation End Date"
                                  type="date"
                                  label=""
                                  style={{ w: "100%" }}
                                />
                              </GridItem>
                              <GridItem colSpan={1}>
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
                            //border="1px"
                            w={{
                              base: "100%",
                              sm: "100%",
                              md: "100%",
                              lg: "100%",
                              xl: "90%",
                            }}
                          >
                            {/* ================ Intention Letter ================= */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                templateColumns="repeat(4, 1fr)"
                                alignItems="center"
                                gap={4}
                              >
                                <GridItem colSpan={2}>
                                  <Text textAlign="right">
                                    Intention Letter
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomFileInput
                                    name={
                                      formFieldsName.wms_clients_details
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
                                      formFieldsName.wms_clients_details.remarks
                                    }
                                    placeholder="Remarks"
                                    label=""
                                  />
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

export default Wms;
