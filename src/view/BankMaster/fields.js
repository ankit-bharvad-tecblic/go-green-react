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
    name: "statestate_name",
    label: "STATE NAME",
    placeholder: "STATE NAME",
    type: "text",
  },
  {
    name: "bank_address",
    label: "BANK ADDRESS",
    placeholder: "BANK ADDRESS",
    type: "text",
  },
  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  bank_name: yup.string().required("bank name is required"),
  region__region_name: yup.string().required("region name is required"),
  state__state_name: yup.string().required("state name  is required"),
  bank_address: yup.string().required("bank address is required"),
  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
