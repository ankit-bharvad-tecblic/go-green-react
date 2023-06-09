/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MotionSlideUp } from "../../utils/animation";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import CustomInput from "../../components/Elements/CustomInput";
import {
  useGetBankBranchMasterMutation,
  useGetBankMasterMutation,
  useGetCommodityMasterMutation,
} from "../../features/master-api-slice";
import CustomTextArea from "../../components/Elements/CustomTextArea";
import CustomFileInput from "../../components/Elements/CustomFileInput";
import {
  useCalculatePBPMMutation,
  useFetchLocationDrillDownMutation,
  useGetSecurityGuardDayShiftMutation,
  useGetSecurityGuardNightShiftMutation,
  useGetSupervisorDayShiftMutation,
  useGetSupervisorNightShiftMutation,
  useGetWarehouseProposalDetailsMutation,
  useMinMaxAvgMutation,
  useSaveAsDraftMutation,
} from "../../features/warehouse-proposal.slice";
import ReactSelect from "react-select";
import moment from "moment";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
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

const inputStyle = {
  height: "40px",
  backgroundColor: "white",
  borderRadius: "lg",
  _placeholder: {
    color: "gray.300",
  },
  _hover: {
    borderColor: "primary.700",
    backgroundColor: "primary.200",
  },
  _focus: {
    borderColor: "primary.700",
    backgroundColor: "primary.200",
    boxShadow: "none",
  },
  p: { base: "4" },
  fontWeight: { base: "normal" },
  fontStyle: "normal",
};

const formFieldsName = {
  wms_warehouse_details: {
    warehouse_name: "warehouse_name", // done
    region: "region", //done
    state: "state", //done
    substate: "substate", //done
    district: "district", //done
    area: "area", //done
    warehouse_address: "warehouse_address", //done
    warehouse_pincode: "warehouse_pincode", //done
    no_of_chambers: "no_of_chambers", //done
    is_factory_permise: "is_factory_permise", //done
    standard_capacity: "standard_capacity", // done
    currrent_capacity: "currrent_capacity", // done
    currrent_utilised_capacity: "currrent_utilised_capacity", //done
    lock_in_period: "lock_in_period", //done
    lock_in_period_month: "lock_in_period_month", //done
    covered_area: "covered_area", //done
    supervisor_day_shift: "supervisor_day_shift", //done
    supervisor_night_shift: "supervisor_night_shift", //done
    security_guard_day_shift: "security_guard_day_shift", //done
    security_guard_night_shift: "security_guard_night_shift", //done
  },
  wms_commodity_details: {
    excpected_commodity: "excpected_commodity", //done
    commodity_inward_type: "commodity_inward_type", //done
    prestack_commodity: "prestack_commodity", //done
    prestack_commodity_qty: "prestack_commodity_qty", //done
    is_funding_required: "is_funding_required", //done
    bank: {
      //done
      bank: "bank", //done
      branch: "branch", //done
    },
  },
  wms_commercial_details: {
    owner: {
      warehouse_owner_name: "warehouse_owner_name", //done
      warehouse_owner_contact_no: "warehouse_owner_contact_no", //done
      warehouse_owner_address: "warehouse_owner_address", //done
      rent_amount: "rent_amount", //done
    },
    lessee: {
      warehouse_owner_name: "warehouse_owner_name", //done
      warehouse_owner_contact_no: "warehouse_owner_contact_no", //done
      warehouse_owner_address: "warehouse_owner_address", //done
      rent_amount: "rent_amount", //done
    },
    // min_rent: "min_rent",
    // max_rent: "max_rent",
    // avg_rent: "avg_rent",
    rent: "rent", //done
    total_rent_per_month: "total_rent_per_month", //done
    security_deposit_month: "security_deposit_month",
    security_deposit_amt: "security_deposit_amt", //done
    advance_rent: "advance_rent", //done
    advance_rent_month: "advance_rent_month", //done
    gst: "gst", //done
    commencement_date: "commencement_date", //done
    agreement_period_month: "agreement_period_month", //done
    expiry_date: "expiry_date", //done
    notice_period_month: "notice_period_month", //done
    wms_charges_according_to_commodity: "wms_charges_according_to_commodity", //not found
    projected_file_url: "projected_file_url", //done
  },
  wms_clients_details: {
    client: {
      //not found
      client_type: "client_type", //not found
      client_name: "client_name", //not found
      client_contact_no: "client_contact_no", //not found
      region: "region", //not found
      state: "state", //not found
      substate: "substate", //not found
      district: "district", //not found
      area: "area", //not found
      client_address: "client_address", //not found
      wms_charges: "wms_charges", //not found
      billing_cycle: "billing_cycle", //not found
      // reservation_qty: "reservation_qty", //not found
      // reservation_period: "reservation_period", //not found
      // reservation_start_date: "reservation_start_date", //not found
      // reservation_end_date: "reservation_end_date", //not found
    },
    intention_letter_url: "intention_letter_url", //done
    remarks: "remarks", //done
  },
};

const schema = yup.object().shape({
  id: yup.string(), // hiring id
  warehouse_name: yup.string().required("Warehouse name is required"),
  region: yup.number().required("Region name is required"),
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
  standard_capacity: yup.string().required("Standard capacity is required"),
  currrent_capacity: yup
    .string()
    .required("Current warehouse capacity is required"),
  currrent_utilised_capacity: yup
    .string()
    .required("Current utilized capacity is required"),
  lock_in_period: yup.string().required("Lock in period is required"),
  lock_in_period_month: yup.string().when("lock_in_period", {
    is: (value) => value === "true",
    then: () => yup.string().required("Lock in period month is required"),
    otherwise: () => yup.string(),
  }),
  covered_area: yup.string().required("Covered area is required"),
  supervisor_day_shift: yup
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
  excpected_commodity: yup
    .array()
    .required("Expected commodity name is required"),
  commodity_inward_type: yup
    .string()
    .required("Commodity inward type is required"),
  prestack_commodity: yup.string().when("commodity_inward_type", {
    is: (value) => value === "PS",
    then: () => yup.string().required("Pre stack commodity is required"),
    otherwise: () => yup.string(),
  }),
  prestack_commodity_qty: yup.number().when("commodity_inward_type", {
    is: (value) => value === "PS",
    then: () =>
      yup.string().required("Pre stack commodity quantity is required"),
    otherwise: () => yup.string(),
  }),
  is_funding_required: yup.string().required("Funding required is required"),
  bank: yup.array().when("is_funding_required", {
    is: (value) => value === "true",
    then: () =>
      yup.array().of(
        yup.object().shape({
          bank: yup.string().trim().required("Bank name is required"),
          branch: yup.string().trim().required("Branch name is required"),
        })
      ),
    otherwise: () => yup.array(),
  }),
  owner: yup.array().of(
    yup.object().shape({
      warehouse_owner_name: yup
        .string()
        .trim()
        .required("Owner name is required"),
      warehouse_owner_contact_no: yup
        .string()
        .trim()
        .required("Mobile no is required"),
      warehouse_owner_address: yup
        .string()
        .trim()
        .required("Address is required"),
      rent_amount: yup.string().trim().required("Rent is required"),
    })
  ),
  lessee: yup.array().of(
    yup.object().shape({
      warehouse_owner_name: yup
        .string()
        .trim() /*.required("Owner name is required")*/,
      warehouse_owner_contact_no: yup
        .string()
        .trim() /*.required("Mobile no is required")*/,
      warehouse_owner_address: yup
        .string()
        .trim() /*.required("Address is required")*/,
      rent_amount: yup.string().trim() /*.required("Rent is required")*/,
    })
  ),
  // min_rent: yup.string().required("Minimum rent is required"),
  // max_rent: yup.string().required("Maximum rent is required"),
  // avg_rent: yup.string().required("Avg rent is required"),
  rent: yup.number().required("Rent is required"),
  total_rent_per_month: yup
    .string()
    .required("Total rent payable month is required"),
  security_deposit_month: yup
    .string()
    .required("Security deposit (Month) is required"),
  security_deposit_amt: yup
    .string()
    .required("Security deposit amount is required"),
  advance_rent: yup.string().required("Advance rent is required"),
  advance_rent_month: yup.string().when("advance_rent", {
    is: (value) => value === "true",
    then: () => yup.string().required("Advance rent month is required"),
    otherwise: () => yup.string(),
  }),
  gst: yup.string().required("gst is required"),
  commencement_date: yup.string().required("Commencement date is required"),
  agreement_period_month: yup.string().required("Agreement period is required"),
  expiry_date: yup.string().required("Expiry date is required"),
  notice_period_month: yup.string().required("Notice period is required"),
  wms_charges_according_to_commodity: yup.array(),
  // .required("WMS Charges according to commodity is required"),
  projected_file_url: yup.string().required("Your project is required"),
  client: yup.array().of(
    yup.object().shape({
      client_type: yup.string().required("Client type is required"),
      client_name: yup.string().required("Client name is required"),
      client_contact_no: yup.string().required("Mobile number is required"),
      region: yup.string().required("Region is required"),
      state: yup.string().required("State is required"),
      substate: yup.string().required(" Zone is required"),
      district: yup.string().required("District is required"),
      area: yup.string().required("Area is required"),
      client_address: yup.string().required("Address is required"),
      wms_charges: yup.string().required("wms charges is required"),
      billing_cycle: yup.string().required("billing cycle is required"),
      /*reservation_qty:
        yup.string().required("reservation qty is required"),
      reservation_period:
        yup.string().required("reservation period is required"),
      reservation_start_date:
        yup.string().required("reservation start date is required"),
      reservation_end_date:
        yup.string().required("reservation end date is required"),*/
    })
  ),
  intention_letter_url: yup.string().required("Intention letter is required"),
  remarks: yup.string() /*.required("remarks is required")*/,
});

const toasterAlert = (obj) => {
  let msg = obj?.message;
  let status = obj?.status;
  if (status === 400) {
    const errorData = obj?.data;
    let errorMessage = "";

    Object.keys(errorData)?.forEach((key) => {
      const messages = errorData[key];
      console.log("messages --> ", messages);
      messages &&
        messages?.forEach((message) => {
          errorMessage += `${key} : ${message} \n`;
        });
    });
    showToastByStatusCode(status, errorMessage);
    return false;
  }
  showToastByStatusCode(status, msg);
};

const subType = "Leased";

const mobileNumberRegex = /^\+91\d{10}$/;

const Wms = ({ id }) => {
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
      agreement_period_month: 11,
      advance_rent: "false",
      is_factory_permise: "false",
      is_funding_required: "false",
      lock_in_period: "false",
    },
  });

  const { setValue, getValues } = methods;

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
    setValue(formFieldsName.wms_warehouse_details.region, val?.value, {
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

    setValue(formFieldsName.wms_warehouse_details.state, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.substate, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.district, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.area, null, {
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
    setValue(formFieldsName.wms_warehouse_details.state, val?.value, {
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

    setValue(formFieldsName.wms_warehouse_details.substate, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.district, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.area, null, {
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
    setValue(formFieldsName.wms_warehouse_details.substate, val?.value, {
      shouldValidate: true,
    });

    setSelected((prev) => ({ ...prev, substate: val }));
    // on change  to null
    setSelected((prev) => ({
      ...prev,
      district: {},
      area: {},
    }));

    setValue(formFieldsName.wms_warehouse_details.district, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.area, null, {
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
    setValue(formFieldsName.wms_warehouse_details.district, val?.value, {
      shouldValidate: true,
    });

    setSelected((prev) => ({ ...prev, district: val }));
    // on change  to null
    setSelected((prev) => ({
      ...prev,
      area: {},
    }));

    setValue(formFieldsName.wms_warehouse_details.area, null, {
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
    setValue(formFieldsName.wms_warehouse_details.area, val?.value, {
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

      const optionsArray = response?.data?.map(
        ({ employee_name, user_id, count }) => ({
          value: user_id,
          label: employee_name,
          count: count,
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

      const optionsArray = response?.data?.map(
        ({ employee_name, user_id, count }) => ({
          value: user_id,
          label: employee_name,
          count: count,
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

      const optionsArray = response?.data?.map(
        ({ employee_name, user_id, count }) => ({
          value: user_id,
          label: employee_name,
          count: count,
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

      const optionsArray = response?.data?.map(
        ({ employee_name, user_id, count }) => ({
          value: user_id,
          label: employee_name,
          count: count,
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

  const CommodityInwardType = [
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
  ];

  // bank add logic start

  const {
    fields: bank_details_fields,
    append: add_new_bank_detail,
    remove: remove_bank_detail,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "bank",
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
          ? getValues(`bank`).filter(
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
      getValues(`bank`).filter((item) => item.branch === bankDetail.branch)
        .length === 0
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
  };

  const UpdateBankDetail = () => {
    if (
      bankDetail.bank !== "" &&
      bankDetail.branch !== "" &&
      getValues(`bank`)
        .filter((item, index) => index !== updateBankFlag)
        .filter((item) => item.branch === bankDetail.branch).length === 0
    ) {
      const tempArr = getValues(`bank`);
      setValue(
        `bank`,
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

  // third accordion function start

  // Owner Detail Functions start //

  const {
    fields: owner,
    append: add_warehouse_owner_detail,
    remove: remove_warehouse_owner_detail,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "owner",
  });

  const [ownerDetail, setOwnerDetail] = useState({
    name: "",
    mobile: "",
    address: "",
    rent: "",
  });

  const [ownerError, setOwnerError] = useState({
    name: "",
    mobile: "",
    address: "",
    rent: "",
  });

  const [updateOwnerFlag, setUpdateOwnerFlag] = useState(null);

  const WarehouseDetailClear = () => {
    setOwnerDetail({
      name: "",
      mobile: "",
      address: "",
      rent: "",
    });
  };

  const WarehouseErrorClear = (key) => {
    if (key) {
      setOwnerError((old) => ({ ...old, [key]: "" }));
    } else {
      setOwnerError({
        name: "",
        mobile: "",
        address: "",
        rent: "",
      });
    }
  };

  const WarehouseErrorFunction = () => {
    setOwnerError({
      name: ownerDetail.name !== "" ? "" : "Name can not be empty.",
      mobile:
        ownerDetail.mobile !== ""
          ? mobileNumberRegex.test(ownerDetail.mobile)
            ? ""
            : "Mobile must be like this : +911234567890."
          : "error",
      address: ownerDetail.address !== "" ? "" : "Address can not be empty.",
      rent: ownerDetail.rent !== "" ? "" : "Rent can not be empty.",
    });
  };

  const append_new_warehouse_owner_details = () => {
    if (
      ownerDetail.name !== "" &&
      ownerDetail.mobile !== "" &&
      ownerDetail.address !== "" &&
      ownerDetail.rent !== "" &&
      mobileNumberRegex.test(ownerDetail.mobile)
    ) {
      add_warehouse_owner_detail({
        warehouse_owner_name: ownerDetail.name,
        warehouse_owner_contact_no: ownerDetail.mobile,
        warehouse_owner_address: ownerDetail.address,
        rent_amount: ownerDetail.rent,
      });
      WarehouseErrorClear();
      WarehouseDetailClear();
    } else {
      WarehouseErrorFunction();
    }
  };

  const updateOwnerFlagFunction = (data, id) => {
    setUpdateOwnerFlag(id);
    setOwnerDetail({
      name: data.warehouse_owner_name,
      mobile: data.warehouse_owner_contact_no,
      warehouse_owner_address: data.address,
      rent_amount: data.rent_amount,
    });
  };

  const UpdateOwnerDetail = () => {
    if (
      ownerDetail.name !== "" &&
      ownerDetail.mobile !== "" &&
      ownerDetail.address !== "" &&
      ownerDetail.rent !== "" &&
      mobileNumberRegex.test(ownerDetail.mobile)
    ) {
      const tempArr = getValues(`owner`);
      setValue(
        `owner`,
        [
          ...tempArr.slice(0, updateOwnerFlag),
          {
            warehouse_owner_name: ownerDetail.name,
            warehouse_owner_contact_no: ownerDetail.mobile,
            warehouse_owner_address: ownerDetail.address,
            rent_amount: ownerDetail.rent,
          },
          ...tempArr.slice(updateOwnerFlag + 1),
        ],
        { shouldValidate: true }
      );
      WarehouseErrorClear();
      setUpdateOwnerFlag(null);
      WarehouseDetailClear();
    } else {
      WarehouseErrorFunction();
    }
  };

  // Owner Detail Functions end //

  // Lessee Detail Functions start //

  const {
    fields: lessee,
    append: add_lessee_detail,
    remove: remove_lessee_detail,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "lessee",
  });

  const [lesseeDetail, setLesseeDetail] = useState({
    name: "",
    mobile: "",
    address: "",
    rent: "",
  });

  const [lesseeError, setLesseeError] = useState({
    name: "",
    mobile: "",
    address: "",
    rent: "",
  });

  const [updateLesseeFlag, setUpdateLesseeFlag] = useState(null);

  const LesseeDetailClear = () => {
    setLesseeDetail({
      name: "",
      mobile: "",
      address: "",
      rent: "",
    });
  };

  const LesseeErrorClear = (key) => {
    if (key) {
      setLesseeError((old) => ({ ...old, [key]: "" }));
    } else {
      setLesseeError({
        name: "",
        mobile: "",
        address: "",
        rent: "",
      });
    }
  };

  const LesseeErrorFunction = () => {
    setLesseeError({
      name: lesseeDetail.name !== "" ? "" : "Name can not be empty.",
      mobile:
        lesseeDetail.mobile !== ""
          ? mobileNumberRegex.test(lesseeDetail.mobile)
            ? ""
            : "Mobile must be like this : +911234567890."
          : "error",
      address: lesseeDetail.address !== "" ? "" : "Address can not be empty.",
      rent: lesseeDetail.rent !== "" ? "" : "Rent can not be empty.",
    });
  };

  const append_new_lessee_details = () => {
    if (
      lesseeDetail.name !== "" &&
      lesseeDetail.mobile !== "" &&
      lesseeDetail.address !== "" &&
      lesseeDetail.rent !== "" &&
      mobileNumberRegex.test(lesseeDetail.mobile)
    ) {
      add_lessee_detail({
        warehouse_owner_name: lesseeDetail.name,
        warehouse_owner_contact_no: lesseeDetail.mobile,
        warehouse_owner_address: lesseeDetail.address,
        rent_amount: lesseeDetail.rent,
      });
      LesseeErrorClear();
      LesseeDetailClear();
    } else {
      LesseeErrorFunction();
    }
  };

  const updateLesseeFlagFunction = (data, id) => {
    setUpdateLesseeFlag(id);
    setLesseeDetail({
      name: data.warehouse_owner_name,
      mobile: data.warehouse_owner_contact_no,
      address: data.warehouse_owner_address,
      rent_amount: data.rent_amount,
    });
  };

  const UpdateLesseeDetail = () => {
    if (
      lesseeDetail.name !== "" &&
      lesseeDetail.mobile !== "" &&
      lesseeDetail.address !== "" &&
      lesseeDetail.rent !== "" &&
      mobileNumberRegex.test(lesseeDetail.mobile)
    ) {
      const tempArr = getValues(`lessee`);
      setValue(
        `lessee`,
        [
          ...tempArr.slice(0, updateLesseeFlag),
          {
            warehouse_owner_name: lesseeDetail.name,
            warehouse_owner_contact_no: lesseeDetail.mobile,
            warehouse_owner_address: lesseeDetail.address,
            rent_amount: lesseeDetail.rent,
          },
          ...tempArr.slice(updateLesseeFlag + 1),
        ],
        { shouldValidate: true }
      );
      LesseeErrorClear();
      setUpdateLesseeFlag(null);
      LesseeDetailClear();
    } else {
      LesseeErrorFunction();
    }
  };

  // Owner Detail Functions end //

  // min max rent logic start

  const [minMaxAvg] = useMinMaxAvgMutation();

  const [minMaxAvgState, setMinMaxAvgState] = useState({});

  const fetchMinMaxAvg = async (areaId) => {
    try {
      if (areaId) {
        const response = await minMaxAvg(areaId).unwrap();
        console.log("Success:", response);
        if (response.status === 200) {
          setMinMaxAvgState(response?.data);
        }
      } else {
        toasterAlert({
          message: "Select area",
          status: 440,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (getValues("area") !== null && getValues("area") !== undefined) {
      fetchMinMaxAvg(getValues("area"));
    }
  }, [getValues("area")]);

  // min max rent logic end

  const gstOptions = [
    {
      label: "Applicable",
      value: "APPLICABLE",
    },
    {
      label: "Not applicable",
      value: "NOT-APPLICABLE",
    },
  ];

  useEffect(() => {
    if (
      getValues(formFieldsName.wms_commercial_details.security_deposit_month) &&
      getValues(formFieldsName.wms_commercial_details.total_rent_per_month)
    ) {
      setValue(
        formFieldsName.wms_commercial_details.security_deposit_amt,
        getValues(
          formFieldsName.wms_commercial_details.security_deposit_month
        ) *
          getValues(formFieldsName.wms_commercial_details.total_rent_per_month),
        { shouldValidate: true }
      );
    } else {
      setValue(0, { shouldValidate: true });
    }
  }, [
    getValues(formFieldsName.wms_commercial_details.security_deposit_month),
    getValues(formFieldsName.wms_commercial_details.total_rent_per_month),
  ]);

  useEffect(() => {
    if (getValues(formFieldsName.wms_commercial_details.commencement_date)) {
      setValue(
        formFieldsName.wms_commercial_details.expiry_date,
        moment(
          getValues(formFieldsName.wms_commercial_details.commencement_date)
        )
          .add(
            getValues(
              formFieldsName.wms_commercial_details.agreement_period_month
            ),
            "months"
          )
          .format("YYYY-MM-DD"),
        { shouldValidate: true }
      );
    }
  }, [
    getValues(formFieldsName.wms_commercial_details.commencement_date),
    getValues(formFieldsName.wms_commercial_details.agreement_period_month),
  ]);

  // check PBPM logic start

  const [calculatePBPM, { isLoading: calculatePBPMApiIsLoading }] =
    useCalculatePBPMMutation();

  const [pbpmList, setPbpmList] = useState([]);

  const calcPBPM = () => {
    let coveredArea = getValues(
      formFieldsName.wms_warehouse_details.covered_area
    );

    let commodity = getValues("excpected_commodity")?.map(
      (item) => item.commodity
    );

    let obj = {
      commodity: commodity,
      covered_area: coveredArea,
    };

    if (obj?.commodity && obj?.covered_area) {
      fetchPBPM(obj);
    } else {
      if (obj?.commodity === undefined) {
        toasterAlert({
          message: "Please select commodity ",
          status: 440,
        });
      } else if (obj?.covered_area === undefined) {
        toasterAlert({
          message: "Please select covered area ",
          status: 440,
        });
      }
    }
  };

  const fetchPBPM = async (obj) => {
    try {
      const response = await calculatePBPM(obj).unwrap();
      console.log("submit  - Success:", response);
      if (response.status === 200) {
        setPbpmList(response?.data);
        console.log("response --> ", response);
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  // check PBPM logic end

  // third accordion function end

  // fourth accordion function start

  // client list drill down api start

  const {
    fields: client,
    append: add_client_list,
    remove: remove_client_list,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "client",
  });

  const clientClientType = [
    {
      label: "Corporate",
      value: "Corporate",
    },
    {
      label: "Retail",
      value: "Retail",
    },
  ];

  const clientBillingCycle = [
    {
      label: "Daily",
      value: "Daily",
    },
    {
      label: "Weekly",
      value: "Weekly",
    },
    {
      label: "Fortnighty",
      value: "Fortnighty",
    },
    {
      label: "Monthly",
      value: "Monthly",
    },
  ];

  const [clientList, setClientList] = useState({
    clientType: "",
    name: "",
    mobile: "",
    region: "",
    state: "",
    substate: "",
    district: "",
    area: "",
    address: "",
    charges: "",
    billing: "",
  });

  const [clientError, setClientError] = useState({
    clientType: "",
    name: "",
    mobile: "",
    region: "",
    state: "",
    substate: "",
    district: "",
    area: "",
    address: "",
    charges: "",
    billing: "",
  });

  const [clientDripDown, setClientDripDown] = useState([
    { states: [], substate: [], districts: [], areas: [] },
  ]);

  const [updateClientList, setUpdateClientList] = useState(null);

  const regionOnClientChange = async (val) => {
    setClientList((old) => ({
      ...old,
      region: val?.value,
      state: "",
      substate: "",
      district: "",
      area: "",
    }));

    console.log("value --> ", val);

    const query = {
      region: val?.value,
    };

    let clientNumber = 0;

    if (updateClientList === null) {
      clientNumber = clientDripDown.length - 1;
    } else {
      clientNumber = updateClientList;
    }

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      let location = clientDripDown[clientNumber];

      location.states =
        response?.state?.map(({ state_name, id }) => ({
          label: state_name,
          value: id,
        })) || [];

      setClientDripDown((item) => [
        ...item.slice(0, clientNumber),
        location,
        ...item.slice(clientNumber + 1),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const stateOnClientChange = async (val) => {
    setClientList((old) => ({
      ...old,
      state: val?.value,
      substate: "",
      district: "",
      area: "",
    }));

    console.log("value --> ", val);

    const query = {
      region: clientList.region,
      state: val?.value,
    };

    let clientNumber = 0;

    if (updateClientList === null) {
      clientNumber = clientDripDown.length - 1;
    } else {
      clientNumber = updateClientList;
    }

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      let location = clientDripDown[clientNumber];

      location.substate =
        response?.substate?.map(({ substate_name, id }) => ({
          label: substate_name,
          value: id,
        })) || [];

      setClientDripDown((item) => [
        ...item.slice(0, clientNumber),
        location,
        ...item.slice(clientNumber + 1),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const zoneOnClientChange = async (val) => {
    setClientList((old) => ({
      ...old,
      substate: val?.value,
      district: "",
      area: "",
    }));

    console.log("value --> ", val);

    const query = {
      region: clientList.region,
      state: clientList.state,
      substate: val?.value,
    };

    let clientNumber = 0;

    if (updateClientList === null) {
      clientNumber = clientDripDown.length - 1;
    } else {
      clientNumber = updateClientList;
    }

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      let location = clientDripDown[clientNumber];

      location.districts =
        response?.district?.map(({ district_name, id }) => ({
          label: district_name,
          value: id,
        })) || [];

      setClientDripDown((item) => [
        ...item.slice(0, clientNumber),
        location,
        ...item.slice(clientNumber + 1),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const districtOnClientChange = async (val) => {
    setClientList((old) => ({
      ...old,
      district: val?.value,
      area: "",
    }));

    console.log("value --> ", val);

    const query = {
      region: clientList.region,
      state: clientList.state,
      substate: clientList.substate,
      district: val?.value,
    };

    let clientNumber = 0;

    if (updateClientList === null) {
      clientNumber = clientDripDown.length - 1;
    } else {
      clientNumber = updateClientList;
    }

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      let location = clientDripDown[clientNumber];

      location.areas =
        response?.area?.map(({ area_name, id }) => ({
          label: area_name,
          value: id,
        })) || [];

      setClientDripDown((item) => [
        ...item.slice(0, clientNumber),
        location,
        ...item.slice(clientNumber + 1),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const areaOnClientChange = (val) => {
    setClientList((old) => ({
      ...old,
      area: val?.value,
    }));
  };

  const ClientOnChange = (val, key) => {
    setClientList((old) => ({ ...old, [key]: val?.target.value }));
  };

  const ClientSelectOnChange = (val, key) => {
    setClientList((old) => ({ ...old, [key]: val?.value }));
  };

  const ClientListClear = () => {
    setClientList({
      clientType: "",
      name: "",
      mobile: "",
      region: "",
      state: "",
      substate: "",
      district: "",
      area: "",
      address: "",
      charges: "",
      billing: "",
    });
  };

  const ClientErrorClear = (key) => {
    if (key) {
      setClientError((old) => ({ ...old, [key]: "" }));
    } else {
      setClientError({
        clientType: "",
        name: "",
        mobile: "",
        region: "",
        state: "",
        substate: "",
        district: "",
        area: "",
        address: "",
        charges: "",
        billing: "",
      });
    }
  };

  const ClientErrorStatus = () => {
    const result =
      clientList.clientType !== "" &&
      clientList.name !== "" &&
      clientList.mobile !== "" &&
      clientList.region !== "" &&
      clientList.state !== "" &&
      clientList.substate !== "" &&
      clientList.district !== "" &&
      clientList.area !== "" &&
      clientList.address !== "" &&
      clientList.charges !== "" &&
      clientList.billing !== "" &&
      mobileNumberRegex.test(clientList.mobile);

    return result;
  };

  const ClientErrorFunction = () => {
    setClientError({
      clientType: clientList.clientType === "" ? "error" : "",
      name: clientList.name === "" ? "error" : "",
      mobile:
        clientList.mobile === ""
          ? "error"
          : mobileNumberRegex.test(clientList.mobile)
          ? ""
          : "Mobile must be like this : +911234567890.",
      region: clientList.region === "" ? "error" : "",
      state: clientList.state === "" ? "error" : "",
      substate: clientList.substate === "" ? "error" : "",
      district: clientList.district === "" ? "error" : "",
      area: clientList.area === "" ? "error" : "",
      address: clientList.address === "" ? "error" : "",
      charges: clientList.charges === "" ? "error" : "",
      billing: clientList.billing === "" ? "error" : "",
    });
  };

  const append_client_list = () => {
    if (ClientErrorStatus()) {
      add_client_list({
        client_type: clientList.clientType,
        client_name: clientList.name,
        client_contact_no: clientList.mobile,
        region: clientList.region,
        state: clientList.state,
        substate: clientList.substate,
        district: clientList.district,
        area: clientList.area,
        client_address: clientList.address,
        wms_charges: clientList.charges,
        billing_cycle: clientList.billing,
        // reservation_qty: "",
        // reservation_period: "",
        // reservation_start_date: "",
        // reservation_end_date: "",
      });
      setClientDripDown((item) => [
        ...item,
        {
          states: [],
          substate: [],
          districts: [],
          areas: [],
        },
      ]);
      ClientListClear();
      ClientErrorClear();
    } else {
      ClientErrorFunction();
    }
  };

  const updateClientFunction = (data, id) => {
    setUpdateClientList(id);
    setClientList({
      clientType: data.client_type,
      name: data.client_name,
      mobile: data.client_contact_no,
      region: data.region,
      state: data.state,
      substate: data.substate,
      district: data.district,
      area: data.area,
      address: data.client_address,
      charges: data.wms_charges,
      billing: data.billing_cycle,
    });
    ClientErrorClear();
  };

  const UpdateClientListFunction = () => {
    if (ClientErrorStatus()) {
      const tempArr = getValues(`client`);
      setValue(
        `client`,
        [
          ...tempArr.slice(0, updateClientList),
          {
            client_type: clientList.clientType,
            client_name: clientList.name,
            client_contact_no: clientList.mobile,
            region: clientList.region,
            state: clientList.state,
            substate: clientList.substate,
            district: clientList.district,
            area: clientList.area,
            client_address: clientList.address,
            wms_charges: clientList.charges,
            billing_cycle: clientList.billing,
            // reservation_qty: "",
            // reservation_period: "",
            // reservation_start_date: "",
            // reservation_end_date: "",
          },
          ...tempArr.slice(updateClientList + 1),
        ],
        { shouldValidate: true }
      );
      setClientDripDown((item) => [
        ...item,
        {
          states: [],
          substate: [],
          districts: [],
          areas: [],
        },
      ]);
      setUpdateClientList(null);
      ClientListClear();
      ClientErrorClear();
    } else {
      ClientErrorFunction();
    }
  };

  // fourth accordion function end

  // client list drill down api end

  // save as draft and onSubmit function start

  const [saveAsDraft, { isLoading: saveAsDraftApiIsLoading }] =
    useSaveAsDraftMutation();

  const onSubmit = async (data) => {
    console.log("data==>", data);
    try {
      const response = await saveAsDraft(data).unwrap();
      console.log("saveAsDraftData - Success:", response);
      if (response.status === 200) {
        console.log("response --> ", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveAsDraftData = async (type) => {
    try {
      let data = {};
      if (type === "WMS_WAREHOUSE_DETAILS") {
        data = {
          is_draft: true,
          id: getValues("id"),
          warehouse_name: getValues("warehouse_name"),
          region: getValues("region"),
          state: getValues("state"),
          substate: getValues("substate"),
          district: getValues("district"),
          area: getValues("area"),
          warehouse_address: getValues("warehouse_address"),
          warehouse_pincode: getValues("warehouse_pincode"),
          no_of_chambers: getValues("no_of_chambers"),
          is_factory_permise: getValues("is_factory_permise"),
          standard_capacity: getValues("standard_capacity"),
          currrent_capacity: getValues("currrent_capacity"),
          currrent_utilised_capacity: getValues("currrent_utilised_capacity"),
          lock_in_period: getValues("lock_in_period"),
          lock_in_period_month:
            getValues("lock_in_period") === "true"
              ? getValues("lock_in_period_month")
              : null,
          covered_area: getValues("covered_area"),
          supervisor_day_shift: getValues("supervisor_day_shift"),
          supervisor_night_shift: getValues("supervisor_night_shift"),
          security_guard_day_shift: getValues("security_guard_day_shift"),
          security_guard_night_shift: getValues("security_guard_night_shift"),
        };

        console.log("WMS_WAREHOUSE_DETAILS @@ --> ", data);
      } else if (type === "WMS_COMMODITY_DETAILS") {
        data = {
          is_draft: true,
          id: getValues("id"),
          excpected_commodity: getValues("excpected_commodity"),
          commodity_inward_type: getValues("commodity_inward_type"),
          prestack_commodity:
            getValues("commodity_inward_type") === "PS"
              ? getValues("prestack_commodity")
              : null,
          prestack_commodity_qty:
            getValues("commodity_inward_type") === "PS"
              ? getValues("prestack_commodity_qty")
              : null,
          is_funding_required: getValues("is_funding_required"),
          bank:
            getValues("is_funding_required") === "true"
              ? getValues("bank")
              : [],
        };

        console.log("WMS_COMMODITY_DETAILS @@ --> ", data);
      } else if (type === "WMS_COMMERCIAL_DETAILS") {
        data = {
          is_draft: true,
          id: getValues("id"),
          owner: getValues("owner"), //done
          // min_rent: getValues("min_rent"),
          // max_rent: getValues("max_rent"),
          // avg_rent: getValues("avg_rent"),
          rent: getValues("rent"),
          total_rent_per_month: getValues("total_rent_per_month"),
          security_deposit_month: getValues("security_deposit_month"),
          security_deposit_amt: getValues("security_deposit_amt"),
          advance_rent: getValues("advance_rent"),
          advance_rent_month:
            getValues("advance_rent") === "true"
              ? getValues("advance_rent_month")
              : null,
          gst: getValues("gst"),
          commencement_date: getValues("commencement_date"),
          agreement_period_month: getValues("agreement_period_month"),
          expiry_date: getValues("expiry_date"),
          notice_period_month: getValues("notice_period_month"),
          wms_charges_according_to_commodity: getValues(
            "wms_charges_according_to_commodity"
          ), //not found
          projected_file_url: getValues("projected_file_url"),
        };

        console.log("WMS_COMMERCIAL_DETAILS @@ --> ", data);
      } else if (type === "WMS_CLIENTS_DETAILS") {
        data = {
          is_draft: true,
          id: getValues("id"),
          client: getValues("client"), //not found
          intention_letter_url: getValues("intention_letter_url"), //not found
          remarks: getValues("remarks"), //not found
        };

        console.log("WMS_CLIENTS_DETAILS @@ --> ", data);
      }

      const response = await saveAsDraft(data).unwrap();
      console.log("saveAsDraftData - Success:", response);
      if (response.status === 200) {
        console.log("response --> ", response);
        setValue("id", response?.data?.id || null, { shouldValidate: true });
        toasterAlert({
          message: "Save As Draft Successfully",
          status: 200,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getRegionMasterList();
    getCommodityMasterList();
    getBankMasterList();
    getBranchMasterList();
    fetchSupervisorDayShift();
    fetchSupervisorNightShift();
    fetchSecurityGuardDayShift();
    fetchSecurityGuardNightShift();
  }, []);

  // save as draft and onSubmit function end

  // edit wms functions start

  const [getWarehouseProposalDetails] =
    useGetWarehouseProposalDetailsMutation();

  function FillFormData(data) {
    console.log(data, "here");
    const DataArr = Object.entries(data)
      .filter(([key, value]) => value !== null && value !== undefined)
      .map(([key, index]) => ({
        key: key,
        index: index,
      }));
    console.log(DataArr, "here");
    DataArr.map((item) => {
      if (item.key === "region") {
        regionOnChange({ value: item.index });
      } else if (item.key === "state") {
        stateOnChange({ value: item.index });
      } else if (item.key === "substate") {
        zoneOnChange({ value: item.index });
      } else if (item.key === "district") {
        districtOnChange({ value: item.index });
      } else if (item.key === "area") {
        areaOnChange({ value: item.index });
      } else if (item.key === "client") {
        const tempClient = item.index;
        tempClient.map((old) => {
          regionOnClientChange({ value: old.region });
          stateOnClientChange({ value: old.state });
          zoneOnClientChange({ value: old.substate });
          districtOnClientChange({ value: old.district });
          areaOnClientChange({ value: old.area });
          setClientDripDown((old2) => [
            ...old2,
            {
              states: [],
              substate: [],
              districts: [],
              areas: [],
            },
          ]);
          ClientListClear();
        });
        setValue(item.key, item.index, { shouldValidate: true });
      } else {
        setValue(item.key, item.index, { shouldValidate: true });
      }
    });
  }

  const fetchWarehouseProposalDetails = async () => {
    try {
      const response = await getWarehouseProposalDetails(id).unwrap();
      console.log("Success:", response);
      if (response?.status === 200) {
        console.log("response?.data --> ", response?.data);
        FillFormData(response?.data || {});
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchWarehouseProposalDetails();
    }
  }, []);

  // edit wms functions end

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
                                  <Text textAlign="right">Warehouse Name</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomTextArea
                                    name={
                                      formFieldsName.wms_warehouse_details
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
                                      formFieldsName.wms_warehouse_details
                                        .region
                                    }
                                    label=""
                                    isLoading={
                                      fetchLocationDrillDownApiIsLoading
                                    }
                                    options={selectBoxOptions?.regions || []}
                                    selectedValue={
                                      selectBoxOptions?.regions?.filter(
                                        (item) =>
                                          item.value ===
                                          getValues(
                                            formFieldsName.wms_warehouse_details
                                              .region
                                          )
                                      ) || {}
                                    }
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
                                      formFieldsName.wms_warehouse_details.state
                                    }
                                    label=""
                                    options={selectBoxOptions?.states || []}
                                    selectedValue={
                                      selectBoxOptions?.states?.filter(
                                        (item) =>
                                          item.value ===
                                          getValues(
                                            formFieldsName.wms_warehouse_details
                                              .state
                                          )
                                      ) || {}
                                    }
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
                                      formFieldsName.wms_warehouse_details
                                        .substate
                                    }
                                    label=""
                                    options={selectBoxOptions?.substate || []}
                                    selectedValue={
                                      selectBoxOptions?.substate?.filter(
                                        (item) =>
                                          item.value ===
                                          getValues(
                                            formFieldsName.wms_warehouse_details
                                              .substate
                                          )
                                      ) || {}
                                    }
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
                                      formFieldsName.wms_warehouse_details
                                        .district
                                    }
                                    label=""
                                    options={selectBoxOptions?.districts || []}
                                    selectedValue={
                                      selectBoxOptions?.districts?.filter(
                                        (item) =>
                                          item.value ===
                                          getValues(
                                            formFieldsName.wms_warehouse_details
                                              .district
                                          )
                                      ) || {}
                                    }
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
                                      formFieldsName.wms_warehouse_details.area
                                    }
                                    label=""
                                    options={selectBoxOptions?.areas || []}
                                    selectedValue={
                                      selectBoxOptions?.areas?.filter(
                                        (item) =>
                                          item.value ===
                                          getValues(
                                            formFieldsName.wms_warehouse_details
                                              .area
                                          )
                                      ) || {}
                                    }
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
                                  </Text>
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomTextArea
                                    name={
                                      formFieldsName.wms_warehouse_details
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
                              {" "}
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
                                      formFieldsName.wms_warehouse_details
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
                                  <Text textAlign="right">No Of Chambers</Text>
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .no_of_chambers
                                    }
                                    placeholder="No Of Chambers"
                                    type="number"
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
                                  <RadioGroup
                                    p="0"
                                    defaultValue={"false"}
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .is_factory_permise
                                    }
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_warehouse_details
                                          .is_factory_permise,
                                        e,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  >
                                    <Stack spacing={5} direction="row">
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value={"true"}
                                      >
                                        Yes
                                      </Radio>
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value={"false"}
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
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
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
                                    style={{ w: "100%" }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------  currrent_capacity (in MT)-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Current Warehouse Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .currrent_capacity
                                    }
                                    placeholder="Current Warehouse Capacity (in MT)"
                                    type="text"
                                    label=""
                                    style={{ w: "100%" }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------  current_Utilizes_capacity (in MT)-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Current Utilizes Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .currrent_utilised_capacity
                                    }
                                    placeholder="Current Utilizes Capacity (in MT)"
                                    type="text"
                                    label=""
                                    style={{ w: "100%" }}
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
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Lock In Period</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <RadioGroup
                                    p="0"
                                    defaultValue={"false"}
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .lock_in_period
                                    }
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_warehouse_details
                                          .lock_in_period,
                                        e,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  >
                                    <Stack spacing={5} direction="row">
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value="true"
                                      >
                                        Yes
                                      </Radio>
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value="false"
                                      >
                                        No
                                      </Radio>
                                    </Stack>
                                  </RadioGroup>
                                </GridItem>
                              </Grid>
                            </Box>
                            {/* --------------  lock_in_period_month------------- */}
                            {getValues(
                              formFieldsName.wms_warehouse_details
                                .lock_in_period
                            ) === "true" ? (
                              <Box mt={commonStyle.mt}>
                                <Grid
                                  textAlign="right"
                                  alignItems="center"
                                  templateColumns="repeat(4, 1fr)"
                                  gap={4}
                                >
                                  <GridItem colSpan={1}>
                                    <Text textAlign="right">
                                      Lock In Period Month
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={2}>
                                    <CustomInput
                                      name={
                                        formFieldsName.wms_warehouse_details
                                          .lock_in_period_month
                                      }
                                      placeholder="Lock In Period Month"
                                      type="number"
                                      label=""
                                      style={{ w: "100%" }}
                                    />
                                  </GridItem>
                                </Grid>
                              </Box>
                            ) : (
                              <></>
                            )}
                            {/* --------------  covered_area------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Covered Area (In Sq.Ft)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .covered_area
                                    }
                                    placeholder="Covered Area (In Sq.Ft)"
                                    type="text"
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
                                        formFieldsName.wms_warehouse_details
                                          .supervisor_day_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.superVisorDayShiftOpt ||
                                        []
                                      }
                                      selectedValue={
                                        selectBoxOptions?.superVisorDayShiftOpt?.filter(
                                          (item) =>
                                            item.value ===
                                            getValues(
                                              formFieldsName
                                                .wms_warehouse_details
                                                .supervisor_day_shift
                                            )
                                        ) || {}
                                      }
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
                                          formFieldsName.wms_warehouse_details
                                            .supervisor_day_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={1} textAlign="left">
                                  <Checkbox
                                    colorScheme="green"
                                    borderColor="gray.300"
                                    //defaultChecked
                                  >
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="left"
                                      cursor="pointer"
                                    >
                                      Hire new supervisor
                                    </Text>
                                  </Checkbox>
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
                                        formFieldsName.wms_warehouse_details
                                          .supervisor_night_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.superVisorNightShiftOpt ||
                                        []
                                      }
                                      selectedValue={
                                        selectBoxOptions?.superVisorNightShiftOpt?.filter(
                                          (item) =>
                                            item.value ===
                                            getValues(
                                              formFieldsName
                                                .wms_warehouse_details
                                                .supervisor_night_shift
                                            )
                                        ) || {}
                                      }
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
                                          formFieldsName.wms_warehouse_details
                                            .supervisor_night_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={1} textAlign="left">
                                  <Checkbox
                                    colorScheme="green"
                                    borderColor="gray.300"
                                    //defaultChecked
                                  >
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="left"
                                      cursor="pointer"
                                    >
                                      Hire new supervisor
                                    </Text>
                                  </Checkbox>
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
                                        formFieldsName.wms_warehouse_details
                                          .security_guard_day_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.securityGuardDayShiftOpt ||
                                        []
                                      }
                                      selectedValue={
                                        selectBoxOptions?.securityGuardDayShiftOpt?.filter(
                                          (item) =>
                                            item.value ===
                                            getValues(
                                              formFieldsName
                                                .wms_warehouse_details
                                                .security_guard_day_shift
                                            )
                                        ) || {}
                                      }
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
                                          formFieldsName.wms_warehouse_details
                                            .security_guard_day_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={1} textAlign="left">
                                  <Checkbox
                                    colorScheme="green"
                                    borderColor="gray.300"
                                    //defaultChecked
                                  >
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="left"
                                      cursor="pointer"
                                    >
                                      Hire new security guard
                                    </Text>
                                  </Checkbox>
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
                                        formFieldsName.wms_warehouse_details
                                          .security_guard_night_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.securityGuardNightShiftOpt ||
                                        []
                                      }
                                      selectedValue={
                                        selectBoxOptions?.securityGuardNightShiftOpt?.filter(
                                          (item) =>
                                            item.value ===
                                            getValues(
                                              formFieldsName
                                                .wms_warehouse_details
                                                .security_guard_night_shift
                                            )
                                        ) || {}
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
                                          formFieldsName.wms_warehouse_details
                                            .security_guard_night_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={1} textAlign="left">
                                  <Checkbox
                                    colorScheme="green"
                                    borderColor="gray.300"
                                    //defaultChecked
                                  >
                                    <Text
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="left"
                                      cursor="pointer"
                                    >
                                      Hire new security guard
                                    </Text>
                                  </Checkbox>
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
                                saveAsDraftData("WMS_WAREHOUSE_DETAILS");
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
                                      formFieldsName.wms_commodity_details
                                        .excpected_commodity
                                    }
                                    label=""
                                    options={selectBoxOptions?.community || []}
                                    selectedValue={
                                      selectBoxOptions?.community?.filter(
                                        (item) =>
                                          getValues(
                                            formFieldsName.wms_commodity_details
                                              .excpected_commodity
                                          )?.some(
                                            (old) =>
                                              old.commodity === item.value
                                          )
                                      ) || []
                                    }
                                    isClearable={false}
                                    isMultipleSelect={true}
                                    isLoading={getCommodityMasterApiIsLoading}
                                    style={{ w: "100%" }}
                                    handleOnChange={(val) => {
                                      console.log(
                                        "selectedOption @@@@@@@@@@@------> ",
                                        val
                                      );
                                      const tempArr = val.map((item) => ({
                                        commodity: item.value,
                                      }));
                                      setSelected((prev) => ({
                                        ...prev,
                                        expectedCommodity: val,
                                      }));
                                      setValue(
                                        formFieldsName.wms_commodity_details
                                          .excpected_commodity,
                                        tempArr,
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
                                      formFieldsName.wms_commodity_details
                                        .commodity_inward_type
                                    }
                                    label=""
                                    options={CommodityInwardType || []}
                                    selectedValue={CommodityInwardType.filter(
                                      (item) =>
                                        item.value ===
                                        getValues(`commodity_inward_type`)
                                    )}
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
                                        formFieldsName.wms_commodity_details
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
                              formFieldsName.wms_commodity_details
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
                                          formFieldsName.wms_commodity_details
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
                                            formFieldsName.wms_commodity_details
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
                                          formFieldsName.wms_commodity_details
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

                            {/* ================ Funding required ================= */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                templateColumns="repeat(4, 1fr)"
                                alignItems="center"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Funding Required{" "}
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <RadioGroup
                                    p="0"
                                    defaultValue={"false"}
                                    name={
                                      formFieldsName.wms_commodity_details
                                        .is_funding_required
                                    }
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_commodity_details
                                          .is_funding_required,
                                        e,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  >
                                    <Stack spacing={5} direction="row">
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value="true"
                                      >
                                        Yes
                                      </Radio>
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value="false"
                                      >
                                        No
                                      </Radio>
                                    </Stack>
                                  </RadioGroup>
                                </GridItem>
                              </Grid>
                            </Box>
                          </Box>

                          {/* ================ Bank Details ================= */}
                          {getValues(
                            formFieldsName.wms_commodity_details
                              .is_funding_required
                          ) === "true" ? (
                            <>
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
                                    <Heading
                                      as="h5"
                                      fontSize="lg"
                                      textAlign="left"
                                    >
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
                                          (item) =>
                                            item.value === bankDetail.bank
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
                                      isLoading={
                                        getBankBranchMasterApiIsLoading
                                      }
                                      value={
                                        selectBoxOptions?.branch?.filter(
                                          (item) =>
                                            item.value === bankDetail.branch
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
                                      backgroundColor={"primary.700"}
                                      _hover={{
                                        backgroundColor: "primary.700",
                                      }}
                                      color={"white"}
                                      borderRadius={"full"}
                                      px={"10"}
                                      onClick={() => {
                                        updateBankFlag !== null
                                          ? UpdateBankDetail()
                                          : append_new_bank_details();
                                        console.log("here in bank");
                                      }}
                                    >
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
                                    {getValues(`bank`)?.length > 0 ? (
                                      bank_details_fields.map((item, index) => (
                                        <tr>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
                                              textAlign: "center",
                                            }}
                                          >
                                            {index + 1}
                                          </td>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
                                            }}
                                          >
                                            {selectBoxOptions?.banks?.filter(
                                              (old) => old.value === item.bank
                                            )[0]?.label || item.bank}
                                          </td>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
                                            }}
                                          >
                                            {selectBoxOptions?.branch?.filter(
                                              (old) => old.value === item.branch
                                            )[0]?.label || item.branch}
                                          </td>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
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
                                                    if (
                                                      updateBankFlag === null
                                                    ) {
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
                            </>
                          ) : (
                            <></>
                          )}

                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            mt="10"
                            px="0"
                          >
                            <Button
                              type="button"
                              backgroundColor={"primary.700"}
                              _hover={{ backgroundColor: "primary.700" }}
                              color={"white"}
                              borderRadius={"full"}
                              isLoading={saveAsDraftApiIsLoading}
                              my={"4"}
                              px={"10"}
                              onClick={() => {
                                saveAsDraftData("WMS_COMMODITY_DETAILS");
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
                          {/* {/ ================ Warehouse Owner details ================= /} */}
                          <Box>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(12, 1fr)"
                              alignItems="start"
                              gap={4}
                              bgColor={"#DBFFF5"}
                              padding="20px"
                              borderRadius="10px"
                            >
                              <GridItem colSpan={12}>
                                <Text fontWeight="bold" textAlign="left">
                                  Warehouse Owner details
                                </Text>
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text fontWeight="bold" textAlign="left">
                                  Owner Name
                                </Text>
                                <Input
                                  placeholder="Owner Name"
                                  value={ownerDetail.name}
                                  type="text"
                                  onChange={(e) => {
                                    setOwnerDetail((old) => ({
                                      ...old,
                                      name: e.target.value,
                                    }));
                                    setOwnerError((old) => ({
                                      ...old,
                                      name: "",
                                    }));
                                  }}
                                  style={inputStyle}
                                  border="1px"
                                  borderColor={
                                    ownerError.name ? "red" : "gray.10"
                                  }
                                />
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text fontWeight="bold" textAlign="left">
                                  Mobile No.
                                </Text>
                                <Input
                                  type="tel"
                                  placeholder="Mobile No."
                                  value={ownerDetail.mobile}
                                  onChange={(e) => {
                                    setOwnerDetail((old) => ({
                                      ...old,
                                      mobile: e.target.value,
                                    }));
                                    console.log(e);
                                    setOwnerError((old) => ({
                                      ...old,
                                      mobile: "",
                                    }));
                                  }}
                                  style={inputStyle}
                                  border="1px"
                                  borderColor={
                                    ownerError.mobile ? "red" : "gray.10"
                                  }
                                />
                                <Text
                                  color="red"
                                  fontSize="14px"
                                  textAlign="left"
                                >
                                  {ownerError.mobile === "error"
                                    ? ""
                                    : ownerError.mobile}
                                </Text>
                              </GridItem>
                              <GridItem colSpan={4}>
                                <Text fontWeight="bold" textAlign="left">
                                  Address
                                </Text>
                                <Textarea
                                  value={ownerDetail.address}
                                  onChange={(e) => {
                                    setOwnerDetail((old) => ({
                                      ...old,
                                      address: e.target.value,
                                    }));
                                    console.log(e);
                                    setOwnerError((old) => ({
                                      ...old,
                                      address: "",
                                    }));
                                  }}
                                  style={inputStyle}
                                  rows={1}
                                  border="1px"
                                  borderColor={
                                    ownerError.address ? "red" : "gray.10"
                                  }
                                  placeholder={"Address"}
                                />
                              </GridItem>{" "}
                              <GridItem colSpan={2}>
                                <Text fontWeight="bold" textAlign="left">
                                  Rent
                                </Text>
                                <Input
                                  type="number"
                                  value={ownerDetail.rent}
                                  onChange={(e) => {
                                    setOwnerDetail((old) => ({
                                      ...old,
                                      rent: e.target.value,
                                    }));
                                    console.log(e);
                                    setOwnerError((old) => ({
                                      ...old,
                                      rent: "",
                                    }));
                                  }}
                                  style={inputStyle}
                                  border="1px"
                                  borderColor={
                                    ownerError.rent ? "red" : "gray.10"
                                  }
                                  placeholder={"Rent"}
                                />
                              </GridItem>
                              <GridItem colSpan={2} alignSelf="end">
                                <Button
                                  type="button"
                                  backgroundColor={"primary.700"}
                                  _hover={{ backgroundColor: "primary.700" }}
                                  color={"white"}
                                  borderRadius={"full"}
                                  px={"10"}
                                  onClick={() => {
                                    updateOwnerFlag !== null
                                      ? UpdateOwnerDetail()
                                      : append_new_warehouse_owner_details();
                                    console.log("here in owner");
                                  }}
                                >
                                  {updateOwnerFlag !== null ? "Edit" : "Add"}
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
                                    Owner Name
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Mobile No.
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Address
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Rent
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
                                {getValues(`owner`)?.length > 0 ? (
                                  owner.map((item, index) => (
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
                                        {item.warehouse_owner_name}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {item.warehouse_owner_contact_no}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {item.warehouse_owner_address}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {item.rent_amount}
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
                                                updateOwnerFlagFunction(
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
                                                if (updateOwnerFlag === null) {
                                                  remove_warehouse_owner_detail(
                                                    index
                                                  );
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
                                      colSpan={6}
                                    >
                                      No Data Added
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </Box>

                          {subType === "subLeased" ? (
                            <>
                              {/* {/ ================ Lessee details ================= /} */}
                              <Box mt={commonStyle.mt}>
                                <Grid
                                  textAlign="right"
                                  templateColumns="repeat(12, 1fr)"
                                  alignItems="start"
                                  gap={4}
                                  bgColor={"#DBFFF5"}
                                  padding="20px"
                                  borderRadius="10px"
                                >
                                  <GridItem colSpan={12}>
                                    <Text fontWeight="bold" textAlign="left">
                                      Lessee details
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={2}>
                                    <Text fontWeight="bold" textAlign="left">
                                      Lessee Name
                                    </Text>
                                    <Input
                                      value={lesseeDetail.name}
                                      placeholder="Lessee Name"
                                      type="text"
                                      onChange={(e) => {
                                        setLesseeDetail((old) => ({
                                          ...old,
                                          name: e.target.value,
                                        }));
                                        setLesseeError((old) => ({
                                          ...old,
                                          name: "",
                                        }));
                                      }}
                                      style={inputStyle}
                                      border="1px"
                                      borderColor={
                                        lesseeError.name ? "red" : "gray.10"
                                      }
                                    />
                                  </GridItem>
                                  <GridItem colSpan={2}>
                                    <Text fontWeight="bold" textAlign="left">
                                      Mobile No.
                                    </Text>
                                    <Input
                                      type="tel"
                                      placeholder="Mobile No."
                                      value={lesseeDetail.mobile}
                                      onChange={(e) => {
                                        setLesseeDetail((old) => ({
                                          ...old,
                                          mobile: e.target.value,
                                        }));
                                        console.log(e);
                                        setLesseeError((old) => ({
                                          ...old,
                                          mobile: "",
                                        }));
                                      }}
                                      style={inputStyle}
                                      border="1px"
                                      borderColor={
                                        lesseeError.mobile ? "red" : "gray.10"
                                      }
                                    />
                                    <Text
                                      color="red"
                                      fontSize="14px"
                                      textAlign="left"
                                    >
                                      {lesseeError.mobile === "error"
                                        ? ""
                                        : lesseeError.mobile}
                                    </Text>
                                  </GridItem>
                                  <GridItem colSpan={4}>
                                    <Text fontWeight="bold" textAlign="left">
                                      Address
                                    </Text>
                                    <Textarea
                                      value={lesseeDetail.address}
                                      onChange={(e) => {
                                        setLesseeDetail((old) => ({
                                          ...old,
                                          address: e.target.value,
                                        }));
                                        console.log(e);
                                        setLesseeError((old) => ({
                                          ...old,
                                          address: "",
                                        }));
                                      }}
                                      style={inputStyle}
                                      rows={1}
                                      border="1px"
                                      borderColor={
                                        lesseeError.address ? "red" : "gray.10"
                                      }
                                      placeholder={"Address"}
                                    />
                                  </GridItem>{" "}
                                  <GridItem colSpan={2}>
                                    <Text fontWeight="bold" textAlign="left">
                                      Rent
                                    </Text>
                                    <Input
                                      type="number"
                                      value={lesseeDetail.rent}
                                      onChange={(e) => {
                                        setLesseeDetail((old) => ({
                                          ...old,
                                          rent: e.target.value,
                                        }));
                                        console.log(e);
                                        setLesseeError((old) => ({
                                          ...old,
                                          rent: "",
                                        }));
                                      }}
                                      style={inputStyle}
                                      border="1px"
                                      borderColor={
                                        lesseeError.rent ? "red" : "gray.10"
                                      }
                                      placeholder={"Rent"}
                                    />
                                  </GridItem>
                                  <GridItem colSpan={2} alignSelf="end">
                                    <Button
                                      type="button"
                                      backgroundColor={"primary.700"}
                                      _hover={{
                                        backgroundColor: "primary.700",
                                      }}
                                      color={"white"}
                                      borderRadius={"full"}
                                      px={"10"}
                                      onClick={() => {
                                        updateLesseeFlag !== null
                                          ? UpdateLesseeDetail()
                                          : append_new_lessee_details();
                                        console.log("here in lessee");
                                      }}
                                    >
                                      {updateLesseeFlag !== null
                                        ? "Edit"
                                        : "Add"}
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
                                        Lessee Name
                                      </th>
                                      <th
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        Mobile No.
                                      </th>
                                      <th
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        Address
                                      </th>
                                      <th
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        Rent
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
                                    {getValues(`lessee`)?.length > 0 ? (
                                      lessee.map((item, index) => (
                                        <tr>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
                                              textAlign: "center",
                                            }}
                                          >
                                            {index + 1}
                                          </td>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
                                            }}
                                          >
                                            {item.warehouse_owner_name}
                                          </td>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
                                            }}
                                          >
                                            {item.warehouse_owner_contact_no}
                                          </td>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
                                            }}
                                          >
                                            {item.warehouse_owner_address}
                                          </td>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
                                            }}
                                          >
                                            {item.rent_amount}
                                          </td>
                                          <td
                                            style={{
                                              padding:
                                                tableStyle.generalPadding,
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
                                                    updateLesseeFlagFunction(
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
                                                    if (
                                                      updateLesseeFlag === null
                                                    ) {
                                                      remove_lessee_detail(
                                                        index
                                                      );
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
                                          colSpan={6}
                                        >
                                          No Data Added
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </Box>
                            </>
                          ) : (
                            <></>
                          )}

                          <Box>
                            {/* -------------- Rent (per/sq ft/month)-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 2fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Rent (per/sq ft/month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details.rent
                                    }
                                    placeholder="Rent (per/sq ft/month)"
                                    type="number"
                                    label=""
                                    style={{
                                      w: "100%",
                                    }}
                                  />
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <Flex gap={"2"}>
                                    <Text textAlign="center" fontSize="14px">
                                      Min:{" "}
                                      <b>{minMaxAvgState?.min_rent || 0}</b>
                                    </Text>
                                    <Text textAlign="center" fontSize="14px">
                                      Avg:{" "}
                                      <b>{minMaxAvgState?.avg_rent || 0}</b>
                                    </Text>
                                    <Text textAlign="center" fontSize="14px">
                                      Max:{" "}
                                      <b>{minMaxAvgState?.max_rent || 0}</b>
                                    </Text>
                                  </Flex>
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
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Total rent payable (per month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .total_rent_per_month
                                    }
                                    placeholder="Total rent payable (per month)"
                                    type="number"
                                    label=""
                                    inputValue={getValues(
                                      formFieldsName.wms_commercial_details
                                        .total_rent_per_month
                                    )}
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .total_rent_per_month,
                                        e.target.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                    style={{
                                      w: "100%",
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Security deposit (Month) -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                // textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                justifyContent="flex-start"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Security deposit (Month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .security_deposit_month
                                    }
                                    placeholder="Security deposit(Month)"
                                    type="number"
                                    label=""
                                    inputValue={getValues(
                                      formFieldsName.wms_commercial_details
                                        .security_deposit_month
                                    )}
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .security_deposit_month,
                                        e.target.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                    style={{
                                      w: "100%",
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
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Security deposit amount
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .security_deposit_amt
                                    }
                                    inputValue={getValues(
                                      formFieldsName.wms_commercial_details
                                        .security_deposit_amt
                                    )}
                                    placeholder="Security deposit amount"
                                    type="text"
                                    label=""
                                    InputDisabled={true}
                                    style={{
                                      w: "100%",
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
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Advance rent</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <RadioGroup
                                    p="0"
                                    defaultValue={"false"}
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .advance_rent
                                    }
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .advance_rent,
                                        e,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  >
                                    <Stack spacing={5} direction="row">
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value="true"
                                      >
                                        Yes
                                      </Radio>
                                      <Radio
                                        colorScheme="radioBoxPrimary"
                                        value="false"
                                      >
                                        No
                                      </Radio>
                                    </Stack>
                                  </RadioGroup>
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Advance rent(month) -------------- */}
                            {getValues(
                              formFieldsName.wms_commercial_details.advance_rent
                            ) === "true" ? (
                              <Box mt={commonStyle.mt}>
                                <Grid
                                  // textAlign="right"
                                  alignItems="center"
                                  templateColumns="repeat(4, 1fr)"
                                  justifyContent="flex-start"
                                  gap={4}
                                >
                                  <GridItem colSpan={1}>
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
                                        w: "100%",
                                      }}
                                    />
                                  </GridItem>
                                </Grid>
                              </Box>
                            ) : (
                              <></>
                            )}
                            {/* -------------- GST-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">GST</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_commercial_details.gst
                                    }
                                    label=""
                                    options={gstOptions || []}
                                    selectedValue={gstOptions.filter(
                                      (item) => item.value === getValues("gst")
                                    )}
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
                                        gst: val,
                                      }));
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .gst,
                                        val.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Commencement Date-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Commencement Date
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .commencement_date
                                    }
                                    placeholder="Commencement Date"
                                    type="date"
                                    label=""
                                    inputValue={getValues(
                                      formFieldsName.wms_commercial_details
                                        .commencement_date
                                    )}
                                    onChange={(val) => {
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .commencement_date,
                                        val.target.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                    style={{
                                      w: "100%",
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Agreement period (Month)-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Agreement period (Month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .agreement_period_month
                                    }
                                    placeholder=" Agreement period (Month)"
                                    type="text"
                                    label=""
                                    inputValue={getValues(
                                      formFieldsName.wms_commercial_details
                                        .agreement_period_month
                                    )}
                                    onChange={(val) => {
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .agreement_period_month,
                                        val.target.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                    style={{
                                      w: "100%",
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Expiry Date-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Expiry Date</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .expiry_date
                                    }
                                    placeholder="Expiry Date"
                                    type="text"
                                    label=""
                                    inputValue={
                                      getValues(
                                        formFieldsName.wms_commercial_details
                                          .expiry_date
                                      )
                                        ? moment(
                                            getValues(
                                              formFieldsName
                                                .wms_commercial_details
                                                .expiry_date
                                            )
                                          ).format("DD/MM/YYYY")
                                        : ""
                                    }
                                    onChange={() => {}}
                                    InputDisabled={true}
                                    style={{
                                      w: "100%",
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Notice period (Month)-------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Notice period (Month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .notice_period_month
                                    }
                                    placeholder="Notice period (Month)"
                                    type="text"
                                    label=""
                                    style={{
                                      w: "100%",
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- WMS Charges according to commodity -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="start"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    WMS Charges according to commodity
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .wms_charges_according_to_commodity
                                    }
                                    label=""
                                    isMultipleSelect="true"
                                    options={selectBoxOptions?.community || []}
                                    selectedValue={selected.expectedCommodity}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={false}
                                    style={{ w: "100%" }}
                                    selectDisable={true}
                                  />
                                </GridItem>
                                <GridItem colSpan={1} textAlign="left">
                                  <Button
                                    type="button"
                                    backgroundColor={"primary.700"}
                                    _hover={{ backgroundColor: "primary.700" }}
                                    color={"white"}
                                    borderRadius={"full"}
                                    isLoading={calculatePBPMApiIsLoading}
                                    mt="8px"
                                    px={"10"}
                                    onClick={() => {
                                      calcPBPM();
                                    }}
                                  >
                                    Check PBPM
                                  </Button>
                                </GridItem>
                                {pbpmList?.length > 0 ? (
                                  <>
                                    <GridItem colSpan={1}></GridItem>
                                    <GridItem colSpan={2}>
                                      <Box p="1">
                                        <TableContainer>
                                          <Table
                                            bg="primary.100"
                                            variant="simple"
                                          >
                                            <Thead>
                                              <Tr>
                                                <Th>Commodity Name</Th>
                                                <Th>Storage rate</Th>
                                              </Tr>
                                            </Thead>
                                            <Tbody>
                                              {pbpmList?.map((item) => (
                                                <Tr>
                                                  <Td>{item.commodity_name}</Td>
                                                  <Td>{item.storage_rate} </Td>
                                                </Tr>
                                              ))}
                                            </Tbody>
                                          </Table>
                                        </TableContainer>
                                      </Box>
                                    </GridItem>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </Grid>
                            </Box>

                            {/* -------------- Your projected                 -------------- */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Your projected</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomFileInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .projected_file_url
                                    }
                                    // placeholder="Warehouse Name"
                                    type="text"
                                    label=""
                                    placeholder="Excel upload"
                                    value={getValues(
                                      formFieldsName.wms_commercial_details
                                        .projected_file_url
                                    )}
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .projected_file_url,
                                        e,
                                        { shouldValidate: true }
                                      );
                                    }}
                                    style={{
                                      w: "100%",
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
                              isLoading={saveAsDraftApiIsLoading}
                              my={"4"}
                              px={"10"}
                              onClick={() => {
                                saveAsDraftData("WMS_COMMERCIAL_DETAILS");
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
                              templateColumns={{
                                base: "1fr",
                                sm: "repeat(2, 1fr)",
                                md: "repeat(3, 1fr)",
                                lg: "repeat(4, 1fr)",
                              }}
                              alignItems="start"
                              gap={4}
                              bgColor={"#DBFFF5"}
                              padding="20px"
                              borderRadius="10px"
                            >
                              <GridItem
                                colSpan={{ base: 1, sm: 2, md: 3, lg: 4 }}
                              >
                                <Heading as="h5" fontSize="lg" textAlign="left">
                                  Client List
                                </Heading>
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left">Client Type</Text>{" "}
                                <ReactSelect
                                  options={clientClientType}
                                  placeholder=" Client Type"
                                  value={
                                    clientClientType?.filter(
                                      (item) =>
                                        item.value === clientList.clientType
                                    )[0] || {}
                                  }
                                  isLoading={false}
                                  onChange={(val) => {
                                    ClientSelectOnChange(val, "clientType");
                                  }}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: clientError.clientType
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left"> Client Name </Text>{" "}
                                <Input
                                  placeholder="client name"
                                  value={clientList.name}
                                  onChange={(val) => {
                                    ClientOnChange(val, "name");
                                  }}
                                  type="text"
                                  style={inputStyle}
                                  border="1px"
                                  borderColor={
                                    clientError.name ? "red" : "gray.10"
                                  }
                                />
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left"> Mobile Number </Text>{" "}
                                <Input
                                  placeholder="mobile number"
                                  type="tel"
                                  value={clientList.mobile}
                                  onChange={(val) => {
                                    ClientOnChange(val, "mobile");
                                  }}
                                  style={inputStyle}
                                  border="1px"
                                  borderColor={
                                    clientError.mobile ? "red" : "gray.10"
                                  }
                                />
                                <Text
                                  color="red"
                                  fontSize="14px"
                                  textAlign="left"
                                >
                                  {clientError.mobile === "error"
                                    ? ""
                                    : clientError.mobile}
                                </Text>
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left">Region</Text>{" "}
                                <ReactSelect
                                  options={selectBoxOptions?.regions || []}
                                  value={
                                    selectBoxOptions?.regions?.filter(
                                      (item) => item.value === clientList.region
                                    )[0] || {}
                                  }
                                  placeholder="Select Region"
                                  isLoading={fetchLocationDrillDownApiIsLoading}
                                  onChange={(val) => {
                                    regionOnClientChange(val);
                                  }}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: clientError.region
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left">State </Text>{" "}
                                <ReactSelect
                                  options={
                                    updateClientList === null
                                      ? clientDripDown[
                                          clientDripDown.length - 1
                                        ]?.states || {}
                                      : clientDripDown[updateClientList]
                                          ?.states || {}
                                  }
                                  placeholder="Select State"
                                  value={
                                    updateClientList === null
                                      ? clientDripDown[
                                          clientDripDown.length - 1
                                        ]?.states?.filter(
                                          (item) =>
                                            item.value === clientList.state
                                        )[0] || {}
                                      : clientDripDown[
                                          updateClientList
                                        ]?.states?.filter(
                                          (item) =>
                                            item.value === clientList.state
                                        )[0] || {}
                                  }
                                  isLoading={fetchLocationDrillDownApiIsLoading}
                                  onChange={(val) => {
                                    stateOnClientChange(val);
                                  }}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: clientError.state
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left">Sub State </Text>{" "}
                                <ReactSelect
                                  options={
                                    updateClientList === null
                                      ? clientDripDown[
                                          clientDripDown.length - 1
                                        ]?.substate || {}
                                      : clientDripDown[updateClientList]
                                          ?.substate || {}
                                  }
                                  placeholder="Select Sub State"
                                  value={
                                    updateClientList === null
                                      ? clientDripDown[
                                          clientDripDown.length - 1
                                        ]?.substate?.filter(
                                          (item) =>
                                            item.value === clientList.substate
                                        )[0] || {}
                                      : clientDripDown[
                                          updateClientList
                                        ]?.substate?.filter(
                                          (item) =>
                                            item.value === clientList.substate
                                        )[0] || {}
                                  }
                                  isLoading={fetchLocationDrillDownApiIsLoading}
                                  onChange={(val) => {
                                    zoneOnClientChange(val);
                                  }}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: clientError.substate
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left">District </Text>
                                <ReactSelect
                                  placeholder="Select District"
                                  options={
                                    updateClientList === null
                                      ? clientDripDown[
                                          clientDripDown.length - 1
                                        ]?.districts || {}
                                      : clientDripDown[updateClientList]
                                          ?.districts || {}
                                  }
                                  value={
                                    updateClientList === null
                                      ? clientDripDown[
                                          clientDripDown.length - 1
                                        ]?.districts?.filter(
                                          (item) =>
                                            item.value === clientList.district
                                        )[0] || {}
                                      : clientDripDown[
                                          updateClientList
                                        ]?.districts?.filter(
                                          (item) =>
                                            item.value === clientList.district
                                        )[0] || {}
                                  }
                                  isLoading={fetchLocationDrillDownApiIsLoading}
                                  onChange={(val) => {
                                    districtOnClientChange(val);
                                  }}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: clientError.district
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left">Area </Text>{" "}
                                <ReactSelect
                                  placeholder="Select Area"
                                  options={
                                    updateClientList === null
                                      ? clientDripDown[
                                          clientDripDown.length - 1
                                        ]?.areas || {}
                                      : clientDripDown[updateClientList]
                                          ?.areas || {}
                                  }
                                  value={
                                    updateClientList === null
                                      ? clientDripDown[
                                          clientDripDown.length - 1
                                        ]?.areas?.filter(
                                          (item) =>
                                            item.value === clientList.area
                                        )[0] || {}
                                      : clientDripDown[
                                          updateClientList
                                        ]?.areas?.filter(
                                          (item) =>
                                            item.value === clientList.area
                                        )[0] || {}
                                  }
                                  isLoading={fetchLocationDrillDownApiIsLoading}
                                  onChange={(val) => {
                                    areaOnClientChange(val);
                                  }}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: clientError.area
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </GridItem>
                              <GridItem colSpan={{ base: 1, sm: 2 }}>
                                <Text textAlign="left"> Address </Text>{" "}
                                <Textarea
                                  placeholder="address"
                                  rows={1}
                                  value={clientList.address}
                                  onChange={(val) => {
                                    ClientOnChange(val, "address");
                                  }}
                                  style={inputStyle}
                                  border="1px"
                                  borderColor={
                                    clientError.charges ? "red" : "gray.10"
                                  }
                                />
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left"> WMS Charges </Text>{" "}
                                <Input
                                  placeholder="WMS charges"
                                  type="number"
                                  value={clientList.charges}
                                  onChange={(val) => {
                                    ClientOnChange(val, "charges");
                                  }}
                                  border="1px"
                                  style={inputStyle}
                                  borderColor={
                                    clientError.charges ? "red" : "gray.10"
                                  }
                                />
                              </GridItem>
                              <GridItem>
                                <Text textAlign="left">Billing cycle </Text>{" "}
                                <ReactSelect
                                  placeholder="Billing cycle"
                                  name="clientCycle"
                                  label=""
                                  options={clientBillingCycle}
                                  value={
                                    clientBillingCycle?.filter(
                                      (item) =>
                                        item.value === clientList.billing
                                    )[0] || {}
                                  }
                                  isLoading={false}
                                  onChange={(val) => {
                                    console.log(
                                      "selectedOption @@@@@@@@@@@------> ",
                                      val
                                    );
                                    ClientSelectOnChange(val, "billing");
                                  }}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: clientError.billing
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </GridItem>
                              {/* <GridItem></GridItem>
                                    <GridItem>
                                      <Text textAlign="left">
                                        {" "}
                                        Reservation Qty (Bales, MT){" "}
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client.${index}.${formFieldsName.wms_clients_details.client.reservation_qty}`}
                                        placeholder="Reservation Qty (Bales, MT)"
                                        type="text"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">
                                        Reservation Period(Month)
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client.${index}.${formFieldsName.wms_clients_details.client.reservation_period}`}
                                        placeholder="Reservation Period(Month)"
                                        type="date"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">
                                        {" "}
                                        Reservation Start Date{" "}
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client.${index}.${formFieldsName.wms_clients_details.client.reservation_start_date}`}
                                        placeholder="Reservation Start Date"
                                        type="date"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">
                                        {" "}
                                        Reservation End Date{" "}
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client.${index}.${formFieldsName.wms_clients_details.client.reservation_end_date}`}
                                        placeholder="Reservation End Date"
                                        type="date"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem> */}
                              <GridItem
                                colSpan={{ base: 1, sm: 2, md: 3, lg: 4 }}
                              >
                                <Flex
                                  gap="10px"
                                  justifyContent="end"
                                  alignItems="center"
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
                                    onClick={() => {
                                      updateClientList !== null
                                        ? UpdateClientListFunction()
                                        : append_client_list();
                                      console.log("here in client");
                                    }}
                                  >
                                    {updateClientList !== null ? "Edit" : "Add"}
                                  </Button>
                                </Flex>
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
                                    Client Type
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Client Name
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Mobile Number
                                  </th>{" "}
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Region
                                  </th>{" "}
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    State
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Sub State
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    District
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Area
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Address
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    WMS Charges
                                  </th>
                                  <th
                                    style={{
                                      padding: tableStyle.generalPadding,
                                    }}
                                  >
                                    Billing Cycle
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
                                {getValues(`client`)?.length > 0 ? (
                                  client.map((item, index) => (
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
                                        {clientClientType?.filter(
                                          (old) =>
                                            old.value === item.client_type
                                        )[0]?.label || item.client_type}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {item.client_name}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {item.client_contact_no}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {selectBoxOptions?.regions?.filter(
                                          (old) => old.value === item.region
                                        )[0]?.label || item.region}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {clientDripDown[index]?.states?.filter(
                                          (old) => old.value === item.state
                                        )[0]?.label || item.state}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {clientDripDown[
                                          index
                                        ]?.substate?.filter(
                                          (old) => old.value === item.substate
                                        )[0]?.label || item.substate}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {clientDripDown[
                                          index
                                        ]?.districts?.filter(
                                          (old) => old.value === item.district
                                        )[0]?.label || item.district}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {clientDripDown[index]?.areas?.filter(
                                          (old) => old.value === item.area
                                        )[0]?.label || item.area}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {item.client_address}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {item.wms_charges}
                                      </td>
                                      <td
                                        style={{
                                          padding: tableStyle.generalPadding,
                                        }}
                                      >
                                        {clientBillingCycle?.filter(
                                          (old) =>
                                            old.value === item.billing_cycle
                                        )[0]?.label || item.billing_cycle}
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
                                                updateClientFunction(
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
                                                if (updateClientList === null) {
                                                  remove_client_list(index);
                                                  setClientDripDown((item) => [
                                                    ...item.slice(0, index),
                                                    ...item.slice(index + 1),
                                                  ]);
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
                                      colSpan={13}
                                    >
                                      No Data Added
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </Box>

                          <Box>
                            {/* ================ Intention Letter ================= */}
                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                templateColumns="repeat(4, 1fr)"
                                alignItems="center"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Intention Letter
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <CustomFileInput
                                    name={
                                      formFieldsName.wms_clients_details
                                        .intention_letter_url
                                    }
                                    value={getValues(
                                      formFieldsName.wms_clients_details
                                        .intention_letter_url
                                    )}
                                    placeholder="Excel upload"
                                    label=""
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_clients_details
                                          .intention_letter_url,
                                        e,
                                        { shouldValidate: true }
                                      );
                                    }}
                                    type=""
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
                                  <CustomTextArea
                                    name={
                                      formFieldsName.wms_clients_details.remarks
                                    }
                                    placeholder="Remarks"
                                    type="textarea"
                                    label=""
                                    style={{ w: "100%" }}
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
                              backgroundColor={"primary.700"}
                              _hover={{ backgroundColor: "primary.700" }}
                              color={"white"}
                              borderRadius={"full"}
                              isLoading={saveAsDraftApiIsLoading}
                              my={"4"}
                              px={"10"}
                              onClick={() => {
                                saveAsDraftData("WMS_CLIENTS_DETAILS");
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

export default Wms;
