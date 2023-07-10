import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  list,
} from "@chakra-ui/react";
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
import * as Yup from "yup";
import ReactSelect from "react-select";
import {
  gstNumber,
  gstNumberValidation,
} from "../../services/validation.service";
import {
  useCalculatePBPMMutation,
  useFetchLocationDrillDownMutation,
  useGetSecurityGuardDayShiftMutation,
  useGetSecurityGuardNightShiftMutation,
  useGetSupervisorDayShiftMutation,
  useGetSupervisorNightShiftMutation,
  useMinMaxAvgMutation,
  useSaveAsDraftMutation,
} from "../../features/warehouse-proposal.slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { calculateExpiryDate } from "../../utils/calculateDates";
import moment from "moment";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

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

const client_details_obj = {
  client_type: "Retail",
  client_name: "",
  mobile_number: "",
  region: "",
  state: "",
  zone: "",
  district: "",
  area: "",
  address: "",

  dynamicFields: {
    storage_charges: null,
    reservation_qty: null,
    reservation_start_date: "",
    reservation_end_date: "",
    reservation_period_month: null,
    reservation_billing_cycle: "",

    post_reservation_billing_cycle: "",
    post_reservation_storage_charges: "",
  },
};

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

const mobileNumberRegex = /^\d{10}$/;

const formFieldsName = {
  pwh_warehouse_details: {
    warehouse_name: "warehouse_name",
    region_name: "region",
    state_name: "state",
    zone_name: "zone",
    district_name: "district",
    area_name: "area",
    warehouse_address: "warehouse_address",
    pin_code: "warehouse_pincode",
    no_of_chamber: "no_of_chambers",
    warehouse_in_factory_premises: "is_factory_permise",
    standard_capacity: "standard_capacity",
    standard_warehouse_capacity: "standard_warehouse_capacity", // for asking
    standard_utilizes_capacity: "currrent_utilised_capacity",
    lock_in_period: "lock_in_period",
    lock_in_period_month: "lock_in_period_month",
    covered_area: "covered_area",
    supervisor_for_day_shift: "supervisor_day_shift",
    supervisor_for_night_shift: "supervisor_night_shift",
    security_guard_for_day_shift: "security_guard_day_shift",
    security_guard_for_night_shift: "security_guard_night_shift",
  },
  pwh_commodity_details: {
    expected_commodity_name: "expected_commodity",
    commodity_inward_type: "commodity_inward_type",
    pre_stack_commodity: "prestack_commodity",
    pre_stack_commodity_quantity: "prestack_commodity_qty",
    funding_required: "is_funding_required",
    bank_details_fields: {
      bank: "bank",
      branch: "branch",
    },
  },
  pwh_commercial_details: {
    minimum_rent: "min_rent",
    maximum_rent: "max_rent",
    avg_rent: "avg_rent",
    rent: "rent",
    total_rent_payable_months: "total_rent_per_month",

    pwh_commercial_multipal_details: {
      owner_name: "owner_name",
      mobile_no: "mobile_no",
      address: "address",
      rent: "rent",
    },

    go_green_revenue_sharing_ratio: "gg_revenue_ratio",
    security_deposit_amount: "security_deposit_amt",
    advance_rent: "advance_rent",
    advance_rent_month: "advance_rent_month",
    gst: "gst",
    commencement_date: "commencement_date",
    agreement_period: "agreement_period_month",
    expiry_date: "expiry_date",
    notice_period: "notice_period_month",
    storage_charges_according_to_commodity:
      "storage_charges_according_to_commodity",
    your_project: "your_project",
  },
  pwh_clients_details: {
    client_list: {
      client_type: "client_type",
      client_name: "client_name",
      mobile_number: "mobile_number",
      region: "region",
      state: "state",
      zone: "SubState",
      district: "district",
      area: "area",
      address: "address",

      storage_charges: "storage_charges",
      reservation_qty: "reservation_qty",
      reservation_start_date: "reservation_start_date",
      reservation_end_date: "reservation_end_date",
      reservation_period_month: "reservation_period_month",
      reservation_billing_cycle: "reservation_billing_cycle",

      post_reservation_billing_cycle: "post_reservation_billing_cycle",
      post_reservation_storage_charges: "post_reservation_storage_charges",
    },
    intention_letter: "intention_letter",
    remarks: "remarks",
  },
};

const schema = Yup.object().shape({
  warehouse_name: Yup.string().trim().required("Warehouse name is required"),
  region: Yup.string().trim().required("Region name is required"),
  state: Yup.string().trim().required("State name is required"),
  substate: Yup.string().trim().required("SubState name is required"),
  district: Yup.string().trim().required("District name is required"),
  area: Yup.string().trim().required("Area name is required"),
  warehouse_address: Yup.string()
    .trim()
    .required("Warehouse address is required"),
  warehouse_pincode: Yup.string().trim().required("Pin code is required"),
  no_of_chambers: Yup.number(),
  is_factory_permise: Yup.string().required(
    "Warehouse in factory premises is required"
  ),
  standard_capacity: Yup.number().required("Standard capacity is required"),
  standard_warehouse_capacity: Yup.string().required(
    "Standard warehouse capacity is required"
  ),
  currrent_utilised_capacity: Yup.number().required(
    "Standard utilized capacity is required"
  ),
  lock_in_period: Yup.string().required("Lock in period is required"),
  // lock_in_period_month: Yup.number().required(
  //   "Lock in period month is required"
  // ),

  lock_in_period_month: Yup.string().when("lock_in_period", {
    is: (value) => value === "true",
    then: () =>
      Yup.number()
        .required("Lock In Period Month is required")
        .min(1, "Lock In Period Month must be greater than or equal to 1"),
    otherwise: () => Yup.number(),
  }),
  covered_area: Yup.number().required("Covered area is required"),
  supervisor_day_shift: Yup.string().required(
    "Supervisor for day shift is required"
  ),
  supervisor_night_shift: Yup.string().required(
    "Supervisor for night shift is required"
  ),
  security_guard_day_shift: Yup.string().required(
    "Security guard for day shift is required"
  ),
  security_guard_night_shift: Yup.string().required(
    "Security guard for night shift is required"
  ),
  // commodity details schema start
  expected_commodity: Yup.array().required(
    "Expected commodity name is required"
  ),
  commodity_inward_type: Yup.string().required(
    "Commodity inward type is required"
  ),
  prestack_commodity: Yup.string().when("commodity_inward_type", {
    is: (value) => value === "PS",
    then: () => Yup.string().trim().required("Pre stack commodity is required"),
    otherwise: () => Yup.string(),
  }),
  prestack_commodity_qty: Yup.number().when("commodity_inward_type", {
    is: (value) => value === "PS",
    then: () =>
      Yup.string().required("Pre stack commodity quantity is required"),
    otherwise: () => Yup.string(),
  }),
  is_funding_required: Yup.string().required("Funding required is required"),
  // bank details dynamic field
  pwh_commodity_bank_details: Yup.array().of(
    Yup.object().shape({
      bank_name: Yup.string().trim().required("Bank name is required"),
      branch_name: Yup.string().trim().required("Branch name is required"),
    })
  ),

  // PWH COMMERCIAL DETAILS details schema start
  min_rent: Yup.number(),
  max_rent: Yup.number(),
  avg_rent: Yup.number(),
  rent: Yup.number().required("rent is required"),
  total_rent_per_month: Yup.number().required(
    "Total rent payable month is required"
  ),

  // PWH COMMERCIAL DETAILS dynamic fields schema start

  pwh_commercial_multipal_details: Yup.array().of(
    Yup.object().shape({
      owner_name: Yup.string().trim().required("Owner name is required"),
      mobile_no: Yup.string().trim().required("Mobile no is required"),
      address: Yup.string().trim().required("Address is required"),
      rent: Yup.number()
        .typeError("Rent is required")
        .required("Rent is required"),
    })
  ),

  gg_revenue_ratio: Yup.number().required(
    "Go green revenue sharing ratio is required"
  ),
  security_deposit_amt: Yup.number().required(
    "Security deposit amount is required"
  ),
  advance_rent: Yup.string().required("Advance rent is required"),
  // advance_rent_month: Yup.number().required("Advance rent month is required"),

  advance_rent_month: Yup.string().when("advance_rent", {
    is: (value) => value === "true",
    then: () => Yup.number().required("Advance rent month is required"),
    otherwise: () => Yup.number(),
  }),

  // gst: Yup.string()
  //   .matches(gstNumberValidation(), "Invalid GST number")
  //   .required("GST number is required"),

  gst: Yup.string()
    .test("gst", "Invalid GST Number", (value) => gstNumber(value))
    .required("Invalid GST number"),

  commencement_date: Yup.string().required("Commencement date is required"),
  // agreement_period_month: Yup.number().required("Agreement period is required"),

  // agreement_period_month: Yup.number()
  //   .required("Agreement period is required")
  //   .typeError("Agreement period is required")
  //   .min(11, "Agreement period (Month) must be greater than or equal to 11"),

  agreement_period_month: Yup.number()
    .required("Agreement period (Month) is required")
    .typeError("Agreement period is required")
    // .min(11, "Agreement period (Month) must be greater than or equal to 11")
    .test(
      "agreementPeriodValid",
      "Agreement period must not be less than Lock In Period",
      function (value) {
        const lockInPeriod = this.parent.lock_in_period_month;
        return value >= lockInPeriod;
      }
    ),

  // .test('agreementPeriodValid', 'Agreement period must be at least Lock In Period + 6 months', function (value) {
  //   const lockInPeriod = this.parent.lock_in_period_month;
  //   const minAgreementPeriod = lockInPeriod + 6;
  //   return value === null || value >= minAgreementPeriod;
  // }),

  expiry_date: Yup.string(),
  notice_period_month: Yup.number().required("Notice period is required"),
  storage_charges_according_to_commodity: Yup.string(),

  // .required(
  //   "storage charges according to commodity is required"
  // ),
  your_project: Yup.string(),

  // PWH CLIENTS DETAILS schema start here
  // client_list: Yup.array().of(
  //   Yup.object().shape({
  //     client_type: Yup.string().required("client type name is required"),
  //     client_name: Yup.string().trim().required("Client name  is required"),
  //     mobile_number: Yup.string().trim().required("Mobile number is required"),
  //     region: Yup.string().trim().required("Region is required"),
  //     state: Yup.string().trim().required("State is required"),
  //     zone: Yup.string().trim().required("Zone is required"),
  //     district: Yup.string().trim().required("District is required"),
  //     area: Yup.string().trim().required("Area is required"),
  //     address: Yup.string().trim().required("Address is required"),

  //     // Start dynamic's fields when show only client type === corporate
  //     storage_charges: Yup.string().when("client_type", {
  //       is: (value) => value === "Corporate",
  //       then: () =>
  //         Yup.number()
  //           .nullable()
  //           .transform((value, originalValue) => {
  //             if (originalValue === "") {
  //               return null;
  //             }
  //             return value;
  //           })
  //           .required("Storage charges is required"),
  //       otherwise: () => Yup.number(),
  //     }),

  //     reservation_qty: Yup.string().when("client_type", {
  //       is: (value) => value === "Corporate",
  //       then: () =>
  //         Yup.number()
  //           .nullable()
  //           .transform((value, originalValue) => {
  //             if (originalValue === "") {
  //               return null;
  //             }
  //             return value;
  //           })
  //           .required("Reservation qty is required"),
  //       otherwise: () => Yup.number(),
  //     }),

  //     reservation_start_date: Yup.string().when("client_type", {
  //       is: (value) => value === "Corporate",
  //       then: () =>
  //         Yup.date()
  //           .nullable()
  //           .transform((value, originalValue) => {
  //             if (originalValue === "") {
  //               return null;
  //             }
  //             return value;
  //           })
  //           .required("Reservation start date is required")
  //           .test("isValidDate", "Invalid reservation start date", (value) => {
  //             return value instanceof Date && !isNaN(value);
  //           }),
  //       otherwise: () => Yup.date(),
  //     }),

  //     reservation_end_date: Yup.string().when("client_type", {
  //       is: (value) => value === "Corporate",
  //       then: () =>
  //         Yup.date()
  //           .nullable()
  //           .transform((value, originalValue) => {
  //             if (originalValue === "") {
  //               return null;
  //             }
  //             return value;
  //           })
  //           .required("Reservation end date is required")
  //           .test("isValidDate", "Invalid reservation end date", (value) => {
  //             return value instanceof Date && !isNaN(value);
  //           }),
  //       otherwise: () => Yup.date(),
  //     }),

  //     reservation_period_month: Yup.string().when("client_type", {
  //       is: (value) => value === "Corporate",
  //       then: () =>
  //         Yup.number()
  //           .nullable()
  //           .transform((value, originalValue) => {
  //             if (originalValue === "") {
  //               return null;
  //             }
  //             return value;
  //           })
  //           .required("PReservation period month is required"),
  //       otherwise: () => Yup.number(),
  //     }),

  //     reservation_billing_cycle: Yup.string().when("client_type", {
  //       is: (value) => value === "Corporate",
  //       then: () =>
  //         Yup.string().required("Reservation billing cycle is required"),
  //       otherwise: () => Yup.string(),
  //     }),

  //     post_reservation_billing_cycle: Yup.string().when("client_type", {
  //       is: (value) => value === "Corporate",
  //       then: () =>
  //         Yup.string().required("Post reservation billing cycle is required"),
  //       otherwise: () => Yup.string(),
  //     }),

  //     post_reservation_storage_charges: Yup.string().when("client_type", {
  //       is: (value) => value === "Corporate",
  //       then: () =>
  //         Yup.number()
  //           .nullable()
  //           .transform((value, originalValue) => {
  //             if (originalValue === "") {
  //               return null;
  //             }
  //             return value;
  //           })
  //           .required("Post reservation storage charges is required"),
  //       otherwise: () => Yup.number(),
  //     }),

  //     // end dynamic's fields when show only client type === corporate
  //   })
  // ),

  // new for testing schema

  client_list: Yup.array().of(
    Yup.object().shape({
      client_type: Yup.string().trim().required("Client type name is required"),
      client_name: Yup.string().trim().required("Client name is required"),
      mobile_number: Yup.string().trim().required("Mobile number is required"),
      region: Yup.string().trim().required("Region is required"),
      state: Yup.string().trim().required("State is required"),
      substate: Yup.string().trim().required("Substate is required"),
      district: Yup.string().trim().required("District is required"),
      area: Yup.string().trim().required("Area is required"),
      address: Yup.string().trim().required("Address is required"),
      // Start dynamic fields when client_type === "Corporate"

      storage_charges: Yup.string().when("client_type", {
        is: (value) => value === "Corporate",
        then: () =>
          Yup.number()
            .nullable()
            .transform((value, originalValue) => {
              if (originalValue === "") {
                return null;
              }
              return value;
            })
            .required("Storage charges is required"),
        otherwise: () => Yup.number(),
      }),

      reservation_qty: Yup.string().when("client_type", {
        is: (value) => value === "Corporate",
        then: () =>
          Yup.number()
            .nullable()
            .transform((value, originalValue) => {
              if (originalValue === "") {
                return null;
              }
              return value;
            })
            .required("Reservation qty is required"),
        otherwise: () => Yup.number(),
      }),

      reservation_start_date: Yup.string().when("client_type", {
        is: (value) => value === "Corporate",
        then: () =>
          Yup.date()
            .nullable()
            .transform((value, originalValue) => {
              if (originalValue === "") {
                return null;
              }
              return value;
            })
            .required("Reservation start date is required")
            .test("isValidDate", "Invalid reservation start date", (value) => {
              return value instanceof Date && !isNaN(value);
            }),
        otherwise: () => Yup.date(),
      }),

      reservation_end_date: Yup.string().when("client_type", {
        is: (value) => value === "Corporate",
        then: () =>
          Yup.date()
            .nullable()
            .transform((value, originalValue) => {
              if (originalValue === "") {
                return null;
              }
              return value;
            })
            .required("Reservation end date is required")
            .test("isValidDate", "Invalid reservation end date", (value) => {
              return value instanceof Date && !isNaN(value);
            }),
        otherwise: () => Yup.date(),
      }),

      reservation_period_month: Yup.string().when("client_type", {
        is: (value) => value === "Corporate",
        then: () =>
          Yup.number()
            .nullable()
            .transform((value, originalValue) => {
              if (originalValue === "") {
                return null;
              }
              return value;
            })
            .required("PReservation period month is required"),
        otherwise: () => Yup.number(),
      }),

      reservation_billing_cycle: Yup.string().when("client_type", {
        is: (value) => value === "Corporate",
        then: () =>
          Yup.string().required("Reservation billing cycle is required"),
        otherwise: () => Yup.string(),
      }),

      post_reservation_billing_cycle: Yup.string().when("client_type", {
        is: (value) => value === "Corporate",
        then: () =>
          Yup.string().required("Post reservation billing cycle is required"),
        otherwise: () => Yup.string(),
      }),

      post_reservation_storage_charges: Yup.string().when("client_type", {
        is: (value) => value === "Corporate",
        then: () =>
          Yup.number()
            .nullable()
            .transform((value, originalValue) => {
              if (originalValue === "") {
                return null;
              }
              return value;
            })
            .required("Post reservation storage charges is required"),
        otherwise: () => Yup.number(),
      }),

      // End dynamic fields when client_type === "Corporate"
    })
  ),

  intention_letter: Yup.string()
    .trim()
    .required("Intention letter is required"),
  remarks: Yup.string().trim().required("remarks is required"),
});

const Pwh = () => {
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
  });

  const [pbpmList, setPbpmList] = useState([]);
  const [selected, setSelected] = useState({});
  const [minMaxAvgState, setMinMaxAvgState] = useState({});

  const [locationDrillDownState, setLocationDrillDownState] = useState({});

  const [clientLocationDrillDownState, setClientLocationDrillDownState] =
    useState([{ states: [], zones: [], districts: [], areas: [] }]);

  const methods = useForm({
    //resolver: yupResolver(validationSchema),
    resolver: yupResolver(schema),
    defaultValues: {
      is_factory_permise: "false",
      lock_in_period: "true",
      is_funding_required: "false",
      agreement_period_month: 11,
      // pwh_commodity_bank_details: [{ bank: "", branch: "" }],
      // pwh_commercial_multipal_details: [
      //   {
      //     owner_name: "",
      //     mobile_no: "",
      //     address: "",
      //     rent: "",
      //   },
      // ],
      client_list: [client_details_obj],
    },
  });

  const {
    setValue,
    getValues,
    watch,
    setError,
    formState: { errors },
  } = methods;

  console.log("errors !!!!!!! ", errors);

  // const { methods.control, methods.register } = useForm();
  const {
    fields: bank_details_fields,
    append: add_new_bank_detail,
    remove: remove_bank_detail,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "pwh_commodity_bank_details",
  });

  const {
    fields: pwh_commercial_multipal_details_fields,
    append: pwh_commercial_multipal_add_new_detail,
    remove: pwh_commercial_multipal_detail_remove,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "pwh_commercial_multipal_details",
  });

  const {
    fields: client_list,
    append: add_client_list,
    remove: remove_client_list,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "client_list",
  });

  const append_client_list = () => {
    add_client_list(client_details_obj);
  };

  const handleExpiryDateChange = (value) => {
    const { commencement_date, agreement_period_month } = value;

    const expiryDate = calculateExpiryDate(
      new Date(commencement_date),
      agreement_period_month
    );

    if (commencement_date && agreement_period_month) {
      setValue(formFieldsName.pwh_commercial_details.expiry_date, expiryDate, {
        shouldValidate: true,
      });
      console.log("expiryDate ---> ", expiryDate);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("watch --> ", value, name, type);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue]);

  useEffect(() => {
    console.log("bank_details_fields --> ", bank_details_fields);
  }, [bank_details_fields]);

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

  const [minMaxAvg, { isLoading: minMaxAvgApiIsLoading }] =
    useMinMaxAvgMutation();

  ///  getSupervisorDayShift
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

  const [getBankMaster, { isLoading: getBankMasterApiIsLoading }] =
    useGetBankMasterMutation();

  // Save as draft api

  const [saveAsDraft, { isLoading: saveAsDraftApiIsLoading }] =
    useSaveAsDraftMutation();

  // location drill down api hook
  const [
    fetchLocationDrillDown,
    { isLoading: fetchLocationDrillDownApiIsLoading },
  ] = useFetchLocationDrillDownMutation();

  const [getCommodityMaster, { isLoading: getCommodityMasterApiIsLoading }] =
    useGetCommodityMasterMutation();

  const getRegionMasterList = async () => {
    try {
      const response = await fetchLocationDrillDown().unwrap();
      console.log("getRegionMasterList:", response);
      setSelectBoxOptions((prev) => ({
        ...prev,
        regions: response?.region?.map(({ region_name, id }) => ({
          label: region_name,
          value: id,
        })),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  const onSubmit = async (data) => {
    console.log("data==>", data);

    try {
      const response = await saveAsDraft(data).unwrap();
      console.log("submit  - Success:", response);
      if (response.status === 200) {
        console.log("response --> ", response);
        toasterAlert({
          message: response?.message,
          status: response?.status,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  // client list drill down api start
  const regionOnClientChange = async (val, index) => {
    console.log("value --> ", val);
    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.region}`,
      val?.value,
      {
        shouldValidate: true,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.state}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.zone}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.district}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.area}`,
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
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.state}`,
      val?.value,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.zone}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.district}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.area}`,
      null,
      {
        shouldValidate: false,
      }
    );

    const query = {
      region: getValues(
        `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.region}`
      ),
      state: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      let location = clientLocationDrillDownState[index];

      location.zones = response?.substate?.map(({ substate_name, id }) => ({
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
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.zone}`,
      val?.value,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.district}`,
      null,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.area}`,
      null,
      {
        shouldValidate: false,
      }
    );

    const query = {
      region: getValues(
        `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.region}`
      ),
      state: getValues(
        `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.state}`
      ),
      substate: val?.value,
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
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.district}`,
      val?.value,
      {
        shouldValidate: false,
      }
    );

    setValue(
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.area}`,
      null,
      {
        shouldValidate: false,
      }
    );

    const query = {
      region: getValues(
        `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.region}`
      ),
      state: getValues(
        `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.state}`
      ),
      substate: getValues(
        `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.zone}`
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
      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.area}`,
      val?.value,
      {
        shouldValidate: false,
      }
    );
  };

  const saveAsDraftData = async (type) => {
    try {
      let data = {};
      if (type === "PWH_WAREHOUSE_DETAILS") {
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
          standard_warehouse_capacity: getValues("standard_warehouse_capacity"),
          currrent_utilised_capacity: getValues("currrent_utilised_capacity"),
          lock_in_period: getValues("lock_in_period"),
          lock_in_period_month: getValues("lock_in_period_month"),
          covered_area: getValues("covered_area"),
          supervisor_day_shift: getValues("supervisor_day_shift"),
          supervisor_night_shift: getValues("supervisor_night_shift"),
          security_guard_day_shift: getValues("security_guard_day_shift"),
          security_guard_night_shift: getValues("security_guard_night_shift"),
        };

        console.log("PWH_WAREHOUSE_DETAILS @@ --> ", data);
      }
      if (type === "PWH_COMMODITY_DETAILS") {
        data = {
          is_draft: true,
          expected_commodity: getValues("expected_commodity")?.map((item) => ({
            commodity: item?.value,
          })),
          commodity_inward_type: getValues("commodity_inward_type"),
          prestack_commodity: getValues("prestack_commodity"),
          bank: getValues("pwh_commodity_bank_details"),
          prestack_commodity_qty: getValues("prestack_commodity_qty"),
          is_funding_required: getValues("is_funding_required"),
        };

        console.log("PWH_WAREHOUSE_DETAILS @@ --> ", data);
      }
      if (type === "PWH_COMMERCIAL_DETAILS") {
        data = {
          is_draft: true,
          min_rent: getValues("min_rent"),
          max_rent: getValues("max_rent"),
          avg_rent: getValues("avg_rent"),
          rent: getValues("rent"),
          total_rent_per_month: getValues("total_rent_per_month"),
          gg_revenue_ratio: getValues("gg_revenue_ratio"),
          security_deposit_amt: getValues("security_deposit_amt"),
          advance_rent: getValues("advance_rent"),
          advance_rent_month: getValues("advance_rent_month"),
          gst: getValues("gst"),
          commencement_date: getValues("commencement_date"),
          agreement_period_month: getValues("agreement_period_month"),
          expiry_date: getValues("expiry_date"),
          notice_period_month: getValues("notice_period_month"),
          storage_charges_according_to_commodity: getValues(
            "storage_charges_according_to_commodity"
          ),
          your_project: getValues("your_project"),
        };

        console.log("PWH_WAREHOUSE_DETAILS @@ --> ", data);
      }

      if (type === "PWH_CLIENTS_DETAILS") {
        data = {
          is_draft: true,
          client_list: getValues("client_list"), //not found
          intention_letter: getValues("intention_letter"), //not found
          remarks: getValues("remarks"), //not found
        };
      }

      const response = await saveAsDraft(data).unwrap();
      console.log("saveAsDraftData - Success:", response);

      toasterAlert({
        message: "Save As Draft Successfully",
        status: 200,
      });

      if (response.status === 200) {
        console.log("response --> ", response);
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  // Region State  Zone District Area  onChange drill down api start //
  const regionOnChange = async (val) => {
    console.log("value --> ", val);
    setValue(formFieldsName.pwh_warehouse_details.region_name, val?.value, {
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
    setValue(formFieldsName.pwh_warehouse_details.state_name, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.pwh_warehouse_details.zone_name, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.pwh_warehouse_details.district_name, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.pwh_warehouse_details.area_name, null, {
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
    setValue(formFieldsName.pwh_warehouse_details.state_name, val?.value, {
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

    setValue(formFieldsName.pwh_warehouse_details.zone_name, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.pwh_warehouse_details.district_name, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.pwh_warehouse_details.area_name, null, {
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
        zones: response?.substate?.map(({ substate_name, id }) => ({
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
    setValue(formFieldsName.pwh_warehouse_details.zone_name, val?.value, {
      shouldValidate: true,
    });

    setSelected((prev) => ({ ...prev, zone: val }));
    // on change  to null
    setSelected((prev) => ({
      ...prev,
      district: {},
      area: {},
    }));

    setValue(formFieldsName.pwh_warehouse_details.district_name, null, {
      shouldValidate: false,
    });

    setValue(formFieldsName.pwh_warehouse_details.area_name, null, {
      shouldValidate: false,
    });

    setLocationDrillDownState((prev) => ({
      ...prev,
      zone: val?.value,
    }));

    const query = {
      ...locationDrillDownState,
      substate: val?.value,
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
    setValue(formFieldsName.pwh_warehouse_details.district_name, val?.value, {
      shouldValidate: true,
    });

    setSelected((prev) => ({ ...prev, district: val }));
    // on change  to null
    setSelected((prev) => ({
      ...prev,
      area: {},
    }));

    setValue(formFieldsName.pwh_warehouse_details.area_name, val?.value, {
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
    setValue(formFieldsName.pwh_warehouse_details.area_name, val?.value, {
      shouldValidate: true,
    });
  };

  const fetchCommodityMaster = async () => {
    try {
      const response = await getCommodityMaster().unwrap();

      console.log(response);

      if (response?.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          commodityMasterOpt: response?.results?.map(
            ({ commodity_name, id }) => ({
              label: commodity_name,
              value: id,
            })
          ),
        }));
      }

      console.log("Success:", response);
      // setData(response?.results || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          branch: response?.results.map(({ branch_name, id, bank }) => ({
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

  const [calculatePBPM, { isLoading: calculatePBPMApiIsLoading }] =
    useCalculatePBPMMutation();

  const calcPBPM = () => {
    console.log(getValues());

    let coveredArea = getValues(
      formFieldsName.pwh_warehouse_details.covered_area
    );

    console.log("containing area", coveredArea);

    console.log(getValues("expected_commodity"));
    let commodity = getValues("expected_commodity")?.map((item) => item.value);

    let obj = {
      commodity: commodity,
      covered_area: coveredArea,
    };
    console.log(obj);
    if (obj?.commodity && obj?.covered_area) {
      fetchPBPM(obj);
    } else {
      if (obj?.commodity === undefined) {
        setError("expected_commodity", {
          //type: "manual",
          message: "Expected commodity name is required",
        });
        toasterAlert({
          message: "Please select commodity ",
          status: 440,
        });
      } else if (obj?.covered_area === undefined) {
        setError("covered_area", {
          // type: "manual",
          message: "Covered area is required",
        });
        toasterAlert({
          message: "Please select covered area ",
          status: 440,
        });
      }
      // setValue('covered_area');
    }

    console.log(obj);

    // console.log(object);
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

  // Region State  Zone District Area  onChange drill down api end //

  // Owner Detail Functions start //

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

  const append_new_commercial_detail = () => {
    if (
      ownerDetail.name !== "" &&
      ownerDetail.mobile !== "" &&
      ownerDetail.address !== "" &&
      ownerDetail.rent !== "" &&
      mobileNumberRegex.test(ownerDetail.mobile)
    ) {
      pwh_commercial_multipal_add_new_detail({
        owner_name: ownerDetail.name,
        mobile_no: ownerDetail.mobile,
        address: ownerDetail.address,
        rent: ownerDetail.rent,
      });
      setOwnerDetail({
        name: "",
        mobile: "",
        address: "",
        rent: "",
      });
      setOwnerError({
        name: "",
        mobile: "",
        address: "",
        rent: "",
      });
    } else {
      setOwnerError({
        name: ownerDetail.name !== "" ? "" : "Name can not be empty.",
        mobile:
          ownerDetail.mobile !== ""
            ? mobileNumberRegex.test(ownerDetail.mobile)
              ? ""
              : "Mobile must be 10 digits long."
            : "Mobile can not be empty.",
        address: ownerDetail.address !== "" ? "" : "Address can not be empty.",
        rent: ownerDetail.rent !== "" ? "" : "Rent can not be empty.",
      });
    }
  };

  const [updateOwnerFlag, setUpdateOwnerFlag] = useState(null);

  const updateOwnerFlagFunction = (data, id) => {
    setUpdateOwnerFlag(id);
    setOwnerDetail({
      name: data.owner_name,
      mobile: data.mobile_no,
      address: data.address,
      rent: data.rent,
    });
  };

  const UpdateCommercialDetail = () => {
    if (
      ownerDetail.name !== "" &&
      ownerDetail.mobile !== "" &&
      ownerDetail.address !== "" &&
      ownerDetail.rent !== "" &&
      mobileNumberRegex.test(ownerDetail.mobile)
    ) {
      const tempArr = getValues(`pwh_commercial_multipal_details`);
      setValue(
        `pwh_commercial_multipal_details`,
        [
          ...tempArr.slice(0, updateOwnerFlag),
          {
            owner_name: ownerDetail.name,
            mobile_no: ownerDetail.mobile,
            address: ownerDetail.address,
            rent: ownerDetail.rent,
          },
          ...tempArr.slice(updateOwnerFlag + 1),
        ],
        { shouldValidate: true }
      );
      setOwnerDetail({
        name: "",
        mobile: "",
        address: "",
        rent: "",
      });
      setUpdateOwnerFlag(null);
      setOwnerError({
        name: "",
        mobile: "",
        address: "",
        rent: "",
      });
    } else {
      setOwnerError({
        name: ownerDetail.name !== "" ? "" : "Name can not be empty.",
        mobile:
          ownerDetail.mobile !== ""
            ? mobileNumberRegex.test(ownerDetail.mobile)
              ? ""
              : "Mobile must be 10 digits long."
            : "Mobile can not be empty.",
        address: ownerDetail.address !== "" ? "" : "Address can not be empty.",
        rent: ownerDetail.rent !== "" ? "" : "Rent can not be empty.",
      });
    }
  };

  // Owner Detail Functions end //

  // Bank Detail Functions start //

  const [bankDetail, setBankDetail] = useState({
    bank: "",
    branch: "",
  });

  const [bankError, setBankError] = useState({
    bank: "",
    branch: "",
  });

  const append_new_bank_details = () => {
    if (bankDetail.bank !== "" && bankDetail.branch !== "") {
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
      setBankError({
        bank: bankDetail.bank !== "" ? "" : "Bank can not be empty.",
        branch: bankDetail.branch !== "" ? "" : "Branch can not be empty.",
      });
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
    if (bankDetail.bank !== "" && bankDetail.branch !== "") {
      const tempArr = getValues(`pwh_commodity_bank_details`);
      setValue(
        `pwh_commodity_bank_details`,
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
      setBankError({
        bank: bankDetail.bank !== "" ? "" : "Bank can not be empty.",
        branch: bankDetail.branch !== "" ? "" : "Branch can not be empty.",
      });
    }
  };

  // Bank Detail Functions end //

  useEffect(() => {
    getRegionMasterList();
    fetchSupervisorDayShift();
    fetchSupervisorNightShift();
    fetchSecurityGuardDayShift();
    fetchSecurityGuardNightShift();

    fetchCommodityMaster();
    getBankMasterList();
    getBranchMasterList();

    // getStateList();
    // getZonesList();
    // getDistrictMasterList();
    // getAreaMasterList();
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

                        <AccordionPanel bg="white" mt="5" pb={4} py="4" px="8">
                          <Box
                            //border="1px"
                            w={{
                              base: "100%",
                              sm: "100%",
                              md: "100%",
                              lg: "100%",
                              xl: "100%",
                            }}
                          >
                            {/* --------------  Warehouse Name -------------- */}
                            <Box>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Warehouse Name
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {/* <CustomInput
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .warehouse_name
                                    }
                                    placeholder="Warehouse Name"
                                    type="textarea"
                                    label=""
                                    style={{ w: commonStyle.w }}
                                  /> */}

                                  <CustomTextArea
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .warehouse_name
                                    }
                                    placeholder="Warehouse Name"
                                    type="text"
                                    rowLength={3}
                                    label=""
                                    inputValue={getValues(
                                      formFieldsName.pwh_warehouse_details
                                        .warehouse_name
                                    )}
                                    style={{ w: commonStyle.w }}
                                    onChange={(val) => {
                                      setValue(
                                        formFieldsName.pwh_warehouse_details
                                          .warehouse_name,
                                        val.target.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  />
                                  <Box mx="1" color="red" textAlign="left">
                                    {errors?.warehouse_name?.message}
                                  </Box>
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">Region</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .region_name
                                    }
                                    label=""
                                    isLoading={getRegionMasterApiIsLoading}
                                    options={selectBoxOptions?.regions || []}
                                    selectedValue={selected?.region}
                                    isClearable={false}
                                    selectType="label"
                                    style={{ w: commonStyle.w }}
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">State</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .state_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.states || []}
                                    selectedValue={selected?.state}
                                    isClearable={false}
                                    selectType="label"
                                    style={{ w: commonStyle.w }}
                                    isLoading={getStateApiIsLoading}
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">Zone</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .zone_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.zones || []}
                                    selectedValue={selected?.zone}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={getZoneApiIsLoading}
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) => {
                                      zoneOnChange(val);
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">District</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .district_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.districts || []}
                                    selectedValue={selected?.district}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={getDistrictApiIsLoading}
                                    style={{ w: commonStyle.w }}
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">Area</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <ReactCustomSelect
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .area_name
                                    }
                                    label=""
                                    options={selectBoxOptions?.areas || []}
                                    selectedValue={selected?.area}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={getAreaMasterApiIsLoading}
                                    style={{ w: commonStyle.w }}
                                    handleOnChange={(val) => areaOnChange(val)}
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Warehouse Address
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">Pin Code</Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    No Of Chambers
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .no_of_chamber
                                    }
                                    placeholder="Number of chambers"
                                    type="number"
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Warehouse In Factory Premises
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <RadioGroup
                                    p="0"
                                    defaultValue={"false"}
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .warehouse_in_factory_premises
                                    }
                                    {...methods.register(
                                      formFieldsName.pwh_warehouse_details
                                        .warehouse_in_factory_premises
                                    )}
                                    onChange={(val) => {
                                      console.log(val);
                                      setValue(
                                        formFieldsName.pwh_warehouse_details
                                          .warehouse_in_factory_premises,
                                        val ? "true" : "false",
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
                              {" "}
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Standard Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .standard_capacity
                                    }
                                    placeholder=" Standard Capacity (in MT)"
                                    type="number"
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Current warehouse capacity (MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .standard_warehouse_capacity
                                    }
                                    placeholder="Current warehouse capacity (MT)"
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Standard Utilizes Capacity (in MT)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .standard_utilizes_capacity
                                    }
                                    placeholder="Standard Utilizes Capacity (in MT)"
                                    type="number"
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    {" "}
                                    Lock In Period
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <RadioGroup
                                    p="0"
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .lock_in_period
                                    }
                                    // {...methods.register(
                                    //   formFieldsName.pwh_warehouse_details
                                    //     .lock_in_period
                                    // )}
                                    defaultValue="true"
                                    onChange={(val) => {
                                      console.log(val);
                                      setValue(
                                        formFieldsName.pwh_warehouse_details
                                          .lock_in_period,
                                        val,
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
                              formFieldsName.pwh_warehouse_details
                                .lock_in_period
                            ) === "true" ? (
                              <Box mt={commonStyle.mt}>
                                <Grid
                                  textAlign="right"
                                  alignItems="center"
                                  templateColumns="repeat(4, 1fr)"
                                  gap={8}
                                >
                                  <GridItem colSpan={1}>
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
                                      type="number"
                                      label=""
                                      style={{ w: "84%" }}
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Covered Area (In Sq.Ft)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_warehouse_details
                                        .covered_area
                                    }
                                    placeholder="Covered Area (In Sq.Ft)"
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Supervisor For day Shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <Box
                                    display="flex"
                                    gap="4"
                                    alignItems="center"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.pwh_warehouse_details
                                          .supervisor_for_day_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.superVisorDayShiftOpt ||
                                        []
                                      }
                                      selectedValue={selected?.superVisorDay}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={false}
                                      style={{ w: commonStyle.w }}
                                      handleOnChange={(val) => {
                                        setSelected((prev) => ({
                                          ...prev,
                                          superVisorDay: val,
                                        }));
                                        setValue(
                                          formFieldsName.pwh_warehouse_details
                                            .supervisor_for_day_shift,
                                          val?.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                    <Stack
                                      spacing={5}
                                      direction="row"
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="right"
                                      //textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      <Checkbox
                                        colorScheme="green"
                                        borderColor="gray.300"
                                        //defaultChecked
                                      >
                                        Hire new supervisor
                                      </Checkbox>
                                    </Stack>
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Supervisor For night Shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.pwh_warehouse_details
                                          .supervisor_for_night_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.superVisorNightShiftOpt ||
                                        []
                                      }
                                      // selectedValue={{}}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={false}
                                      style={{ w: commonStyle.w }}
                                      handleOnChange={(val) => {
                                        setSelected((prev) => ({
                                          ...prev,
                                          superVisorNight: val,
                                        }));
                                        setValue(
                                          formFieldsName.pwh_warehouse_details
                                            .supervisor_for_night_shift,
                                          val?.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                    <Stack
                                      spacing={5}
                                      direction="row"
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="right"
                                      //textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      <Checkbox
                                        colorScheme="green"
                                        borderColor="gray.300"
                                        //defaultChecked
                                      >
                                        Hire new supervisor
                                      </Checkbox>
                                    </Stack>
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Security Guard For day shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.pwh_warehouse_details
                                          .security_guard_for_day_shift
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.securityGuardDayShiftOpt ||
                                        []
                                      }
                                      selectedValue={selected?.securityGuardDay}
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={false}
                                      style={{ w: commonStyle.w }}
                                      handleOnChange={(val) => {
                                        setSelected((prev) => ({
                                          ...prev,
                                          securityGuardDay: val,
                                        }));
                                        setValue(
                                          formFieldsName.pwh_warehouse_details
                                            .security_guard_for_day_shift,
                                          val?.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />

                                    <Stack
                                      spacing={5}
                                      direction="row"
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="right"
                                      //textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      <Checkbox
                                        colorScheme="green"
                                        borderColor="gray.300"

                                        //defaultChecked
                                      >
                                        Hire new security guard
                                      </Checkbox>
                                    </Stack>
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
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  <Text textAlign="right">
                                    Security Guard For night shift
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  {" "}
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4"
                                  >
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.pwh_warehouse_details
                                          .security_guard_for_night_shift
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
                                      isLoading={false}
                                      style={{ w: commonStyle.w }}
                                      handleOnChange={(val) => {
                                        setSelected((prev) => ({
                                          ...prev,
                                          securityGuardNight: val,
                                        }));
                                        setValue(
                                          formFieldsName.pwh_warehouse_details
                                            .security_guard_for_night_shift,
                                          val?.value,
                                          { shouldValidate: true }
                                        );
                                      }}
                                    />
                                    <Stack
                                      spacing={5}
                                      direction="row"
                                      color="primary.700"
                                      fontWeight="bold"
                                      textAlign="right"
                                      //textDecoration="underline"
                                      cursor="pointer"
                                    >
                                      <Checkbox
                                        colorScheme="green"
                                        borderColor="gray.300"
                                        //defaultChecked
                                      >
                                        Hire new security guard
                                      </Checkbox>
                                    </Stack>
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
                              // type="submit"
                              //w="full"
                              backgroundColor={"primary.700"}
                              _hover={{ backgroundColor: "primary.700" }}
                              color={"white"}
                              borderRadius={"full"}
                              isLoading={saveAsDraftApiIsLoading}
                              my={"4"}
                              px={"10"}
                              onClick={() =>
                                saveAsDraftData("PWH_WAREHOUSE_DETAILS")
                              }
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
                          {/* ================ Expected Commodity Name ================= */}
                          <Box>
                            <Grid
                              textAlign="right"
                              templateColumns="repeat(4, 1fr)"
                              alignItems="center"
                              gap={8}
                            >
                              <GridItem colSpan={1}>
                                <Text textAlign="right">
                                  Expected Commodity Name
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={3}>
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.pwh_commodity_details
                                      .expected_commodity_name
                                  }
                                  label=""
                                  options={
                                    selectBoxOptions?.commodityMasterOpt || []
                                  }
                                  selectedValue={selected?.commodity}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  isMultipleSelect={true}
                                  style={{ w: commonStyle.w }}
                                  handleOnChange={(val) => {
                                    console.log(" on change val = ", val);
                                    setSelected((prev) => ({
                                      ...prev,
                                      commodity: val,
                                    }));
                                    setValue(
                                      formFieldsName.pwh_commodity_details
                                        .expected_commodity_name,
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
                              gap={8}
                            >
                              <GridItem colSpan={1}>
                                <Text textAlign="right">
                                  Commodity Inward Type
                                </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={3}>
                                <ReactCustomSelect
                                  name={
                                    formFieldsName.pwh_commodity_details
                                      .commodity_inward_type
                                  }
                                  label=""
                                  options={[
                                    {
                                      label: "Fresh Stock",
                                      value: "FS",
                                    },
                                    {
                                      label: "Pre Stock",
                                      value: "PS",
                                    },
                                    {
                                      label: "Take Over",
                                      value: "TO",
                                    },
                                  ]}
                                  selectedValue={selected?.commodityInwardType}
                                  isClearable={false}
                                  selectType="label"
                                  isLoading={false}
                                  style={{ w: commonStyle.w }}
                                  handleOnChange={(val) => {
                                    setSelected((prev) => ({
                                      ...prev,
                                      commodityInwardType: val,
                                    }));
                                    setValue(
                                      formFieldsName.pwh_commodity_details
                                        .commodity_inward_type,
                                      val?.value,
                                      { shouldValidate: true }
                                    );
                                  }}
                                />
                              </GridItem>
                            </Grid>
                          </Box>
                          {getValues(
                            formFieldsName.pwh_commodity_details
                              .commodity_inward_type
                          ) === "PS" ? (
                            <>
                              {/* ================ Pre-Stack Commodity ================= */}
                              <Box mt={commonStyle.mt}>
                                <Grid
                                  textAlign="right"
                                  templateColumns="repeat(4, 1fr)"
                                  alignItems="center"
                                  gap={8}
                                >
                                  <GridItem colSpan={1}>
                                    <Text textAlign="right">
                                      Pre-Stack Commodity
                                    </Text>{" "}
                                  </GridItem>
                                  <GridItem colSpan={3}>
                                    <ReactCustomSelect
                                      name={
                                        formFieldsName.pwh_commodity_details
                                          .pre_stack_commodity
                                      }
                                      label=""
                                      options={
                                        selectBoxOptions?.commodityMasterOpt ||
                                        []
                                      }
                                      selectedValue={
                                        selected?.preStackCommodity
                                      }
                                      isClearable={false}
                                      selectType="label"
                                      isLoading={false}
                                      style={{ w: commonStyle.w }}
                                      handleOnChange={(val) => {
                                        setSelected((prev) => ({
                                          ...prev,
                                          preStackCommodity: val,
                                        }));
                                        setValue(
                                          formFieldsName.pwh_commodity_details
                                            .pre_stack_commodity,
                                          val?.value,
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
                                  gap={8}
                                >
                                  <GridItem colSpan={1}>
                                    <Text textAlign="right">
                                      Pre-Stack Commodity Quantity(MT)
                                    </Text>{" "}
                                  </GridItem>
                                  <GridItem colSpan={3}>
                                    <CustomInput
                                      name={
                                        formFieldsName.pwh_commodity_details
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
                              gap={8}
                            >
                              <GridItem colSpan={1}>
                                <Text textAlign="right">Funding Required </Text>{" "}
                              </GridItem>
                              <GridItem colSpan={3}>
                                <RadioGroup
                                  p="0"
                                  {...methods.register(
                                    `${formFieldsName.pwh_commodity_details.funding_required}`
                                  )}
                                  name={
                                    formFieldsName.pwh_commodity_details
                                      .funding_required
                                  }
                                  onChange={(val) => {
                                    console.log("e -----> ", val);
                                    setValue(
                                      formFieldsName.pwh_commodity_details
                                        .funding_required,
                                      val,
                                      { shouldValidate: true }
                                    );
                                  }}
                                  defaultValue="false"
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

                          {/* ================ Bank Details ================= */}

                          {getValues(
                            formFieldsName.pwh_commodity_details
                              .funding_required
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
                                  <GridItem colSpan={3}>
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
                                      onChange={(val) => {
                                        setBankDetail((old) => ({
                                          bank: val.value,
                                          branch:"",
                                        }));
                                        setBankError((old)=>({
                                          ...old,
                                          bank:"",
                                        }))
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
                                  <GridItem colSpan={3}>
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

                                        setBankError((old)=>({
                                          ...old,
                                          branch:"",
                                        }))
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
                                    colSpan={6}
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
                                    {getValues(`pwh_commodity_bank_details`)
                                      ?.length > 0 ? (
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
                                                    remove_bank_detail(index);
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

                              <Box>
                                {/* <Heading as="h5" fontSize="lg">
                                  Bank Details
                                </Heading>

                                {bank_details_fields &&
                                  bank_details_fields.map((item, index) => (
                                    <Box
                                      bgColor={"#DBFFF5"}
                                      key={item.id}
                                      mt={commonStyle.mt}
                                      p="4"
                                    >
                                      <Flex
                                        //padding="20px"
                                        borderRadius="10px"
                                        gap="3"
                                        alignItems="center"
                                        justifyContent="space-between"
                                      >
                                        <Box
                                          display="flex"
                                          gap="4"
                                          alignItems="center"
                                        >
                                          =============== SR No=============
                                          <Box w="50px">
                                            <Text
                                              mb="0"
                                              fontWeight="bold"
                                              textAlign="left"
                                            >
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
                                              {index + 1}
                                            </Box>
                                          </Box>

                                          =============== Bank Name =============
                                          <Box w="210px">
                                            <Text
                                              fontWeight="bold"
                                              textAlign="left"
                                            >
                                              Bank Name
                                            </Text>{" "}
                                            <Box>
                                              <ReactSelect
                                                options={
                                                  selectBoxOptions?.banks || []
                                                }
                                                name={`pwh_commodity_bank_details.${index}.${formFieldsName.pwh_commodity_details.bank_details_fields.bank}`}
                                                value={
                                                  selectBoxOptions?.banks?.filter(
                                                    (item) =>
                                                      item.value ===
                                                      getValues(
                                                        `pwh_commodity_bank_details.${index}.${formFieldsName.pwh_commodity_details.bank_details_fields.bank}`
                                                      )
                                                  )[0] || {}
                                                }
                                                onChange={(val) => {
                                                  console.log("val: " + val);

                                                  setValue(
                                                    `pwh_commodity_bank_details.${index}.${formFieldsName.pwh_commodity_details.bank_details_fields.bank}`,
                                                    val?.value,
                                                    { shouldValidate: true }
                                                  );
                                                  return val;
                                                }}
                                                styles={{
                                                  control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: "#fff",
                                                    borderRadius: "6px",
                                                    borderColor: errors
                                                      ?.pwh_commodity_bank_details?.[
                                                      index
                                                    ]?.bank?.message
                                                      ? "red"
                                                      : "#c3c3c3",

                                                    padding: "1px",
                                                  }),
                                                  ...reactSelectStyle,
                                                }}
                                              />
                                              <Text color="red">
                                                {errors &&
                                                  errors
                                                    ?.pwh_commodity_bank_details?.[
                                                    index
                                                  ]?.bank?.message}
                                              </Text>
                                            </Box>
                                          </Box>

                                          =============== Branch Name =============
                                          <Box w="210px">
                                            <Text
                                              fontWeight="bold"
                                              textAlign="left"
                                            >
                                              Branch Name
                                            </Text>{" "}
                                            <Box>
                                              <ReactSelect
                                                options={
                                                  selectBoxOptions?.branch || []
                                                }
                                                name={`pwh_commodity_bank_details.${index}.${formFieldsName.pwh_commodity_details.bank_details_fields.branch}`}
                                                value={
                                                  selectBoxOptions?.branch?.filter(
                                                    (item) =>
                                                      item.value ===
                                                      getValues(
                                                        `pwh_commodity_bank_details.${index}.${formFieldsName.pwh_commodity_details.bank_details_fields.branch}`
                                                      )
                                                  )[0] || {}
                                                }
                                                onChange={(val) => {
                                                  console.log("val: " + val);
                                                  setValue(
                                                    `pwh_commodity_bank_details.${index}.${formFieldsName.pwh_commodity_details.bank_details_fields.branch}`,
                                                    val?.value,
                                                    { shouldValidate: true }
                                                  );
                                                  return val;
                                                }}
                                                styles={{
                                                  control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: "#fff",
                                                    borderRadius: "6px",
                                                    borderColor: errors
                                                      ?.pwh_commodity_bank_details?.[
                                                      index
                                                    ]?.branch?.message
                                                      ? "red"
                                                      : "#c3c3c3",

                                                    padding: "1px",
                                                  }),
                                                  ...reactSelectStyle,
                                                }}
                                              />
                                              <Text color="red">
                                                {errors &&
                                                  errors
                                                    ?.pwh_commodity_bank_details?.[
                                                    index
                                                  ]?.q?.message}
                                              </Text>
                                            </Box>
                                          </Box>
                                        </Box>

                                        =============== Add / Delete =============
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
                                              _hover={{}}
                                              onClick={() => {
                                                append_new_bank_details();
                                              }}
                                            >
                                              +
                                            </Button>

                                            <Button
                                              borderColor="gray.10"
                                              borderRadius="6"
                                              bg="red"
                                              color="white"
                                              fontWeight="bold"
                                              _hover={{}}
                                              isDisabled={
                                                bank_details_fields?.length ===
                                                1
                                              }
                                              onClick={() =>
                                                remove_bank_detail(index)
                                              }
                                            >
                                              -
                                            </Button>
                                          </Box>
                                        </Box>
                                      </Flex>
                                    </Box>
                                  ))} */}
                              </Box>
                            </>
                          ) : (
                            <> </>
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
                              onClick={() =>
                                saveAsDraftData("PWH_COMMODITY_DETAILS")
                              }
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
                              xl: "100%",
                            }}
                          >
                            {/* -------------- minimum Rent(per/sq ft/month)-------------- */}
                            {/* <Box w="full">
                              <Grid
                                // textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                justifyContent="flex-start"
                                gap={8}
                              >
                                <GridItem colSpan={3}>
                                  {" "}
                                  <Text textAlign="right">
                                    Minimum Rent(per/sq ft/month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_commercial_details
                                        .minimum_rent
                                    }
                                    placeholder="Minimum Rent(per/sq ft/month)"
                                    type="number"
                                    label=""
                                    style={{
                                      w: commonStyle.comm_details_style.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box> */}
                            {/* --------------Maximum Rent(per/sq ft/month)-------------- */}
                            {/* <Box>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 2fr)"
                                gap={8}
                              >
                                <GridItem colSpan={3}>
                                  {" "}
                                  <Text textAlign="right">
                                    Maximum Rent(per/sq ft/month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_commercial_details
                                        .maximum_rent
                                    }
                                    placeholder="Maximum Rent(per/sq ft/month)"
                                    type="number"
                                    label=""
                                    style={{
                                      w: commonStyle.comm_details_style.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box> */}

                            {/* --------------Avg Rent(per/sq ft/month)-------------- */}
                            {/* <Box>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 2fr)"
                                gap={8}
                              >
                                <GridItem colSpan={3}>
                                  {" "}
                                  <Text textAlign="right">
                                    Avg Rent(per/sq ft/month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_commercial_details
                                        .avg_rent
                                    }
                                    placeholder="Avg Rent(per/sq ft/month)"
                                    type="number"
                                    label=""
                                    style={{
                                      w: commonStyle.comm_details_style.w,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box> */}

                            {/* -------------- Rent (per/sq ft/month)-------------- */}

                            <Box mt={commonStyle.mt}>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 1fr)"
                                gap={4}
                                mx="2"
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Rent (per/sq ft/month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <Text>
                                    {/* {   getValues("covered_area") *
                                      getValues("rent")} */}
                                  </Text>
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_commercial_details.rent
                                    }
                                    placeholder="Rent (per/sq ft/month)"
                                    type="text"
                                    label=""
                                    // inputValue={
                                    //   getValues("covered_area") *
                                    //   getValues("rent")
                                    // }
                                    onChange={(val) => {
                                      let areaId = getValues("area");

                                      console.log(areaId);
                                      fetchMinMaxAvg(areaId);
                                    }}
                                    style={{
                                      w: "85%",
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <Flex gap={"4"}>
                                    <Text textAlign="right">
                                      Min: {minMaxAvgState?.min_rent || 0}
                                    </Text>
                                    <Text textAlign="right">
                                      Max: {minMaxAvgState?.max_rent || 0}
                                    </Text>
                                    <Text textAlign="right">
                                      Avg: {minMaxAvgState?.avg_rent || 0}
                                    </Text>
                                  </Flex>
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- Total rent payable (per month) -------------- */}
                            <Box>
                              <Grid
                                textAlign="right"
                                alignItems="center"
                                templateColumns="repeat(4, 2fr)"
                                gap={8}
                              >
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Total rent payable (per month)
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={3}>
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_commercial_details
                                        .total_rent_payable_months
                                    }
                                    placeholder="Total rent payable (per month)"
                                    type="number"
                                    label=""
                                    style={{
                                      w: "56%",
                                      mb: 4,
                                    }}
                                  />
                                </GridItem>
                              </Grid>
                            </Box>
                          </Box>

                          {/* {/ ================ Owner Name Mobile No Address ================= /} */}

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
                                  Warehouse Owner details
                                </Text>
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text fontWeight="bold" textAlign="left">
                                  Owner Name
                                </Text>
                                <Input
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
                                  height="33px"
                                  border="1px"
                                  borderColor={
                                    ownerError.name ? "red" : "gray.10"
                                  }
                                  backgroundColor={"white"}
                                  borderRadius={"lg"}
                                  _placeholder={{
                                    color: "gray.300",
                                  }}
                                  _hover={{
                                    borderColor: "primary.700",
                                    backgroundColor: "primary.200",
                                  }}
                                  _focus={{
                                    borderColor: "primary.700",
                                    backgroundColor: "primary.200",
                                    boxShadow: "none",
                                  }}
                                  p={{ base: "4" }}
                                  fontWeight={{ base: "normal" }}
                                  fontStyle={"normal"}
                                  placeholder={"Owner Name"}
                                />
                                <Text
                                  color="red"
                                  fontSize="14px"
                                  textAlign="left"
                                >
                                  {ownerError.name}
                                </Text>
                              </GridItem>
                              <GridItem colSpan={2}>
                                <Text fontWeight="bold" textAlign="left">
                                  Mobile No.
                                </Text>
                                <Input
                                  type="number"
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
                                  height="33px"
                                  border="1px"
                                  borderColor={
                                    ownerError.mobile ? "red" : "gray.10"
                                  }
                                  backgroundColor={"white"}
                                  borderRadius={"lg"}
                                  _placeholder={{
                                    color: "gray.300",
                                  }}
                                  _hover={{
                                    borderColor: "primary.700",
                                    backgroundColor: "primary.200",
                                  }}
                                  _focus={{
                                    borderColor: "primary.700",
                                    backgroundColor: "primary.200",
                                    boxShadow: "none",
                                  }}
                                  p={{ base: "4" }}
                                  fontWeight={{ base: "normal" }}
                                  fontStyle={"normal"}
                                  placeholder={"Mobile No"}
                                />
                                <Text
                                  color="red"
                                  fontSize="14px"
                                  textAlign="left"
                                >
                                  {ownerError.mobile}
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
                                  rows={1}
                                  border="1px"
                                  borderColor={
                                    ownerError.address ? "red" : "gray.10"
                                  }
                                  backgroundColor={"white"}
                                  borderRadius={"lg"}
                                  _placeholder={{
                                    color: "gray.300",
                                  }}
                                  _hover={{
                                    borderColor: "primary.700",
                                    backgroundColor: "primary.200",
                                  }}
                                  _focus={{
                                    borderColor: "primary.700",
                                    backgroundColor: "primary.200",
                                    boxShadow: "none",
                                  }}
                                  px={{ base: "4" }}
                                  py={{ base: "5px" }}
                                  fontWeight={{ base: "normal" }}
                                  fontStyle={"normal"}
                                  placeholder={"Address"}
                                />
                                <Text
                                  color="red"
                                  fontSize="14px"
                                  textAlign="left"
                                >
                                  {ownerError.address}
                                </Text>
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
                                  height="33px"
                                  border="1px"
                                  borderColor={
                                    ownerError.rent ? "red" : "gray.10"
                                  }
                                  backgroundColor={"white"}
                                  borderRadius={"lg"}
                                  _placeholder={{
                                    color: "gray.300",
                                  }}
                                  _hover={{
                                    borderColor: "primary.700",
                                    backgroundColor: "primary.200",
                                  }}
                                  _focus={{
                                    borderColor: "primary.700",
                                    backgroundColor: "primary.200",
                                    boxShadow: "none",
                                  }}
                                  p={{ base: "4" }}
                                  fontWeight={{ base: "normal" }}
                                  fontStyle={"normal"}
                                  placeholder={"Rent"}
                                />
                                <Text
                                  color="red"
                                  fontSize="14px"
                                  textAlign="left"
                                >
                                  {ownerError.rent}
                                </Text>
                              </GridItem>
                              <GridItem colSpan={2} alignSelf="end">
                                <Button
                                  type="button"
                                  //w="full"
                                  backgroundColor={"primary.700"}
                                  _hover={{ backgroundColor: "primary.700" }}
                                  color={"white"}
                                  borderRadius={"full"}
                                  px={"10"}
                                  onClick={
                                    () => {
                                      updateOwnerFlag !== null
                                        ? UpdateCommercialDetail()
                                        : append_new_commercial_detail();
                                      console.log("here in owner");
                                    }
                                    // saveAsDraftData("PWH_COMMERCIAL_DETAILS")
                                  }
                                >
                                  {/* {console.log(
                                    updateOwnerFlag ? "got" : "not got",
                                    "here"
                                  )} */}
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
                                {getValues(`pwh_commercial_multipal_details`)
                                  ?.length > 0 ? (
                                  pwh_commercial_multipal_details_fields.map(
                                    (item, index) => (
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
                                          {item.owner_name}
                                        </td>
                                        <td
                                          style={{
                                            padding: tableStyle.generalPadding,
                                          }}
                                        >
                                          {item.mobile_no}
                                        </td>
                                        <td
                                          style={{
                                            padding: tableStyle.generalPadding,
                                          }}
                                        >
                                          {item.address}
                                        </td>
                                        <td
                                          style={{
                                            padding: tableStyle.generalPadding,
                                          }}
                                        >
                                          {item.rent}
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
                                                  pwh_commercial_multipal_detail_remove(
                                                    index
                                                  );
                                                }}
                                              />
                                            </Box>
                                          </Flex>
                                        </td>
                                      </tr>
                                    )
                                  )
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

                          <Box>
                            {/* only header fields */}
                            {/* <Flex
                              bgColor={"#DBFFF5"}
                              pt="4"
                              px="4"
                              borderRadius="10px"
                              gap="3"
                              alignItems="center"
                            >
                              <Box w="50px">
                                <Text mb="0" fontWeight="bold" textAlign="left">
                                  {" "}
                                  Sr No{" "}
                                </Text>{" "}
                              </Box>

                              <Box w="170px">
                                <Text fontWeight="bold" textAlign="left">
                                  Owner Name
                                </Text>{" "}
                              </Box>

                              <Box w="180px">
                                <Text fontWeight="bold" textAlign="left">
                                  Mobile No
                                </Text>{" "}
                              </Box>

                              <Box w="270px">
                                <Text fontWeight="bold" textAlign="left">
                                  Address
                                </Text>{" "}
                              </Box>

                              <Box w="160px">
                                <Text fontWeight="bold" textAlign="left">
                                  Rent
                                </Text>{" "}
                              </Box>

                              <Box w="180px"></Box>
                            </Flex> */}
                            {/* {pwh_commercial_multipal_details_fields &&
                              pwh_commercial_multipal_details_fields.map(
                                (item, index) => (
                                  <Box bgColor={"#DBFFF5"} key={item.id}>
                                    <Flex
                                      bgColor={"#DBFFF5"}
                                      py="2"
                                      px="16px"
                                      borderRadius="10px"
                                      gap="3"
                                      alignItems="center"
                                    >
                                      =============== SR No=============
                                      <Box w="50px">
                                        <Box
                                          textAlign="center"
                                          border="1px"
                                          p="2"
                                          borderColor="gray.10"
                                          borderRadius="6"
                                        >
                                          {index + 1}
                                        </Box>
                                      </Box>

                                      =============== Owner Name =============
                                      <Box w="170px">
                                        <FormControl
                                          isInvalid={
                                            errors
                                              ?.pwh_commercial_multipal_details?.[
                                              index
                                            ]?.owner_name?.message
                                          }
                                        >
                                          <FormLabel>{label}</FormLabel>
                                          <Box>
                                            <Input
                                              type="text"
                                              name={`pwh_commercial_multipal_details.${index}.${formFieldsName.pwh_commercial_details.pwh_commercial_multipal_details.owner_name}`}
                                              {...methods.register(
                                                `pwh_commercial_multipal_details.${index}.${formFieldsName.pwh_commercial_details.pwh_commercial_multipal_details.owner_name}`
                                              )}
                                              border="1px"
                                              borderColor="gray.10"
                                              backgroundColor={"white"}
                                              borderRadius={"lg"}
                                              _placeholder={{
                                                color: "gray.300",
                                              }}
                                              _hover={{
                                                borderColor: "primary.700",
                                                backgroundColor: "primary.200",
                                              }}
                                              _focus={{
                                                borderColor: "primary.700",
                                                backgroundColor: "primary.200",
                                                boxShadow: "none",
                                              }}
                                              p={{ base: "4" }}
                                              fontWeight={{ base: "normal" }}
                                              fontStyle={"normal"}
                                              placeholder={"Owner Name"}
                                            />
                                          </Box>

                                          <FormErrorMessage>
                                            {
                                              errors
                                                ?.pwh_commercial_multipal_details?.[
                                                index
                                              ]?.owner_name?.message
                                            }
                                          </FormErrorMessage>
                                        </FormControl>
                                      </Box>

                                      =============== Mobile No =============
                                      <Box w="180px">
                                        <FormControl
                                          isInvalid={
                                            errors
                                              ?.pwh_commercial_multipal_details?.[
                                              index
                                            ]?.mobile_no?.message
                                          }
                                        >
                                          <FormLabel>{label}</FormLabel>
                                          <Box>
                                            <Input
                                              type="text"
                                              name={`pwh_commercial_multipal_details.${index}.${formFieldsName.pwh_commercial_details.pwh_commercial_multipal_details.mobile_no}`}
                                              {...methods.register(
                                                `pwh_commercial_multipal_details.${index}.${formFieldsName.pwh_commercial_details.pwh_commercial_multipal_details.mobile_no}`
                                              )}
                                              border="1px"
                                              borderColor="gray.10"
                                              backgroundColor={"white"}
                                              borderRadius={"lg"}
                                              _placeholder={{
                                                color: "gray.300",
                                              }}
                                              _hover={{
                                                borderColor: "primary.700",
                                                backgroundColor: "primary.200",
                                              }}
                                              _focus={{
                                                borderColor: "primary.700",
                                                backgroundColor: "primary.200",
                                                boxShadow: "none",
                                              }}
                                              p={{ base: "4" }}
                                              fontWeight={{ base: "normal" }}
                                              fontStyle={"normal"}
                                              placeholder={"Mobile No"}
                                            />
                                          </Box>

                                          <FormErrorMessage>
                                            {
                                              errors
                                                ?.pwh_commercial_multipal_details?.[
                                                index
                                              ]?.mobile_no?.message
                                            }
                                          </FormErrorMessage>
                                        </FormControl>
                                      </Box>

                                      =============== Address =============
                                      <Box w="270px">
                                        <FormControl
                                          isInvalid={
                                            errors
                                              ?.pwh_commercial_multipal_details?.[
                                              index
                                            ]?.address?.message
                                          }
                                        >
                                          <FormLabel>{label}</FormLabel>
                                          <Box>
                                            <Input
                                              type="text"
                                              name={`pwh_commercial_multipal_details.${index}.${formFieldsName.pwh_commercial_details.pwh_commercial_multipal_details.address}`}
                                              {...methods.register(
                                                `pwh_commercial_multipal_details.${index}.${formFieldsName.pwh_commercial_details.pwh_commercial_multipal_details.address}`
                                              )}
                                              border="1px"
                                              borderColor="gray.10"
                                              backgroundColor={"white"}
                                              borderRadius={"lg"}
                                              _placeholder={{
                                                color: "gray.300",
                                              }}
                                              _hover={{
                                                borderColor: "primary.700",
                                                backgroundColor: "primary.200",
                                              }}
                                              _focus={{
                                                borderColor: "primary.700",
                                                backgroundColor: "primary.200",
                                                boxShadow: "none",
                                              }}
                                              p={{ base: "4" }}
                                              fontWeight={{ base: "normal" }}
                                              fontStyle={"normal"}
                                              placeholder={"Address"}
                                            />
                                          </Box>

                                          <FormErrorMessage>
                                            {
                                              errors
                                                ?.pwh_commercial_multipal_details?.[
                                                index
                                              ]?.address?.message
                                            }
                                          </FormErrorMessage>
                                        </FormControl>
                                      </Box>

                                      =============== Rent =============

                                      <Box w="160px">
                                        <FormControl
                                          isInvalid={
                                            errors
                                              ?.pwh_commercial_multipal_details?.[
                                              index
                                            ]?.rent?.message
                                          }
                                        >
                                          <FormLabel>{label}</FormLabel>
                                          <Box>
                                            <Input
                                              type="number"
                                              name={`pwh_commercial_multipal_details.${index}.${formFieldsName.pwh_commercial_details.pwh_commercial_multipal_details.rent}`}
                                              {...methods.register(
                                                `pwh_commercial_multipal_details.${index}.${formFieldsName.pwh_commercial_details.pwh_commercial_multipal_details.rent}`
                                              )}
                                              border="1px"
                                              borderColor="gray.10"
                                              backgroundColor={"white"}
                                              borderRadius={"lg"}
                                              _placeholder={{
                                                color: "gray.300",
                                              }}
                                              _hover={{
                                                borderColor: "primary.700",
                                                backgroundColor: "primary.200",
                                              }}
                                              _focus={{
                                                borderColor: "primary.700",
                                                backgroundColor: "primary.200",
                                                boxShadow: "none",
                                              }}
                                              p={{ base: "4" }}
                                              fontWeight={{ base: "normal" }}
                                              fontStyle={"normal"}
                                              placeholder={"Rent"}
                                            />
                                          </Box>

                                          <FormErrorMessage>
                                            {
                                              errors
                                                ?.pwh_commercial_multipal_details?.[
                                                index
                                              ]?.rent?.message
                                            }
                                          </FormErrorMessage>
                                        </FormControl>
                                      </Box>

                                      =============== Add / Delete =============
                                      <Box w="180px">
                                        <Box
                                          // mt="7"
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="flex-end"
                                          gap="2"
                                        >
                                          <Button
                                            borderColor="gray.10"
                                            borderRadius="6"
                                            bg="primary.700"
                                            _hover={{}}
                                            color="white"
                                            fontWeight="bold"
                                            onClick={() =>
                                              append_new_commercial_detail()
                                            }
                                          >
                                            +
                                          </Button>

                                          <Button
                                            borderColor="gray.10"
                                            borderRadius="6"
                                            bg="red"
                                            color="white"
                                            fontWeight="bold"
                                            _hover={{}}
                                            isDisabled={
                                              pwh_commercial_multipal_details_fields?.length ===
                                              1
                                            }
                                            onClick={() =>
                                              pwh_commercial_multipal_detail_remove(
                                                index
                                              )
                                            }
                                          >
                                            -
                                          </Button>
                                        </Box>
                                      </Box>
                                    </Flex>
                                  </Box>
                                )
                              )} */}
                          </Box>

                          <Box
                            //border="1px"
                            w={{
                              base: "100%",
                              sm: "100%",
                              md: "100%",
                              lg: "100%",
                              xl: "94%",
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
                                <GridItem colSpan={1}>
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
                                    type="number"
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
                                <GridItem colSpan={1}>
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
                                    type="number"
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
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Advance rent
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <RadioGroup
                                    p="0"
                                    defaultValue="false"
                                    {...methods.register(
                                      formFieldsName.pwh_commercial_details
                                        .advance_rent
                                    )}
                                    name={
                                      formFieldsName.pwh_commercial_details
                                        .advance_rent
                                    }
                                    onChange={(val) => {
                                      setValue(
                                        formFieldsName.pwh_commercial_details
                                          .advance_rent,
                                        val,
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
                              formFieldsName.pwh_commercial_details.advance_rent
                            ) == "true" && (
                              <Box mt="1" w="full">
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
                                  <GridItem colSpan={2}>
                                    <CustomInput
                                      name={
                                        formFieldsName.pwh_commercial_details
                                          .advance_rent_month
                                      }
                                      placeholder="Advance rent(month)"
                                      type="number"
                                      label=""
                                      style={{
                                        w: commonStyle.comm_details_style.w,
                                      }}
                                    />
                                  </GridItem>
                                </Grid>
                              </Box>
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
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_commercial_details.gst
                                    }
                                    placeholder="GST"
                                    type="text"
                                    label=""
                                    style={{
                                      w: commonStyle.comm_details_style.w,
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
                                  {" "}
                                  <Text textAlign="right">
                                    Commencement Date
                                  </Text>{" "}
                                </GridItem>
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomInput
                                    name={
                                      formFieldsName.pwh_commercial_details
                                        .commencement_date
                                    }
                                    placeholder=""
                                    type="date"
                                    label=""
                                    inputValue={getValues(
                                      formFieldsName.pwh_commercial_details
                                        .commencement_date
                                    )}
                                    onChange={(val) => {
                                      setValue(
                                        formFieldsName.pwh_commercial_details
                                          .commencement_date,
                                        val.target.value,
                                        { shouldValidate: true }
                                      );
                                      if (
                                        getValues(
                                          formFieldsName.pwh_commercial_details
                                            .agreement_period
                                        )
                                      ) {
                                        setValue(
                                          formFieldsName.pwh_commercial_details
                                            .expiry_date,
                                          moment(val.target.value)
                                            .add(
                                              getValues(
                                                formFieldsName
                                                  .pwh_commercial_details
                                                  .agreement_period
                                              ),
                                              "months"
                                            )
                                            .format("DD/MM/YYYY"),
                                          { shouldValidate: true }
                                        );
                                      }
                                    }}
                                    style={{
                                      w: commonStyle.comm_details_style.w,
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
                                    placeholder="Agreement period (Month)"
                                    type="number"
                                    label=""
                                    inputValue={getValues(
                                      formFieldsName.pwh_commercial_details
                                        .agreement_period
                                    )}
                                    onChange={(val) => {
                                      setValue(
                                        formFieldsName.pwh_commercial_details
                                          .agreement_period,
                                        val.target.value,
                                        { shouldValidate: true }
                                      );
                                      if (
                                        getValues(
                                          formFieldsName.pwh_commercial_details
                                            .commencement_date
                                        )
                                      ) {
                                        console.log(
                                          moment(
                                            getValues(
                                              formFieldsName
                                                .pwh_commercial_details
                                                .commencement_date
                                            )
                                          )
                                            .add(val.target.value, "months")
                                            .format("DD/MM/YYYY")
                                        );
                                        setValue(
                                          formFieldsName.pwh_commercial_details
                                            .expiry_date,
                                          moment(
                                            getValues(
                                              formFieldsName
                                                .pwh_commercial_details
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
                                <GridItem colSpan={1}>
                                  {" "}
                                  <Text textAlign="right">
                                    Expiry Date
                                  </Text>{" "}
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
                                    inputValue={getValues(
                                      formFieldsName.pwh_commercial_details
                                        .expiry_date
                                    )}
                                    InputDisabled={true}
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
                                <GridItem colSpan={1}>
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
                                    type="number"
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
                                <GridItem colSpan={1}>
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
                                    options={
                                      selectBoxOptions?.commodityMasterOpt || []
                                    }
                                    isMultipleSelect={true}
                                    selectedValue={selected?.commodity}
                                    isClearable={false}
                                    selectType="label"
                                    isLoading={false}
                                    style={{
                                      w: commonStyle.comm_details_style.w,
                                    }}
                                    handleOnChange={(val) => {
                                      setSelected((prev) => ({
                                        ...prev,
                                        commodity: val,
                                      }));
                                      setValue(
                                        formFieldsName.pwh_commercial_details
                                          .storage_charges_according_to_commodity,
                                        val?.value,
                                        { shouldValidate: true }
                                      );
                                    }}
                                  />
                                </GridItem>

                                <GridItem colSpan={1}>
                                  <Button
                                    type="button"
                                    //w="full"
                                    backgroundColor={"primary.700"}
                                    _hover={{ backgroundColor: "primary.700" }}
                                    color={"white"}
                                    borderRadius={"full"}
                                    isLoading={calculatePBPMApiIsLoading}
                                    my={"4"}
                                    px={"10"}
                                    onClick={() => calcPBPM()}
                                  >
                                    Check PBPM
                                  </Button>
                                </GridItem>
                              </Grid>
                            </Box>

                            {/* -------------- pbpmList -------------- */}

                            {pbpmList?.length > 0 && (
                              <Box mt={commonStyle.mt}>
                                {" "}
                                <Grid
                                  textAlign="right"
                                  alignItems="center"
                                  justifyContent="center"
                                  // templateColumns="repeat(6, 1fr)"
                                  gap={8}
                                >
                                  <GridItem>
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
                                </Grid>
                              </Box>
                            )}

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
                                <GridItem colSpan={2}>
                                  {" "}
                                  <CustomFileInput
                                    name={
                                      formFieldsName.pwh_commercial_details.rent
                                    }
                                    placeholder="Excel upload"
                                    label=""
                                    onChange={(e) => console.log(e)}
                                    type=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    style={{ w: "90%" }}
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
                              onClick={() =>
                                saveAsDraftData("PWH_COMMERCIAL_DETAILS")
                              }
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
                          {/* ================ Client List ================= */}
                          <Box>
                            <Grid
                              // textAlign="right"
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
                                    {/* Client Type */}
                                    <GridItem>
                                      <Text textAlign="left">Client Type</Text>{" "}
                                      <FormControl
                                        isInvalid={
                                          errors?.client_list?.[index]
                                            ?.client_type?.message
                                        }
                                      >
                                        <ReactSelect
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
                                          name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.client_type}`}
                                          value={
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
                                                item.value ==
                                                getValues(
                                                  `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.client_type}`
                                                )
                                            )[0] || {
                                              label: "Retail",
                                              value: "Retail",
                                            }
                                          }
                                          isClearable={false}
                                          isLoading={false}
                                          onChange={(val) => {
                                            console.log(
                                              "selectedOption @@@@@@@@@@@------> ",
                                              val
                                            );
                                            setValue(
                                              `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.client_type}`,
                                              val.value,
                                              { shouldValidate: true }
                                            );
                                          }}
                                          styles={{
                                            control: (base, state) => ({
                                              ...base,
                                              backgroundColor: "#fff",
                                              borderRadius: "6px",
                                              borderColor: errors
                                                ?.client_list?.[index]
                                                ?.client_type?.message
                                                ? "red"
                                                : "#c3c3c3",

                                              padding: "1px",
                                            }),
                                            ...reactSelectStyle,
                                          }}
                                        />
                                        {!errors ? (
                                          <FormHelperText>
                                            Enter the email you'd like to
                                            receive the newsletter on.
                                          </FormHelperText>
                                        ) : (
                                          <FormErrorMessage>
                                            Email is required.
                                          </FormErrorMessage>
                                        )}
                                      </FormControl>
                                    </GridItem>

                                    {/* client_name */}
                                    <GridItem>
                                      <FormControl isInvalid={true}>
                                        <Text textAlign="left">
                                          {" "}
                                          Client Name{" "}
                                        </Text>{" "}
                                        <CustomInput
                                          name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.client_name}`}
                                          placeholder="client name"
                                          inputValue={getValues(
                                            `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.client_name}`
                                          )}
                                          onChange={(val) => {
                                            setValue(
                                              `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.client_name}`,
                                              val.target.value,
                                              { shouldValidate: true }
                                            );
                                          }}
                                          type="text"
                                          label=""
                                          style={{ w: "100%" }}
                                        />
                                      </FormControl>

                                      {/* <Box mx="1" color="red" textAlign="left">
                                        {
                                          errors?.client_list?.[index]
                                            ?.client_name?.message
                                        }
                                      </Box> */}
                                    </GridItem>

                                    {/* Mobile Number */}
                                    <GridItem>
                                      <Text textAlign="left">
                                        {" "}
                                        Mobile Number{" "}
                                      </Text>{" "}
                                      <CustomInput
                                        name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.mobile_number}`}
                                        placeholder="mobile number"
                                        type="text"
                                        label=""
                                        inputValue={getValues(
                                          `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.mobile_number}`
                                        )}
                                        onChange={(val) => {
                                          setValue(
                                            `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.mobile_number}`,
                                            val.target.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                        style={{ w: "100%" }}
                                      />
                                      <Box mx="1" color="red" textAlign="left">
                                        {
                                          errors?.client_list?.[index]
                                            ?.mobile_number?.message
                                        }
                                      </Box>
                                    </GridItem>

                                    {/* Region */}
                                    <GridItem>
                                      <Text textAlign="left">Region</Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.region}`}
                                        label=""
                                        options={
                                          selectBoxOptions?.regions || []
                                        }
                                        selectedValue={
                                          selectBoxOptions?.regions?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.region}`
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
                                      <Box mx="1" color="red" textAlign="left">
                                        {
                                          errors?.client_list?.[index]?.region
                                            ?.message
                                        }
                                      </Box>
                                    </GridItem>

                                    {/* State */}
                                    <GridItem>
                                      <Text textAlign="left">State </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.state}`}
                                        label=""
                                        options={
                                          clientLocationDrillDownState?.[index]
                                            ?.states || {}
                                        }
                                        selectedValue={
                                          clientLocationDrillDownState[
                                            index
                                          ]?.states?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.state}`
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
                                      <Box mx="1" color="red" textAlign="left">
                                        {
                                          errors?.client_list?.[index]?.state
                                            ?.message
                                        }
                                      </Box>
                                    </GridItem>

                                    {/* Zone  SubState*/}
                                    <GridItem>
                                      <Text textAlign="left">SubState </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.zone}`}
                                        label=""
                                        options={
                                          clientLocationDrillDownState?.[index]
                                            ?.zones || {}
                                        }
                                        selectedValue={
                                          clientLocationDrillDownState[
                                            index
                                          ]?.zones?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.zone}`
                                              )
                                          )[0] || {}
                                        }
                                        isClearable={false}
                                        selectType="label"
                                        isLoading={false}
                                        style={{ w: "100%" }}
                                        handleOnChange={(val) => {
                                          console.log(val);
                                          zoneOnClientChange(val, index);
                                        }}
                                      />
                                      <Box mx="1" color="red" textAlign="left">
                                        {
                                          errors?.client_list?.[index]?.substate
                                            ?.message
                                        }
                                      </Box>
                                    </GridItem>

                                    {/* District */}
                                    <GridItem>
                                      <Text textAlign="left">District </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.district}`}
                                        label=""
                                        options={
                                          clientLocationDrillDownState?.[index]
                                            ?.districts || {}
                                        }
                                        selectedValue={
                                          clientLocationDrillDownState[
                                            index
                                          ]?.districts?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.district}`
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
                                      <Box mx="1" color="red" textAlign="left">
                                        {
                                          errors?.client_list?.[index]?.district
                                            ?.message
                                        }
                                      </Box>
                                    </GridItem>

                                    {/* Area */}
                                    <GridItem>
                                      <Text textAlign="left">Area </Text>{" "}
                                      <ReactCustomSelect
                                        name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.area}`}
                                        label=""
                                        options={
                                          clientLocationDrillDownState?.[index]
                                            ?.areas || {}
                                        }
                                        selectedValue={
                                          clientLocationDrillDownState[
                                            index
                                          ]?.areas?.filter(
                                            (item) =>
                                              item.value ===
                                              getValues(
                                                `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.area}`
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
                                      <Box mx="1" color="red" textAlign="left">
                                        {
                                          errors?.client_list?.[index]?.area
                                            ?.message
                                        }
                                      </Box>
                                    </GridItem>

                                    {/* Address */}
                                    <GridItem colSpan={{ base: 1, sm: 2 }}>
                                      <Text textAlign="left"> Address </Text>{" "}
                                      <CustomTextArea
                                        name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.address}`}
                                        placeholder="address"
                                        type="text"
                                        rowLength={1}
                                        label=""
                                        style={{ w: "100%" }}
                                        inputValue={getValues(
                                          `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.address}`
                                        )}
                                        onChange={(val) => {
                                          setValue(
                                            `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.address}`,
                                            val.target.value,
                                            { shouldValidate: true }
                                          );
                                        }}
                                      />
                                      <Box mx="1" color="red" textAlign="left">
                                        {
                                          errors?.client_list?.[index]?.address
                                            ?.message
                                        }
                                      </Box>
                                    </GridItem>

                                    {getValues(
                                      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.client_type}`
                                    ) === "Corporate" && (
                                      <>
                                        {/* first set daynamic fields */}

                                        <GridItem
                                          //border="1px"
                                          gap="4"
                                          colSpan={{
                                            base: 1,
                                            sm: 2,
                                            md: 3,
                                            lg: 4,
                                          }}
                                          display="flex"
                                          overscrollBehaviorX={true}
                                        >
                                          {/* Storage charges */}

                                          <GridItem colSpan={3}>
                                            <Text textAlign="left">
                                              {" "}
                                              Storage charges
                                            </Text>{" "}
                                            <CustomInput
                                              name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.storage_charges}`}
                                              placeholder="Storage charges"
                                              type="number"
                                              label=""
                                              style={{ w: "100%" }}
                                            />
                                            <Box
                                              mx="1"
                                              color="red"
                                              textAlign="left"
                                            >
                                              {
                                                errors?.client_list?.[index]
                                                  ?.storage_charges?.message
                                              }
                                            </Box>
                                          </GridItem>

                                          {/* Reservation qty (Bales, MT) */}
                                          <GridItem colSpan={3}>
                                            <Text textAlign="left">
                                              {" "}
                                              Reservation qty (Bales, MT)
                                            </Text>{" "}
                                            <CustomInput
                                              name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.reservation_qty}`}
                                              placeholder="Reservation Qty (Bales, MT)"
                                              type="number"
                                              label=""
                                              style={{ w: "100%" }}
                                            />
                                            <Box
                                              mx="1"
                                              color="red"
                                              textAlign="left"
                                            >
                                              {
                                                errors?.client_list?.[index]
                                                  ?.reservation_qty?.message
                                              }
                                            </Box>
                                          </GridItem>

                                          {/* Reservation Start Date */}
                                          <GridItem colSpan={3}>
                                            <Text textAlign="left">
                                              Reservation Start Date
                                            </Text>{" "}
                                            <CustomInput
                                              name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.reservation_start_date}`}
                                              placeholder="Reservation Start Date"
                                              type="date"
                                              label=""
                                              style={{ w: "100%" }}
                                            />
                                            <Box
                                              mx="1"
                                              color="red"
                                              textAlign="left"
                                            >
                                              {
                                                errors?.client_list?.[index]
                                                  ?.reservation_start_date
                                                  ?.message
                                              }
                                            </Box>
                                          </GridItem>

                                          {/* Reservation End Date */}
                                          <GridItem colSpan={3}>
                                            <Text textAlign="left">
                                              {" "}
                                              Reservation End Date{" "}
                                            </Text>{" "}
                                            <CustomInput
                                              name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.reservation_end_date}`}
                                              placeholder="Reservation End Date"
                                              type="date"
                                              label=""
                                              style={{ w: "100%" }}
                                            />
                                            <Box
                                              mx="1"
                                              color="red"
                                              textAlign="left"
                                            >
                                              {
                                                errors?.client_list?.[index]
                                                  ?.reservation_end_date
                                                  ?.message
                                              }
                                            </Box>
                                          </GridItem>
                                        </GridItem>

                                        {/* second set daynamic fields */}

                                        <GridItem
                                          //border="1px"
                                          gap="4"
                                          colSpan={{
                                            base: 1,
                                            sm: 2,
                                            md: 3,
                                            lg: 4,
                                          }}
                                          display="flex"
                                          overscrollBehaviorX={true}
                                        >
                                          {/* Reservation Period(Month) */}
                                          <GridItem colSpan={3}>
                                            <Text textAlign="left">
                                              {" "}
                                              Reservation Period(Month)
                                            </Text>{" "}
                                            <CustomInput
                                              name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.reservation_period_month}`}
                                              placeholder="Reservation Period(Month)"
                                              type="number"
                                              label=""
                                              style={{ w: "100%" }}
                                            />
                                            <Box
                                              mx="1"
                                              color="red"
                                              textAlign="left"
                                            >
                                              {
                                                errors?.client_list?.[index]
                                                  ?.reservation_period_month
                                                  ?.message
                                              }
                                            </Box>
                                          </GridItem>

                                          {/* Reservation billing cycle */}
                                          <GridItem colSpan={3}>
                                            <Text textAlign="left">
                                              {" "}
                                              Reservation billing cycle
                                            </Text>{" "}
                                            <ReactCustomSelect
                                              name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.reservation_billing_cycle}`}
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
                                                      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.reservation_billing_cycle}`
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
                                                  `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.reservation_billing_cycle}`,
                                                  val.value,
                                                  { shouldValidate: true }
                                                );
                                              }}
                                            />
                                            <Box
                                              mx="1"
                                              color="red"
                                              textAlign="left"
                                            >
                                              {
                                                errors?.client_list?.[index]
                                                  ?.reservation_billing_cycle
                                                  ?.message
                                              }
                                            </Box>
                                          </GridItem>

                                          {/* Post Reservation billing cycle */}
                                          <GridItem colSpan={3}>
                                            <Text textAlign="left">
                                              {" "}
                                              Post Reservation billing cycle
                                            </Text>{" "}
                                            <ReactCustomSelect
                                              name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.post_reservation_billing_cycle}`}
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
                                                      `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.post_reservation_billing_cycle}`
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
                                                  `client_list.${index}.${formFieldsName.pwh_clients_details.client_list.post_reservation_billing_cycle}`,
                                                  val.value,
                                                  { shouldValidate: true }
                                                );
                                              }}
                                            />
                                            <Box
                                              mx="1"
                                              color="red"
                                              textAlign="left"
                                            >
                                              {
                                                errors?.client_list?.[index]
                                                  ?.post_reservation_billing_cycle
                                                  ?.message
                                              }
                                            </Box>
                                          </GridItem>

                                          {/* Post Reservation Storage charges */}

                                          <GridItem colSpan={3}>
                                            <Text textAlign="left">
                                              {" "}
                                              Post Reservation Storage charges
                                            </Text>{" "}
                                            <CustomInput
                                              name={`client_list.${index}.${formFieldsName.pwh_clients_details.client_list.post_reservation_storage_charges}`}
                                              placeholder="Post Reservation Storage charges"
                                              type="number"
                                              label=""
                                              style={{ w: "100%" }}
                                            />
                                            <Box
                                              mx="1"
                                              color="red"
                                              textAlign="left"
                                            >
                                              {
                                                errors?.client_list?.[index]
                                                  ?.post_reservation_storage_charges
                                                  ?.message
                                              }
                                            </Box>
                                          </GridItem>
                                        </GridItem>
                                      </>
                                    )}

                                    {/* ----------------- Add Remove button -----------  */}
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
                            ;
                          </Box>

                          {/* show client table start */}
                          {/* <TableContainer mt="4">
                            <Table variant="striped" colorScheme="teal">
                              <Thead>
                                <Tr>
                                  <Th>To convert</Th>
                                  <Th>into</Th>
                                  <Th isNumeric>multiply by</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr>
                                  <Td>inches</Td>
                                  <Td>millimetres (mm)</Td>
                                  <Td isNumeric>25.4</Td>
                                </Tr>
                                <Tr>
                                  <Td>feet</Td>
                                  <Td>centimetres (cm)</Td>
                                  <Td isNumeric>30.48</Td>
                                </Tr>
                                <Tr>
                                  <Td>yards</Td>
                                  <Td>metres (m)</Td>
                                  <Td isNumeric>0.91444</Td>
                                </Tr>
                              </Tbody>
                              <Tfoot>
                                <Tr>
                                  <Th>To convert</Th>
                                  <Th>into</Th>
                                  <Th isNumeric>multiply by</Th>
                                </Tr>
                              </Tfoot>
                            </Table>
                          </TableContainer> */}
                          {/* show client table end */}

                          <Box></Box>
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
                                      formFieldsName.pwh_clients_details
                                        .intention_letter
                                    }
                                    onChange={(e) => console.log(e)}
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
                                      formFieldsName.pwh_clients_details.remarks
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
                                saveAsDraftData("PWH_CLIENTS_DETAILS");
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

export default Pwh;

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

// ==========================================

// client_list: Yup.array().of(
//   Yup.object().shape({
//     client_type: Yup.string().required("Client type name is required"),
//     client_name: Yup.string().trim().required("Client name is required"),
//     mobile_number: Yup.string().trim().required("Mobile number is required"),
//     region: Yup.string().trim().required("Region is required"),
//     state: Yup.string().trim().required("State is required"),
//     zone: Yup.string().trim().required("Zone is required"),
//     district: Yup.string().trim().required("District is required"),
//     area: Yup.string().trim().required("Area is required"),
//     address: Yup.string().trim().required("Address is required"),

//     // Start dynamic fields when client_type === "Corporate"

//     dynamicFields: Yup.object().when("client_type", {
//       is: "Corporate",
//       then: Yup.object().shape({
//         storage_charges: Yup.number()
//           .nullable()
//           .required("Storage charges is required"),
//         reservation_qty: Yup.number()
//           .nullable()
//           .required("Reservation qty is required"),
//         reservation_start_date: Yup.date()
//           .nullable()
//           .required("Reservation start date is required")
//           .test("isValidDate", "Invalid reservation start date", (value) => {
//             return value instanceof Date && !isNaN(value);
//           }),
//         reservation_end_date: Yup.date()
//           .nullable()
//           .required("Reservation end date is required")
//           .test("isValidDate", "Invalid reservation end date", (value) => {
//             return value instanceof Date && !isNaN(value);
//           }),
//         reservation_period_month: Yup.number()
//           .nullable()
//           .required("Reservation period month is required"),
//         reservation_billing_cycle: Yup.string().required(
//           "Reservation billing cycle is required"
//         ),
//         post_reservation_billing_cycle: Yup.string().required(
//           "Post reservation billing cycle is required"
//         ),
//         post_reservation_storage_charges: Yup.number()
//           .nullable()
//           .required("Post reservation storage charges is required"),
//       }),
//       otherwise: Yup.object().shape({
//         // Define optional fields when client_type is not "Corporate"
//       }),
//     }),

//     // End dynamic fields when client_type === "Corporate"
//   })
// ),

// client_list: Yup.array().of(
//   Yup.object().shape({
//     client_type: Yup.string().trim().required("Client type name is required"),
//     client_name: Yup.string().trim().required("Client name is required"),
//     mobile_number: Yup.string().trim().required("Mobile number is required"),
//     region: Yup.string().trim().required("Region is required"),
//     state: Yup.string().trim().required("State is required"),
//     zone: Yup.string().trim().required("Zone is required"),
//     district: Yup.string().trim().required("District is required"),
//     area: Yup.string().trim().required("Area is required"),
//     address: Yup.string().trim().required("Address is required"),
//     // Start dynamic fields when client_type === "Corporate"
//     dynamicFields: Yup.object().when("client_type", {
//       is: "Corporate",
//       then: Yup.object().shape({
//         storage_charges: Yup.number()
//           .nullable()
//           .required("Storage charges is required"),
//         reservation_qty: Yup.number()
//           .nullable()
//           .required("Reservation qty is required"),
//         reservation_start_date: Yup.date()
//           .nullable()
//           .required("Reservation start date is required")
//           .test(
//             "isValidDate",
//             "Invalid reservation start date",
//             (value) => {
//               return value instanceof Date && !isNaN(value);
//             }
//           ),
//         reservation_end_date: Yup.date()
//           .nullable()
//           .required("Reservation end date is required")
//           .test("isValidDate", "Invalid reservation end date", (value) => {
//             return value instanceof Date && !isNaN(value);
//           }),
//         reservation_period_month: Yup.number()
//           .nullable()
//           .required("Reservation period month is required"),
//         reservation_billing_cycle: Yup.string().required(
//           "Reservation billing cycle is required"
//         ),
//         post_reservation_billing_cycle: Yup.string().required(
//           "Post reservation billing cycle is required"
//         ),
//         post_reservation_storage_charges: Yup.number()
//           .nullable()
//           .required("Post reservation storage charges is required"),
//       }),
//       otherwise: Yup.object().shape({
//         // Define optional fields when client_type is not "Corporate"
//       }),
//     }),
//     // End dynamic fields when client_type === "Corporate"
//   })
// ),
