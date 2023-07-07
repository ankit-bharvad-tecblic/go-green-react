import * as yup from "yup";
import validation from "../../utils/validation";

const filterFields = [
  {
    "Owner Name": "warehouse_owner_name",
    isActiveFilter: false,

    label: "Owner Name",
    name: "warehouse_owner_name",
    placeholder: "Owner Name",
    type: "text",
  },
  {
    "Owner ContactNo": "warehouse_owner_contact_no",
    isActiveFilter: false,

    label: "warehouse_owner_contact_no",
    name: "description",
    placeholder: "Owner ContactNo",
    type: "text",
  },
  {
    "Owner Address ": "warehouse_owner_address",
    isActiveFilter: false,

    label: "Owner Address",
    name: "warehouse_owner_address",
    placeholder: "Owner Address",
    type: "text",
  },
  {
    "Rent Amt": "rent_amount",
    isActiveFilter: false,

    label: "Rent Amt",
    name: "rent_amount",
    placeholder: "Rent Amt",
    type: "number",
  },
  {
    "Revenue Sharing Ratio": "revenue_sharing_ratio",
    isActiveFilter: false,

    label: "Revenue Sharing Ratio",
    name: "revenue_sharing_ratio",
    placeholder: "Revenue Sharing Ratio",
    type: "number",
  },
  //   {
  //     "LAST UPDATED ACTIVE": "ACTIVE",
  //     isActiveFilter: false,

  //     label: "Active",
  //     name: "is_active",
  //     placeholder: "Active",
  //     type: "select",
  //     multi: false,
  //     options: [
  //       {
  //         label: "ACTIVE",
  //         value: "True",
  //       },
  //       {
  //         label: "DeActive",
  //         value: "False",
  //       },
  //     ],
  //   },
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
  // {
  //   name: "hiring_proposal_id.id",
  //   label: "Hiring Proposal ID",
  //   placeholder: "Hiring Proposal ID",
  //   type: "select",
  // },
  {
    name: "warehouse_owner_name",
    label: "Owner Name",
    placeholder: "Owner Name",
    type: "text",
  },
  {
    name: "warehouse_owner_contact_no",
    label: "Owner ContactNo",
    placeholder: "Owner ContactNo",
    type: "text",
  },
  {
    name: "warehouse_owner_address",
    label: "Owner Address",
    placeholder: "Owner Address",
    type: "text",
  },
  {
    name: "rent_amount",
    label: "Rent Amt",
    placeholder: "Rent Amt",
    type: "number",
  },
  {
    name: "revenue_sharing_ratio",
    label: "Revenue Sharing Ratio",
    placeholder: "Revenue Sharing Ratio",
    type: "number",
  },

  //   {
  //     label: "Active",
  //     name: "is_active",
  //     type: "switch",
  //   },
];

const schema = yup.object().shape({
  // hiring_proposal_id: yup.string().trim().required("Hiring proposal id is required"),
  warehouse_owner_name: yup.string().trim().required("WareHouse owner name is required"),
  warehouse_owner_contact_no: yup
    .string()
    .trim()
    .matches(validation.phoneRegExp, "Contact number is not valid")
    .required("Contact number is required"),
  warehouse_owner_address: yup.string().trim().required("WareHouse owner address is required"),
  rent_amount: yup.number().required("Rent amount is required"),
  revenue_sharing_ratio: yup.number().required("Revenue sharing  is required"),
  //   is_active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
