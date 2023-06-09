import * as yup from "yup";

const filterFields = [
  {
    "Primary commodity type": "primary_comodity_key",
    isActiveFilter: false,
    label: "Primary Commodity ",
    name: "primary_comodity_key",
    placeholder: "Primary Commodity ",
    type: "select",
    multi: false,
    options: [
      {
        label: "Agriculture",
        value: "True",
      },
      {
        label: "NonAgriculture",
        value: "False",
      },
    ],
  },
  {
    "COMMODITY NAME": "commodity_type",
    isActiveFilter: false,
    label: "Commodity Type",
    name: "commodity_type",
    placeholder: "Commodity Type",
    type: "text",
  },
  {
    DESCRIPTION: "description",
    isActiveFilter: false,
    label: "Description",
    name: "description",
    placeholder: "Description",
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
  // {
  //   label: "Primary Commodity Type",
  //   name: "primary_comodity_key",
  //   type: "select",
  // },
  {
    label: "Commodity Type",
    name: "commodity_type",
    placeholder: "Commodity Type",
    type: "text",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Description",
    type: "text",
  },

  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  primary_commodity_name: yup.string().required(""),
  description: yup.string().trim().required(""),
  is_active: yup.string(),
  commodity_type: yup.string().trim().required(""),
});

export { filterFields, addEditFormFields, schema };
