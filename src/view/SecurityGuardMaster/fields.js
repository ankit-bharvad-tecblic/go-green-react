import * as yup from "yup";
import validation from "../../utils/validation";

const filterFields = [
  {
    NAME: "security_agency_name",
    isActiveFilter: false,

    label: "Security Agency Name",
    name: "security_guard_name",
    placeholder: "Security Agency Name",
    type: "text",
  },
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
    "STATE NAME": "sub_state__state_name",
    isActiveFilter: false,

    label: "SubState Name",
    name: "sub_state__state_name",
    placeholder: "SubState Name",
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
    "AREA NAME": "area_name",
    isActiveFilter: false,

    label: "Area Name",
    name: "area_name",
    placeholder: "Area Name",
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
    "PIN CODE": "pincode",
    isActiveFilter: false,

    label: "Pin Code",
    name: "pincode",
    placeholder: "Pin Code",
    type: "number",
  },
  {
    AADHAR: "aadhar_of_security_guard",
    isActiveFilter: false,

    label: "Aadhar Care ID",
    name: "aadhar_of_security_guard",
    placeholder: "Aadhar Card ID",
    type: "text",
  },
  {
    "BIRTH DATE": "dob_of_security_guard",
    isActiveFilter: false,

    label: "Date Of Birth",
    name: "dob_of_security_guard",
    placeholder: "Date Of Birth",
    type: "date",
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
    "ON BOARDING DATE": "on_boarding_date",
    isActiveFilter: false,

    label: "On Boarding Date",
    name: "on_boarding_date",
    placeholder: "On Boarding Date",
    type: "date",
  },
  {
    "DE BOARDING DATE": "de_boarding_date",
    isActiveFilter: false,

    label: "De Boarding Date",
    name: "de_boarding_date",
    placeholder: "De Boarding Date",
    type: "date",
  },
  {
    "SHIFT AVAILABLE": "shift_available",
    isActiveFilter: false,

    label: "Shift Available",
    name: "shift_available",
    placeholder: "shift Available",
    type: "select",
    multi: false,
    options: [
      {
        label: "Day",
        value: "True",
      },
      {
        label: "Night",
        value: "False",
      },

      {
        label: "Both",
        value: "False",
      },
    ],
  },
  {
    "GUARD SALARY": "guard_salary",
    isActiveFilter: false,

    label: "Guard Salary",
    name: "guard_salary",
    placeholder: "Guard Salary",
    type: "number",
  },
  {
    "CREATION DATE": "creation_date",
    isActiveFilter: false,

    label: "Creation Date",
    name: "creation_date",
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
  // {
  //   DESCRIPTION: "description",
  //   isActiveFilter: false,
  // },
];

const addEditFormFields = [
  //   {
  //     name: "security_guard_name",
  //     label: "NAME",
  //     placeholder: "NAME",
  //     type: "text",
  //   },
  // {
  //   name: "security_guard_name",
  //   label: "Name",
  //   placeholder: "Name",
  //   type: "text",
  // },
  // {
  //   name: "region__region_name",
  //   label: "Region",
  //   placeholder: "Region",
  //   type: "text",
  // },
  // {
  //   name: "state__state_name",
  //   label: "State",
  //   placeholder: "State",
  //   type: "text",
  // },
  // {
  //   name: "district__district_name",
  //   label: "District",
  //   placeholder: "District",
  //   type: "text",
  // },
  {
    name: "address_of_security_guard",
    label: "Address",
    placeholder: "Address",
    type: "text",
  },
  {
    name: "pincode",
    label: "Pin Code",
    placeholder: "Pin Code",
    type: "number",
  },
  {
    name: "aadhar_of_security_guard",
    label: "Aadhar Card ID",
    placeholder: "Aadhar Card ID",
    type: "text",
  },
  {
    name: "dob_of_security_guard",
    label: "Date Of BIrth",
    placeholder: "Date Of Birth",
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
    name: "on_boarding_date",
    label: "On Boarding Date",
    placeholder: "On Boarding Date",
    type: "date",
  },
  {
    name: "de_boarding_date",
    label: "De Boarding Date",
    placeholder: "De Boarding Date",
    type: "date",
  },
  // {
  //   label: "Active",
  //   name: "is_active",
  //   type: "switch",
  // },
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
  security_agency_name: yup
    .string()
    .trim()
    .required("Security agency name is required"),
  security_guard_name: yup
    .string()
    .trim()
    .required("Security guard name is required"),
  region__region_name: yup.string().trim().required("Region Name is required"),
  state__state_name: yup.string().trim().required("State Name is required"),
  district__district_name: yup
    .string()
    .trim()
    .required("District Name is required"),
  sub_state__state_name: yup
    .string()
    .trim()
    .required("Sub state name is required"),
  pincode: yup.number().required("Pin code is required"),

  area: yup.string().trim().required("Area name is required"),
  address_of_security_guard: yup
    .string()
    .trim()
    .required("Address  is required"),
  aadhar_of_security_guard: yup
    .string()
    .trim()
    .required("Aadhar of security guard is requird"),
  on_boarding_date: yup.string().trim().required("Onboarding date is required"),
  de_boarding_date: yup
    .string()
    .trim()
    .required("De-boarding date is required"),
  shift: yup.string().trim().required("Shift available is required"),
  guard_salary: yup.string().trim().required("Guard salary is required"),
  dob_of_security_guard: yup.number().required(" Date of birth is required"),
  experience_as_security_guard: yup
    .number()
    .required("Experience As Security guard  is required"),
  alternate_contact_number: yup
    .string()
    .trim()
    .matches(validation.phoneRegExp, "Alternative contact number is not valid")
    .required("Alternative contact number is required"),
  contact_number: yup
    .string()
    .trim()
    .matches(validation.phoneRegExp, "Contact number is not valid")
    .required("Contact number is required"),
  is_active: yup.string(),
  commodity_type: yup.string().trim().required("Commodity type is required"),
});

export { filterFields, addEditFormFields, schema };
