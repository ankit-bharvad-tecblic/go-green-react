import * as yup from "yup";

const filterFields = [
  {
    "HSN CODE": "hsn_code",
    isActiveFilter: false,

    label: "HSN Code",
    name: "hsn_code",
    placeholder: "HSN Code",
    type: "number",
  },
  {
    "IGST Percentage": "igst_perc",
    isActiveFilter: false,

    label: "IGST Percentage",
    name: "igst_perc",
    placeholder: "IGST Percentage",
    type: "number",
  },
  {
    "SGST Percentage": "sgst_perc",
    isActiveFilter: false,

    label: "SGST Percentage",
    name: "sgst_perc",
    placeholder: "SGST Percentage",
    type: "number",
  },
  {
    "CGST Percentage": "cgst_perc",
    isActiveFilter: false,

    label: "CGST Percentage",
    name: "cgst_perc",
    placeholder: "CGST Percentage",
    type: "number",
  },

  {
    Description: "description",
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
  },
  {
    "LAST UPDATED DATE": "updated_at",
    isActiveFilter: false,
    label: "Last Updated Date",
    name: "updated_at",
    placeholder: "Last Updated Date",
    type: "date",
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
    name: "hsn_code",
    label: "HSN CODE",
    placeholder: "HSN CODE",
    type: "number",
  },
  {
    name: "igst_perc",
    label: "IGST Percentage",
    placeholder: "IGST Percentage",
    type: "number",
  },
  {
    name: "sgst_perc",
    label: "SGST Percentage",
    placeholder: "SGST Percentage",
    type: "number",
  },
  {
    name: "cgst_perc",
    label: "CGST Percentage",
    placeholder: "CGST Percentage",
    type: "number",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Description",
    type: "text",
  },
  {
    name: "is_active",
    label: "Active",
    placeholder: "Active",
    type: "switch",
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
  hsn_code: yup
    .number()
    .integer()
    .min(1000, "HSN code must be at least 4 digits")
    .max(99999999, "HSN code cannot exceed 8 digits")
    .required("HSN code is required"),
  igst_perc: yup.number().required("IGST percentage is required"),
  sgst_perc: yup.number().required("SGST percentage is required"),
  cgst_perc: yup.number().required("CGSt percentage is required"),
  description: yup.string().trim().required("Description is required"),
  is_active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
