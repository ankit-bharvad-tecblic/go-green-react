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
    Block: "is_block",
    isActiveFilter: false,
    label: "Block",
    name: "is_block",
    placeholder: "Block",
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
  {
    label: "Area",
    name: "area_name",
    placeholder: "Area name",
    type: "text",
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
  is_active: yup.string(),
  district: yup.string().required("District name is"),
  is_block: yup.string(),
  region: yup.string().required("Region name is required"),
  state: yup.string().required("State name is required"),
  area_name: yup.string().required("Area Name is required"),
  zone: yup.string().required("Zone name  is required"),
});

export { filterFields, addEditFormFields, schema };
