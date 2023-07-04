import * as yup from "yup";

const filterFields = [
  {
    "Branch Name": "branch_name",
    isActiveFilter: false,

    label: "Branch Name",
    name: "branch_name",
    placeholder: "Branch Name",
    type: "text",
  },
  {
    "Bank ": "bank__bank_name",
    isActiveFilter: false,

    label: "Bank",
    name: "bank__bank_name",
    placeholder: "Bank ",
    type: "select",
  },
  {
    Region: "region__region_name",
    isActiveFilter: false,

    label: "Region ",
    name: "region__region_name",
    placeholder: "Region ",
    type: "select",
  },
  {
    " State": "state__state_name",
    isActiveFilter: false,

    label: "State ",
    name: "state__state_name",
    placeholder: "State ",
    type: "select",
  },
  {
    "Discrict ": "district__district_name",
    isActiveFilter: false,

    label: "Discrict ",
    name: "district__district_name",
    placeholder: "Discrict ",
    type: "select",
  },
  {
    Address: "branch_address",
    isActiveFilter: false,

    label: "Address",
    name: "branch_address",
    placeholder: "Address",
    type: "text",
  },
  {
    Pincode: "pincode",
    isActiveFilter: false,

    label: "Pincode ",
    name: "pincode",
    placeholder: "Pincode ",
    type: "number",
  },
  {
    "LAST UPDATED ACTIVE": "ACTIVE",
    isActiveFilter: false,

    label: "Active",
    name: "active",
    placeholder: "Active",
    type: "select",
    multi: false,
    options: [
      {
        label: "Active",
        value: "True",
      },
      {
        label: "DeActive",
        value: "False",
      },
    ],
  },
];

const addEditFormFields = [
  {
    name: "branch_name",
    label: "Branch Name",
    placeholder: "Branch Name",
    type: "text",
  },
  // {
  //   name: "bank",
  //   label: "Bank ",
  //   placeholder: "Bank ",
  //   type: "text",
  // },
  // {
  //   name: "region",
  //   label: "Region ",
  //   placeholder: " Region",
  //   type: "text",
  // },
  // {
  //   name: "state",
  //   label: "State ",
  //   placeholder: " State",
  //   type: "text",
  // },
  // {
  //   name: "district",
  //   label: "District",
  //   placeholder: "District",
  //   type: "text",
  // },
  // {
  //   name: "branch_address",
  //   label: "Address",
  //   placeholder: "Address",
  //   type: "text",
  // },
  // {
  //   name: "pincode",
  //   label: "Pincode",
  //   placeholder: "Pincode",
  //   type: "number",
  // },
  // {
  //   label: "Active",
  //   name: "is_active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  branch_name: yup.string().required("Branch name is required"),
  bank: yup.string().required("Bank is required"),
  region: yup.string().required("Region name is required"),
  state: yup.string().required("State name is required"),
  district: yup.string().required("District name is required"),
  branch_address: yup.string().required("Branch address name is required"),
  pincode: yup.number().required("Pincode is required"),
  active: yup.string(),
  // commodity_type: yup.string().required("Commodity type is required"),
});

export { filterFields, addEditFormFields, schema };
