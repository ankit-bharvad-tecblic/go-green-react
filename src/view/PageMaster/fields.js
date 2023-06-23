import * as yup from "yup";

const filterFields = [
  {
    "PAGE NAME": "page_name",
    isActiveFilter: false,

    label: "PAGE NAME",
    name: "page_name",
    placeholder: "PAGE NAME",
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
    "CREATION DATE": "creation_date",
    isActiveFilter: false,

    label: "CREATION DATE",
    name: "creation_date",
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
  //   {
  //     name: "security_guard_name",
  //     label: "NAME",
  //     placeholder: "NAME",
  //     type: "text",
  //   },
  {
    name: "page_name",
    label: "PAGE NAME",
    placeholder: "PAGE NAME",
    type: "text",
  },
  {
    name: "description",
    label: "description",
    placeholder: "description",
    type: "text",
  },

  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  page_name: yup.string().required("Page name is required"),
  description: yup.string().required("description  is required"),

  active: yup.string(),
  commodity_type: yup.string().required("Commodity type is required"),
});
export { filterFields, addEditFormFields, schema };
