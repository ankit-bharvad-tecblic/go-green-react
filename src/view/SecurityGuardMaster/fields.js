import * as yup from "yup";
import validation from "../../utils/validation";

const filterFields = [
  {
    NAME: "security_guard_name",
    isActiveFilter: false,

    label: "Name",
    name: "security_guard_name",
    placeholder: "Name",
    type: "text",
  },
  {
    "REGION NAME": "region__region_name",
    isActiveFilter: false,

    label: "Region",
    name: "region__region_name",
    placeholder: "Region",
    type: "text",
  },
  {
    "STATE NAME": "state__state_name",
    isActiveFilter: false,

    label: "State",
    name: "state__state_name",
    placeholder: "State",
    type: "text",
  },
  {
    "DISTRICT NAME": "district__district_name",
    isActiveFilter: false,

    label: "District",
    name: "district__district_name",
    placeholder: "District",
    type: "text",
  },
  {
    ADDRESS: "address_of_security_guard",
    isActiveFilter: false,

    label: "Address",
    name: "security_agency_id__security_agency_name",
    placeholder: "Address",
    type: "text",
  },
  {
    AADHAR: "aadhar_of_security_guard",
    isActiveFilter: false,

    label: "Aadhar",
    name: "aadhar_of_security_guard",
    placeholder: "Aadhar",
    type: "text",
  },
  {
    "BIRTH DATE": "dob_of_security_guard",
    isActiveFilter: false,

    label: "Birth Date",
    name: "dob_of_security_guard",
    placeholder: "Birth Date",
    type: "text",
  },
  {
    "CONTACT NUMBER": "contact_number",
    isActiveFilter: false,

    label: "Contact Number",
    name: "contact_number",
    placeholder: "Contact Number",
    type: "number",
  },
  {
    "ALTERNATE CONTACT NUMBER": "alternate_contact_number",
    isActiveFilter: false,

    label: "Alternative Contact Number",
    name: "alternate_contact_number",
    placeholder: "Alternative Contact Number",
    type: "number",
  },
  {
    "EXPERIENCE AS SECURITY GUARD": "experience_as_security_guard",
    isActiveFilter: false,

    label: "Experience As Security Guard",
    name: "experience_as_security_guard",
    placeholder: "Experience As Security Guard",
    type: "number",
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
    label: "Name",
    placeholder: "Name",
    type: "text",
  },
  {
    name: "region__region_name",
    label: "Region",
    placeholder: "Region",
    type: "text",
  },
  {
    name: "state__state_name",
    label: "State",
    placeholder: "State",
    type: "text",
  },
  {
    name: "district__district_name",
    label: "District",
    placeholder: "District",
    type: "text",
  },
  {
    name: "address_of_security_guard",
    label: "Address",
    placeholder: "Address",
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
    label: "Birth Date",
    placeholder: "Birth Date",
    type: "date",
  },
  {
    name: "contact_number",
    label: "Contact Number",
    placeholder: "Contact Number",
    type: "text",
  },
  {
    name: "alternate_contact_number",
    label: "Alternate Contact",
    placeholder: "Alternate Contact",
    type: "text",
  },
  {
    name: "experience_as_security_guard",
    label: "Experience As Security Guard",
    placeholder: "Experience As Security Guard",
    type: "number",
  },
  {
    label: "Active",
    name: "is_active",
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
  is_active: yup.string(),
  commodity_type: yup.string().required("Commodity type is required"),
});

export { filterFields, addEditFormFields, schema };
