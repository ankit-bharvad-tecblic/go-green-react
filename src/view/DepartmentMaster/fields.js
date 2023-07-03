import * as yup from "yup";

const filterFields = [
  {
    "Department Name": "department_name",
    isActiveFilter: false,

    label: "Department Name",
    name: "department_name",
    placeholder: "Department Name",
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
