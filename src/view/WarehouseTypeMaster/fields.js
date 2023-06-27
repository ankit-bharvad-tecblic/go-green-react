import * as yup from "yup";

const filterFields = [
  {
    "WAREHOUSE TYPE NAME": "warehouse_type_name",
    isActiveFilter: false,

    label: "WAREHOUSE TYPE NAME",
    name: "warehouse_type_name",
    placeholder: "WAREHOUSE TYPE NAME",
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
  // {
  //   "MINIMUM BAG SIZE": "minimum_bag_size",
  //   isActiveFilter: false,
  // },
  // {
  //   "MAXIMUM BAG SIZE": "maximum_bag_size",
  //   isActiveFilter: false,
  // },
  // {
  //   "RENT ON BAG M/T": "rent_on_bag",
  //   isActiveFilter: false,
  // },
];

const addEditFormFields = [
  {
    name: "warehouse_type_name",
    label: "Warehouse Type Name",
    placeholder: "Warehouse Type Name",
    type: "text",
  },
  {
    name: "description",
    label: "description",
    placeholder: "description",
    type: "text",
  },

  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  warehouse_type_name: yup.string().required("WareHouse type name is required"),
  description: yup.string().required("description is required"),
  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
