import * as yup from "yup";
import validation from "../../utils/validation";

const filterFields = [
  {
    "USER NAME": "email",
    isActiveFilter: false,

    label: "USER NAME",
    name: "email",
    placeholder: "USER NAME",
    type: "text",
  },
  {
    "FULL NAME": "first_name",
    isActiveFilter: false,

    label: "FULL NAME",
    name: "first_name",
    placeholder: "FULL NAME",
    type: "text",
  },
  {
    "CONTACT NO": "phone",
    isActiveFilter: false,

    label: "CONTACT NO",
    name: "phone",
    placeholder: "CONTACT NO",
    type: "number",
  },
  {
    ROLE: "user_role",
    isActiveFilter: false,

    label: "ROLE",
    name: "user_role",
    placeholder: "ROLE",
    type: "number",
  },
  {
    "LAST LOGIN": "last_login",
    isActiveFilter: false,

    label: "LAST LOGIN",
    name: "last_login",
    placeholder: "LAST LOGIN",
    type: "date",
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
    "LAST UPDATED DATE": "updated_at",
    isActiveFilter: false,

    label: "LAST UPDATED DATE",
    name: "updated_at",
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
    name: "email",
    label: "USER EMAIL",
    placeholder: "USER EMAIL",
    type: "email",
  },
  {
    name: "first_name",
    label: "FULL NAME ",
    placeholder: "FULL NAME ",
    type: "text",
  },
  {
    name: "phone",
    label: "CONTACT NO",
    placeholder: "CONTACT NO",
    type: "text",
  },
  {
    name: "user_role",
    label: "ROLE",
    placeholder: "ROLE",
    type: "number",
  },
  {
    name: "last_login",
    label: "LAST LOGIN",
    placeholder: "LAST LOGIN",
    type: "date",
  },
  {
    label: "ACTIVE/DeActive",
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
  last_login: yup.date().required("last login is required"),
  active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
