import { Box, Button, Heading, list } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { MotionSlideUp } from "../../utils/animation";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";

import Pwh from "./Pwh.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import Wms from "./Wms";
import ThirdParty from "./ThirdParty";
import { useLocation } from "react-router-dom";
import {
  useGetWarehouseProposalDetailsMutation,
  useGetWarehouseSubTypeMutation,
  useGetWarehouseTypeMutation,
} from "../../features/warehouse-proposal.slice";
import WmsRent from "./WmsRent";

const commonStyle = {
  mt: 2,
  w: {
    base: "100%",
    sm: "80%",
    md: "60%",
    lg: "55%",
  },
};

const WarehouseProposal = () => {
  const [getWarehouseType, { isLoading: getWarehouseTypeApiIsLoading }] =
    useGetWarehouseTypeMutation();

  const [getWarehouseSubType, { isLoading: getWarehouseSubTypeApiIsLoading }] =
    useGetWarehouseSubTypeMutation();

  const [
    getWarehouseProposalDetails,
    { isLoading: getWarehouseProposalDetailsApiIsLoading },
  ] = useGetWarehouseProposalDetailsMutation();

  const [formDetails, setFormDetails] = useState([]);

  const [options, setOptions] = useState({
    warehouseType: [],
    subType: [],
  });

  const location = useLocation();
  const details = location.state?.details;

  console.log("details: ", {
    id: details?.id,
    type: details?.type,
  });

  const [hiringProposal, setHiringProposal] = useState({
    type: { label: "PWH ", value: "pwh" },
    subType: { label: "Leased", value: "leased" },
  });

  const [selected, setSelected] = useState({
    selectedWarehouse: { label: "PWH ", value: "pwh" },
    selectedWarehouseSubType: { label: "Leased", value: "leased" },
  });

  const methods = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  const fetchWarehouseProposalDetails = async () => {
    try {
      const response = await getWarehouseProposalDetails(details?.id).unwrap();
      console.log("Success:", response);
      if (response?.status === 200) {
        setFormDetails(response?.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchWarehouseType = async () => {
    try {
      const response = await getWarehouseType().unwrap();
      console.log("Success:", response);
      if (response?.status === 200) {
        setOptions((prev) => ({
          ...prev,
          subType: response?.results?.map((item) => ({
            label: item.warehouse_type_name,
            value: item.id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchWetWarehouseSubType = async () => {
    try {
      const response = await getWarehouseSubType().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setOptions((prev) => ({
          ...prev,
          warehouseType: response?.results?.map((item) => ({
            label: item.warehouse_subtype,
            value: item.id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("test");
    setSelected((prev) => ({ ...prev, selectedWarehouse: details?.type }));
    setHiringProposal((old) => ({ ...old, type: details?.type }));

    if (details?.id) {
      fetchWarehouseProposalDetails();
    }
  }, []);

  // useMemo(() => {
  //   console.log(formDetails);
  //   autoFillForm();
  // }, [formDetails]);

  // useEffect(() => {
  //   console.log("details --> ", details);
  //   if (details?.id) {
  //     fetchWarehouseProposalDetails();
  //   }
  // }, [details?.detail?.id]);

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
        {/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
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
                // options={options?.warehouseType || []}
                options={[
                  { label: "PWH ", value: "pwh" },
                  { label: "WMS", value: "wms" },
                  { label: "THIRD PARTY", value: "third" },
                  { label: "WMS + RENT", value: "rent" },
                ]}
                selectedValue={selected?.selectedWarehouse}
                isClearable={false}
                selectType="label"
                style={{ w: commonStyle.w }}
                handleOnChange={(val) => {
                  setSelected((prev) => ({ ...prev, selectedWarehouse: val }));
                  console.log("selectedOption @@@@@@@@@@@------> ", val);
                  setHiringProposal((old) => ({ ...old, type: val }));
                }}
              />
            </MotionSlideUp>
          </Box>

          <Box w="full" p="3">
            <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <ReactCustomSelect
                name="Select-warehouse-sub-Type"
                label="Select warehouse Sub Type"
                // options={options?.subType || []}
                options={[
                  { label: "Leased ", value: "leased" },
                  { label: "Sub Leased ", value: "sub-leased" },
                  { label: "Tri Party ", value: "tri-party" },
                  { label: "Revenue Sharing ", value: "revenue" },
                ]}
                selectedValue={selected?.selectedWarehouseSubType}
                isClearable={false}
                selectType="label"
                style={{ w: commonStyle.w }}
                handleOnChange={(val) => {
                  console.log("selectedOption @@@@@@@@@@@------> ", val);
                  setSelected((prev) => ({
                    ...prev,
                    selectedWarehouseSubType: val,
                  }));
                  setHiringProposal((old) => ({ ...old, subType: val }));
                }}
              />
            </MotionSlideUp>
          </Box>
        </Box>

        <Box mt="2">
          {hiringProposal?.type?.value === "pwh" ? (
            <Pwh id={details?.id} />
          ) : hiringProposal?.type?.value === "wms" ? (
            <Wms />
          ) : hiringProposal?.type?.value === "third" ? (
            <ThirdParty />
          ) : hiringProposal?.type?.value === "rent" ? (
            <WmsRent />
          ) : (
            <></>
          )}
        </Box>

        {/* </form> */}
      </FormProvider>
    </Box>
  );
};

export default WarehouseProposal;
