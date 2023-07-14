import * as yup from "yup";

const filterFields = [
  {
    "COMMODITY GRADE NAME": "commodity_grade_name",
    isActiveFilter: false,
    label: "Commodity Grade",
    name: "commodity_grade_name",
    placeholder: "Commodity Grade",
    type: "text",
  }, 
  // {
  //   DESCRIPTION: "description",
  //   isActiveFilter: false,
  //   label: "Description",
  //   name: "description",
  //   placeholder: "Description",
  //   type: "text",
  // },
  {
    "CREATION DATE": "created_at",
    isActiveFilter: false,
    label: "Creation Date",
    name: "created_at",
    placeholder: "Creation Date",
    type: "date",
  },
  {
    "LAST UPDATED DATE": "last_updated_date",
    isActiveFilter: false,
    label: "Last Updated Date",
    name: "created_at",
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
    label: "Commodity Grade",
    name: "commodity_grade_name",
    placeholder: "Commodity Grade",
    type: "text",
  },
  // {
  //   label: "Description",
  //   name: "description",
  //   placeholder: "Description",
  //   type: "text",
  // },
  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  // description: yup.string().trim().required("Description is required"),
  is_active: yup.string(),
  commodity_grade_name: yup
    .string()
    .trim()
    .required(""),
});

export { filterFields, addEditFormFields, schema };
