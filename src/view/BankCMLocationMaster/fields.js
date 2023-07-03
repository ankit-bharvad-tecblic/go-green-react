import * as yup from "yup";
const filterFields = [
  {
    "BRANCH NAME": "branch_name",
    isActiveFilter: false,

    label: "Branch Name",
    name: "branch_name",
    placeholder: "Branch Name",
    type: "text",
  },
  {
    "Bank CM Location Name": "region__region_name",
    isActiveFilter: false,

    label: "Branch Cm Location Name",
    name: "region__region_name",
    placeholder: "Bank Cm Location Name",
    type: "text",
  },
  {
    "CM Charges": "CM Charges",
    isActiveFilter: false,

    label: "CM Charges",
    name: "CM Charges",
    placeholder: "CM Charges",
    type: "number",
  },

  {
    "Fix Charges": "Fix Charges",
    isActiveFilter: false,

    label: "Fix Charges",
    name: "Fix Charges",
    placeholder: "Fix Charges",
    type: "number",
  },
  {
    "Minimum Commitment": "Minimum Commitment",
    isActiveFilter: false,

    label: "Minimum Commitment",
    name: "Minimum Commitment",
    placeholder: "Minimum Commitment",
    type: "number",
  },
  {
    "Creation Date": "created_at",
    isActiveFilter: false,
    label: "Creation Date",
    name: "created_at",
    placeholder: "Creation Date",
    type: "date",
  },
  {
    "Last Updated Date": "last_updated_date",
    isActiveFilter: false,
    label: "Last Updated Date",
    name: "last_updated_date",
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
  //   {
  //     name: "security_guard_name",
  //     label: "NAME",
  //     placeholder: "NAME",
  //     type: "text",
  //   },
  {
    name: "branch_name",
    label: "Branch Name",
    placeholder: "Branch Name",
    type: "text",
  },
  {
    name: "Branch Cm Location Name",
    label: "Branch Cm Location Name",
    placeholder: "Branch Cm Location Name",
    type: "text",
  },
  {
    name: "CM Charges",
    label: "CM Charges",
    placeholder: "CM Charges",
    type: "number",
  },
  {
    name: "Fix Charges",
    label: "Fix Charges",
    placeholder: "Fix Charges",
    type: "number",
  },
  {
    name: "Minimum Commitment",
    label: "Minimum Commitment",
    placeholder: "Minimum Commitment",
    type: "number",
  },

  {
    label: "Active",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  branch_name: yup.string().required("Branch Name Is Required"),
  Branch_Cm_Location_Name: yup
    .string()
    .required("Branch Location Name Is Required"),
  CM_Charges: yup.number().required("Cm charges is required"),
  Fix_Charges: yup.number().required("Fix charges is required"),
  Minimum_Commitment: yup.number().required("Minimum commitment is required"),
  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
