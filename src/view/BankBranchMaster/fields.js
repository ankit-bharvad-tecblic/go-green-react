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
    type: "text",
  },
  {
    Region: "region__region_name",
    isActiveFilter: false,

    label: "Region ",
    name: "region__region_name",
    placeholder: "Region ",
    type: "text",
  },
  {
    " State": "state__state_name",
    isActiveFilter: false,

    label: "State ",
    name: "state__state_name",
    placeholder: "State ",
    type: "text",
  },
  {
    "Discrict ": "district__district_name",
    isActiveFilter: false,

    label: "Discrict ",
    name: "district__district_name",
    placeholder: "Discrict ",
    type: "text",
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
    name: "is_active",
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
  branch_name: yup.string().trim().required(""),
  bank: yup.string().trim().required(""),
  region: yup.string().trim().required(""),
  state: yup.string().trim().required(""),
  substate: yup.string().trim().required(""),
  district: yup.string().trim().required(""),
  area: yup.string().trim().required(""),
  branch_address: yup.string().trim().required(""),
  pincode: yup.number().required(""),
  is_active: yup.string(),
  // commodity_type: yup.string().trim().required("Commodity type is required"),
  branch_contact_detail: yup.array().of(
    yup.object().shape({
      authorized_name: yup.string().trim().required(""),
      authorized_mobile_no: yup.string().trim().required(""),
      authorized_email_id: yup
        .string()
        .trim()
        .email("Invalid email")
        .required(""),
      signature_upload: yup.string().trim().required(""),
    })
  ),
});

export { filterFields, addEditFormFields, schema };
