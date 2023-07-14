import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
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
  useAddBankMasterMutation,
  useGetRegionMasterMutation,
  useGetStateMasterMutation,
  useUpdateBankMasterMutation,
} from "../../features/master-api-slice";
import { addEditFormFields, schema } from "./fields";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

import CustomSelector from "../../components/Elements/CustomSelector";
import CustomSwitch from "../../components/Elements/CustomSwitch";
import CustomTextArea from "../../components/Elements/CustomTextArea";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import { useFetchLocationDrillDownMutation } from "../../features/warehouse-proposal.slice";

import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import CustomInput from "../../components/Elements/CustomInput";
import CustomFileInput from "../../components/Elements/CustomFileInput";
import { BiDownload, BiEditAlt } from "react-icons/bi";
function AddEditFormBankMaster() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [getStateMaster] = useGetStateMasterMutation();
  // const [getBankMaster] = useGetBankMasterMutation();

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    states: [],
    sector: [
      {
        label: "Public Sector",
        value: "public",
      },
      {
        label: "Private Sector",
        value: "private",
      },
    ],
  });
  // Define a state variable to hold the table data
  const [tableData, setTableData] = useState([]);

  // Function to handle form submission and add data to the table
  const handleSubmit = (formData) => {
    // Assuming formData is an object containing the form values
    const newData = {
      cm_rate: formData.cm_rate,
      agreement_start_date: formData.agreement_start_date,
      agreement_end_date: formData.agreement_end_date,
      agreement_path: formData.agreement_path,
    };

    // Add the new data to the table
    setTableData([...tableData, newData]);
    for (const [key, value] of Object.entries(newData)) {
      console.log(`${key}: ${value}`);
      methods.setValue(key, "", { shouldValidate: false });
    }
  };

  const handleDownload = async (agreementPath) => {
    try {
      const response = await fetch(agreementPath, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      const fileBlob = await response.blob();

      // Create a temporary URL for the Blob object
      const fileURL = URL.createObjectURL(fileBlob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = fileURL;
      link.target = "_blank";
      link.download = agreementPath.substr(agreementPath.lastIndexOf("/") + 1);

      // Append the link to the document body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up by removing the link from the document body
      document.body.removeChild(link);
    } catch (error) {
      console.log("Failed to download file:", error);
    }
  };

  const [addBankMaster, { isLoading: addBankMasterApiIsLoading }] =
    useAddBankMasterMutation();

  const [updateBankMaster, { isLoading: updateBankMasterApiIsLoading }] =
    useUpdateBankMasterMutation();

  const { setValue, getValues } = methods;

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

  const addData = async (data) => {
    try {
      const response = await addBankMaster(data).unwrap();
      console.log("add bank master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/bank-master/bank-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  // const options = [
  //   { value: "private sector ", label: "private sector " },
  //   { value: "public sector   ", label: "public sector  " },
  // ];
  const getAllStateMaster = async () => {
    try {
      const response = await getStateMaster().unwrap();
      console.log("response ", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);

      let arr = onlyActive?.map((item) => ({
        label: item.state_name,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        states: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const getBank = async () => {
  //   try {
  //     const response = await getBankMaster().unwrap();

  //     console.log("Success:", response);

  //     let arr = response?.results.map((type) => ({
  //       // label: type.commodity_type,
  //       value: type.id,
  //     }));

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
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // location drill down api hook
  const [
    fetchLocationDrillDown,
    { isLoading: fetchLocationDrillDownApiIsLoading },
  ] = useFetchLocationDrillDownMutation();

  const getRegionMasterList = async () => {
    try {
      const response = await fetchLocationDrillDown().unwrap();
      console.log("getRegionMasterList:", response);

      const arr = response?.region
        ?.filter((item) => item.region_name !== "ALL - Region")
        .map(({ region_name, id }) => ({
          label: region_name,
          value: id,
        }));

      if (details?.region?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          regions: [
            ...arr,
            {
              label: details?.region?.region_name,
              value: details?.region?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          regions: arr,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const regionOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("region", val?.value, {
      shouldValidate: true,
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

      const arr = response?.state
        ?.filter((item) => item.state_name !== "All - State")
        .map(({ state_name, id }) => ({
          label: state_name,
          value: id,
        }));

      if (details?.state?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          states: [
            ...arr,
            {
              label: details?.state?.state_name,
              value: details?.state?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          states: arr,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const stateOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("state", val?.value, {
      shouldValidate: true,
    });
  };

  // Region State  Zone District Area  onChange drill down api end //

  const updateData = async (data) => {
    try {
      const response = await updateBankMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update bank master res", response);
        toasterAlert(response);
        navigate("/bank-master/bank-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  useEffect(() => {
    if (details?.id) {
      console.log("detail s", details);
      regionOnChange({ value: details.region?.id });
      let obj = {
        bank_name: details?.bank_name,
        region: details?.region?.id,
        state: details?.state?.id,
        sector: details?.sector,
        bank_address: details?.bank_address,
        //   cm_rate: details?.cm_rate,
        // agreement_path: details?.agreement_path,
        // agreement_end_date: details?.agreement_end_date,
        // agreement_start_date: details?.agreement_start_date,
        is_active: details.is_active,
        bank_sector: details?.bank_sector,
      };
      console.log("details", details);
      console.log("obj", obj);

      Object.keys(obj).forEach(function (key) {
        console.log("key value test : " + key + " : " + obj[key]);
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
    setAddEditFormFieldsList(
      addEditFormFields.map((field) => {
        if (field.type === "select") {
          return {
            ...field,
          };
        } else {
          return field;
        }
      })
    );
    //  getAllStateMaster();
    getRegionMasterList();
    // getBank();

    const breadcrumbArray = [
      {
        title: "Manage Banks",
        link: "/bank-master/bank-master",
      },
      {
        title: "Bank Master",
        link: "/bank-master/bank-master",
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
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box maxHeight="calc( 100vh - 260px )" overflowY="auto">
            <Box w={{ base: "100%", md: "80%", lg: "90%", xl: "60%" }}>
              {/* for the sector code */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Sector
                    </Text>
                    <ReactCustomSelect
                      name="bank_sector"
                      label=""
                      isLoading={false}
                      options={selectBoxOptions?.sector || []}
                      selectedValue={
                        selectBoxOptions?.sector?.filter(
                          (item) => item.value === getValues("bank_sector")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        setValue("bank_sector", val.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>

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
                      Bank Address
                    </Text>
                    <CustomTextArea
                      name="bank_address"
                      placeholder="bank address"
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
            <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <Box w={{ base: "100%", md: "80%", lg: "100%", xl: "100%" }}>
                <Flex gap={4}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="420px">
                      CM Rate
                    </Text>
                    <CustomInput
                      name="cm_rate"
                      placeholder="Rate"
                      type="number"
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Box>
                  <Button
                    type="button"
                    backgroundColor={"white"}
                    borderWidth={"1px"}
                    borderColor={"#A6CE39"}
                    _hover={{ backgroundColor: "" }}
                    color={"#A6CE39"}
                    borderRadius={"full"}
                    my={"4"}
                    onClick={() => handleSubmit(getValues())}
                  >
                    Change CM Rate
                  </Button>
                </Flex>
              </Box>
            </MotionSlideUp>
            <Box w={{ base: "100%", md: "80%", lg: "90%", xl: "60%" }}>
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Box gap="4" display={{ base: "flex" }} alignItems="center">
                    <Text textAlign="right" w="550px">
                      Agreement Start Date
                    </Text>
                    <CustomInput
                      name="agreement_start_date"
                      placeholder="Agreement Start Date"
                      type="date"
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
                      Agreement End Date
                    </Text>
                    <CustomInput
                      name="agreement_end_date"
                      placeholder="Agreement End Date"
                      type="date"
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
                      Upload agreement
                    </Text>
                    <CustomFileInput
                      name={"agreement_path"}
                      placeholder="Agreement upload"
                      label=""
                      type=""
                      onChange={(e) => {
                        console.log(e, "file");
                        setValue("agreement_path", e, {
                          shouldValidate: true,
                        });
                      }}
                      value={getValues("agreement_path")}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Box>
                </MotionSlideUp>
              </Box>
            </Box>
            {/* This is for the table code  */}
            <Box mt={5}>
              <TableContainer>
                <Table color="#000">
                  <Thead bg="#dbfff5" border="1px" borderColor="#000">
                    <Tr style={{ color: "#000" }}>
                      <Th color="#000">CM Rate</Th>
                      <Th color="#000">Start Date </Th>
                      <Th color="#000">End date</Th>
                      <Th color="#000">View</Th>
                    </Tr>
                  </Thead>
                  <Tbody style={{ backgroundColor: "#ffffff" }}>
                    {tableData &&
                      tableData.map((data, index) => (
                        <Tr key={index}>
                          <Td>{data.cm_rate}</Td>
                          <Td>{data.agreement_start_date}</Td>
                          <Td>{data.agreement_end_date}</Td>
                          <Td>
                            <Box color={"primary.700"}>
                              <BiDownload
                                fontSize="26px"
                                cursor="pointer"
                                onClick={() =>
                                  handleDownload(data.agreement_path)
                                }
                              />
                            </Box>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
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
                // onClick={clearForm}
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
                  addBankMasterApiIsLoading || updateBankMasterApiIsLoading
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
}

export default AddEditFormBankMaster;

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
