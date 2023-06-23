import * as yup from "yup";

const filterFields = [
  {
    "COMMODITY GRADE NAME": "commodity_grade",
    isActiveFilter: false,
    label: "COMMODITY GRADE NAME",
    name: "commodity_grade",
    placeholder: "COMMODITY GRADE NAME",
    type: "text",
  },
  {
    DESCRIPTION: "description",
    isActiveFilter: false,
    label: "DESCRIPTION",
    name: "description",
    placeholder: "DESCRIPTION",
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
    name: "created_at",
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
    label: "COMMODITY GRADE",
    name: "commodity_grade",
    placeholder: "COMMODITY GRADE",
    type: "text",
  },
  {
    label: "DESCRIPTION",
    name: "description",
    placeholder: "DESCRIPTION",
    type: "text",
  },
  {
    label: "ACTIVE/DeActive",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  description: yup.string().required("Description is required"),
  is_active: yup.string(),
  commodity_grade: yup.string().required("Commodity type is required"),
});

export { filterFields, addEditFormFields, schema };
