import * as yup from "yup";

const filterFields = [
  {
    "Bank Name": "bank_name",
    isActiveFilter: false,

    label: "Bank Name",
    name: "bank_name",
    placeholder: "Bank Name",
    type: "text",
  },
  {
    "Region ": "region__region_name",
    isActiveFilter: false,

    label: "Region ",
    name: "region__region_name",
    placeholder: "Region",
    type: "text",
  },
  {
    State: "state__state_name",
    isActiveFilter: false,

    label: "State",
    name: "state__state_name",
    placeholder: "State ",
    type: "text",
  },

  {
    " Bank Address": "bank_address",
    isActiveFilter: false,

    label: " Bank Address",
    name: "bank_address",
    placeholder: " Bank Address",
    type: "text",
  },
  {
    " sector": "sector",
    isActiveFilter: false,

    label: "Sector",
    name: "bank_address",
    placeholder: " Sector",
    type: "text",
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
    name: "bank_name",
    label: "Bank Name",
    placeholder: "Bank Name",
    type: "text",
  },
  // {
  //   name: "region",
  //   label: "Region ",
  //   placeholder: "Region ",
  //   type: "select",
  // },
  // {
  //   name: "state",
  //   label: "State NAME",
  //   placeholder: "State NAME",
  //   type: "select",
  // },
  // {
  //   name: "bank_address",
  //   label: " Bank Address",
  //   placeholder: " Bank Address",
  //   type: "text",
  // },
  // {
  //   label: "ACTIVE/DeActive",
  //   name: "active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  bank_name: yup.string().trim().required(""),
  region: yup.string().trim().required(""),
  state: yup.string().trim().required(""),
  bank_sector: yup.string().trim().required(""),
  bank_address: yup.string().min(20).max(300).required(""),
  is_active: yup.string(),
  cm_rate: yup.number(),
  agreement_start_date: yup.string(),
  agreement_end_date: yup.string(),
  agreement_path: yup.string(),
});

export { filterFields, addEditFormFields, schema };
