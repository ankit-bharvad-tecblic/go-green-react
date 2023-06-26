import * as yup from "yup";

const filterFields = [
  {
    "DISTRICT NAME": "district_name",
    isActiveFilter: false,
    label: "DISTRICT NAME",
    name: "district_name",
    placeholder: "DISTRICT NAME",
    type: "text",
  },
  {
    "ZONE NAME": "zone__zone_name",
    isActiveFilter: false,
    label: "ZONE NAME",
    name: "zone__zone_name",
    placeholder: "ZONE NAME",
    type: "text",
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
    label: "DISTRICT NAME",
    name: "district_name",
    placeholder: "DISTRICT NAME",
    type: "text",
  },
  {
    label: "ZONE NAME",
    name: "zone",
    placeholder: "ZONE NAME",
    type: "text",
  },
  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  district_name: yup.string().required("District  is required"),
  active: yup.string(),
  zone: yup.string().required("Zone name  is required"),
});

export { filterFields, addEditFormFields, schema };
