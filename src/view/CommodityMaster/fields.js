import * as yup from "yup";

const filterFields = [
  {
    "COMMODITY NAME": "commodity_name",
    isActiveFilter: false,
    label: "Commodity Name",
    name: "commodity_name",
    placeholder: "Commodity Name",
    type: "text",
  },
  {
    "CREATION DATE": "created_at",
    isActiveFilter: false,

    label: "Creation Date",
    name: "created_at",
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
    name: "active",
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
    name: "commodity_name",
    label: "Commodity Name",
    placeholder: "Commodity Name",
    type: "text",
  },
  {
    name: "minimum_bag_size",
    label: "Minimum Bag Size",
    placeholder: "Minimum Bag Size",
    type: "number",
  },
  {
    name: "maximum_bag_size",
    label: "Maximum Bag Size",
    placeholder: "Maximum Bag Size",
    type: "number",
  },
  {
    name: "rent_on_bag",
    label: "Rent On Bag",
    placeholder: "Rent On Bag",
    type: "number",
  },
  // {
  //   label: "Active",
  //   name: "active",
  //   type: "switch",
  // },
  {
    label: "Commodity Type",
    name: "commodity_type",
    placeholder: "Commodity Type",
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
  is_active: yup.string(),
  commodity_type: yup.string().required("Commodity type is required"),
});

export { filterFields, addEditFormFields, schema };
