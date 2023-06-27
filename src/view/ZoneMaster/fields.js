import * as yup from "yup";

const filterFields = [
  {
    "COMMODITY NAME": "commodity_name",
    isActiveFilter: false,
    label: "COMMODITY NAME",
    name: "commodity_name",
    placeholder: "COMMODITY NAME",
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
    placeholder: "Active / DeActive",
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
    name: "zone_name",
    label: "ZONE NAME",
    placeholder: "ZONE NAME",
    type: "text",
  },
  {
    name: "state",
    label: "STATE NAME",
    placeholder: "STATE NAME",
    type: "select",
  },
  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  zone_name: yup.string().required("Zone name is required"),
  state: yup.string().required("State name is required"),
  active: yup.string(),
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
