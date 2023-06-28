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
  list,
} from "@chakra-ui/react";
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
  pwh_warehouse_details: {
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
    standard_warehouse_capacity: "standard_warehouse_capacity",
    standard_utilizes_capacity: "standard_utilised_capacity",
    lock_in_period: "lock_in_period",
    lock_in_period_month: "lock_in_period_month",
    covered_area: "covered_area",
    supervisor_for_day_shift: "supervisor_for_day_shift",
    supervisor_for_night_shift: "supervisor_for_night_shift",

    security_guard_for_day_shift: "security_guard_for_day_shift",
    security_guard_for_night_shift: "security_guard_for_night_shift",
  },

  pwh_commodity_details: {
    expected_commodity_name: "expected_commodity_name",
    commodity_inward_type: "commodity_inward_type",
    pre_stack_commodity: "pre_stack_commodity",
    pre_stack_commodity_quantity: "pre_stack_commodity_quantity",
    funding_required: "funding_required",
  },
  pwh_commercial_details: {
    minimum_rent: "minimum_rent",
    maximum_rent: "maximum_rent",
    avg_rent: "avg_rent",
    rent: "rent",
    total_rent_payable_months: "total_rent_payable_month",

    go_green_revenue_sharing_ratio: "go_green_revenue_sharing_ratio",
    security_deposit_amount: "security_deposit_amount",
    advance_rent: "advance_rent",
    advance_rent_month: "advance_rent_month",
    gst: "gst",
    commencement_date: "commencement_date",
    agreement_period: "agreement_period",
    expiry_date: "expiry_date",
    notice_period: "notice_period",
    storage_charges_according_to_commodity:
      "storage_charges_according_to_commodity",
    your_project: "your_project",
  },
};

const Pwh = () => {
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
  });
  const methods = useForm({
    // resolver: yupResolver(schema),
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
        {/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
        <Box mt="10">
          <Accordion allowMultiple>
            {/* ================ PWH WAREHOUSE DETAILS ================= */}
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
                          PWH WAREHOUSE DETAILS
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" />
                        ) : (
                          <AddIcon fontSize="12px" />
                        )}
                      </AccordionButton>

                      <AccordionPanel height={"auto"} bg="white" mt="3" pb={4}>
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                          {/* --------------  standard_warehouse_capacity (in MT)-------------- */}
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
                                  Standard Warehouse Capacity (in MT)
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                {" "}
                                <CustomInput
                                  name={
                                    formFieldsName.pwh_warehouse_details
                                      .standard_warehouse_capacity
                                  }
                                  placeholder=" Standard Warehouse Capacity (in MT)"
                                  type="text"
                                  label=""
                                  style={{ w: commonStyle.w }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          {/* --------------  standard_Utilizes_capacity (in MT)-------------- */}
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
                                  Standard Utilizes Capacity (in MT)
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                {" "}
                                <CustomInput
                                  name={
                                    formFieldsName.pwh_warehouse_details
                                      .standard_utilizes_capacity
                                  }
                                  placeholder="Standard Utilizes Capacity (in MT)"
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
                                    formFieldsName.pwh_warehouse_details
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
                                    formFieldsName.pwh_warehouse_details
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
                                <Box display="flex" gap="4" alignItems="center">
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.pwh_warehouse_details
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
                                <Box display="flex" alignItems="center" gap="4">
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.pwh_warehouse_details
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
                                <Box display="flex" alignItems="center" gap="4">
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.pwh_warehouse_details
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
                                <Box display="flex" alignItems="center" gap="4">
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.pwh_warehouse_details
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

            {/* ================ PWH COMMODITY DETAILS ================= */}
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
                          PWH COMMODITY DETAILS
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" />
                        ) : (
                          <AddIcon fontSize="12px" />
                        )}
                      </AccordionButton>

                      <AccordionPanel bg="white" mt="5" pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </AccordionPanel>
                    </Box>
                  </>
                )}
              </AccordionItem>
            </MotionSlideUp>

            {/* ================ PWH COMMERCIAL DETAILS ================= */}
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
                          PWH COMMERCIAL DETAILS
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" />
                        ) : (
                          <AddIcon fontSize="12px" />
                        )}
                      </AccordionButton>

                      <AccordionPanel bg="white" mt="5" pb={4} py="4" px="8">
                        <Box
                          //border="1px"
                          w={{
                            base: "100%",
                            sm: "100%",
                            md: "100%",
                            lg: "100%",
                            xl: "60%",
                          }}
                        >
                          {/* -------------- minimum Rent(per/sq ft/month)-------------- */}
                          <Box w="full">
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
                                    formFieldsName.pwh_commercial_details
                                      .minimum_rent
                                  }
                                  placeholder="minimum Rent(per/sq ft/month)"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          {/* --------------Maximum Rent(per/sq ft/month)-------------- */}
                          <Box>
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
                                    formFieldsName.pwh_commercial_details
                                      .maximum_rent
                                  }
                                  placeholder="Warehouse Name"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>

                          {/* --------------Avg Rent(per/sq ft/month)-------------- */}
                          <Box>
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
                                    formFieldsName.pwh_commercial_details
                                      .avg_rent
                                  }
                                  placeholder="Warehouse Name"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>

                          {/* -------------- Rent (per/sq ft/month)-------------- */}
                          <Box>
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
                                    formFieldsName.pwh_commercial_details.rent
                                  }
                                  placeholder="Warehouse Name"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>

                          {/* -------------- Total rent payable (per month) -------------- */}
                          <Box>
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
                                    formFieldsName.pwh_commercial_details
                                      .total_rent_payable_months
                                  }
                                  placeholder="Total rent payable (per month)"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                        </Box>

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
                                  formFieldsName.pwh_warehouse_details
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
                                  formFieldsName.pwh_warehouse_details
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
                                  formFieldsName.pwh_warehouse_details
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
                                  formFieldsName.pwh_warehouse_details
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
                            xl: "60%",
                          }}
                        >
                          {/* -------------- Go Green revenue sharing ratio-------------- */}
                          <Box w="full">
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
                                  Go Green revenue sharing ratio
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                <CustomInput
                                  name={
                                    formFieldsName.pwh_commercial_details
                                      .go_green_revenue_sharing_ratio
                                  }
                                  placeholder="Go Green revenue sharing ratio"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>

                          {/* -------------- Security deposit amount -------------- */}
                          <Box w="full">
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
                                    formFieldsName.pwh_commercial_details
                                      .security_deposit_amount
                                  }
                                  placeholder="Security deposit amount"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>

                          {/* -------------- Advance rent -------------- */}
                          <Box mt="3" w="full">
                            <Grid
                              // textAlign="right"
                              alignItems="center"
                              templateColumns="repeat(4, 1fr)"
                              justifyContent="flex-start"
                              gap={4}
                            >
                              <GridItem colSpan={2}>
                                {" "}
                                <Text textAlign="right">Advance rent</Text>{" "}
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
                          <Box mt="1" w="full">
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
                                    formFieldsName.pwh_commercial_details
                                      .advance_rent_month
                                  }
                                  placeholder="Advance rent(month)"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
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
                                    formFieldsName.pwh_commercial_details.gst
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
                                    formFieldsName.pwh_commercial_details
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
                                    formFieldsName.pwh_commercial_details
                                      .agreement_period
                                  }
                                  placeholder=" Agreement period (Month)"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
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
                                <Text textAlign="right">Expiry Date</Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                {" "}
                                <CustomInput
                                  name={
                                    formFieldsName.pwh_commercial_details
                                      .expiry_date
                                  }
                                  placeholder="Expiry Date"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
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
                                    formFieldsName.pwh_commercial_details
                                      .notice_period
                                  }
                                  placeholder="Notice period (Month)"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>

                          {/* -------------- storage Charges according to commodity -------------- */}
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
                                  storage Charges according to commodity
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2}>
                                {" "}
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.pwh_commercial_details
                                      .storage_charges_according_to_commodity
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
                                <CustomInput
                                  name={
                                    formFieldsName.pwh_commercial_details.rent
                                  }
                                  // placeholder="Warehouse Name"
                                  type="text"
                                  label=""
                                  style={{
                                    w: commonStyle.comm_details_style.w,
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

            {/* ================ PWH CLIENTS DETAILS ================= */}
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
                          PWH CLIENTS DETAILS
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" />
                        ) : (
                          <AddIcon fontSize="12px" />
                        )}
                      </AccordionButton>

                      <AccordionPanel bg="white" mt="5" pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </AccordionPanel>
                    </Box>
                  </>
                )}
              </AccordionItem>
            </MotionSlideUp>
          </Accordion>
        </Box>

        {/* <Box display="flex" justifyContent="flex-end" mt="10" px="0">
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
        </Box> */}
        {/* </form> */}
      </FormProvider>
    </Box>
  );
};

export default Pwh;
