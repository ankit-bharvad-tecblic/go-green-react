import * as yup from "yup";

const filterFields = [
  {
    "STATE NAME": "state_name",
    isActiveFilter: false,
    label: "STATE NAME",
    name: "state_name",
    placeholder: "STATE NAME",
    type: "text",
  },
  {
    "REGION NAME": "region.region_name",
    isActiveFilter: false,
    label: "REGION NAME",
    name: "region.region_name",
    placeholder: "REGION NAME",
    type: "text",
  },
  {
    "STATE CODE": "state_code",
    isActiveFilter: false,
    label: "STATE CODE",
    name: "state_code",
    placeholder: "STATE CODE",
    type: "number",
  },
  {
    "TIN NO": "tin_no",
    isActiveFilter: false,
    label: "TIN NO",
    name: "tin_no",
    placeholder: "TIN NO",
    type: "number",
  },
  {
    GSTN: "gstn",
    isActiveFilter: false,
    label: "GSTN",
    name: "gstn",
    placeholder: "GSTN",
    type: "number",
  },
  {
    "NAV CODE": "nav_code",
    isActiveFilter: false,
    label: "NAV CODE",
    name: "nav_code",
    placeholder: "NAV CODE",
    type: "number",
  },
  {
    "OFFICE ADDRESS": "state_india_office_addr",
    isActiveFilter: false,
    label: "OFFICE ADDRESS",
    name: "state_india_office_addr",
    placeholder: "OFFICE ADDRESS",
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
    name: "state_name",
    label: "STATE NAME",
    placeholder: "STATE NAME",
    type: "text",
  },
  {
    label: "REGION NAME",
    name: "region",
    placeholder: "REGION NAME",
    type: "select",
  },
  {
    name: "state_code",
    label: "STATE CODE",
    placeholder: "STATE CODE",
    type: "number",
  },
  {
    name: "tin_no",
    label: "TIN NO",
    placeholder: "TIN NO",
    type: "number",
  },
  {
    name: "gstn",
    label: "GSTN",
    placeholder: "GSTN",
    type: "number",
  },
  {
    name: "nav_code",
    label: "NAV CODE",
    placeholder: "NAV CODE",
    type: "number",
  },
  {
    name: "ho_overhead",
    label: "hO OVERHEAD",
    placeholder: "hO OVERHEAD",
    type: "number",
  },
  {
    name: "state_overhead",
    label: "STATE OVERHEAD",
    placeholder: "STATE OVERHEAD",
    type: "number",
  },

  {
    name: "state_india_office_addr",
    label: "OFFICE ADDRESS",
    placeholder: "OFFICE ADDRESS",
    type: "textArea",
  },
  {
    label: "ACTIVE",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  state_name: yup.string().required("State name is required"),
  state_code: yup.string().required("State code is required"),
  tin_no: yup.string().required("Tin no is required"),
  gstn: yup.string().required("Gstn no is required"),
  nav_code: yup.string().required("Nav code is required"),
  state_india_office_addr: yup.string().required("Office address is required"),
  active: yup.string(),
  state_overhead: yup.number().required("state overhead is required"),
  ho_overhead: yup.number().required("ho overhead is required"),
  region: yup.string().required("region is required"),
});

export { filterFields, addEditFormFields, schema };
