import * as yup from "yup";
import validation from "../../utils/validation";
const filterFields = [
  {
    NAME: "security_agency_name",
    isActiveFilter: false,

    label: "NAME",
    name: "security_agency_name",
    placeholder: "NAME",
    type: "text",
  },
  {
    NAME: "region__region_name",
    isActiveFilter: false,

    label: "REGION NAME",
    name: "region__region_name",
    placeholder: "REGION NAME",
    type: "text",
  },
  {
    NAME: "state__state_name",
    isActiveFilter: false,

    label: "STATE NAME",
    name: "state__state_name",
    placeholder: "STATE NAME",
    type: "text",
  },
  {
    NAME: "district__district_name",
    isActiveFilter: false,

    label: "DISTRICT NAME",
    name: "district__district_name",
    placeholder: "DISTRICT NAME",
    type: "text",
  },
  {
    NAME: "area__area_name",
    isActiveFilter: false,

    label: "AREA NAME",
    name: "area__area_name",
    placeholder: "AREA NAME",
    type: "text",
  },
  {
    NAME: "address",
    isActiveFilter: false,

    label: "ADDRESS",
    name: "address",
    placeholder: "ADDRESS",
    type: "text",
  },
  {
    NAME: "pincode",
    isActiveFilter: false,

    label: "PINCODE",
    name: "pincode",
    placeholder: "PINCODE",
    type: "number",
  },
  {
    NAME: "contact_no",
    isActiveFilter: false,

    label: "CONTACT NO.",
    name: "contact_no",
    placeholder: "CONTACT NO.",
    type: "number",
  },
  {
    NAME: "agency_contract_start_date",
    isActiveFilter: false,

    label: "CONTRACT START DATE",
    name: "agency_contract_start_date",
    placeholder: "CONTRACT START DATE",
    type: "date",
  },
  {
    NAME: "agency_contract_duration",
    isActiveFilter: false,

    label: "CONTRACT DURATION",
    name: "agency_contract_duration",
    placeholder: "CONTRACT DURATION",
    type: "text",
  },
  {
    NAME: "service_cost",
    isActiveFilter: false,

    label: "SERVICE COST",
    name: "service_cost",
    placeholder: "SERVICE COST",
    type: "number",
  },
  {
    NAME: "remarks",
    isActiveFilter: false,

    label: "REMARKS",
    name: "remarks",
    placeholder: "REMARKS",
    type: "text",
  },
  {
    "LAST UPDATED ACTIVE": "ACTIVE",
    isActiveFilter: false,

    label: "ACTIVE/DeActive",
    name: "active",
    placeholder: "Active/DeActive",
    type: "select",
    multi: false,
    options: [
      {
        label: "ACTIVE",
        value: "True",
      },
      {
        label: "DeActive",
        value: "False",
      },
    ],
  },
  {
    DESCRIPTION: "description",
    isActiveFilter: false,
  },
];
const addEditFormFields = [
  {
    name: "security_agency_name",
    label: "NAME",
    placeholder: "NAME",
    type: "text",
  },
  {
    name: "region__region_name",
    label: "REGION NAME",
    placeholder: "REGION NAME",
    type: "text",
  },
  {
    name: "state__state_name",
    label: "STATE NAME",
    placeholder: "STATE NAME",
    type: "text",
  },
  {
    name: "district__district_name",
    label: "DISTRICT NAME",
    placeholder: "DISTRICT NAME",
    type: "text",
  },
  {
    name: "area__area_name",
    label: "AREA NAME",
    placeholder: "AREA NAME",
    type: "text",
  },
  {
    name: "address",
    label: "ADDRESS",
    placeholder: "ADDRESS",
    type: "text",
  },
  {
    name: "pincode",
    label: "PINCODE",
    placeholder: "PINCODE",
    type: "number",
  },
  {
    name: "contact_no",
    label: "CONTACT NO.",
    placeholder: "CONTACT NO.",
    type: "text",
  },
  {
    name: "service_cost",
    label: "SERVICE COST",
    placeholder: "SERVICE COST",
    type: "number",
  },
  {
    name: "remarks",
    label: "REMARKS",
    placeholder: "REMARKS",
    type: "text",
  },

  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
  // {
  //   label: "COMMODITY TYPE",
  //   name: "commodity_type",
  //   placeholder: "COMMODITY TYPE",
  //   type: "select",
  //   multi: false,
  //   options: [],
  // },
];

const schema = yup.object().shape({
  security_agency_name: yup
    .string()
    .required("Security Agency name is required"),
  region__region_name: yup.string().required("Region name  is required"),
  state__state_name: yup.string().required("State name  is required"),
  district__district_name: yup.string().required("District name  is required"),
  area__area_name: yup.string().required("Area name  is required"),
  address: yup.string().required("Address name  is required"),
  pincode: yup.number().required("pincode   is required"),
  contact_no: yup
    .string()
    .matches(validation.phoneRegExp, "Contact number is not valid")
    .required("Contact number is required"),
  service_cost: yup.number().required("service_cost  is required"),
  remarks: yup.string().required("remarks is required"),
  active: yup.string(),
  commodity_type: yup.string().required("Commodity type is required"),
});

export { filterFields, addEditFormFields, schema };
