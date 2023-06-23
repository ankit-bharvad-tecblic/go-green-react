import * as yup from "yup";

const filterFields = [
  {
    "COMMODITY NAME": "commodity_name",
    isActiveFilter: false,
    label: "COMMODITY NAME",
    name: "commodity_name",
    placeholder: "COMMODITY NAME",
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
    placeholder: "Active / DeActive",
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
    name: "commodity_name",
    label: "COMMODITY NAME",
    placeholder: "COMMODITY NAME",
    type: "text",
  },
  {
    name: "minimum_bag_size",
    label: "MINIMUM BAG SIZE",
    placeholder: "MINIMUM BAG SIZE",
    type: "number",
  },
  {
    name: "maximum_bag_size",
    label: "MAXIMUM BAG SIZE",
    placeholder: "MAXIMUM BAG SIZE",
    type: "number",
  },
  {
    name: "rent_on_bag",
    label: "RENT ON BAG",
    placeholder: "RENT ON BAG",
    type: "number",
  },
  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
  {
    label: "COMMODITY TYPE",
    name: "commodity_type",
    placeholder: "COMMODITY TYPE",
    type: "select",
    multi: false,
    options: [],
  },
];

const schema = yup.object().shape({
  commodity_name: yup.string().required("Commodity name is required"),
  minimum_bag_size: yup.number().required("Minimum bag size is required"),
  maximum_bag_size: yup.string().required("Maximum bag size is required"),
  rent_on_bag: yup.string().required("Rent on bag is required"),
  active: yup.string(),
  commodity_type: yup.string().required("Commodity type is required"),
});

export { filterFields, addEditFormFields, schema };
