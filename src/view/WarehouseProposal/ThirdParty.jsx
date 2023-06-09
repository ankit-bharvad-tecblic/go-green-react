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
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MotionSlideUp } from "../../utils/animation";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import CustomInput from "../../components/Elements/CustomInput";
import {
  useGetAreaMasterMutation,
  useGetBankBranchMasterMutation,
  useGetBankMasterMutation,
  useGetCommodityMasterMutation,
  useGetDistrictMasterMutation,
  useGetRegionMasterMutation,
  useGetStateMasterMutation,
  useGetZoneMasterMutation,
} from "../../features/master-api-slice";
import CustomTextArea from "../../components/Elements/CustomTextArea";
import ReactSelect from "react-select";
import CustomFileInput from "../../components/Elements/CustomFileInput";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import {
  useFetchLocationDrillDownMutation,
  useGetSecurityGuardDayShiftMutation,
  useGetSecurityGuardNightShiftMutation,
  useGetSupervisorDayShiftMutation,
  useGetSupervisorNightShiftMutation,
  useSaveAsDraftMutation,
} from "../../features/warehouse-proposal.slice";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

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
    region: "region",
    state: "state",
    substate: "substate",
    district: "district",
    area: "area",
    warehouse_address: "warehouse_address",
    warehouse_pincode: "warehouse_pincode",
    no_of_chambers: "no_of_chambers",
    is_factory_permise: "is_factory_permise",
    no_of_warehouse_in_area: "no_of_warehouse_in_area", //not found
    supervisor_day_shift: "supervisor_day_shift",
    supervisor_night_shift: "supervisor_night_shift",
    security_guard_day_shift: "security_guard_day_shift",
    security_guard_night_shift: "security_guard_night_shift",
  },
  tp_commodity_details: {
    expected_commodity: "expected_commodity",
    commodity_inward_type: "commodity_inward_type",
    prestack_commodity: "prestack_commodity",
    prestack_commodity_qty: "prestack_commodity_qty",
    cc_banker: "cc_banker", //not found
    bank_details: {
      //not found
      bank: "bank", //not found
      branch: "branch", //not found
    },
  },
  tp_commercial_details: {
    cm_proposal_business_form: "cm_proposal_business_form", //not found
  },
  tp_clients_details: {
    client_list: {
      //not found
      client_type: "client_type", //not found
      client_name: "client_name", //not found
      mobile_number: "mobile_number", //not found
      region: "region", //not found
      state: "state", //not found
      zone: "zone", // not found
      district: "district", // not found
      area: "area", //not found
      address: "address", //not found
      client_known_to_ggwpl_official: "client_known_to_ggwpl_official", //not found
      client_sourced_by: "client_sourced_by", //not found
      bank_name: "bank_name", //not found
      branch_name: "branch_name", //not found
      employee_name: "employee_name", //not found
    },
    intention_letter: "intention_letter", //not found
    remarks: "remarks", //not found
    assign_inspection_to: "assign_inspection_to", //not found
  },
};

const tableStyle = {
  idWidth: "100px",
  generalPadding: "8px 16px",
  actionWidth: "150px",
};

const reactSelectStyle = {
  menu: (base) => ({
    ...base,
    // backgroundColor: "#A6CE39",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#A6CE39" : "white",
    color: state.isFocused ? "green" : "black",
    "&:hover": {
      //  backgroundColor: "#C2DE8C",
      color: "black",
    },
  }),
};

const schema = yup.object().shape({
  warehouse_name: yup.string().required("Warehouse name is required"),
  region: yup.string().required("Region name is required"),
  state: yup.string().required("State name is required"),
  substate: yup.string().required("Sub State name is required"),
  district: yup.string().required("District name is required"),
  area: yup.string().required("Area name is required"),
  warehouse_address: yup.string().required("Warehouse address is required"),
  warehouse_pincode: yup.string().required("Pin code is required"),
  no_of_chambers: yup.string().required("No of chamber is required"),
  is_factory_permise: yup
    .string()
    .required("Warehouse in factory premises is required"),
  no_of_warehouse_in_area: yup.string(),
  /*.required("NO of Warehouse in area is required")*/ supervisor_day_shift: yup
    .string()
    .required("Supervisor for day shift is required"),
  supervisor_night_shift: yup
    .string()
    .required("Supervisor for night shift is required"),
  security_guard_day_shift: yup
    .string()
    .required("Security guard for day shift is required"),
  security_guard_night_shift: yup
    .string()
    .required("Security guard for night shift is required"),
  expected_commodity: yup
    .string()
    .required("Expected commodity name is required"),
  commodity_inward_type: yup
    .string()
    .required("Commodity inward type is required"),
  prestack_commodity: yup.string().required("Pre stack commodity is required"),
  prestack_commodity_qty: yup
    .string()
    .required("Pre stack commodity quantity is required"),
  cc_banker: yup.string() /*.required("CC Banker required is required")*/,
  bank_details: yup.array().of(
    yup.object().shape({
      bank: yup.string().trim() /*.required("Bank name is required")*/,
      branch: yup.string().trim() /*.required("Branch name is required")*/,
    })
  ),
  cm_proposal_business_form: yup.string(),
  /*.required("CM proposal business form is required")*/
  client_list: yup.array().of(
    yup.object().shape({
      client_type: yup.string(),
      client_name: yup.string(),
      mobile_number: yup.string(),
      region: yup.string(),
      state: yup.string(),
      zone: yup.string(),
      district: yup.string(),
      area: yup.string(),
      address: yup.string(),
      client_known_to_ggwpl_official: yup.string(),
      client_sourced_by: yup.string(),
      bank_name: yup.string().trim() /*.required("Bank name is required")*/,
      branch_name: yup.string().trim() /*.required("Branch name is required")*/,
      employee_name: yup.string(),
    })
  ),
  intention_letter: yup.string() /*.required("Intention letter is required")*/,
  remarks: yup.string() /*.required("remarks is required")*/,
  assign_inspection_to:
    yup.string() /*.required("Assign Inspection is required")*/,
});

const ThirdParty = () => {
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    community: [],
    banks: [],
    branch: [],
  });

  const [selected, setSelected] = useState({});

  const [locationDrillDownState, setLocationDrillDownState] = useState({});

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      client_list: [
        {
          client_type: "",
          client_name: "",
          mobile_number: "",
          region: "",
          state: "",
          zone: "",
          district: "",
          area: "",
          address: "",
          client_known_to_ggwpl_official: "",
          client_sourced_by: "",
          bank_name: "",
          branch_name: "",
          employee_name: "",
        },
      ],
    },
  });

  const { setValue, getValues } = methods;

  const {
    fields: client_list,
    append: add_client_list,
    remove: remove_client_list,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "client_list",
  });

  const append_client_list = () => {
    add_client_list({
      client_type: "",
      client_name: "",
      mobile_number: "",
      region: "",
      state: "",
      zone: "",
      district: "",
      area: "",
      address: "",
      client_known_to_ggwpl_official: "",
      client_sourced_by: "",
      bank_name: "",
      branch_name: "",
      employee_name: "",
    });
  };

  useEffect(() => {
    console.log("client_list --> ", client_list);
  }, [client_list]);

  // first accordion function start

  // Region State  Zone District Area  onChange drill down api start //

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

      setSelectBoxOptions((prev) => ({
        ...prev,
        regions: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const regionOnChange = async (val) => {
    console.log("value --> ", val);
    setValue(formFieldsName.tp_warehouse_details.region, val?.value, {
      shouldValidate: true,
    });
    setSelected((prev) => ({ ...prev, region: val }));
    // on change  to null
    setSelected((prev) => ({
      ...prev,
      state: {},
      substate: {},
      district: {},
      area: {},
    }));

    setValue(formFieldsName.tp_warehouse_details.state, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.tp_warehouse_details.substate, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.tp_warehouse_details.district, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.tp_warehouse_details.area, null, {
      shouldValidate: false,
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

      setSelectBoxOptions((prev) => ({
        ...prev,
        states: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const stateOnChange = async (val) => {
    console.log("value --> ", val);
    setValue(formFieldsName.tp_warehouse_details.state, val?.value, {
      shouldValidate: true,
    });

    setSelected((prev) => ({ ...prev, state: val }));
    // on change  to null
    setSelected((prev) => ({
      ...prev,
      substate: {},
      district: {},
      area: {},
    }));

    setValue(formFieldsName.tp_warehouse_details.substate, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.tp_warehouse_details.district, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.tp_warehouse_details.area, null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      region: prev.region,
      state: val?.value,
    }));

    const query = {
      region: locationDrillDownState.region,
      state: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      const arr = response?.substate
        ?.filter((item) => item.substate_name !== "All - Zone")
        .map(({ substate_name, id }) => ({
          label: substate_name,
          value: id,
        }));

      setSelectBoxOptions((prev) => ({
        ...prev,
        substate: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const zoneOnChange = async (val) => {
    console.log("value --> ", val);
    setValue(formFieldsName.tp_warehouse_details.substate, val?.value, {
      shouldValidate: true,
    });

    setSelected((prev) => ({ ...prev, substate: val }));
    // on change  to null
    setSelected((prev) => ({
      ...prev,
      district: {},
      area: {},
    }));

    setValue(formFieldsName.tp_warehouse_details.district, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.tp_warehouse_details.area, null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      region: prev.region,
      state: prev.state,
      substate: val?.value,
    }));

    const query = {
      region: locationDrillDownState.region,
      state: locationDrillDownState.value,
      substate: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      const arr = response?.district
        ?.filter((item) => item.district_name !== "All - District")
        .map(({ district_name, id }) => ({
          label: district_name,
          value: id,
        }));

      setSelectBoxOptions((prev) => ({
        ...prev,
        districts: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const districtOnChange = async (val) => {
    console.log("value --> ", val);
    setValue(formFieldsName.tp_warehouse_details.district, val?.value, {
      shouldValidate: true,
    });

    setSelected((prev) => ({ ...prev, district: val }));
    // on change  to null
    setSelected((prev) => ({
      ...prev,
      area: {},
    }));

    setValue(formFieldsName.tp_warehouse_details.area, null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      region: prev.region,
      state: prev.state,
      substate: prev.substate,
      district: val?.value,
    }));

    const query = {
      region: locationDrillDownState.region,
      state: locationDrillDownState.state,
      substate: locationDrillDownState.substate,
      district: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      const arr = response?.area
        ?.filter((item) => item.area_name !== "All - Area")
        .map(({ area_name, id }) => ({
          label: area_name,
          value: id,
        }));

      setSelectBoxOptions((prev) => ({
        ...prev,
        areas: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const areaOnChange = (val) => {
    setSelected((prev) => ({ ...prev, area: val }));
    setValue(formFieldsName.tp_warehouse_details.area, val?.value, {
      shouldValidate: true,
    });
  };

  // Region State  Zone District Area  onChange drill down api end //

  // hire api start

  const [
    getSupervisorDayShift,
    { isLoading: getSupervisorDayShiftApiIsLoading },
  ] = useGetSupervisorDayShiftMutation();

  const [
    getSupervisorNightShift,
    { isLoading: getSupervisorNightShiftApiIsLoading },
  ] = useGetSupervisorNightShiftMutation();

  const [
    getSecurityGuardDayShift,
    { isLoading: getSecurityGuardDayShiftApiIsLoading },
  ] = useGetSecurityGuardDayShiftMutation();

  const [
    getSecurityGuardNightShift,
    { isLoading: getSecurityGuardNightShiftApiIsLoading },
  ] = useGetSecurityGuardNightShiftMutation();

  const fetchSupervisorDayShift = async () => {
    try {
      const response = await getSupervisorDayShift().unwrap();
      console.log("Success:", response);

      const optionsArray = Object.entries(response?.data).map(
        ([key, value]) => ({
          value: key,
          label: key,
          count: value,
        })
      );

      setSelectBoxOptions((prev) => ({
        ...prev,
        superVisorDayShiftOpt: optionsArray,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSupervisorNightShift = async () => {
    try {
      const response = await getSupervisorNightShift().unwrap();
      console.log("Success:", response);

      const optionsArray = Object.entries(response?.data).map(
        ([key, value]) => ({
          value: key,
          label: key,
          count: value,
        })
      );

      setSelectBoxOptions((prev) => ({
        ...prev,
        superVisorNightShiftOpt: optionsArray,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSecurityGuardDayShift = async () => {
    try {
      const response = await getSecurityGuardDayShift().unwrap();
      console.log("Success:", response);

      const optionsArray = Object.entries(response?.data).map(
        ([key, value]) => ({
          value: key,
          label: key,
          count: value,
        })
      );

      setSelectBoxOptions((prev) => ({
        ...prev,
        securityGuardDayShiftOpt: optionsArray,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSecurityGuardNightShift = async () => {
    try {
      const response = await getSecurityGuardNightShift().unwrap();
      console.log("Success:", response);

      const optionsArray = Object.entries(response?.data).map(
        ([key, value]) => ({
          value: key,
          label: key,
          count: value,
        })
      );

      setSelectBoxOptions((prev) => ({
        ...prev,
        securityGuardNightShiftOpt: optionsArray,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // hire api end

  // first accordion function end

  // second accordion function start

  const [getCommodityMaster, { isLoading: getCommodityMasterApiIsLoading }] =
    useGetCommodityMasterMutation();

  const getCommodityMasterList = async () => {
    try {
      const response = await getCommodityMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          community: response?.results.map(({ commodity_name, id }) => ({
            label: commodity_name,
            value: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [getBankMaster, { isLoading: getBankMasterApiIsLoading }] =
    useGetBankMasterMutation();

  const getBankMasterList = async () => {
    try {
      const response = await getBankMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          banks: response?.results.map(({ bank_name, id }) => ({
            label: bank_name,
            value: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [getBankBranchMaster, { isLoading: getBankBranchMasterApiIsLoading }] =
    useGetBankBranchMasterMutation();

  const getBranchMasterList = async () => {
    try {
      const response = await getBankBranchMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          branch: response?.results.map(({ branch_name, bank, id }) => ({
            label: branch_name,
            value: id,
            bank: bank,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // bank add logic start

  const {
    fields: bank_details_fields,
    append: add_new_bank_detail,
    remove: remove_bank_detail,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "bank_details",
  });

  const [bankDetail, setBankDetail] = useState({
    bank: "",
    branch: "",
  });

  const [bankError, setBankError] = useState({
    bank: "",
    branch: "",
  });

  const BankErrorFunction = () => {
    setBankError({
      bank: bankDetail.bank !== "" ? "" : "Bank can not be empty.",
      branch:
        bankDetail.branch !== ""
          ? getValues(`bank_details`).filter(
              (item) => item.branch === bankDetail.branch
            ).length === 0
            ? ""
            : "Branch has been already selected."
          : "Branch can not be empty.",
    });
  };

  const append_new_bank_details = () => {
    if (
      bankDetail.bank !== "" &&
      bankDetail.branch !== "" &&
      getValues(`bank_details`).filter(
        (item) => item.branch === bankDetail.branch
      ).length === 0
    ) {
      add_new_bank_detail({
        bank: bankDetail.bank,
        branch: bankDetail.branch,
      });
      setBankDetail({
        bank: "",
        branch: "",
      });
      setBankError({
        bank: "",
        branch: "",
      });
    } else {
      BankErrorFunction();
    }
  };

  const [updateBankFlag, setUpdateBankFlag] = useState(null);

  const updateBankFlagFunction = (data, id) => {
    setUpdateBankFlag(id);
    setBankDetail({
      bank: data.bank,
      branch: data.branch,
    });
    setBankError({
      bank: "",
      branch: "",
    });
  };

  const UpdateBankDetail = () => {
    if (
      bankDetail.bank !== "" &&
      bankDetail.branch !== "" &&
      getValues(`bank_details`)
        .filter((item, index) => index !== updateBankFlag)
        .filter((item) => item.branch === bankDetail.branch).length === 0
    ) {
      const tempArr = getValues(`bank_details`);
      setValue(
        `bank_details`,
        [
          ...tempArr.slice(0, updateBankFlag),
          {
            bank: bankDetail.bank,
            branch: bankDetail.branch,
          },
          ...tempArr.slice(updateBankFlag + 1),
        ],
        { shouldValidate: true }
      );
      setBankDetail({
        bank: "",
        branch: "",
      });
      setUpdateBankFlag(null);
      setBankError({
        bank: "",
        branch: "",
      });
    } else {
      BankErrorFunction();
    }
  };

  // bank add logic end

  // second accordion function end

  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  const [saveAsDraft, { isLoading: saveAsDraftApiIsLoading }] =
    useSaveAsDraftMutation();

  const saveAsDraftData = async (type) => {
    try {
      let data = {};

      if (type === "TP_WAREHOUSE_DETAILS") {
        data = {
          is_draft: true,
          warehouse_name: getValues("warehouse_name"),
          region: getValues("region"),
          state: getValues("state"),
          zone: getValues("zone"),
          district: getValues("district"),
          area: getValues("area"),
          warehouse_address: getValues("warehouse_address"),
          warehouse_pincode: getValues("warehouse_pincode"),
          no_of_chambers: getValues("no_of_chambers"),
          is_factory_permise: getValues("is_factory_permise"),
          no_of_warehouse_in_area: getValues("no_of_warehouse_in_area"), //not found
          supervisor_day_shift: getValues("supervisor_day_shift"),
          supervisor_night_shift: getValues("supervisor_night_shift"),
          security_guard_day_shift: getValues("security_guard_day_shift"),
          security_guard_night_shift: getValues("security_guard_night_shift"),
        };
        console.log("Tp_WAREHOUSE_DETAILS @@ --> ", data);
      } else if (type === "TP_COMMODITY_DETAILS") {
        data = {
          is_draft: true,
          expected_commodity: getValues("expected_commodity"),
          commodity_inward_type: getValues("commodity_inward_type"),
          prestack_commodity: getValues("prestack_commodity"),
          prestack_commodity_qty: getValues("prestack_commodity_qty"),
          cc_banker: getValues("cc_banker"), //not found
          bank_details: bank_details_fields, //not found
        };

        console.log("TP_COMMODITY_DETAILS @@ --> ", data);
      } else if (type === "TP_COMMERCIAL_DETAILS") {
        data = {
          is_draft: true,
          cm_proposal_business_form: getValues("cm_proposal_business_form"), //not found
        };

        console.log("TP_COMMERCIAL_DETAILS @@ --> ", data);
      } else if (type === "TP_CLIENTS_DETAILS") {
        data = {
          is_draft: true,
          client_list: client_list, //not found
          intention_letter: getValues("intention_letter"), //not found
          remarks: getValues("remarks"), //not found
          assign_inspection_to: getValues("assign_inspection_to"), //not found
        };

        console.log("TP_CLIENTS_DETAILS @@ --> ", data);
      }
      const response = await saveAsDraft(data).unwrap();
      console.log("saveAsDraftData - Success:", response);
      if (response.status === 200) {
        console.log("response --> ", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getRegionMasterList();
    fetchSupervisorDayShift();
    fetchSupervisorNightShift();
    fetchSecurityGuardDayShift();
    fetchSecurityGuardNightShift();
    getCommodityMasterList();
    getBankMasterList();
    getBranchMasterList();
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
                          <Box>
                            {/* --------------  Warehouse Name -------------- */}
                            <Box>
                              <Grid
                                textAlign="right"
                                alignItems="start"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Warehouse Name
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomTextArea
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .warehouse_name
                                    }
                                    placeholder="Warehouse Name"
                                    type="text"
                                    label=""
                                    style={{ w: "100%" }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- Region -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Region</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details.region
                                    }
                                    label=""
                                    isLoading={
                                      fetchLocationDrillDownApiIsLoading
                                    }
                                    options={selectBoxOptions?.regions || []}
                                    selectedValue={selected?.region}
                                    isClearable={false}
                                    selectType="label"
                                    style={{ w: "100%" }}
                                    handleOnChange={(val) => {
                                      regionOnChange(val);
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
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">State</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details.state
                                    }
                                    label=""
                                    options={selectBoxOptions?.states || []}
                                    selectedValue={selected?.state}
                                    isClearable={false}
                                    selectType="label"
                                    style={{ w: "100%" }}
                                    isLoading={
                                      fetchLocationDrillDownApiIsLoading
                                    }
                                    handleOnChange={(val) => {
                                      stateOnChange(val);
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- Sub State -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Sub State</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .substate
                                    }
                                    label=""
                                    options={selectBoxOptions?.substate || []}
                                    selectedValue={selected?.substate}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={
                                      fetchLocationDrillDownApiIsLoading
                                    }
                                    style={{ w: "100%" }}
                                    handleOnChange={(val) => {
                                      zoneOnChange(val);
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- District -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">District</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .district
                                    }
                                    label=""
                                    options={selectBoxOptions?.districts || []}
                                    selectedValue={selected?.district}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={
                                      fetchLocationDrillDownApiIsLoading
                                    }
                                    style={{ w: "100%" }}
                                    handleOnChange={(val) => {
                                      districtOnChange(val);
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- Area -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Area</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_warehouse_details.area
                                    }
                                    label=""
                                    options={selectBoxOptions?.areas || []}
                                    selectedValue={selected?.area}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={
                                      fetchLocationDrillDownApiIsLoading
                                    }
                                    style={{ w: "100%" }}
                                    handleOnChange={(val) => {
                                      areaOnChange(val);
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- Warehouse address -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="start"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Warehouse Address
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomTextArea
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .warehouse_address
                                    }
                                    placeholder="Warehouse Address"
                                    type="textarea"
                                    label=""
                                    style={{ w: "100%" }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------  Pin Code -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Pin Code</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .warehouse_pincode
                                    }
                                    placeholder="Pin Code"
                                    type="text"
                                    label=""
                                    style={{ w: "100%" }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- No of chamber -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">No Of Chambers</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.tp_warehouse_details
                                        .no_of_chambers
                                    }
                                    placeholder="Pin Code"
                                    type="text"
                                    label=""
                                    style={{ w: "100%" }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------is_factory_permise radio button -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
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
                                <GridItem colSpan={1}>
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
                                    style={{ w: "100%" }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- supervisor_day_shift -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
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
                                          .supervisor_day_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.superVisorDayShiftOpt ||
                                        []
                                      }
                                      selectedValue={selected?.superVisorDay}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={
                                        getSupervisorDayShiftApiIsLoading
                                      }
                                      style={{ w: "100%" }}
                                      handleOnChange={(val) => {
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        );
                                        setSelected((prev) => ({
                                          ...prev,
                                          superVisorDay: val,
                                        }));
                                        setValue(
                                          formFieldsName.tp_warehouse_details
                                            .supervisor_day_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <Text
                                    color="primary.700"
                                    fontWeight="bold"
                                    textAlign="left"
                                    textDecoration="underline"
                                    cursor="pointer"
                                  >
                                    Hire new supervisor
                                  </Text>{" "}
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- supervisor_night_shift -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Supervisor For night Shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.tp_warehouse_details
                                          .supervisor_night_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.superVisorNightShiftOpt ||
                                        []
                                      }
                                      selectedValue={selected.superVisorNight}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={
                                        getSupervisorNightShiftApiIsLoading
                                      }
                                      style={{ w: "100%" }}
                                      handleOnChange={(val) => {
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        );
                                        setSelected((prev) => ({
                                          ...prev,
                                          superVisorNight: val,
                                        }));
                                        setValue(
                                          formFieldsName.tp_warehouse_details
                                            .supervisor_night_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <Box>
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="left"
                                      textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      Hire new supervisor
                                    </Text>{" "}
                                  </Box>
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- security_guard_day_shift -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Security Guard For day shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.tp_warehouse_details
                                          .security_guard_day_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.securityGuardDayShiftOpt ||
                                        []
                                      }
                                      selectedValue={selected?.securityGuardDay}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={
                                        getSecurityGuardDayShiftApiIsLoading
                                      }
                                      style={{ w: "100%" }}
                                      handleOnChange={(val) => {
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        );
                                        setSelected((prev) => ({
                                          ...prev,
                                          securityGuardDay: val,
                                        }));
                                        setValue(
                                          formFieldsName.tp_warehouse_details
                                            .security_guard_day_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <Box>
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="left"
                                      textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      Hire new security guard
                                    </Text>{" "}
                                  </Box>
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* -------------- security_guard_night_shift -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Security Guard For night shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.tp_warehouse_details
                                          .security_guard_night_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.securityGuardNightShiftOpt ||
                                        []
                                      }
                                      selectedValue={
                                        selected?.securityGuardNight
                                      }
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={
                                        getSecurityGuardNightShiftApiIsLoading
                                      }
                                      style={{ w: "100%" }}
                                      handleOnChange={(val) => {
                                        setSelected((prev) => ({
                                          ...prev,
                                          securityGuardNight: val,
                                        }));
                                        console.log(
                                          "selectedOption @@@@@@@@@@@------> ",
                                          val
                                        );
                                        setValue(
                                          formFieldsName.tp_warehouse_details
                                            .security_guard_night_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <Box>
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="left"
                                      textDecoration="underline"
                                      cursor="pointer"
                                      sx={{ textWrap: "nowrap" }}
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
                              my={"4"}
                              px={"10"}
                              isLoading={saveAsDraftApiIsLoading}
                              onClick={() => {
                                saveAsDraftData("TP_WAREHOUSE_DETAILS");
                              }}
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
                          <Box>
                            {/* ================ Expected Commodity Name ================= */}
                            <Box>
                              <Grid
                                textAlign="right"
                                templateColumns="repeat(4, 1fr)"
                                alignItems="center"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Expected Commodity Name
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.tp_commodity_details
                                        .expected_commodity
                                    }
                                    label=""
                                    options={selectBoxOptions?.community || []}
                                    selectedValue={selected.expectedCommodity}
                                    isClearable={false}
                                    isMultipleSelect={true}
                                    isLoading={getCommodityMasterApiIsLoading}
                                    style={{ w: "100%" }}
                                    handleOnChange={(val) => {
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      );
                                      setSelected((prev) => ({
                                        ...prev,
                                        expectedCommodity: val,
                                      }));
                                      setValue(
                                        formFieldsName.tp_commodity_details
                                          .expected_commodity,
                                        val,
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
                                <GridItem colSpan={1}>
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
                                        value: "FS",
                                      },
                                      {
                                        label: "Pre-Stacked",
                                        value: "PS",
                                      },
                                      {
                                        label: "Take Over",
                                        value: "TO",
                                      },
                                    ]}
                                    selectedValue={selected.commodityInwardType}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={false}
                                    style={{ w: "100%" }}
                                    handleOnChange={(val) => {
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      );
                                      setSelected((prev) => ({
                                        ...prev,
                                        commodityInwardType: val,
                                      }));
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

                            {getValues(
                              formFieldsName.tp_commodity_details
                                .commodity_inward_type
                            ) === "PS" ? (
                              <>
                                {/* ================ Pre-Stack Commodity ================= */}
                                <Box mt={commonStyle.mt}>
                                  <Grid
                                    textAlign="right"
                                    templateColumns="repeat(4, 1fr)"
                                    alignItems="center"
                                    gap={4}
                                  >
                                    <GridItem colSpan={1}>
                                      <Text textAlign="right">
                                        Pre-Stack Commodity
                                      </Text>{" "}
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                      <ReactCustomSelect
                                        name={
                                          formFieldsName.tp_commodity_details
                                            .prestack_commodity
                                        }
                                        label=""
                                        options={
                                          selectBoxOptions?.community || []
                                        }
                                        selectedValue={
                                          selected.prestackCommodity
                                        }
                                        isClearable={false}
                                        selectType="label"
                                        isLoading={
                                          getCommodityMasterApiIsLoading
                                        }
                                        style={{ w: "100%" }}
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setSelected((prev) => ({
                                            ...prev,
                                            prestackCommodity: val,
                                          }));
                                          setValue(
                                            formFieldsName.tp_commodity_details
                                              .prestack_commodity,
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
                                    <GridItem colSpan={1}>
                                      <Text textAlign="right">
                                        Pre-Stack Commodity Quantity(MT)
                                      </Text>{" "}
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                      <CustomInput
                                        name={
                                          formFieldsName.tp_commodity_details
                                            .prestack_commodity_qty
                                        }
                                        placeholder="Pre-Stack Commodity Quantity(MT)"
                                        type="number"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                  </Grid>
                                </Box>
                              </>
                            ) : (
                              <></>
                            )}
                            {/* ================ Cc-Banker Commodity ================= */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                templateColumns="repeat(4, 1fr)"
                                alignItems="center"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
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
                                    style={{ w: "100%" }}
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
                          </Box>

                          {/* ================ Bank Details ================= */}

                          <Box mt={commonStyle.mt}>
                            <Grid
                              templateColumns="repeat(12, 1fr)"
                              alignItems="start"
                              gap={4}
                              bgColor={"#DBFFF5"}
                              padding="20px"
                              borderRadius="10px"
                            >
                              <GridItem colSpan={12}>
                                <Heading as="h5" fontSize="lg" textAlign="left">
                                  Bank Details
                                </Heading>
                              </GridItem>
                              <GridItem colSpan={4}>
                                <Text fontWeight="bold" textAlign="left">
                                  Bank
                                </Text>
                                <ReactSelect
                                  options={selectBoxOptions?.banks || []}
                                  value={
                                    selectBoxOptions?.banks?.filter(
                                      (item) => item.value === bankDetail.bank
                                    )[0] || {}
                                  }
                                  isLoading={getBankMasterApiIsLoading}
                                  onChange={(val) => {
                                    setBankDetail((old) => ({
                                      bank: val.value,
                                      branch: "",
                                    }));
                                    setBankError((old) => ({
                                      ...old,
                                      bank: "",
                                    }));
                                  }}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: bankError.bank
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                                <Text
                                  color="red"
                                  fontSize="14px"
                                  textAlign="left"
                                >
                                  {bankError.bank}
                                </Text>
                              </GridItem>
                              <GridItem colSpan={4}>
                                <Text fontWeight="bold" textAlign="left">
                                  Branch
                                </Text>
                                <ReactSelect
                                  options={
                                    selectBoxOptions?.branch?.filter(
                                      (item) =>
                                        item?.bank?.id === bankDetail.bank
                                    ) || []
                                  }
                                  isLoading={getBankBranchMasterApiIsLoading}
                                  value={
                                    selectBoxOptions?.branch?.filter(
                                      (item) => item.value === bankDetail.branch
                                    )[0] || {}
                                  }
                                  onChange={(val) => {
                                    setBankDetail((old) => ({
                                      ...old,
                                      branch: val.value,
                                    }));

                                    setBankError((old) => ({
                                      ...old,
                                      branch: "",
                                    }));
                                  }}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: bankError.branch
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                                <Text
                                  color="red"
                                  fontSize="14px"
                                  textAlign="left"
                                >
                                  {bankError.branch}
                                </Text>
                              </GridItem>
                              <GridItem
                                colSpan={4}
                                alignSelf="end"
                                textAlign="right"
                              >
                                <Button
                                  type="button"
                                  //w="full"
                                  backgroundColor={"primary.700"}
                                  _hover={{
                                    backgroundColor: "primary.700",
                                  }}
                                  color={"white"}
                                  borderRadius={"full"}
                                  px={"10"}
                                  onClick={
                                    () => {
                                      updateBankFlag !== null
                                        ? UpdateBankDetail()
                                        : append_new_bank_details();
                                      console.log("here in bank");
                                    }
                                    // saveAsDraftData("PWH_COMMERCIAL_DETAILS")
                                  }
                                >
                                  {/* {console.log(
                                    updateOwnerFlag ? "got" : "not got",
                                    "here"
                                  )} */}
                                  {updateBankFlag !== null ? "Edit" : "Add"}
                                </Button>
                              </GridItem>
                            </Grid>
                          </Box>
                          <Box mt={commonStyle.mt} overflow={"auto"}>
                            <table width="100%">
                              <thead style={{ background: "#DBFFF5" }}>
                                <tr>
                                  <th
                                    width={tableStyle.idWidth}
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    No.
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Bank Name
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Branch Name
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                    width={tableStyle.actionWidth}
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {getValues(`bank_details`)?.length > 0 ? (
                                  bank_details_fields.map((item, index) => (
                                    <tr>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                          textAlign: "center",
                                        }}
                                      >
                                        {index + 1}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {selectBoxOptions?.banks?.filter(
                                          (old) => old.value === item.bank
                                        )[0]?.label || item.bank}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {selectBoxOptions?.branch?.filter(
                                          (old) => old.value === item.branch
                                        )[0]?.label || item.branch}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        <Flex
                                          gap="20px"
                                          justifyContent="center"
                                        >
                                          <Box color={"primary.700"}>
                                            <BiEditAlt
                                              // color="#A6CE39"
                                              fontSize="26px"
                                              cursor="pointer"
                                              onClick={() => {
                                                updateBankFlagFunction(
                                                  item,
                                                  index
                                                );
                                              }}
                                            />
                                          </Box>
                                          <Box color="red">
                                            <AiOutlineDelete
                                              cursor="pointer"
                                              fontSize="26px"
                                              onClick={() => {
                                                if (updateBankFlag === null) {
                                                  remove_bank_detail(index);
                                                }
                                              }}
                                            />
                                          </Box>
                                        </Flex>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      style={{
                                        padding: tableStyle.generalPadding,
                                        textAlign: "center",
                                      }}
                                      colSpan={4}
                                    >
                                      No Data Added
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
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
                              my={"4"}
                              px={"10"}
                              isLoading={saveAsDraftApiIsLoading}
                              onClick={() => {
                                saveAsDraftData("TP_COMMODITY_DETAILS");
                              }}
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
                              <GridItem colSpan={1}>
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
                                  style={{ w: "100%" }}
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
                              my={"4"}
                              px={"10"}
                              isLoading={saveAsDraftApiIsLoading}
                              onClick={() => {
                                saveAsDraftData("TP_COMMERCIAL_DETAILS");
                              }}
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
                              {client_list &&
                                client_list.map((item, index) => (
                                  <>
                                    {/* ================ Client Type ================= */}
                                    <GridItem>
                                      <Text textAlign="left">Client Type</Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.client_type}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.client_type}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ Client Name ================= */}
                                    <GridItem>
                                      <Text textAlign="left">
                                        {" "}
                                        Client Name{" "}
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.client_name}`}
                                        placeholder="client name"
                                        type="text"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    {/* ================ Mobile Number ================= */}
                                    <GridItem>
                                      <Text textAlign="left">
                                        {" "}
                                        Mobile Number{" "}
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.mobile_number}`}
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
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.region}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.region}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ State ================= */}
                                    <GridItem>
                                      <Text textAlign="left">State </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.state}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.state}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ Zone ================= */}
                                    <GridItem>
                                      <Text textAlign="left">Zone </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.zone}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.zone}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ District ================= */}
                                    <GridItem>
                                      <Text textAlign="left">District </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.district}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.district}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ Area ================= */}
                                    <GridItem>
                                      <Text textAlign="left">Area </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.area}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.area}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ Address ================= */}
                                    <GridItem>
                                      <Text textAlign="left"> Address </Text>{" "}
                                      <CustomInput
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.address}`}
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
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.client_known_to_ggwpl_official}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.client_known_to_ggwpl_official}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ Client Sourced by ================= */}
                                    <GridItem>
                                      <Text textAlign="left">
                                        Client Sourced by
                                      </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.client_sourced_by}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.client_sourced_by}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ Bank Name ================= */}
                                    <GridItem>
                                      <Text textAlign="left">Bank Name</Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.bank_name}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.bank_name}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ Branch Name ================= */}
                                    <GridItem>
                                      <Text textAlign="left">Branch Name</Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.branch_name}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.branch_name}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    {/* ================ Employee Name ================= */}
                                    <GridItem>
                                      <Text textAlign="left">
                                        Employee Name
                                      </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.tp_clients_details.client_list.employee_name}`}
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
                                        handleOnChange={(val) => {
                                          console.log(
                                            "selectedOption @@@@@@@@@@@------> ",
                                            val
                                          );
                                          setValue(
                                            `client_list.${index}.${formFieldsName.tp_clients_details.client_list.employee_name}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem
                                      colSpan={{ base: 1, sm: 2, md: 1, lg: 2 }}
                                    >
                                      <Flex
                                        gap="10px"
                                        justifyContent="end"
                                        alignItems="center"
                                      >
                                        <MdAddBox
                                          color="#A6CE39"
                                          fontSize="45px"
                                          cursor="pointer"
                                          onClick={() => {
                                            append_client_list();
                                          }}
                                        />
                                        <MdIndeterminateCheckBox
                                          color="#FF4444"
                                          fontSize="45px"
                                          cursor={"pointer"}
                                          onClick={() => {
                                            if (client_list?.length > 1) {
                                              remove_client_list(index);
                                            }
                                          }}
                                        />
                                      </Flex>
                                    </GridItem>
                                  </>
                                ))}
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
                              <GridItem colSpan={1}>
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
                                  style={{ w: "100%" }}
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
                              <GridItem colSpan={1}>
                                <Text textAlign="right">Remarks</Text>{" "}
                              </GridItem>
                              <GridItem colSpan={2} textAlign={"left"}>
                                <Textarea
                                  width={"100%"}
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
                              <GridItem colSpan={1}>
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
                                  style={{ w: "100%" }}
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
                              my={"4"}
                              px={"10"}
                              isLoading={saveAsDraftApiIsLoading}
                              onClick={() => {
                                saveAsDraftData("TP_CLIENTS_DETAILS");
                              }}
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
