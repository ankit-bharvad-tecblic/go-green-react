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
  Input,
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
import moment from "moment";

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
    region: "region",
    state: "state",
    zone: "zone",
    district: "district",
    area: "area",
    warehouse_address: "warehouse_address",
    warehouse_pincode: "warehouse_pincode",
    no_of_chambers: "no_of_chambers",
    is_factory_permise: "is_factory_permise",
    standard_capacity: "standard_capacity",
    currrent_capacity: "currrent_capacity",
    currrent_utilised_capacity: "currrent_utilised_capacity",
    lock_in_period: "lock_in_period",
    lock_in_period_month: "lock_in_period_month",
    covered_area: "covered_area",
    supervisor_day_shift: "supervisor_day_shift",
    supervisor_night_shift: "supervisor_night_shift",
    security_guard_day_shift: "security_guard_day_shift",
    security_guard_night_shift: "security_guard_night_shift",
  },
  wms_commodity_details: {
    expected_commodity: "expected_commodity",
    commodity_inward_type: "commodity_inward_type",
    prestack_commodity: "prestack_commodity",
    prestack_commodity_qty: "prestack_commodity_qty",
    is_funding_required: "is_funding_required",
    bank_details: {
      //not found
      bank_name: "bank_name", //not found
      branch_name: "branch_name", //not found
    },
  },
  wms_commercial_details: {
    warehouse_owner_details: {
      //not found
      owner_name: "owner_name", //not found
      mobile_no: "mobile_no", //not found
      address: "address", //not found
      rent: "rent", //not found
    },
    // min_rent: "min_rent",
    // max_rent: "max_rent",
    // avg_rent: "avg_rent",
    rent: "rent",
    total_rent_per_month: "total_rent_per_month",
    security_deposit_month: "security_deposit_month",
    security_deposit_amt: "security_deposit_amt",
    advance_rent: "advance_rent",
    advance_rent_month: "advance_rent_month",
    gst: "gst",
    commencement_date: "commencement_date",
    agreement_period_month: "agreement_period_month",
    expiry_date: "expiry_date",
    notice_period_month: "notice_period_month",
    wms_charges_according_to_commodity: "wms_charges_according_to_commodity", //not found
    projection_plan_file_path: "projection_plan_file_path",
  },
  wms_clients_details: {
    client_list: {
      //not found
      client_type: "client_type", //not found
      client_name: "client_name", //not found
      mobile_number: "mobile_number", //not found
      region: "region", //not found
      state: "state", //not found
      zone: "zone", //not found
      district: "district", //not found
      area: "area", //not found
      address: "address", //not found
      wms_charges: "wms_charges", //not found
      billing_cycle: "billing_cycle", //not found
      // reservation_qty: "reservation_qty", //not found
      // reservation_period: "reservation_period", //not found
      // reservation_start_date: "reservation_start_date", //not found
      // reservation_end_date: "reservation_end_date", //not found
    },
    intention_letter: "intention_letter", //not found
    remarks: "remarks", //not found
  },
};

const schema = yup.object().shape({
  warehouse_name: yup.string().required("Warehouse name is required"),
  region: yup.number().required("Region name is required"),
  state: yup.string().required("State name is required"),
  zone: yup.string().required("Zone name is required"),
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
  expected_commodity: yup
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
  bank_details: yup.array().when("is_funding_required", {
    is: (value) => value === "true",
    then: () =>
      yup.array().of(
        yup.object().shape({
          bank_name: yup.string().trim().required("Bank name is required"),
          branch_name: yup.string().trim().required("Branch name is required"),
        })
      ),
    otherwise: () => yup.array(),
  }),
  warehouse_owner_details: yup.array().of(
    yup.object().shape({
      owner_name: yup.string().trim() /*.required("Owner name is required")*/,
      mobile_no: yup.string().trim() /*.required("Mobile no is required")*/,
      address: yup.string().trim() /*.required("Address is required")*/,
      rent: yup.string().trim() /*.required("Rent is required")*/,
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
  projection_plan_file_path:
    yup.string() /*.required("Your project is required")*/,
  client_list: yup.array().of(
    yup.object().shape({
      client_type: yup.string().required("Client type is required"),
      client_name: yup.string().required("Client name is required"),
      mobile_number: yup.string().required("Mobile number is required"),
      region: yup.string().required("Region is required"),
      state: yup.string().required("State is required"),
      zone: yup.string().required(" Zone is required"),
      district: yup.string().required("District is required"),
      area: yup.string().required("Area is required"),
      address: yup.string().required("Address is required"),
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
  intention_letter: yup.string() /*.required("Intention letter is required")*/,
  remarks: yup.string() /*.required("remarks is required")*/,
});

const Wms = () => {
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    community: [],
    banks: [],
    branch: [],
  });

  const [selected, setSelected] = useState({});

  const [locationDrillDownState, setLocationDrillDownState] = useState({});

  const [clientLocationDrillDownState, setClientLocationDrillDownState] =
    useState([{ states: [], zones: [], districts: [], areas: [] }]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bank_details: [{ bank_name: "", branch_name: "" }],
      warehouse_owner_details: [
        { owner_name: "", mobile_no: "", address: "", rent: "" },
      ],
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
          wms_charges: "",
          billing_cycle: "",
          // reservation_qty: "",
          // reservation_period: "",
          // reservation_start_date: "",
          // reservation_end_date: "",
        },
      ],
    },
  });

  const { setValue, getValues } = methods;

  const {
    fields: bank_details_fields,
    append: add_new_bank_detail,
    remove: remove_bank_detail,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "bank_details",
  });

  const append_new_bank_details = () => {
    add_new_bank_detail({
      bank_name: "",
      branch_name: "",
    });
  };

  useEffect(() => {
    console.log("bank_details_fields --> ", bank_details_fields);
  }, [bank_details_fields]);

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
      wms_charges: "",
      billing_cycle: "",
      // reservation_qty: "",
      // reservation_period: "",
      // reservation_start_date: "",
      // reservation_end_date: "",
    });
  };

  useEffect(() => {
    console.log("client_list --> ", client_list);
  }, [client_list]);

  const {
    fields: warehouse_owner_details,
    append: add_warehouse_owner_detail,
    remove: remove_warehouse_owner_detail,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "warehouse_owner_details",
  });

  const append_new_warehouse_owner_details = () => {
    add_warehouse_owner_detail({
      owner_name: "",
      mobile_no: "",
      address: "",
      rent: "",
    });
  };

  useEffect(() => {
    console.log("warehouse_owner_details --> ", warehouse_owner_details);
  }, [warehouse_owner_details]);

  // Region State  Zone District Area  onChange drill down api start //

  // location drill down api hook
  const [
    fetchLocationDrillDown,
    { isLoading: fetchLocationDrillDownApiIsLoading },
  ] = useFetchLocationDrillDownMutation();

  const [getRegionMaster, { isLoading: getRegionMasterApiIsLoading }] =
    useGetRegionMasterMutation();

  const getRegionMasterList = async () => {
    try {
      const response = await getRegionMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          regions: response?.results.map(({ region_name, id }) => ({
            label: region_name,
            value: id,
          })),
        }));
      }
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
      zone: {},
      district: {},
      area: {},
    }));
    setValue(formFieldsName.wms_warehouse_details.state, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.zone, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.district, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.area, null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      ...prev,
      region: val?.value,
    }));

    const query = {
      ...locationDrillDownState,
      region: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      setSelectBoxOptions((prev) => ({
        ...prev,
        states: response?.state?.map(({ state_name, id }) => ({
          label: state_name,
          value: id,
        })),
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
      zone: {},
      district: {},
      area: {},
    }));

    setValue(formFieldsName.wms_warehouse_details.zone, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.district, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.wms_warehouse_details.area, null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      ...prev,
      state: val?.value,
    }));

    const query = {
      ...locationDrillDownState,
      state: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      setSelectBoxOptions((prev) => ({
        ...prev,
        zones: response?.zone?.map(({ substate_name, id }) => ({
          label: substate_name,
          value: id,
        })),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const zoneOnChange = async (val) => {
    console.log("value --> ", val);
    setValue(formFieldsName.wms_warehouse_details.zone, val?.value, {
      shouldValidate: true,
    });

    setSelected((prev) => ({ ...prev, zone: val }));
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
      ...prev,
      zone: val?.value,
    }));

    const query = {
      ...locationDrillDownState,
      zone: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      setSelectBoxOptions((prev) => ({
        ...prev,
        districts: response?.district?.map(({ district_name, id }) => ({
          label: district_name,
          value: id,
        })),
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

    setValue(formFieldsName.wms_warehouse_details.area, val?.value, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      ...prev,
      district: val?.value,
    }));

    const query = {
      ...locationDrillDownState,
      district: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      setSelectBoxOptions((prev) => ({
        ...prev,
        areas: response?.area?.map(({ area_name, id }) => ({
          label: area_name,
          value: id,
        })),
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

  // second accordian function start

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
          branch: response?.results.map(({ branch_name, id }) => ({
            label: branch_name,
            value: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //second accordian function end

  // client list drill down api start
  const regionOnClientChange = async (val, index) => {
    console.log("value --> ", val);
    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.region}`,
      val?.value,
      {
        shouldValidate: true,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.state}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.zone}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.district}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.area}`,
      null,
      {
        shouldValidate: false,
      }
    );

    const query = {
      region: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      let location = clientLocationDrillDownState[index];

      location.states = response?.state?.map(({ state_name, id }) => ({
        label: state_name,
        value: id,
      }));

      setClientLocationDrillDownState((item) => [
        ...item.slice(0, index),
        location,
        ...item.slice(index + 1),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const stateOnClientChange = async (val, index) => {
    console.log("value --> ", val);

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.state}`,
      val?.value,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.zone}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.district}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.area}`,
      null,
      {
        shouldValidate: false,
      }
    );

    const query = {
      region: getValues(
        `client_list.${index}.${formFieldsName.wms_clients_details.client_list.region}`
      ),
      state: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      let location = clientLocationDrillDownState[index];

      location.zones = response?.zone?.map(({ substate_name, id }) => ({
        label: substate_name,
        value: id,
      }));

      setClientLocationDrillDownState((item) => [
        ...item.slice(0, index),
        location,
        ...item.slice(index + 1),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const zoneOnClientChange = async (val, index) => {
    console.log("value --> ", val);
    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.zone}`,
      val?.value,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.district}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.area}`,
      null,
      {
        shouldValidate: false,
      }
    );

    const query = {
      region: getValues(
        `client_list.${index}.${formFieldsName.wms_clients_details.client_list.region}`
      ),
      state: getValues(
        `client_list.${index}.${formFieldsName.wms_clients_details.client_list.state}`
      ),
      zone: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      let location = clientLocationDrillDownState[index];

      location.districts = response?.district?.map(({ district_name, id }) => ({
        label: district_name,
        value: id,
      }));

      setClientLocationDrillDownState((item) => [
        ...item.slice(0, index),
        location,
        ...item.slice(index + 1),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const districtOnClientChange = async (val, index) => {
    console.log("value --> ", val);
    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.district}`,
      val?.value,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.area}`,
      null,
      {
        shouldValidate: false,
      }
    );

    const query = {
      region: getValues(
        `client_list.${index}.${formFieldsName.wms_clients_details.client_list.region}`
      ),
      state: getValues(
        `client_list.${index}.${formFieldsName.wms_clients_details.client_list.state}`
      ),
      zone: getValues(
        `client_list.${index}.${formFieldsName.wms_clients_details.client_list.zone}`
      ),
      district: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      let location = clientLocationDrillDownState[index];

      location.areas = response?.area?.map(({ area_name, id }) => ({
        label: area_name,
        value: id,
      }));

      setClientLocationDrillDownState((item) => [
        ...item.slice(0, index),
        location,
        ...item.slice(index + 1),
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const areaOnClientChange = (val, index) => {
    setValue(
      `client_list.${index}.${formFieldsName.wms_clients_details.client_list.area}`,
      val?.value,
      {
        shouldValidate: false,
      }
    );
  };

  // client list drill down api end

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
          standard_capacity: getValues("standard_capacity"),
          currrent_capacity: getValues("currrent_capacity"),
          currrent_utilised_capacity: getValues("currrent_utilised_capacity"),
          lock_in_period: getValues("lock_in_period"),
          lock_in_period_month: getValues("lock_in_period_month"),
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
          expected_commodity: getValues("expected_commodity"),
          commodity_inward_type: getValues("commodity_inward_type"),
          prestack_commodity: getValues("prestack_commodity"),
          prestack_commodity_qty: getValues("prestack_commodity_qty"),
          is_funding_required: getValues("is_funding_required"),
          bank_details: bank_details_fields,
        };

        console.log("WMS_COMMODITY_DETAILS @@ --> ", data);
      } else if (type === "WMS_COMMERCIAL_DETAILS") {
        data = {
          is_draft: true,
          warehouse_owner_details: warehouse_owner_details, //not found
          // min_rent: getValues("min_rent"),
          // max_rent: getValues("max_rent"),
          // avg_rent: getValues("avg_rent"),
          rent: getValues("rent"),
          total_rent_per_month: getValues("total_rent_per_month"),
          security_deposit_month: getValues("security_deposit_month"),
          security_deposit_amt: getValues("security_deposit_amt"),
          advance_rent: getValues("advance_rent"),
          advance_rent_month: getValues("advance_rent_month"),
          gst: getValues("gst"),
          commencement_date: getValues("commencement_date"),
          agreement_period_month: getValues("agreement_period_month"),
          expiry_date: getValues("expiry_date"),
          notice_period_month: getValues("notice_period_month"),
          wms_charges_according_to_commodity: getValues(
            "wms_charges_according_to_commodity"
          ), //not found
          projection_plan_file_path: getValues("projection_plan_file_path"),
        };

        console.log("WMS_COMMERCIAL_DETAILS @@ --> ", data);
      } else if (type === "WMS_CLIENTS_DETAILS") {
        data = {
          is_draft: true,
          client_list: getValues("client_list"), //not found
          intention_letter: getValues("intention_letter"), //not found
          remarks: getValues("remarks"), //not found
        };

        console.log("WMS_CLIENTS_DETAILS @@ --> ", data);
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
    getCommodityMasterList();
    getBankMasterList();
    getBranchMasterList();
    fetchSupervisorDayShift();
    fetchSupervisorNightShift();
    fetchSecurityGuardDayShift();
    fetchSecurityGuardNightShift();
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
                          // w={{
                          //   base: "100%",
                          //   sm: "100%",
                          //   md: "100%",
                          //   lg: "100%",
                          //   xl: "70%",
                          // }}
                          >
                            {/* --------------  Warehouse Name -------------- */}
                            <Box>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Warehouse Name</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
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
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">Region</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .region
                                    }
                                    label=""
                                    isLoading={getRegionMasterApiIsLoading}
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
                                  {" "}
                                  <Text textAlign="right">State</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_warehouse_details.state
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
                            {/* -------------- Zone -------------- */}
                            <Box mt={commonStyle.mt}>
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">Zone</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_warehouse_details.zone
                                    }
                                    label=""
                                    options={selectBoxOptions?.zones || []}
                                    selectedValue={selected?.zone}
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
                                <GridItem colSpan={1}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_warehouse_details
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">Area</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_warehouse_details.area
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="start"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Warehouse Address
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
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
                                  {" "}
                                  <Text textAlign="right">Pin Code</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    No Of Chambers
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .no_of_chambers
                                    }
                                    placeholder="No Of Chambers"
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
                                <GridItem colSpan={1}>
                                  <RadioGroup
                                    p="0"
                                    defaultValue={"false"}
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .is_factory_permise
                                    }
                                    onChange={(e) => {
                                      console.log(e, "came here");
                                      setValue(
                                        formFieldsName.wms_warehouse_details
                                          .is_factory_permise,
                                        e,
                                        { shouldValidate: true }
                                      );
                                      console.log("came here2");
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
                                  {" "}
                                  <Text textAlign="right">
                                    Standard Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Current Warehouse Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Current Utilizes Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
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
                                  {" "}
                                  <Text textAlign="right">
                                    {" "}
                                    Lock In Period
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <RadioGroup
                                    p="0"
                                    defaultValue={"false"}
                                    name={
                                      formFieldsName.wms_warehouse_details
                                        .lock_in_period
                                    }
                                    onChange={(e) => {
                                      console.log(e, "came here");
                                      setValue(
                                        formFieldsName.wms_warehouse_details
                                          .lock_in_period,
                                        e,
                                        { shouldValidate: true }
                                      );
                                      console.log("came here2");
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
                                    </Text>{" "}
                                  </GridItem>
                                  <GridItem colSpan={1}>
                                    <CustomInput
                                      name={
                                        formFieldsName.wms_warehouse_details
                                          .lock_in_period_month
                                      }
                                      placeholder=" Lock In Period Month"
                                      type="text"
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Covered Area (In Sq.Ft)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
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
                              {" "}
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
                                <GridItem colSpan={1}>
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
                                          formFieldsName.wms_warehouse_details
                                            .supervisor_day_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={2}>
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
                                <GridItem colSpan={1}>
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
                                          formFieldsName.wms_warehouse_details
                                            .supervisor_night_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={2}>
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
                              {" "}
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
                                <GridItem colSpan={1}>
                                  {" "}
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
                                          formFieldsName.wms_warehouse_details
                                            .security_guard_day_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={2}>
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
                              {" "}
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
                                <GridItem colSpan={1}>
                                  {" "}
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
                                          formFieldsName.wms_warehouse_details
                                            .security_guard_night_shift,
                                          val.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                  </Box>
                                </GridItem>
                                <GridItem colSpan={2}>
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
                                <GridItem colSpan={1}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_commodity_details
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
                                        formFieldsName.wms_commodity_details
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
                                <GridItem colSpan={1}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_commodity_details
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
                                    <GridItem colSpan={1}>
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
                                    <GridItem colSpan={1}>
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
                                <GridItem colSpan={1}>
                                  <RadioGroup
                                    p="0"
                                    defaultValue={"false"}
                                    name={
                                      formFieldsName.wms_commodity_details
                                        .is_funding_required
                                    }
                                    onChange={(e) => {
                                      console.log(e, "came here");
                                      setValue(
                                        formFieldsName.wms_commodity_details
                                          .is_funding_required,
                                        e,
                                        { shouldValidate: true }
                                      );
                                      console.log("came here2");
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
                                {bank_details_fields &&
                                  bank_details_fields.map((item, index) => (
                                    <>
                                      <GridItem colSpan={1}>
                                        <Text textAlign="left"> Sr No </Text>{" "}
                                        <Box
                                          textAlign="center"
                                          border="1px"
                                          p="2"
                                          borderColor="gray.10"
                                          borderRadius="6"
                                        >
                                          {index + 1}
                                        </Box>
                                      </GridItem>
                                      {/* =============== Bank Name ============= */}
                                      <GridItem colSpan={3}>
                                        <Text textAlign="left">Bank Name</Text>{" "}
                                        <ReactCustomSelect
                                          name={`bank_details.${index}.${formFieldsName.wms_commodity_details.bank_details.bank_name}`}
                                          label=""
                                          options={
                                            selectBoxOptions?.banks || []
                                          }
                                          selectedValue={
                                            selectBoxOptions?.banks?.filter(
                                              (item) =>
                                                item.value ===
                                                getValues(
                                                  `bank_details.${index}.${formFieldsName.wms_commodity_details.bank_details.bank_name}`
                                                )
                                            )[0] || {}
                                          }
                                          isClearable={false}
                                          selectType="label"
                                          isLoading={getBankMasterApiIsLoading}
                                          style={{ w: "100%" }}
                                          handleOnChange={(val) => {
                                            console.log(
                                              "selectedOption @@@@@@@@@@@------> ",
                                              val
                                            );
                                            setValue(
                                              `bank_details.${index}.${formFieldsName.wms_commodity_details.bank_details.bank_name}`,
                                              val.value,
                                              { shouldValidate: true }
                                            );
                                          }}
                                        />
                                      </GridItem>
                                      {/* =============== Branch Name ============= */}
                                      <GridItem colSpan={2}>
                                        <Text textAlign="left">
                                          Branch Name{" "}
                                        </Text>{" "}
                                        <ReactCustomSelect
                                          name={`bank_details.${index}.${formFieldsName.wms_commodity_details.bank_details.branch_name}`}
                                          label=""
                                          options={
                                            selectBoxOptions?.branch || []
                                          }
                                          selectedValue={
                                            selectBoxOptions?.branch?.filter(
                                              (item) =>
                                                item.value ===
                                                getValues(
                                                  `bank_details.${index}.${formFieldsName.wms_commodity_details.bank_details.branch_name}`
                                                )
                                            )[0] || {}
                                          }
                                          isClearable={false}
                                          selectType="label"
                                          isLoading={
                                            getBankBranchMasterApiIsLoading
                                          }
                                          style={{ w: "100%" }}
                                          handleOnChange={(val) => {
                                            console.log(
                                              "selectedOption @@@@@@@@@@@------> ",
                                              val
                                            );
                                            setValue(
                                              `bank_details.${index}.${formFieldsName.wms_commodity_details.bank_details.branch_name}`,
                                              val.value,
                                              { shouldValidate: true }
                                            );
                                          }}
                                        />
                                      </GridItem>
                                      {/* =============== Add / Delete ============= */}
                                      <GridItem colSpan={6}>
                                        <Flex
                                          gap="10px"
                                          justifyContent="end"
                                          alignItems="center"
                                        >
                                          <MdAddBox
                                            color="#A6CE39"
                                            fontSize="45px"
                                            cursor={"pointer"}
                                            onClick={() => {
                                              append_new_bank_details();
                                            }}
                                          />
                                          <MdIndeterminateCheckBox
                                            color="#FF4444"
                                            fontSize="45px"
                                            cursor={"pointer"}
                                            onClick={() => {
                                              if (
                                                bank_details_fields?.length > 1
                                              ) {
                                                remove_bank_detail(index);
                                              }
                                            }}
                                          />
                                        </Flex>
                                      </GridItem>
                                    </>
                                  ))}
                              </Grid>
                            </Box>
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
                              //w="full"
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
                                <Text textAlign="left">
                                  Warehouse Owner details
                                </Text>{" "}
                              </GridItem>
                              {warehouse_owner_details &&
                                warehouse_owner_details.map((item, index) => (
                                  <>
                                    <GridItem colSpan={1}>
                                      <Text textAlign="left"> Sr No </Text>{" "}
                                      <Box
                                        textAlign="center"
                                        border="1px"
                                        p="2"
                                        borderColor="gray.10"
                                        borderRadius="6"
                                      >
                                        {index + 1}
                                      </Box>
                                    </GridItem>
                                    {/* =============== Owner Name ============= */}
                                    <GridItem colSpan={2}>
                                      <Text fontWeight="bold" textAlign="left">
                                        Owner Name
                                      </Text>{" "}
                                      <CustomInput
                                        name={`warehouse_owner_details.${index}.${formFieldsName.wms_commercial_details.warehouse_owner_details.owner_name}`}
                                        placeholder="Owner Name"
                                        type="text"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    {/* =============== Mobile No ============= */}
                                    <GridItem colSpan={2}>
                                      <Text fontWeight="bold" textAlign="left">
                                        Mobile No
                                      </Text>{" "}
                                      <CustomInput
                                        name={`warehouse_owner_details.${index}.${formFieldsName.wms_commercial_details.warehouse_owner_details.mobile_no}`}
                                        placeholder="Mobile No"
                                        type="number"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    {/* =============== Address ============= */}
                                    <GridItem colSpan={3}>
                                      <Text fontWeight="bold" textAlign="left">
                                        Address
                                      </Text>{" "}
                                      <CustomTextArea
                                        name={`warehouse_owner_details.${index}.${formFieldsName.wms_commercial_details.warehouse_owner_details.address}`}
                                        placeholder="Address"
                                        type="text"
                                        rowLength={1}
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    {/* =============== Rent ============= */}
                                    <GridItem colSpan={2}>
                                      <Text fontWeight="bold" textAlign="left">
                                        Rent
                                      </Text>{" "}
                                      <CustomInput
                                        name={`warehouse_owner_details.${index}.${formFieldsName.wms_commercial_details.warehouse_owner_details.rent}`}
                                        placeholder="Rent"
                                        type="number"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    {/* =============== Add / Delete ============= */}
                                    <GridItem colSpan={2}>
                                      <Flex
                                        gap="10px"
                                        justifyContent="end"
                                        alignItems="center"
                                      >
                                        <MdAddBox
                                          color="#A6CE39"
                                          fontSize="45px"
                                          cursor={"pointer"}
                                          onClick={() => {
                                            append_new_warehouse_owner_details();
                                          }}
                                        />
                                        <MdIndeterminateCheckBox
                                          color="#FF4444"
                                          fontSize="45px"
                                          cursor={"pointer"}
                                          onClick={() => {
                                            if (
                                              warehouse_owner_details?.length >
                                              1
                                            ) {
                                              remove_warehouse_owner_detail(
                                                index
                                              );
                                            }
                                          }}
                                        />
                                      </Flex>
                                    </GridItem>
                                  </>
                                ))}
                            </Grid>
                          </Box>

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
                                <GridItem colSpan={1}>
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
                                <GridItem colSpan={2}>
                                  <Flex gap={"4"}>
                                    <Text textAlign="right">Min: 1223</Text>
                                    <Text textAlign="right">Avg: 1223</Text>
                                    <Text textAlign="right">Max: 1223</Text>
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
                                <GridItem colSpan={1}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .total_rent_per_month
                                    }
                                    placeholder="Total rent payable (per month)"
                                    type="number"
                                    label=""
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .total_rent_per_month,
                                        e.target.value,
                                        { shouldValidate: true }
                                      );
                                      if (
                                        getValues(
                                          formFieldsName.wms_commercial_details
                                            .security_deposit_month
                                        )
                                      ) {
                                        setValue(
                                          formFieldsName.wms_commercial_details
                                            .security_deposit_amt,
                                          getValues(
                                            formFieldsName
                                              .wms_commercial_details
                                              .security_deposit_month
                                          ) * e.target.value,
                                          { shouldValidate: true }
                                        );
                                      }
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
                                <GridItem colSpan={1}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .security_deposit_month
                                    }
                                    placeholder="Security deposit(Month)"
                                    type="number"
                                    label=""
                                    onChange={(e) => {
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .security_deposit_month,
                                        e.target.value,
                                        { shouldValidate: true }
                                      );
                                      if (
                                        getValues(
                                          formFieldsName.wms_commercial_details
                                            .total_rent_per_month
                                        )
                                      ) {
                                        setValue(
                                          formFieldsName.wms_commercial_details
                                            .security_deposit_amt,
                                          getValues(
                                            formFieldsName
                                              .wms_commercial_details
                                              .total_rent_per_month
                                          ) * e.target.value,
                                          { shouldValidate: true }
                                        );
                                      }
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
                                <GridItem colSpan={1}>
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
                                <GridItem colSpan={1}>
                                  <RadioGroup
                                    p="0"
                                    defaultValue={"false"}
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .advance_rent
                                    }
                                    onChange={(e) => {
                                      console.log(e, "came here");
                                      setValue(
                                        formFieldsName.wms_commercial_details
                                          .advance_rent,
                                        e,
                                        { shouldValidate: true }
                                      );
                                      console.log("came here2");
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
                                    {" "}
                                    <Text textAlign="right">
                                      Advance rent(month)
                                    </Text>{" "}
                                  </GridItem>
                                  <GridItem colSpan={1}>
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">GST</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.wms_commercial_details.gst
                                    }
                                    label=""
                                    options={[
                                      {
                                        label: "Applicable",
                                        value: "Applicable",
                                      },
                                      {
                                        label: "Not applicable",
                                        value: "Not applicable",
                                      },
                                    ]}
                                    selectedValue={selected.gst}
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
                              {" "}
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
                                <GridItem colSpan={1}>
                                  {" "}
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
                                      if (
                                        getValues(
                                          formFieldsName.wms_commercial_details
                                            .agreement_period_month
                                        )
                                      ) {
                                        setValue(
                                          formFieldsName.wms_commercial_details
                                            .expiry_date,
                                          moment(val.target.value)
                                            .add(
                                              getValues(
                                                formFieldsName
                                                  .wms_commercial_details
                                                  .agreement_period_month
                                              ),
                                              "months"
                                            )
                                            .format("DD/MM/YYYY"),
                                          { shouldValidate: true }
                                        );
                                      }
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
                              {" "}
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
                                <GridItem colSpan={1}>
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
                                      if (
                                        getValues(
                                          formFieldsName.wms_commercial_details
                                            .commencement_date
                                        )
                                      ) {
                                        setValue(
                                          formFieldsName.wms_commercial_details
                                            .expiry_date,
                                          moment(
                                            getValues(
                                              formFieldsName
                                                .wms_commercial_details
                                                .commencement_date
                                            )
                                          )
                                            .add(val.target.value, "months")
                                            .format("DD/MM/YYYY"),
                                          { shouldValidate: true }
                                        );
                                      }
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">Expiry Date</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <CustomInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .expiry_date
                                    }
                                    placeholder="Expiry Date"
                                    type="text"
                                    label=""
                                    inputValue={getValues(
                                      formFieldsName.wms_commercial_details
                                        .expiry_date
                                    )}
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Notice period (Month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    WMS Charges according to commodity
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
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
                                    handleOnChange={(val) => {}}
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
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Your projected
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={1}>
                                  {" "}
                                  <CustomFileInput
                                    name={
                                      formFieldsName.wms_commercial_details
                                        .projection_plan_file_path
                                    }
                                    // placeholder="Warehouse Name"
                                    type="text"
                                    label=""
                                    placeholder="Excel upload"
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
                                    <GridItem>
                                      <Text textAlign="left">Client Type</Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.client_type}`}
                                        label=""
                                        options={[
                                          {
                                            label: "Corporate",
                                            value: "Corporate",
                                          },
                                          {
                                            label: "Retail",
                                            value: "Retail",
                                          },
                                        ]}
                                        selectedValue={
                                          [
                                            {
                                              label: "Corporate",
                                              value: "Corporate",
                                            },
                                            {
                                              label: "Retail",
                                              value: "Retail",
                                            },
                                          ]?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.wms_clients_details.client_list.client_type}`
                                              )
                                          )[0] || {}
                                        }
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
                                            `client_list.${index}.${formFieldsName.wms_clients_details.client_list.client_type}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">
                                        {" "}
                                        Client Name{" "}
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.client_name}`}
                                        placeholder="client name"
                                        inputValue={getValues(
                                          `client_list.${index}.${formFieldsName.wms_clients_details.client_list.client_name}`
                                        )}
                                        onChange={(val) => {
                                          setValue(
                                            `client_list.${index}.${formFieldsName.wms_clients_details.client_list.client_name}`,
                                            val.target.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                        type="text"
                                        label=""
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">
                                        {" "}
                                        Mobile Number{" "}
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.mobile_number}`}
                                        placeholder="mobile number"
                                        type="text"
                                        label=""
                                        inputValue={getValues(
                                          `client_list.${index}.${formFieldsName.wms_clients_details.client_list.mobile_number}`
                                        )}
                                        onChange={(val) => {
                                          setValue(
                                            `client_list.${index}.${formFieldsName.wms_clients_details.client_list.mobile_number}`,
                                            val.target.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                        style={{ w: "100%" }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">Region</Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.region}`}
                                        label=""
                                        options={
                                          selectBoxOptions?.regions || []
                                        }
                                        selectedValue={
                                          selectBoxOptions?.regions?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.wms_clients_details.client_list.region}`
                                              )
                                          )[0] || {}
                                        }
                                        isClearable={false}
                                        selectType="label"
                                        isLoading={false}
                                        style={{ w: "100%" }}
                                        handleOnChange={(val) => {
                                          regionOnClientChange(val, index);
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">State </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.state}`}
                                        label=""
                                        options={
                                          clientLocationDrillDownState[index]
                                            ?.states || {}
                                        }
                                        selectedValue={
                                          clientLocationDrillDownState[
                                            index
                                          ]?.states?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.wms_clients_details.client_list.state}`
                                              )
                                          )[0] || {}
                                        }
                                        isClearable={false}
                                        selectType="label"
                                        isLoading={false}
                                        style={{ w: "100%" }}
                                        handleOnChange={(val) => {
                                          stateOnClientChange(val, index);
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">Zone </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.zone}`}
                                        label=""
                                        options={
                                          clientLocationDrillDownState[index]
                                            ?.zones || {}
                                        }
                                        selectedValue={
                                          clientLocationDrillDownState[
                                            index
                                          ]?.zones?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.wms_clients_details.client_list.zone}`
                                              )
                                          )[0] || {}
                                        }
                                        isClearable={false}
                                        selectType="label"
                                        isLoading={false}
                                        style={{ w: "100%" }}
                                        handleOnChange={(val) => {
                                          zoneOnClientChange(val, index);
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">District </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.district}`}
                                        label=""
                                        options={
                                          clientLocationDrillDownState[index]
                                            ?.districts || {}
                                        }
                                        selectedValue={
                                          clientLocationDrillDownState[
                                            index
                                          ]?.districts?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.wms_clients_details.client_list.district}`
                                              )
                                          )[0] || {}
                                        }
                                        isClearable={false}
                                        selectType="label"
                                        isLoading={false}
                                        style={{ w: "100%" }}
                                        handleOnChange={(val) => {
                                          districtOnClientChange(val, index);
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">Area </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.area}`}
                                        label=""
                                        options={
                                          clientLocationDrillDownState[index]
                                            ?.areas || {}
                                        }
                                        selectedValue={
                                          clientLocationDrillDownState[
                                            index
                                          ]?.areas?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.wms_clients_details.client_list.area}`
                                              )
                                          )[0] || {}
                                        }
                                        isClearable={false}
                                        selectType="label"
                                        isLoading={false}
                                        style={{ w: "100%" }}
                                        handleOnChange={(val) => {
                                          areaOnClientChange(val, index);
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem colSpan={{ base: 1, sm: 2 }}>
                                      <Text textAlign="left"> Address </Text>{" "}
                                      <CustomTextArea
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.address}`}
                                        placeholder="address"
                                        type="text"
                                        rowLength={1}
                                        label=""
                                        style={{ w: "100%" }}
                                        inputValue={getValues(
                                          `client_list.${index}.${formFieldsName.wms_clients_details.client_list.address}`
                                        )}
                                        onChange={(val) => {
                                          setValue(
                                            `client_list.${index}.${formFieldsName.wms_clients_details.client_list.address}`,
                                            val.target.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">
                                        {" "}
                                        WMS Charges{" "}
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.wms_charges}`}
                                        placeholder="WMS charges"
                                        type="text"
                                        label=""
                                        style={{ w: "100%" }}
                                        inputValue={getValues(
                                          `client_list.${index}.${formFieldsName.wms_clients_details.client_list.wms_charges}`
                                        )}
                                        onChange={(val) => {
                                          setValue(
                                            `client_list.${index}.${formFieldsName.wms_clients_details.client_list.wms_charges}`,
                                            val.target.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem>
                                      <Text textAlign="left">
                                        Billing cycle{" "}
                                      </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.billing_cycle}`}
                                        label=""
                                        options={[
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
                                        ]}
                                        selectedValue={
                                          [
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
                                          ]?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.wms_clients_details.client_list.billing_cycle}`
                                              )
                                          )[0] || {}
                                        }
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
                                            `client_list.${index}.${formFieldsName.wms_clients_details.client_list.billing_cycle}`,
                                            val.value,
                                            { shouldValidate: true }
                                          );
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
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.reservation_qty}`}
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
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.reservation_period}`}
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
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.reservation_start_date}`}
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
                                        name={`client_list.${index}.${formFieldsName.wms_clients_details.client_list.reservation_end_date}`}
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
                                        <MdAddBox
                                          color="#A6CE39"
                                          fontSize="45px"
                                          cursor={"pointer"}
                                          onClick={() => {
                                            append_client_list();
                                            setClientLocationDrillDownState(
                                              (item) => [
                                                ...item,
                                                {
                                                  states: [],
                                                  zones: [],
                                                  districts: [],
                                                  areas: [],
                                                },
                                              ]
                                            );
                                          }}
                                        />
                                        <MdIndeterminateCheckBox
                                          color="#FF4444"
                                          fontSize="45px"
                                          cursor={"pointer"}
                                          onClick={() => {
                                            if (client_list?.length > 1) {
                                              remove_client_list(index);
                                              setClientLocationDrillDownState(
                                                (item) => [
                                                  ...item.slice(0, index),
                                                  ...item.slice(index + 1),
                                                ]
                                              );
                                            }
                                          }}
                                        />
                                      </Flex>
                                    </GridItem>
                                  </>
                                ))}
                            </Grid>
                          </Box>
                          <Box
                          //border="1px"
                          >
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
                                <GridItem colSpan={1}>
                                  <CustomFileInput
                                    name={
                                      formFieldsName.wms_clients_details
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
                                <GridItem colSpan={1} textAlign={"left"}>
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
                              //w="full"
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
