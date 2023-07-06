import * as yup from "yup";

const filterFields = [
  {
    Region: "substate__state__region__region_name",
    isActiveFilter: false,
    label: "Region",
    name: "substate__state__region__region_name",
    placeholder: "Region",
    type: "text",
  },
  {
    State: "substate__state__state_name",
    isActiveFilter: false,
    label: "State",
    name: "substate__state__state_name",
    placeholder: "State",
    type: "text",
  },
  {
    "SUBSTATE NAME": "substate__substate_name",
    isActiveFilter: false,
    label: "Sub State",
    name: "substate__substate_name",
    placeholder: "Sub State",
    type: "text",
  },
  {
    "DISTRICT NAME": "district_name",
    isActiveFilter: false,
    label: "District",
    name: "district_name",
    placeholder: "District",
    type: "text",
  },
  {
    "CREATION DATE": "created_at",
    isActiveFilter: false,
    label: "Creation Date",
    name: "created_at",
    placeholder: "Creation Date",
    type: "date",
    max: new Date().toISOString().split("T")[0],
  },
  {
    "LAST UPDATED DATE": "updated_at",
    isActiveFilter: false,
    label: "Last Updated Date",
    name: "updated_at",
    placeholder: "Last Updated Date",
    type: "date",
    max: new Date().toISOString().split("T")[0],
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
    label: "District",
    name: "district_name",
    placeholder: "District",
    type: "text",
  },
  // {
  //   label: "Zone",
  //   name: "zone",
  //   placeholder: "Zone",
  //   type: "select",
  // },
  // {
  //   label: "Active",
  //   name: "active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  district_name: yup.string().required("District  is required"),
  region: yup.string().required("Region name is required"),
  state: yup.string().required("State name is required"),
  is_active: yup.string(),
  substate: yup.string().required("Sub State name  is required"),
});

export { filterFields, addEditFormFields, schema };
