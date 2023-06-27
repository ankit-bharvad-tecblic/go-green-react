import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
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
  useGetRegionMasterMutation,
  useGetStateMasterMutation,
  useGetZoneMasterMutation,
} from "../../features/master-api-slice";

const WarehouseProposal = () => {
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

  // const getZonesList = async () => {
  //   try {
  //     const response = await getZoneMaster().unwrap();
  //     console.log("Success:", response);
  //     if (response.status === 200) {
  //       setSelectBoxOptions((prev) => ({
  //         ...prev,
  //         zones: response?.results.map(({ zone_name, id }) => ({
  //           label: zone_name,
  //           id: id,
  //         })),
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  useEffect(() => {
    getRegionMasterList();
    getStateList();
    // getZonesList();
    //getDistrictList();
  }, []);

  return (
    <Box bg="gray.50" p="5">
      {/* <Box p="2">
        <BreadcrumbCmp BreadcrumbList={BreadcrumbLinks} />
      </Box> */}

      <Box>
        <Heading as="h2" size="lg">
          Hiring Proposal
        </Heading>
      </Box>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            bg="white"
            p="5"
            borderRadius={10}
            mt="4"
            display={{ base: "column", md: "flex" }}
          >
            <Box w="full" p="3">
              <MotionSlideUp duration={0.2 * 0.5} delay={0.1 * 0.5}>
                <ReactCustomSelect
                  name="Select-warehouse-Type"
                  label="Select warehouse Type"
                  options={[{ label: "testing ", value: "dslfj" }]}
                  selectedValue={{ label: "test", value: "test" }}
                  isClearable={false}
                  selectType="label"
                  style={{ w: "full" }}
                  handleOnChange={(val) =>
                    console.log("selectedOption @@@@@@@@@@@------> ", val)
                  }
                />
              </MotionSlideUp>
            </Box>

            <Box w="full" p="3">
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <ReactCustomSelect
                  name="Select-warehouse-Type"
                  label="Select warehouse Type"
                  options={[{ label: "testing ", value: "dslfj" }]}
                  selectedValue={{ label: "test", value: "test" }}
                  isClearable={false}
                  selectType="label"
                  style={{ w: "full" }}
                  handleOnChange={(val) =>
                    console.log("selectedOption @@@@@@@@@@@------> ", val)
                  }
                />
              </MotionSlideUp>
            </Box>
          </Box>

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

                        <AccordionPanel height={450} bg="white" mt="3" pb={4}>
                          <Box ml={{ base: 26 }} w="60%" p="4">
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
                                name="warehouse_name"
                                placeholder="Warehouse Name"
                                type="text"
                                label=""
                                style={{}}
                              />
                            </Box>

                            {/* -------------- Region -------------- */}
                            <Box
                              w="full"
                              gap="10"
                              display={{ base: "flex" }}
                              alignItems="center"
                            >
                              {" "}
                              <Text textAlign="right" w="210px">
                                Region
                              </Text>{" "}
                              <ReactCustomSelect
                                name="Select-warehouse-Type"
                                label=""
                                isLoading={getRegionMasterApiIsLoading}
                                options={selectBoxOptions?.regions || []}
                                selectedValue={{}}
                                isClearable={false}
                                selectType="label"
                                style={{ w: "full" }}
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
                                name="Select-warehouse-Type"
                                label=""
                                options={selectBoxOptions?.states || []}
                                selectedValue={{}}
                                isClearable={false}
                                selectType="label"
                                style={{ w: "full" }}
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
                                name="Select-warehouse-Type"
                                label=""
                                options={selectBoxOptions?.zones || []}
                                selectedValue={{}}
                                isClearable={false}
                                selectType="label"
                                isLoading={getZoneApiIsLoading}
                                style={{ w: "full" }}
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
                                name="Select-warehouse-Type"
                                label=""
                                options={selectBoxOptions?.districts || []}
                                selectedValue={{}}
                                isClearable={false}
                                selectType="label"
                                isLoading={false}
                                style={{ w: "full" }}
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
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

export default WarehouseProposal;
