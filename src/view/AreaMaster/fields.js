import * as yup from "yup";

const filterFields = [
  {
    Region: "district__substate__state__region__region_name",
    isActiveFilter: false,
    label: "Region",
    name: "district__substate__state__region__region_name",
    placeholder: "Region",
    type: "text",
  },
  {
    State: "district__substate__state__state_name",
    isActiveFilter: false,
    label: "State",
    name: "district__substate__state__state_name",
    placeholder: "State",
    type: "text",
  },
  {
    SUBSTATE: "district__substate__substate_name",
    isActiveFilter: false,
    label: "Sub State",
    name: "district__substate__substate_name",
    placeholder: "Sub State",
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
    "AREA NAME": "area_name",
    isActiveFilter: false,
    label: "Area",
    name: "area_name",
    placeholder: "Area",
    type: "text",
  },
  {
    "Earthquack zone": "earthquake_zone_type",
    isActiveFilter: false,
    label: "Earthquack zone",
    name: "earthquake_zone_type",
    placeholder: "Earthquack zone",
    type: "text",
  },

  {
    Block: "is_block",
    isActiveFilter: false,
    label: "Block",
    name: "is_block",
    placeholder: "Block",
    type: "select",
    multi: false,
    options: [
      {
        label: "Yes",
        value: "True",
      },
      {
        label: "No",
        value: "False",
      },
    ],
  },
  {
    "CREATION DATE": "created_at",
    isActiveFilter: false,
    label: "Creation Date",
    name: "creation_date",
    placeholder: "Creation Date",
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
  // {
  //   label: "Area",
  //   name: "area_name",
  //   placeholder: "Area name",
  //   type: "text",
  // },

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
  is_active: yup.string(),
  district: yup.string().trim().required(" "),
  is_block: yup.string(),
  earthquake_zone_type: yup.string().required(" "),
  region: yup.string().trim().required(" "),
  state: yup.string().trim().required(" "),
  area_name: yup.string().trim().required(" "), 
  substate: yup.string().trim().required(" "),
});

export { filterFields, addEditFormFields, schema };
