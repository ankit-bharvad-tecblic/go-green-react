import * as yup from "yup";

const filterFields = [
  {
    "WAREHOUSE SUB TYPE": "warehouse_subtype",
    isActiveFilter: false,

    label: "Warehouse Sub Type",
    name: "warehouse_subtype",
    placeholder: "Warehouse Sub Type",
    type: "text",
  },
  {
    DESCRIPTION: "description",
    isActiveFilter: false,

    label: "Description",
    name: "description",
    placeholder: "Description",
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
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  warehouse_subtype: yup.string().required("warehouse sub type is required"),
  description: yup.string().required("description is required"),
  is_active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
