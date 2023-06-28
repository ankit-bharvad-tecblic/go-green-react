import * as yup from "yup";
import validation from "../../utils/validation";
const filterFields = [
  {
    NAME: "security_agency_name",
    isActiveFilter: false,

    label: "Name",
    name: "security_agency_name",
    placeholder: "Name",
    type: "text",
  },
  {
    NAME: "region__region_name",
    isActiveFilter: false,

    label: "Region",
    name: "region__region_name",
    placeholder: "Region",
    type: "text",
  },
  {
    NAME: "state__state_name",
    isActiveFilter: false,

    label: "State",
    name: "state__state_name",
    placeholder: "State",
    type: "text",
  },
  {
    NAME: "district__district_name",
    isActiveFilter: false,

    label: "District",
    name: "district__district_name",
    placeholder: "District",
    type: "text",
  },
  {
    NAME: "area__area_name",
    isActiveFilter: false,

    label: "Area",
    name: "area__area_name",
    placeholder: "Area",
    type: "text",
  },
  {
    NAME: "address",
    isActiveFilter: false,

    label: "Address",
    name: "address",
    placeholder: "Address",
    type: "text",
  },
  {
    NAME: "pincode",
    isActiveFilter: false,

    label: "Pin Code",
    name: "pincode",
    placeholder: "Pin Code",
    type: "number",
  },
  {
    NAME: "contact_no",
    isActiveFilter: false,

    label: "Contact No",
    name: "contact_no",
    placeholder: "Contact No",
    type: "number",
  },
  {
    NAME: "agency_contract_start_date",
    isActiveFilter: false,

    label: " Contract Start Date",
    name: "agency_contract_start_date",
    placeholder: "Contract Start Date",
    type: "date",
  },
  {
    NAME: "agency_contract_duration",
    isActiveFilter: false,

    label: "Contract Duration",
    name: "agency_contract_duration",
    placeholder: "Contract Duration",
    type: "text",
  },
  {
    NAME: "service_cost",
    isActiveFilter: false,

    label: "Service Cost",
    name: "service_cost",
    placeholder: "Service Cost",
    type: "number",
  },
  {
    NAME: "remarks",
    isActiveFilter: false,

    label: "Remarks",
    name: "remarks",
    placeholder: "Remarks",
    type: "text",
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
  {
    name: "security_agency_name",
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
    name: "area__area_name",
    label: "Area",
    placeholder: "Area",
    type: "text",
  },
  {
    name: "address",
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
    name: "contact_no",
    label: "Contact No",
    placeholder: "Contact No",
    type: "text",
  },
  {
    name: "service_cost",
    label: "Service Cost",
    placeholder: "Service Cost",
    type: "number",
  },
  {
    name: "remarks",
    label: "Remarks",
    placeholder: "Remarks",
    type: "text",
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
  security_agency_name: yup
    .string()
    .required("Security Agency name is required"),
  region__region_name: yup.string().required("Region name  is required"),
  state__state_name: yup.string().required("State name  is required"),
  district__district_name: yup.string().required("District name  is required"),
  area__area_name: yup.string().required("Area name  is required"),
  address: yup.string().required("Address name  is required"),
  pincode: yup.number().required("pincode   is required"),
  contact_no: yup
    .string()
    .matches(validation.phoneRegExp, "Contact number is not valid")
    .required("Contact number is required"),
  service_cost: yup.number().required("service_cost  is required"),
  remarks: yup.string().required("remarks is required"),
  is_active: yup.string(),
});

export { filterFields, addEditFormFields, schema };
