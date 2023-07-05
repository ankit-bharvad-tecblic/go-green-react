import * as yup from "yup";
import { gstNumber, tinNumber } from "../../services/validation.service";

const filterFields = [
  {
    "STATE NAME": "state_name",
    isActiveFilter: false,
    label: "State ",
    name: "state_name",
    placeholder: "State",
    type: "text",
  },
  {
    "REGION NAME": "region.region_name",
    isActiveFilter: false,
    label: "Region",
    name: "region.region_name",
    placeholder: "Region",
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
  {
    name: "state_name",
    label: "State Name",
    placeholder: "State Name",
    type: "text",
  },
  {
    label: "Region Name",
    name: "region",
    placeholder: "Region Name",
    type: "select",
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
  state_name: yup.string().required("State name is required"),
  state_code: yup.string().max(2).required("State code is required"),
  tin_no: yup
    .string()
    .test("tinNumber", "Invalid TIN number", (value) => tinNumber(value))
    .required("TIN number is required"),
  gstn: yup
    .string()
    .test("gst", "Invalid GST Number", (value) => gstNumber(value))
    .required("Invalid GSTN number"),

  nav_code: yup.string().required("Nav code is required"),
  state_india_office_addr: yup.string().required("Office address is required"),
  is_active: yup.string(),
  state_overhead: yup.number().required("State overhead is required"),
  ho_overhead: yup.number().required("HO overhead is required"),
  region: yup.string().required("Region is required"),
});

export { filterFields, addEditFormFields, schema };
