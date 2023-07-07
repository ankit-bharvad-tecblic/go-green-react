import * as yup from "yup";

const filterFields = [
  {
    "REGION NAME": "region_name",
    isActiveFilter: false,
    label: "Region",
    name: "region_name",
    placeholder: "Region",
    type: "text",
  },
  // {
  //   "CREATION DATE ": "created_at",
  //   isActiveFilter: false,
  //   label: "Creation Date ",
  //   name: "created_at",
  //   placeholder: "Creation Date ",
  //   type: "date-from-to",
  //   max: new Date().toISOString().split("T")[0],
  // },
  {
    "CREATION DATE ": "created_at",
    isActiveFilter: false,
    label: "Creation Date ", 
    name: "created_at",
    placeholder: "Creation Date ",
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
    "LAST UPDATED ACTIVE": "is_active",
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
    label: "Region Name",
    name: "region_name",
    placeholder: "Region Name",
    type: "text",
  },
  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  is_active: yup.string(),
  region_name: yup.string().trim().required("Region name is required"),
});

export { filterFields, addEditFormFields, schema };
