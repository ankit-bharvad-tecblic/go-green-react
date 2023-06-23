import * as yup from "yup";

const filterFields = [
  {
    "company name": "insurance_company_name",
    isActiveFilter: false,

    label: "company name",
    name: "insurance_company_name",
    placeholder: "company name",
    type: "text",
  },
  {
    ADDRESS: "insurance_company_address",
    isActiveFilter: false,

    label: "ADDRESS",
    name: "insurance_company_address",
    placeholder: "ADDRESS",
    type: "text",
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
    name: "insurance_company_name",
    label: "company name",
    placeholder: "company name",
    type: "text",
  },
  {
    name: "insurance_company_address",
    label: "company address",
    placeholder: "company address",
    type: "text",
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
    label: "ACTIVE/DeActive",
    name: "active",
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
  insurance_company_name: yup.string().required("Company name is required"),
  insurance_company_address: yup.string().required("Address name  is required"),

  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
