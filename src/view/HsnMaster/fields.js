import * as yup from "yup";


const filterFields = [
  {
    "BANK NAME": "bank_name",
    isActiveFilter: false,

    label: "BANK NAME",
    name: "bank_name",
    placeholder: "BANK NAME",
    type: "text",
  },
  {
    "REGION NAME": "region__region_name",
    isActiveFilter: false,

    label: "REGION NAME",
    name: "region__region_name",
    placeholder: "REGION NAME",
    type: "text",
  },
  {
    "STATE NAME": "state__state_name",
    isActiveFilter: false,

    label: "STATE NAME",
    name: "state__state_name",
    placeholder: "STATE NAME",
    type: "text",
  },

  {
    "BANK ADDRESS": "bank_address",
    isActiveFilter: false,

    label: "BANK ADDRESS",
    name: "bank_address",
    placeholder: "BANK ADDRESS",
    type: "text",
  },
  {
    "CREATION DATE": "created_at",
    isActiveFilter: false,
    label: "CREATION DATE",
    name: "created_at",
    placeholder: "CREATION DATE",
    type: "date",
  },
  {
    "LAST UPDATED DATE": "last_updated_date",
    isActiveFilter: false,
    label: "LAST UPDATED DATE",
    name: "last_updated_date",
    placeholder: "LAST UPDATED DATE",
    type: "date",
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
  bank_name: yup.string().required("bank name is required"),
  region: yup.string().required("region is required"),
  state: yup.string().required("state is required"),
  bank_address: yup.string().required("bank address is required"),
  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
