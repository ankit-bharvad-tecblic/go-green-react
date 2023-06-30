import * as yup from "yup";

const filterFields = [
  {
    " Full Name": "employee_full_name",
    isActiveFilter: false,

    label: " Full Name",
    name: "employee_full_name",
    placeholder: " Full Name",
    type: "text",
  },
  {
    "Mobile No": "contact_number",
    isActiveFilter: false,

    label: "Mobile No",
    name: "contact_number",
    placeholder: "Mobile No",
    type: "number",
  },
  {
    Region: "region_id.region_name",
    isActiveFilter: false,

    label: "Region ",
    name: "region_id.region_name",
    placeholder: "Region ",
    type: "text",
  },
  {
    "State ": "state_id.state_name",
    isActiveFilter: false,

    label: "State ",
    name: "state_id.state_name",
    placeholder: "State ",
    type: "text",
  },
  {
    "Zone ": "zone_id.zone_name",
    isActiveFilter: false,

    label: "Zone ",
    name: "zone_id.zone_name",
    placeholder: "Zone ",
    type: "text",
  },
  {
    "District ": "district_id.district_name",
    isActiveFilter: false,

    label: "District ",
    name: "district_id.district_name",
    placeholder: "District ",
    type: "text",
  },
  {
    "Role ": "role.role_name",
    isActiveFilter: false,

    label: "Role ",
    name: "role.role_name",
    placeholder: "Role ",
    type: "text",
  },
  {
    "Department ": "department.department_name",
    isActiveFilter: false,

    label: "Department ",
    name: "department.department_name",
    placeholder: "Department ",
    type: "text",
  },

  {
    Address: "address",
    isActiveFilter: false,

    label: "Address",
    name: "address",
    placeholder: "Address",
    type: "text",
  },

  {
    "Pin Code": "pin_code",
    isActiveFilter: false,

    label: "Pin Code",
    name: "pin_code",
    placeholder: "Pin Code",
    type: "number",
  },
  {
    "Email ": "email_id",
    isActiveFilter: false,

    label: "Email ",
    name: "email_id",
    placeholder: "Email ",
    type: "text",
  },

  {
    "Job Title": "job_title",
    isActiveFilter: false,

    label: "Job Title",
    name: "job_title",
    placeholder: "Job Title",
    type: "text",
  },
  {
    "Reporting Manager": "reporting_manager_id.email",
    isActiveFilter: false,

    label: "Reporting Manager ",
    name: "reporting_manager_id.email",
    placeholder: "Reporting Manager ",
    type: "text",
  },

  {
    "Last Update Active": "ACTIVE",
    isActiveFilter: false,

    label: "ACTIVE/DeActive",
    name: "is_active",
    placeholder: "Active/DeActive",
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
  // {
  //   label: " Full Name",
  //   name: "employee_full_name",
  //   placeholder: " Full Name",
  //   type: "text",
  // },
  // {
  //   label: "Mobile No",
  //   name: "contact_number",
  //   placeholder: "Mobile No",
  //   type: "number",
  // },
  // {
  //   label: "Region ",
  //   name: "region_id.region_name",
  //   placeholder: "Region ",
  //   type: "text",
  // },
  // {
  //   label: "State ",
  //   name: "state_id.state_name",
  //   placeholder: "State ",
  //   type: "number",
  // },
  // {
  //   label: "Zone ",
  //   name: "zone_id.zone_name",
  //   placeholder: "Zone ",
  //   type: "text",
  // },
  // {
  //   label: "District ",
  //   name: "district_id.district_name",
  //   placeholder: "District ",
  //   type: "text",
  // },
  // {
  //   label: "Role ",
  //   name: "role.role_name",
  //   placeholder: "Role ",
  //   type: "text",
  // },
  //
  // {
  //   label: "Address",
  //   name: "address",
  //   placeholder: "Address",
  //   type: "text",
  // },
  // {
  //   label: "Pin Code",
  //   name: "pin_code",
  //   placeholder: "Pin Code",
  //   type: "number",
  // },
  // {
  //   label: "Email",
  //   name: "email_id",
  //   placeholder: "Enter Username",
  //   type: "email",
  // },
  // {
  //   label: "Department ",
  //   name: "department.department_name",
  //   placeholder: "Department ",
  //   type: "text",
  // },
  // {
  //   label: "Job Title",
  //   name: "job_title",
  //   placeholder: "Job Title",
  //   type: "text",
  // },
  // {
  //   label: "Reporting Manager ",
  //   name: "reporting_manager_id.email",
  //   placeholder: "Reporting Manager ",
  //   type: "email",
  // },
  // {
  //   label: "Active/DeActive",
  //   name: "active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  employee_full_name: yup.string().required("employee full name is required"),
  contact_number: yup.string().required("contact number is required"),
  region_id: yup.string().required("region is required"),
  state_id: yup.string().required("state is required"),
  zone_id: yup.string().required("zone is required"),
  district_id: yup.string().required("district is required"),
  role__role_name: yup.string().required("role is required"),
  // department__department_name: yup.string().required("department is required"),
  address: yup.string().required("address is required"),
  pin_code: yup.number().required("pin code  is required"),
  email_id: yup.string().trim().email().required("email is required"),
  job_title: yup.string().required("job title is required"),
  reporting_manager_id__email: yup
    .string()
    .trim()
    .email()
    .required("reporting manager is required"),
  is_active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
