import * as yup from "yup";

const filterFields = [
  {
    "EARTH QUACK ZONE TYPE": "earthquake_zone_type",
    isActiveFilter: false,

    label: "Earthquake Zone Type",
    name: "earthquake_zone_type",
    placeholder: "Earthquake Zone Type",
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
    name: "active",
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
    name: "earthquake_zone_type",
    label: "Earthquake Zone Type",
    placeholder: "Earthquake Zone Type",
    type: "text",
  },

  {
    label: "Active",
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
