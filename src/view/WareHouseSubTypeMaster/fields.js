import * as yup from "yup";

const filterFields = [
  {
    "WAREHOUSE SUB TYPE": "warehouse_subtype",
    isActiveFilter: false,

    label: "WAREHOUSE SUB TYPE",
    name: "warehouse_subtype",
    placeholder: "WAREHOUSE SUB TYPE",
    type: "text",
  },
  {
    DESCRIPTION: "description",
    isActiveFilter: false,

    label: "DESCRIPTION",
    name: "description",
    placeholder: "DESCRIPTION",
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
  {
    "MINIMUM BAG SIZE": "minimum_bag_size",
    isActiveFilter: false,
  },
  {
    "MAXIMUM BAG SIZE": "maximum_bag_size",
    isActiveFilter: false,
  },
  {
    "RENT ON BAG M/T": "rent_on_bag",
    isActiveFilter: false,
  },
];

const addEditFormFields = [
  {
    name: "warehouse_subtype",
    label: "Warehouse sub type",
    placeholder: "Warehouse sub type",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Description",
    type: "text",
  },

  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  warehouse_subtype: yup.string().required("warehouse sub type is required"),
  description: yup.string().required("description is required"),
  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
