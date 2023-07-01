import * as yup from "yup";
const filterFields = [
  {
    RoleName: "Role Name",
    isActiveFilter: false,

    label: "Role Name",
    name: "role_name",
    placeholder: "Role Name",
    type: "text",
  },
  {
    Description: "description",
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
  {
    name: "role_name",
    label: "Role Name",
    placeholder: "Role Name",
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
  role_name: yup.string().required("Role Name Is Required"),
  description: yup.string().required("Description"),
  active: yup.string(),
});
export { filterFields, addEditFormFields, schema };
