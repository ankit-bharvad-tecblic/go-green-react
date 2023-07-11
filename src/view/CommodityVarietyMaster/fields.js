import * as yup from "yup";

const filterFields = [
  {
    "COMMODITY VARIETY": "commodity_variety",
    isActiveFilter: false,
    label: "Commodity Variety",
    name: "commodity_variety",
    placeholder: "Commmodity Variety",
    type: "text",
  },
  {
    "COMMODITY NAME": "commodity_id__commodity_name",
    isActiveFilter: false,
    label: "Commodity Name",
    name: "commodity_id__commodity_name",
    placeholder: "Commmodity Name",
    type: "text",
  },
  {
    "COMMODITY TYPE": "commodity_type__commodity_type",
    isActiveFilter: false,
    label: "Commodity Type",
    name: "commodity_type__commodity_type",
    placeholder: "Commmodity Type",
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
    "HCN CODE": "hsn_code",
    isActiveFilter: false,
    label: "HSN Code",
    name: "hsn_code",
    placeholder: "HSN Code",
    type: "number",
  },
  {
    "FUMIGATION REQUIRED": "fumigation_required",
    isActiveFilter: false,
    label: "Fumigation Required",
    name: "fumigation_required",
    placeholder: "Fumigation Required",
    type: "select",
    multi: false,
    options: [
      {
        label: "Yes",
        value: "True",
      },
      {
        label: "No",
        value: "False",
      },
    ],
  },
  {
    "FUMIGATION DAYS": "fumigation_day",
    isActiveFilter: false,
    label: "Fumigation Days",
    name: "fumigation_day",
    placeholder: "Fumigation Day",
    type: "number",
  },
  {
    "LAB TESTING REQUIRED": "lab_testing_required",
    isActiveFilter: false,
    label: "Lab Testing Required",
    name: "active",
    placeholder: "Lab Testing Required",
    type: "select",
    multi: false,
    options: [
      {
        label: "Yes",
        value: "True",
      },
      {
        label: "No",
        value: "False",
      },
    ],
  },
  {
    "FINAL EXPIRY DATE": "fed",
    isActiveFilter: false,
    label: "Final Expiry Date",
    name: "fed",
    placeholder: "Final Expiry Date",
    type: "date",
    min: new Date().toISOString().split("T")[0],
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
    name: "created_at",
    placeholder: "Last Updated date",
    type: "date",
    max: new Date().toISOString().split("T")[0],
  },
  {
    Block: "is_block",
    isActiveFilter: false,
    label: "Block",
    name: "is_block",
    placeholder: "Block",
    type: "select",
    multi: false,
    options: [
      {
        label: "Yes",
        value: "True",
      },
      {
        label: "No",
        value: "False",
      },
    ],
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
  //   label: "Commodity Type",
  //   name: "commodity_type",
  //   placeholder: "Commodity Type",
  //   type: "select",
  // },
  // {
  //   label: "Commodity Name",
  //   name: "commodity_id",
  //   placeholder: "Commodity Name",
  //   type: "select",
  // },
  //  {
  //   label: "Commodity Variety",
  //   name: "commodity_variety",
  //   placeholder: "Commodity Variety",
  //   type: "text",
  // },
  //  {
  //   label: "Description",
  //   name: "description",
  //   placeholder: "Description",
  //   type: "text",
  // },
  // {
  //   label: "Final Expiry Date",
  //   name: "fed",
  //   placeholder: "Final Expiry Date",
  //   type: "date",
  //   min: new Date().toISOString().split("T")[0],
  // },
  // {
  //   label: "Fumigation Day",
  //   name: "fumigation_day",
  //   placeholder: "Fumigation Day",
  //   type: "number",
  // },
  // {
  //   label: "HSN Code",
  //   name: "hsn_code",
  //   placeholder: "HSN Code",
  //   type: "select",
  // },
  // {
  //   label: "Fumigation Required",
  //   name: "fumigation_required",
  //   type: "switch",
  // },
  // {
  //   label: " Block",
  //   name: "is_block",
  //   type: "switch",
  // },
  // {
  //   label: "Lab Testing Required",
  //   name: "lab_testing_required",
  //   type: "switch",
  // },
  // {
  //   label: "Active",
  //   name: "is_active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  commodity_variety: yup
    .string()
    .trim()
    .required("Commodity variety is required "),
  commodity_type: yup.string().trim().required("Commodity Type is required "),
  description: yup.string().trim().required("Description is required"),
  is_active: yup.string(),
  commodity_id: yup.string().trim().required("Commodity Name is required"),
  fed: yup.date().required("Final Expiry Date is required"),
  hsn_code: yup.number().required("HSN code is required"),
  fumigation_day: yup
    .number("Only numeric values are allowed for fumigation day")
    .required("Fumigation day is required"),
});

export { filterFields, addEditFormFields, schema };
