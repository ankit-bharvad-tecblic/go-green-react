import * as yup from "yup";

const filterFields = [
  {
    "AREA NAME": "area_name",
    isActiveFilter: false,
    label: "Area",
    name: "area_name",
    placeholder: "Area",
    type: "text",
  },
  {
    "DISTRICT NAME": "district__district_name",
    isActiveFilter: false,
    label: "District",
    name: "district__district_name",
    placeholder: "District",
    type: "text",
  },
  {
    "EARTHQUAKE ZONE TYPE ID": "earthquake_zone_type_id",
    isActiveFilter: false,
    label: "Earthquake Zone Type Id",
    name: "earthquake_zone_type_id",
    placeholder: "Earthquake Zone Type Id",
    type: "number",
  },
  {
    "IS BLOCK": "is_block",
    isActiveFilter: false,
    label: "IS BLOCK",
    name: "is_block",
    placeholder: "IS BLOCK",
    type: "select",
    multi: false,
    options: [
      {
        label: "ACTIVE",
        value: "True",
      },
      {
        label: "DEACTIVE",
        value: "False",
      },
    ],
  },
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
    label: "Area",
    name: "area_name",
    placeholder: "Area name",
    type: "text",
  },

  {
    label: "Earthquake Zone Type Id",
    name: "earthquake_zone_type_id",
    placeholder: "Earthquake Zone Type Id",
    type: "number",
  },
  // {
  //   label: "DISTRICT NAME",
  //   name: "district_name",
  //   placeholder: "DISTRICT NAME",
  //   type: "select",
  // },
  // {
  //   label: "Is Block",
  //   name: "is_block",
  //   type: "switch",
  // },
  // {
  //   label: "Active",
  //   name: "is_active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  earthquake_zone_type_id: yup
    .string()
    .required("Earthquake zone type id is required"),
  is_active: yup.string(),
  district: yup.string().required("District name is"),
  is_block: yup.string(),
  region: yup.string().required("Region name is required"),
  state: yup.string().required("State name is required"),
  area_name: yup.string().required("Area Name is required"),
  zone: yup.string().required("Zone name  is required"),
});

export { filterFields, addEditFormFields, schema };
