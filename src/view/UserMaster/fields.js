import * as yup from "yup";
import validation from "../../utils/validation";

const filterFields = [
  {
    Email: "email",
    isActiveFilter: false,

    label: "Email", 
    name: "email",
    placeholder: "Email",
    type: "text",
  },
  {
    "FULL NAME": "first_name",
    isActiveFilter: false,

    label: "Full Name",
    name: "first_name",
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
    ROLE: "user_role__role_name",
    isActiveFilter: false,

    label: "Role",
    name: "user_role__role_name",
    placeholder: "Role",
    type: "text",
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
    name: "email",
    label: " Email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "first_name",
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
  {
    name: "user_role.role_name",
    label: "Role",
    placeholder: "Role",
    type: "text",
  },
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

  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  email: yup.string().required("email is required"),
  first_name: yup.string().required("first name is required"),
  phone: yup
    .string()
    .matches(validation.phoneRegExp, "Contact number is not valid")
    .required("Contact number is required"),
    user_role: yup.string().required("role is required"),
  // last_name: yup.string().required("last name is required"),

  // last_login: yup.date().required("last login is required"),
  is_active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
