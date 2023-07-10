import * as yup from "yup";

const filterFields = [
  {
    "Commodity Type": "commodity_id.commodity_type",
    isActiveFilter: false,

    label: "Commodity Type",
    name: "commodity_id.commodity_type",
    placeholder: "Commodity Type",
    type: "text",
  },
  {
    "Commodity Id": "commodity_id.commodity_name",
    isActiveFilter: false,

    label: "Commodity NAME",
    name: "commodity_id.commodity_name",
    placeholder: "Commodity Name",
    type: "text",
  },
  {
    "Bag Size": "bag_size",
    isActiveFilter: false,

    label: "Bag Size",
    name: "bag_size",
    placeholder: "Bag Size",
    type: "number",
  },
  {
    "Tolerance size": "Tolerance size",
    isActiveFilter: false,

    label: "Tolerance size",
    name: "tolerance_size",
    placeholder: "Tolerance size",
    type: "number",
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
    label: "Commodity Name",
    name: "commodity_id",
    placeholder: "Commodity Name",
    type: "select",
  },
  {
    label: "Bag Size",
    name: "bag_size",
    placeholder: "Bag Size",
    type: "number",
  },
  {
    label: "Tolerance size",
    name: "tolerance_size",
    placeholder: "Tolerance size",
    type: "number",
  },
  {
    label: "Space / bag / sq. ft",
    name: "space",
    placeholder: "Space / bag / sq. ft",
    type: "number",
  },
  {
    label: "Stack height",
    name: "stack_height",
    placeholder: "Stack height",
    type: "number",
  },

  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  commodity_type: yup.string().trim().required("Commodity type is required"),
  commodity_id: yup.string().trim().required("Commodity name is required "),
  bag_size: yup.number().required("Bag size is required"),
  space: yup.number().required("Space/bag/sq.ft is required"),
  stack_height: yup.number().required("Stack height is required"),
  is_active: yup.string(),
  tolerance_size: yup.number().required("Tolerance size is required"),
});

export { filterFields, addEditFormFields, schema };
