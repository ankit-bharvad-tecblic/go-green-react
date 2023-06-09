import * as yup from "yup";

const filterFields = [
  {
    "PAGE NAME": "page_name",
    isActiveFilter: false,

    label: "Module Name",
    name: "page_name",
    placeholder: "Module Name",
    type: "text",
  },
  {
    DESCRIPTION: "description",
    isActiveFilter: false,

    label: "Description",
    name: "description",
    placeholder: "Description",
    type: "text",
  },
  {
    "CREATION DATE": "creation_date",
    isActiveFilter: false,

    label: "Creation Date",
    name: "creation_date",
    placeholder: "Creation Date",
    type: "date",
  },
  {
    "LAST UPDATED DATE": "last_updated_date",
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
    name: "page_name",
    label: "Module Name",
    placeholder: "Module Name",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Description",
    type: "text",
  },

  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  page_name: yup.string().trim().required(""),
  description: yup.string().trim().required(""),

  is_active: yup.string(),
});
export { filterFields, addEditFormFields, schema };
