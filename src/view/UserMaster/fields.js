import * as yup from "yup";
import validation from "../../utils/validation";

const filterFields = [
  {
    "FULL NAME": "employee_name",
    isActiveFilter: false,

    label: "Full Name",
    name: "employee_name",
    placeholder: "Full Name",
    type: "text",
  },
  {
    "CONTACT NO": "phone",
    isActiveFilter: false,

    label: "Contact No",
    name: "phone",
    placeholder: "Contact No",
    type: "text",
  },
  {
    Address: "Address",
    isActiveFilter: false,

    label: "Address",
    name: "",
    placeholder: "Address",
    type: "text",
  },
  // {
  //   region: "region",
  //   isActiveFilter: false,

  //   label: "Region ",
  //   name: "phone",
  //   placeholder: "Region",
  //   type: "select",
  // },
  // {
  //   state: "state",
  //   isActiveFilter: false,

  //   label: "State",
  //   name: "phone",
  //   placeholder: "State",
  //   type: "select",
  // },
  // {
  //   zone: "zone",
  //   isActiveFilter: false,

  //   label: "Zone",
  //   name: "phone",
  //   placeholder: "Zone",
  //   type: "select",
  // },
  // {
  //   district: "district",
  //   isActiveFilter: false,

  //   label: "District",
  //   name: "District",
  //   placeholder: "",
  //   type: "select",
  // },
  // {
  //   Area: "Area",
  //   isActiveFilter: false,

  //   label: "Area",
  //   name: "Area",
  //   placeholder: "",
  //   type: "select",
  // },

  {
    "Pin code": "",
    isActiveFilter: false,

    label: "Pin code",
    name: "Pin Code",
    placeholder: "",
    type: "number",
  },

  {
    Email: "email",
    isActiveFilter: false,

    label: "Email",
    name: "email",
    placeholder: "Email",
    type: "text",
  },

  {
    ROLE: "user_role__role_name",
    isActiveFilter: false,

    label: "Role",
    name: "user_role__role_name",
    placeholder: "Role",
    type: "select",
  },
  {
    ROLE: "reporting_manager",
    isActiveFilter: false,

    label: "Reporting Manager",
    name: "reporting_manager",
    placeholder: "Reporting Manager",
    type: "select",
  },
  // {
  //   "LAST NAME": "last_name",
  //   isActiveFilter: false,

  //   label: "LAST NAME",
  //   name: "last_name",
  //   placeholder: "LAST NAME",
  //   type: "text",
  // },

  // {
  //   "LAST LOGIN": "last_login",
  //   isActiveFilter: false,

  //   label: "LAST LOGIN",
  //   name: "last_login",
  //   placeholder: "LAST LOGIN",
  //   type: "date",
  // },
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
    name: "employee_name",
    label: "Full Name ",
    placeholder: "Full Name",
    type: "text",
  },
  {
    name: "phone",
    label: "Contact Number",
    placeholder: "Contact Number",
    type: "text",
  },
  // {
  //   name: "address",
  //   label: "Address",
  //   placeholder: "Address",
  //   type: "text",
  // },

  // {
  //   name: "",
  //   label: " Pin Code",
  //   placeholder: "Pin Code",
  //   type: "number",
  // },
  // {
  //   name: "",
  //   label: "Email",
  //   placeholder: "Email",
  //   type: "email",
  // },

  // {
  //   name: "user_role.role_name",
  //   label: "Role",
  //   placeholder: "Role",
  //   type: "text",
  // },
  // {
  //   name: "last_name",
  //   label: "LAST NAME",
  //   placeholder: "LAST NAME",
  //   type: "text",
  // },

  // {
  //   name: "last_login",
  //   label: "LAST LOGIN",
  //   placeholder: "LAST LOGIN",
  //   type: "date",
  // },

  // {
  //   label: "Active",
  //   name: "is_active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  email: yup.string().trim().required("Email is required"),
  employee_name: yup.string().trim().required("Employee name is required"),
  phone: yup
    .string()
    .trim()
    .matches(validation.phoneRegExp, "Contact number is not valid")
    .required("Contact number is required"),
  //user_role: yup.string().trim().required("role is required"),
  pin_code: yup.number().required("Pin number is required"),
  address: yup.string().trim().required("Address is required"),
  // last_login: yup.date().required("last login is required"),
  is_active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
