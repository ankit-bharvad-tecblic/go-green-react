import * as yup from "yup";
import { gstNumber, tinNumber } from "../../services/validation.service";

const filterFields = [
  {
    "REGION NAME": "region",
    isActiveFilter: false,
    label: "Region",
    name: "region",
    placeholder: "Region",
    type: "text",
  },
  {
    "STATE NAME": "state_name",
    isActiveFilter: false,
    label: "State ",
    name: "state_name",
    placeholder: "State",
    type: "text",
  },
  {
    "STATE CODE": "state_code",
    isActiveFilter: false,
    label: "State Code",
    name: "state_code",
    placeholder: "State Code",
    type: "text",
  },
  {
    "TIN NO": "tin_no",
    isActiveFilter: false,
    label: "Tin No",
    name: "tin_no",
    placeholder: "Tin No",
    type: "text",
  },
  {
    GSTN: "gstn",
    isActiveFilter: false,
    label: "GSTN",
    name: "gstn",
    placeholder: "GSTN",
    type: "text",
  },
  {
    "NAV CODE": "nav_code",
    isActiveFilter: false,
    label: "Nav Code",
    name: "nav_code",
    placeholder: "Nav Code",
    type: "number",
  },
  {
    "OFFICE ADDRESS": "state_india_office_addr",
    isActiveFilter: false,
    label: "Office Address",
    name: "state_india_office_addr",
    placeholder: "Office Address",
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
    "LAST UPDATED DATE": "updated_at",
    isActiveFilter: false,
    label: "Last Updated Date",
    name: "updated_at",
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
  {
    name: "state_name",
    label: "State Name",
    placeholder: "State Name",
    type: "text",
  },
  {
    name: "state_code",
    label: "State Code",
    placeholder: "State Code",
    type: "text",
  },
  {
    name: "tin_no",
    label: "TIN No",
    placeholder: "TIN No",
    type: "text",
  },
  {
    name: "gstn",
    label: "GSTN",
    placeholder: "GSTN",
    type: "text",
  },
  {
    name: "nav_code",
    label: "Nav Code",
    placeholder: "Nav Code",
    type: "number",
  },
  {
    name: "ho_overhead",
    label: "Ho Overhead",
    placeholder: "Ho Overhead",
    type: "number",
  },
  {
    name: "state_overhead",
    label: "State Overhead",
    placeholder: "State Overhead",
    type: "number",
  },

  {
    name: "state_india_office_addr",
    label: "Office Address",
    placeholder: "Office Address",
    type: "textArea",
  },
  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  state_name: yup.string().trim().required(""),
  state_code: yup.string().trim().max(2).required(""),
  tin_no: yup
    .string()
    .trim()
    .test("tinNumber", "Invalid TIN number", (value) => tinNumber(value))
    .required(""),
  gstn: yup
    .string()
    .uppercase()
    .trim()
    // .test("gst", "Invalid GST Number", (value) => gstNumber(value))
    .test("gst", "Invalid GST Number", (value) =>
      gstNumber(value.toUpperCase())
    )
    .required(""),

  nav_code: yup.string().trim().required(""),
  state_india_office_addr: yup.string().trim().required(""),
  is_active: yup.string(),
  state_overhead: yup.number().required(""),
  ho_overhead: yup.number().required(""),
  region: yup.string().trim().required(""),
});

export { filterFields, addEditFormFields, schema };
