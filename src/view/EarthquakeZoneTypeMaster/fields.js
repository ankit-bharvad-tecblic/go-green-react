import * as yup from "yup";

const filterFields = [
  {
    "EARTH QUACK ZONE TYPE": "earthquake_zone_type",
    isActiveFilter: false,

    label: "EARTH QUACK ZONE TYPE",
    name: "earthquake_zone_type",
    placeholder: "EARTH QUACK ZONE TYPE",
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
    name: "earthquake_zone_type",
    label: "EARTH QUACK ZONE TYPE",
    placeholder: "EARTH QUACK ZONE TYPE",
    type: "text",
  },

  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  earthquake_zone_type: yup
    .string()
    .required("Earth quack zone type is required"),

  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
