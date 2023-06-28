import * as yup from "yup";
import validation from "../../utils/validation";

const filterFields = [
  {
    "USER NAME": "email",
    isActiveFilter: false,

    label: "Email",
    name: "mail",
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
    ROLE: "user_role",
    isActiveFilter: false,

    label: "Role",
    name: "user_role",
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
  {
    PASSWORD: "password",
    isActiveFilter: false,

    label: "PASSWORD",
    name: "password",
    placeholder: "PASSWORD",
    type: "password",
  },

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
  },
  {
    "LAST UPDATED DATE": "updated_at",
    isActiveFilter: false,

    label: "Last Updated Date",
    name: "updated_at",
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
    name: "user_role",
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
    name: "active",
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
  password: yup.string().required("password is required"),
  // last_login: yup.date().required("last login is required"),
  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
