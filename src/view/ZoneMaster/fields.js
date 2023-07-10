import * as yup from "yup";

const filterFields = [
  {
    " Region": "region__region_name",
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
    "Zone Name": "substate_name",
    isActiveFilter: false,
    label: "Sub State Name",
    name: "substate_name",
    placeholder: "Sub State Name",
    type: "text",
  },
  {
    "CREATION DATE": "created_at",
    isActiveFilter: false,

    label: "Creation Date",
    name: "created_at",
    placeholder: "Creation Date",
    type: "date",
    max: new Date().toISOString().split("T")[0],
  },
  {
    "LAST UPDATED DATE": "last_updated_date",
    isActiveFilter: false,
    label: "Last Updated Date",
    name: "last_updated_date",
    placeholder: "Last Updated Date",
    type: "date",
    max: new Date().toISOString().split("T")[0],
  },
  {
    "LAST UPDATED ACTIVE": "is_active",
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
  // {
  //   name: "state",
  //   label: "State Name",
  //   placeholder: "State Name",
  //   type: "select",
  // },
  {
    name: "substate_name",
    label: "Sub State Name",
    placeholder: "Sub State Name",
    type: "text",
  },
  // {
  //   label: "Active",
  //   name: "is_active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  substate_name: yup.string().trim().required("Zone name is required"),
  state: yup.string().trim().required("State name is required"),
  region: yup.string().trim().required("Region name  is required"),
  is_active: yup.string(),
});

const BreadcrumbLinks = [
  {
    pathLink: "/test",
    label: "Test ",
  },
  {
    pathLink: "/dd",
    label: "Test-one ",
  },
  {
    pathLink: "/teerest",
    label: "Test-two",
  },
];

export { filterFields, addEditFormFields, schema, BreadcrumbLinks };
