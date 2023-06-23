import * as yup from "yup";

const filterFields = [
  {
    "BRANCH NAME": "branch_name",
    isActiveFilter: false,

    label: "BRANCH NAME",
    name: "branch_name",
    placeholder: "BRANCH NAME",
    type: "text",
  },
  {
    "BANK NAME": "bank.bank_name",
    isActiveFilter: false,

    label: "BANK NAME",
    name: "bank__bank_name",
    placeholder: "BANK NAME",
    type: "text",
  },
  {
    "REGION NAME": "region.region_name",
    isActiveFilter: false,

    label: "REGION NAME",
    name: "region.region_name",
    placeholder: "REGION NAME",
    type: "text",
  },
  {
    "STATE NAME": "state.state_name",
    isActiveFilter: false,

    label: "STATE NAME",
    name: "state__state_name",
    placeholder: "STATE NAME",
    type: "text",
  },
  {
    "DISTRICT NAME": "district.district_name",
    isActiveFilter: false,

    label: "DISTRICT NAME",
    name: "district.district_name",
    placeholder: "DISTRICT NAME",
    type: "text",
  },
  {
    ADDRESS: "branch_address",
    isActiveFilter: false,

    label: "ADDRESS",
    name: "branch_address",
    placeholder: "ADDRESS",
    type: "text",
  },
  {
    PINCODE: "pincode",
    isActiveFilter: false,

    label: "PINCODE ",
    name: "pincode",
    placeholder: "PINCODE ",
    type: "number",
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
];

const addEditFormFields = [
  {
    name: "branch_name",
    label: "BRANCH NAME",
    placeholder: "BRANCH NAME",
    type: "text",
  },
  {
    name: "bank__bank_name",
    label: "BANK NAME",
    placeholder: "BANK NAME",
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
    name: "branch_address",
    label: "BRANCH ADDRESS",
    placeholder: "BRANCH ADDRESS",
    type: "text",
  },
  {
    name: "pincode",
    label: "PINCODE",
    placeholder: "PINCODE",
    type: "number",
  },
  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  }, 
];

const schema = yup.object().shape({
  branch_name: yup.string().required("Branch name is required"),
  bank_name: yup.number().required("Bank name is required"),
  region_name: yup.string().required("Region name size is required"),
  state_name: yup.string().required("State name is required"),
  district_name: yup.string().required("District name is required"),
  branch_address: yup.string().required("Branch address name is required"),
  pincode: yup.number().required("pincode is required"),
  active: yup.string(),
  commodity_type: yup.string().required("Commodity type is required"),
});

export { filterFields, addEditFormFields, schema };
