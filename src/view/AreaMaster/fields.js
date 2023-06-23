import * as yup from "yup";

const filterFields = [
  {
    "AREA NAME": "area_name",
    isActiveFilter: false,
    label: "AREA NAME",
    name: "area_name",
    placeholder: "AREA NAME",
    type: "text",
  },
  {
    "DISTRICT NAME": "district__district_name",
    isActiveFilter: false,
    label: "DISTRICT NAME",
    name: "district__district_name",
    placeholder: "DISTRICT NAME",
    type: "text",
  },
  {
    "EARTHQUAKE ZONE TYPE ID": "earthquake_zone_type_id",
    isActiveFilter: false,
    label: "EARTHQUAKE ZONE TYPE ID",
    name: "earthquake_zone_type_id",
    placeholder: "EARTHQUAKE ZONE TYPE ID",
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
    label: "CREATION DATE",
    name: "created_at",
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
  {
    label: "AREA NAME",
    name: "area_name",
    placeholder: "AREA NAME",
    type: "text",
  },
  {
    label: "EARTHQUAKE ZONE TYPE ID",
    name: "earthquake_zone_type_id",
    placeholder: "EARTHQUAKE ZONE TYPE ID",
    type: "number",
  },
  {
    label: "IS BLOCK",
    name: "is_block",
    type: "switch",
  },
  {
    label: "ACTIVE/DeActive",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  earthquake_zone_type_id: yup.string().required("Earthquake zone type id is required"),
  is_active: yup.string(),
  is_block: yup.string(),
  area_name: yup.string().required("Area Name is required"),
});

export { filterFields, addEditFormFields, schema };
