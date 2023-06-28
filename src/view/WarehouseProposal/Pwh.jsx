import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
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
    <Box bg="gray.50" p="5">
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

                      <AccordionPanel
                        height={"auto"}
                        bg="white"
                        mt="3"
                        pb={4}
                        //position="relative"
                      >
                        <Box
                          //  border="1px"
                          ml={{ base: 28 }}
                          w={{
                            base: "100%",
                            sm: "80%",
                            md: "60%",
                            lg: "80%",
                            xl: "50%",
                          }}
                          // position="absolute"
                          // left={0}
                          p="4"
                        >
                          <Box>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              gap={4}
                            >
                              <GridItem colSpan={2} h="10" bg="tomato">
                                dfdf
                              </GridItem>
                              <GridItem
                                colStart={4}
                                colEnd={6}
                                h="10"
                                bg="papayawhip"
                              />
                            </Grid>
                          </Box>

                          {/* --------------  Warehouse Name -------------- */}
                          <Box
                            // w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Warehouse Name
                            </Text>{" "}
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
                          </Box>

                          {/* -------------- Region -------------- */}
                          <Box
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                            mt={commonStyle.mt}
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Region
                            </Text>{" "}
                            <ReactCustomSelect
                              name={
                                formFieldsName.pwh_warehouse_details.region_name
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
                          </Box>

                          {/* -------------- State -------------- */}

                          <Box
                            mt={commonStyle.mt}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              State
                            </Text>{" "}
                            <ReactCustomSelect
                              name={
                                formFieldsName.pwh_warehouse_details.state_name
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
                          </Box>

                          {/* -------------- Zone -------------- */}

                          <Box
                            mt={commonStyle.mt}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Zone
                            </Text>{" "}
                            <ReactCustomSelect
                              name={
                                formFieldsName.pwh_warehouse_details.zone_name
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
                          </Box>

                          {/* -------------- District -------------- */}

                          <Box
                            mt={commonStyle.mt}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              District
                            </Text>{" "}
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
                          </Box>

                          {/* -------------- Area -------------- */}

                          <Box
                            mt={commonStyle.mt}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Area
                            </Text>{" "}
                            <ReactCustomSelect
                              name={
                                formFieldsName.pwh_warehouse_details.area_name
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
                          </Box>

                          {/* -------------- Warehouse address -------------- */}

                          <Box
                            mt={commonStyle.mt}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Warehouse Address
                            </Text>{" "}
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
                          </Box>

                          {/* --------------  Pin Code -------------- */}
                          <Box
                            // w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Pin Code
                            </Text>{" "}
                            <CustomInput
                              name={
                                formFieldsName.pwh_warehouse_details.pin_code
                              }
                              placeholder="Pin Code"
                              type="text"
                              label=""
                              style={{ w: commonStyle.w }}
                            />
                          </Box>

                          {/* -------------- No of chamber -------------- */}

                          <Box
                            mt={commonStyle.mt}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              No Of Chambers
                            </Text>{" "}
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
                          </Box>

                          {/* --------------warehouse_in_factory_premises radio button -------------- */}

                          <Box
                            // mt={commonStyle.mt}
                            mt={4}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right">
                              Warehouse In Factory Premises
                            </Text>{" "}
                            <Box
                              // w={commonStyle.w}

                              textAlign="right"
                            >
                              <RadioGroup p="0" defaultValue="2">
                                <Stack spacing={5} direction="row">
                                  <Radio colorScheme="red" value="1">
                                    Radio
                                  </Radio>
                                  <Radio colorScheme="green" value="2">
                                    Radio
                                  </Radio>
                                </Stack>
                              </RadioGroup>
                            </Box>
                          </Box>

                          {/* --------------  standard_capacity (in MT)-------------- */}
                          <Box
                            // w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Standard Capacity (in MT)
                            </Text>{" "}
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
                          </Box>

                          {/* --------------  standard_warehouse_capacity (in MT)-------------- */}
                          <Box
                            // w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Standard Warehouse Capacity (in MT)
                            </Text>{" "}
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
                          </Box>

                          {/* --------------  standard_warehouse_capacity (in MT)-------------- */}
                          <Box
                            // w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Standard Utilizes Capacity (in MT)
                            </Text>{" "}
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
                          </Box>

                          {/* --------------lock_in_period radio button -------------- */}

                          <Box
                            // mt={commonStyle.mt}
                            mt={4}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              {" "}
                              Lock In Period
                            </Text>{" "}
                            <Box w={commonStyle.w} textAlign="right">
                              <RadioGroup p="0" defaultValue="2">
                                <Stack spacing={5} direction="row">
                                  <Radio colorScheme="red" value="1">
                                    Radio
                                  </Radio>
                                  <Radio colorScheme="green" value="2">
                                    Radio
                                  </Radio>
                                </Stack>
                              </RadioGroup>
                            </Box>
                          </Box>

                          {/* --------------  lock_in_period_month------------- */}
                          <Box
                            // w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Lock In Period Month
                            </Text>{" "}
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
                          </Box>

                          {/* --------------  covered_area------------- */}
                          <Box
                            // w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Covered Area (In Sq.Ft)
                            </Text>{" "}
                            <CustomInput
                              name={
                                formFieldsName.pwh_warehouse_details
                                  .lock_in_period_month
                              }
                              placeholder="Covered Area (In Sq.Ft)"
                              type="text"
                              label=""
                              style={{ w: commonStyle.w }}
                            />
                          </Box>

                          {/* -------------- supervisor_for_day_shift -------------- */}

                          <Box
                            mt={commonStyle.mt}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Supervisor For day Shift
                            </Text>{" "}
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
                          </Box>

                          {/* -------------- supervisor_for_night_shift -------------- */}

                          <Box
                            mt={commonStyle.mt}
                            w="full"
                            gap="10"
                            display={{ base: "flex" }}
                            alignItems="center"
                          >
                            {" "}
                            <Text textAlign="right" w="210px">
                              Supervisor For day Shift
                            </Text>{" "}
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
                          </Box>
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
