import * as yup from "yup";
const filterFields = [
  {
    "BRANCH NAME": "bank_branch",
    isActiveFilter: false,

    label: "Branch Name",
    name: "bank_branch",
    placeholder: "Branch Name",
    type: "text",
  },
  {
    "Bank CM Location Name": "bank_cm_location_name",
    isActiveFilter: false,

    label: "Branch Cm Location Name",
    name: "bank_cm_location_name",
    placeholder: "Bank Cm Location Name",
    type: "text",
  },
  {
    "CM Charges": "cm_charges",
    isActiveFilter: false,

    label: "CM Charges",
    name: "cm_charges",
    placeholder: "CM Charges",
    type: "number",
  },

  {
    "Fix Charges": "fix_charges",
    isActiveFilter: false,

    label: "Fix Charges",
    name: "fix_charges",
    placeholder: "Fix Charges",
    type: "number",
  },
  {
    "Minimum Commitment": "minimum_commitment",
    isActiveFilter: false,

    label: "Minimum Commitment",
    name: "minimum_commitment",
    placeholder: "Minimum Commitment",
    type: "text",
  },
  {
    "Creation Date": "created_at",
    isActiveFilter: false,
    label: "Creation Date",
    name: "creation_date",
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
    name: "bank_branch",
    label: "Branch Name",
    placeholder: "Branch Name",
    type: "text",
  },
  {
    name: "bank_cm_location_name",
    label: "Branch Cm Location Name",
    placeholder: "Branch Cm Location Name",
    type: "text",
  },
  {
    name: "cm_charges",
    label: "CM Charges",
    placeholder: "CM Charges",
    type: "number",
  },
  {
    name: "fix_charges",
    label: "Fix Charges",
    placeholder: "Fix Charges",
    type: "number",
  },
  {
    name: "minimum_commitment",
    label: "Minimum Commitment",
    placeholder: "Minimum Commitment",
    type: "text",
  },

  {
    label: "Active",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  bank_branch: yup.string().trim().required("Branch Name Is Required"),
  bank_cm_location_name: yup
    .string()
    .trim()
    .required("Branch Location Name Is Required"),
  cm_charges: yup.number().required("Cm charges is required"),
  fix_charges: yup.number().required("Fix charges is required"),
  minimum_commitment: yup
    .string()
    .trim()
    .required("Minimum commitment is required"),
  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
