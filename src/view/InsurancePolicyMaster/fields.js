import * as yup from "yup";

const filterFields = [
  {
    "Insurance company": "insurance_company_name",
    isActiveFilter: false,

    label: "Insurance company",
    name: "insurance_company_name",
    placeholder: "Insurance company",
    type: "text",
  },
  {
    "Insurance policy number": "insurance_company_address",
    isActiveFilter: false,

    label: "Insurance policy number",
    name: "insurance_company_address",
    placeholder: "Insurance policy number",
    type: "text",
  },
  {
    "Insurance type": "Insurance type",
    isActiveFilter: false,

    label: "Insurance type",
    name: "is_active",
    placeholder: "Insurance type",
    type: "select",
    multi: false,
    options: [
      {
        label: "Fire",
        value: "True",
      },
      {
        label: "Burglary",
        value: "False",
      },
    ],
  },
  {
    "Insurance Policy Amount": "insurance_policy_amount",
    isActiveFilter: false,

    label: "Insurance Policy Amount",
    name: "insurance_policy_amount",
    placeholder: "Insurance Policy Amount",
    type: "text",
  },
  {
    "policy start date": "policy_start_date",
    isActiveFilter: false,

    label: "Policy start date",
    name: "policy_start_date",
    placeholder: "Policy start date",
    type: "date",
  },
  {
    "policy end date": "policy_end_date",
    isActiveFilter: false,

    label: "Policy end date",
    name: "policy_end_date",
    placeholder: "Policy end date",
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
  //     name: "insurance_company_name",
  //     label: "Insurance policy number",
  //     placeholder: "Insurance policy number",
  //     type: "text",
  //   },
  {
    name: "insurance_policy_amount",
    label: "Insurance Policy Amount",
    placeholder: "Insurance Policy Amount",
    type: "text",
  },
  {
    name: "policy_start_date",
    label: "Policy Start Date",
    placeholder: "Policy Start Date",
    type: "date",
  },
  {
    name: "policy_end_date",
    label: "Policy End Date",
    placeholder: "Policy End Date",
    type: "date",
  },
  //   {
  //     name: "maximum_bag_size",
  //     label: "MAXIMUM BAG SIZE",
  //     placeholder: "MAXIMUM BAG SIZE",
  //     type: "number",
  //   },
  //   {
  //     name: "rent_on_bag",
  //     label: "RENT ON BAG",
  //     placeholder: "RENT ON BAG",
  //     type: "number",
  //   },
  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
  //   {
  //     label: "COMMODITY TYPE",
  //     name: "commodity_type",
  //     placeholder: "COMMODITY TYPE",
  //     type: "select",
  //     multi: false,
  //     options: [],
  //   },
];

const schema = yup.object().shape({
  insurance_company_name: yup
    .string()
    .required("Insurance company name is required"),
  insurance_policy_number: yup
    .string()
    .required("Insurance policy number is required"),
  insurance_policy_amount: yup
    .string()
    .required("Insurance policy amount is required"),
  policy_start_date: yup.string().required("Start date is required"),
  policy_end_date: yup.string().required("End date is required"),
  insuranceType: yup.string().required("Insurance type  is required"),
  is_active: yup.string(),
  upload_policy_agreement: yup
    .string()
    .required("Upload policy agreement is required"),
});

export { filterFields, addEditFormFields, schema };
