import * as yup from "yup";

const filterFields = [
  {
    "Commodity Name": "commodity_name",
    isActiveFilter: false,
    label: "Commodity Name",
    name: "commodity_name",
    placeholder: "Commodity Name",
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
  {
    name: "zone_name",
    label: "Zone Name",
    placeholder: "Zone Name",
    type: "text",
  },
  {
    name: "state",
    label: "State Name",
    placeholder: "State Name",
    type: "select",
  },
  // {
  //   label: "Active",
  //   name: "is_active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  zone_name: yup.string().required("Zone name is required"),
  state: yup.string().required("State name is required"),
  region: yup.string().required("Region name  is required"),
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
