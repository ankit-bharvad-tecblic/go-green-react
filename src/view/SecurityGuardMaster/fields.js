import * as yup from "yup";
import validation from "../../utils/validation";

const filterFields = [
  {
    NAME: "security_guard_name",
    isActiveFilter: false,

    label: "NAME",
    name: "security_guard_name",
    placeholder: "NAME",
    type: "text",
  },
  {
    "REGION NAME": "region__region_name",
    isActiveFilter: false,

    label: "REGION NAME",
    name: "region__region_name",
    placeholder: "REGION NAME",
    type: "text",
  },
  {
    "STATE NAME": "state__state_name",
    isActiveFilter: false,

    label: "STATE NAME",
    name: "state__state_name",
    placeholder: "STATE NAME",
    type: "text",
  },
  {
    "DISTRICT NAME": "district__district_name",
    isActiveFilter: false,

    label: "DISTRICT NAME",
    name: "district__district_name",
    placeholder: "DISTRICT NAME",
    type: "text",
  },
  {
    ADDRESS: "address_of_security_guard",
    isActiveFilter: false,

    label: "ADDRESS",
    name: "security_agency_id__security_agency_name",
    placeholder: "ADDRESS",
    type: "text",
  },
  {
    AADHAR: "aadhar_of_security_guard",
    isActiveFilter: false,

    label: "AADHAR",
    name: "aadhar_of_security_guard",
    placeholder: "AADHAR",
    type: "text",
  },
  {
    "BIRTH DATE": "dob_of_security_guard",
    isActiveFilter: false,

    label: "BIRTH DATE",
    name: "dob_of_security_guard",
    placeholder: "BIRTH DATE",
    type: "text",
  },
  {
    "CONTACT NUMBER": "contact_number",
    isActiveFilter: false,

    label: "CONTACT NUMBER",
    name: "contact_number",
    placeholder: "CONTACT NUMBER",
    type: "number",
  },
  {
    "ALTERNATE CONTACT NUMBER": "alternate_contact_number",
    isActiveFilter: false,

    label: "ALTERNATE CONTACT NUMBER",
    name: "alternate_contact_number",
    placeholder: "ALTERNATE CONTACT NUMBER",
    type: "number",
  },
  {
    "EXPERIENCE AS SECURITY GUARD": "experience_as_security_guard",
    isActiveFilter: false,

    label: "EXPERIENCE AS SECURITY GUARD",
    name: "experience_as_security_guard",
    placeholder: "EXPERIENCE AS SECURITY GUARD",
    type: "number",
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
    DESCRIPTION: "description",
    isActiveFilter: false,
  },
];

const addEditFormFields = [
  //   {
  //     name: "security_guard_name",
  //     label: "NAME",
  //     placeholder: "NAME",
  //     type: "text",
  //   },
  {
    name: "security_guard_name",
    label: "NAME",
    placeholder: "NAME",
    type: "text",
  },
  {
    name: "region__region_name",
    label: "REGION NAME",
    placeholder: "REGION NAME",
    type: "text",
  },
  {
    name: "state__state_name",
    label: "STATE NAME",
    placeholder: "STATE NAME",
    type: "text",
  },
  {
    name: "district__district_name",
    label: "DISTRICT NAME",
    placeholder: "DISTRICT NAME",
    type: "text",
  },
  {
    name: "address_of_security_guard",
    label: "ADDRESS",
    placeholder: "ADDRESS",
    type: "text",
  },
  //   {
  //     name: "aadhar_of_security_guard",
  //     label: "AADHAR",
  //     placeholder: "AADHAR",
  //     type: "text",
  //   },
  {
    name: "dob_of_security_guard",
    label: "BIRTH DATE",
    placeholder: "BIRTH DATE",
    type: "date",
  },
  {
    name: "contact_number",
    label: "CONTACT NUMBER",
    placeholder: "CONTACT NUMBER",
    type: "text",
  },
  {
    name: "alternate_contact_number",
    label: "ALTERNATE CONTACT NUMBER",
    placeholder: "ALTERNATE CONTACT NUMBER",
    type: "text",
  },
  {
    name: "experience_as_security_guard",
    label: "EXPERIENCE AS SECURITY GUARD",
    placeholder: "EXPERIENCE AS SECURITY GUARD",
    type: "number",
  },
  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
  // {
  //   label: "COMMODITY TYPE",
  //   name: "commodity_type",
  //   placeholder: "COMMODITY TYPE",
  //   type: "select",
  //   multi: false,
  //   options: [],
  // },
];

const schema = yup.object().shape({
  security_guard_name: yup
    .string()
    .required("security Guard Name name is required"),
  region__region_name: yup.string().required("Region Name is required"),
  state__state_name: yup.string().required("State Name is required"),
  district__district_name: yup.string().required("District Name is required"),
  address_of_security_guard: yup.string().required("Address  is required"),

  dob_of_security_guard: yup.number().required(" Date of birth is required"),
  experience_as_security_guard: yup
    .number()
    .required("Experience As Security guard  is required"),
  alternate_contact_number: yup
    .string()
    .matches(validation.phoneRegExp, "Alternative contact number is not valid")
    .required("Alternative contact number is required"),
  contact_number: yup
    .string()
    .matches(validation.phoneRegExp, "Contact number is not valid")
    .required("Contact number is required"),
  active: yup.string(),
  commodity_type: yup.string().required("Commodity type is required"),
});

export { filterFields, addEditFormFields, schema };
