import * as yup from "yup";

const filterFields = [
  {
    WarehouseTypeID: "warehouse_type",
    isActiveFilter: false,

    label: "WarehouseTypeID",
    name: "warehouse_type",
    placeholder: "WarehouseTypeID",
    type: "number",
  },
  {
    WarehouseSubTypeID: "warehouse_subtype",
    isActiveFilter: false,

    label: "WarehouseSubTypeID",
    name: "warehouse_subtype",
    placeholder: "WarehouseSubTypeID",
    type: "number",
  },
  {
    "Warehouse Name": "warehouse_name",
    isActiveFilter: false,

    label: "Warehouse Name",
    name: "warehouse_name",
    placeholder: "Warehouse Name",
    type: "text",
  },
  {
    RegionID: "region",
    isActiveFilter: false,

    label: "RegionID",
    name: "region",
    placeholder: "RegionID",
    type: "number",
  },
  {
    "StateID ": "state",
    isActiveFilter: false,

    label: "StateID ",
    name: "state",
    placeholder: "StateID ",
    type: "number",
  },
  {
    "ZoneID ": "bank_name",
    isActiveFilter: false,

    label: "ZoneID ",
    name: "bank_name",
    placeholder: "ZoneID ",
    type: "text",
  },
  {
    "DistrictID ": "district",
    isActiveFilter: false,

    label: "DistrictID ",
    name: "district",
    placeholder: "DistrictID ",
    type: "number",
  },
  {
    "AreaID ": "area",
    isActiveFilter: false,

    label: "AreaID ",
    name: "area",
    placeholder: "AreaID ",
    type: "number",
  },
  {
    "WarehouseAddress ": "warehouse_address",
    isActiveFilter: false,

    label: "WarehouseAddress ",
    name: "warehouse_address",
    placeholder: "WarehouseAddress ",
    type: "text",
  },
  {
    WarehousePincode: "warehouse_pincode",
    isActiveFilter: false,

    label: "WarehousePincode ",
    name: "warehouse_pincode",
    placeholder: "WarehousePincode ",
    type: "number",
  },
  {
    "NoOfChambers ": "no_of_chambers",
    isActiveFilter: false,

    label: "NoOfChambers ",
    name: "no_of_chambers",
    placeholder: "NoOfChambers ",
    type: "number",
  },

  {
    "StandardCapacity ": "standard_capacity",
    isActiveFilter: false,

    label: "StandardCapacity ",
    name: "standard_capacity",
    placeholder: "StandardCapacity",
    type: "number",
  },
  {
    "CurrentCapacity ": "currrent_capacity",
    isActiveFilter: false,

    label: "CurrentCapacity ",
    name: "currrent_capacity",
    placeholder: "CurrentCapacity ",
    type: "number",
  },
  {
    "CurrentUtilisedCapacity ": "currrent_utilised_capacity",
    isActiveFilter: false,

    label: "CurrentUtilisedCapacity ",
    name: "currrent_utilised_capacity",
    placeholder: "CurrentUtilisedCapacity ",
    type: "number",
  },
  {
    "NoOfWarehouseInArea ": "no_of_warehouse_in_area",
    isActiveFilter: false,

    label: "NoOfWarehouseInArea",
    name: "no_of_warehouse_in_area",
    placeholder: "NoOfWarehouseInArea",
    type: "number",
  },
  {
    "LockinPeriod ": "lock_in_period",
    isActiveFilter: false,

    label: "LockinPeriod ",
    name: "lock_in_period",
    placeholder: "LockinPeriod",
    type: "number",
  },
  {
    "LockinPeriodMonth ": "lock_in_period_month",
    isActiveFilter: false,

    label: "LockinPeriodMonth ",
    name: "lock_in_period_month",
    placeholder: "LockinPeriodMonth",
    type: "date",
  },
  {
    "CoveredArea ": "covered_area",
    isActiveFilter: false,

    label: "CoveredArea",
    name: "covered_area",
    placeholder: "CoveredArea",
    type: "number",
  },
  {
    "SupervisorDayShift ": "supervisor_day_shift",
    isActiveFilter: false,

    label: "SupervisorDayShift ",
    name: "supervisor_day_shift ",
    placeholder: "SupervisorDayShift ",
    type: "text",
  },
  {
    "SupervisorNightShift ": "supervisor_night_shift",
    isActiveFilter: false,

    label: "SupervisorNightShift ",
    name: "supervisor_night_shift",
    placeholder: "SupervisorNightShift ",
    type: "text",
  },
  {
    "SecurityGuardDayShift ": "security_guard_day_shift",
    isActiveFilter: false,

    label: "SecurityGuardDayShift ",
    name: "security_guard_day_shift",
    placeholder: "SecurityGuardDayShift ",
    type: "number",
  },
  {
    "SecurityGuardNightShift ": "security_guard_night_shift",
    isActiveFilter: false,

    label: "SecurityGuardIDNightShift ",
    name: "security_guard_night_shift",
    placeholder: "SecurityGuardNightShift",
    type: "number",
  },
  {
    "Expected Commodity ": "expected_commodity",
    isActiveFilter: false,

    label: "Expected Commodity ",
    name: "expected_commodity",
    placeholder: "Expected Commodity ",
    type: "number",
  },
  {
    CommodityInwardType: "commodity_inward_type",
    isActiveFilter: false,

    label: "CommodityInwardType",
    name: "commodity_inward_type",
    placeholder: "CommodityInwardType",
    type: "text",
  },
  {
    PreStackCommodityID: "prestack_commodity",
    isActiveFilter: false,

    label: "PreStackCommodityID",
    name: "prestack_commodity",
    placeholder: "PreStackCommodityID",
    type: "number",
  },
  {
    PreStackCommodityQty: "prestack_commodity_qty",
    isActiveFilter: false,

    label: "PreStackCommodityID",
    name: "prestack_commodity_qty",
    placeholder: "PreStackCommodityQty",
    type: "number",
  },
  {
    CCBankerID: "banker_id",
    isActiveFilter: false,

    label: "CCBankerID",
    name: "banker_id",
    placeholder: "CCBankerID",
    type: "number",
  },
  {
    FundingRequired: "bank_name",
    isActiveFilter: false,

    label: "FundingRequired",
    name: "bank_name",
    placeholder: "FundingRequired",
    type: "text",
  },
  {
    "Rent ": "rent",
    isActiveFilter: false,

    label: "Rent ",
    name: "rent",
    placeholder: "Rent ",
    type: "number",
  },
  {
    GGRevenueSharingRatio: "gg_revenue_ratio",
    isActiveFilter: false,

    label: "GGRevenueSharingRatio",
    name: "gg_revenue_ratio",
    placeholder: "GGRevenueSharingRatio",
    type: "number",
  },
  {
    SecurityDepositeMonth: "security_deposit_month",
    isActiveFilter: false,

    label: "SecurityDepositeMonth",
    name: "security_deposit_month",
    placeholder: "SecurityDepositeMonth",
    type: "date",
  },
  {
    AdvanceRent: "advance_rent",
    isActiveFilter: false,

    label: "AdvanceRent",
    name: "advance_rent",
    placeholder: "AdvanceRent",
    type: "number",
  },
  {
    AdvanceRentMonth: "advance_rent_month",
    isActiveFilter: false,

    label: "AdvanceRentMonth",
    name: "advance_rent_month",
    placeholder: "AdvanceRentMonth",
    type: "date",
  },
  {
    "GST ": "bank_name",
    isActiveFilter: false,

    label: "GST ",
    name: "bank_name",
    placeholder: "GST ",
    type: "text",
  },
  {
    CommencementDate: "bank_name",
    isActiveFilter: false,

    label: "CommencementDate",
    name: "bank_name",
    placeholder: "CommencementDate",
    type: "text",
  },
  {
    "AgreementPeriodMonth ": "bank_name",
    isActiveFilter: false,

    label: "AgreementPeriodMonth",
    name: "bank_name",
    placeholder: "AgreementPeriodMonth",
    type: "text",
  },

  {
    "NoticePeriodMonth ": "notice_period_month",
    isActiveFilter: false,

    label: "NoticePeriodMonth ",
    name: "notice_period_month",
    placeholder: "NoticePeriodMonth ",
    type: "date",
  },

  {
    Remarks: "remarks",
    isActiveFilter: false,

    label: "Remarks",
    name: "remarks",
    placeholder: "Remarks",
    type: "text",
  },

  {
    L1UserID: "l1_user",
    isActiveFilter: false,

    label: "L1UserID",
    name: "l1_user",
    placeholder: "L1UserID",
    type: "number",
  },
  {
    L2UserID: "l2_user",
    isActiveFilter: false,

    label: "L2UserID",
    name: "l2_user",
    placeholder: "L2UserID",
    type: "number",
  },

  {
    "DocumentID ": "bank_name",
    isActiveFilter: false,

    label: "DocumentID ",
    name: "bank_name",
    placeholder: "DocumentID ",
    type: "text",
  },
  {
    "InspectionAssignedTo ": "bank_name",
    isActiveFilter: false,

    label: "InspectionAssignedTo ",
    name: "bank_name",
    placeholder: "InspectionAssignedTo ",
    type: "text",
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
    label: "WarehouseTypeID",
    name: "warehouse_type",
    placeholder: "WarehouseTypeID",
    type: "number",
  },
  {
    label: "WarehouseSubTypeID",
    name: "warehouse_subtype",
    placeholder: "WarehouseSubTypeID",
    type: "number",
  },
  {
    label: "Warehouse Name",
    name: "warehouse_name",
    placeholder: "Warehouse Name",
    type: "text",
  },
  {
    label: "RegionID",
    name: "region",
    placeholder: "RegionID",
    type: "number",
  },
  {
    label: "StateID ",
    name: "state",
    placeholder: "StateID ",
    type: "number",
  },
  // {
  //   label: "ZoneID ",
  //   name: "bank_name",
  //   placeholder: "ZoneID ",
  //   type: "text",
  // },
  {
    label: "DistrictID ",
    name: "district",
    placeholder: "DistrictID ",
    type: "number",
  },
  {
    label: "AreaID ",
    name: "area",
    placeholder: "AreaID ",
    type: "number",
  },
  {
    label: "WarehouseAddress ",
    name: "warehouse_address",
    placeholder: "WarehouseAddress ",
    type: "text",
  },
  {
    label: "WarehousePincode ",
    name: "warehouse_pincode",
    placeholder: "WarehousePincode ",
    type: "number",
  },
  {
    label: "NoOfChambers ",
    name: "no_of_chambers",
    placeholder: "NoOfChambers ",
    type: "number",
  },

  {
    label: "StandardCapacity ",
    name: "standard_capacity",
    placeholder: "StandardCapacity",
    type: "number",
  },
  {
    label: "CurrentCapacity ",
    name: "currrent_capacity",
    placeholder: "CurrentCapacity ",
    type: "number",
  },
  {
    label: "CurrentUtilisedCapacity ",
    name: "currrent_utilised_capacity",
    placeholder: "CurrentUtilisedCapacity ",
    type: "number",
  },
  {
    label: "NoOfWarehouseInArea",
    name: "no_of_warehouse_in_area",
    placeholder: "NoOfWarehouseInArea",
    type: "number",
  },
  {
    label: "LockinPeriod ",
    name: "lock_in_period",
    placeholder: "LockinPeriod",
    type: "number",
  },
  {
    label: "LockinPeriodMonth ",
    name: "lock_in_period_month",
    placeholder: "LockinPeriodMonth",
    type: "date",
  },
  {
    label: "CoveredArea",
    name: "covered_area",
    placeholder: "CoveredArea",
    type: "number",
  },
  {
    label: "SupervisorDayShift ",
    name: "supervisor_day_shift ",
    placeholder: "SupervisorDayShift ",
    type: "number",
  },
  {
    label: "SupervisorNightShift ",
    name: "supervisor_night_shift",
    placeholder: "SupervisorNightShift ",
    type: "number",
  },
  {
    label: "SecurityGuardDayShift ",
    name: "security_guard_day_shift",
    placeholder: "SecurityGuardDayShift ",
    type: "number",
  },
  {
    label: "SecurityGuardIDNightShift ",
    name: "security_guard_night_shift",
    placeholder: "SecurityGuardNightShift",
    type: "number",
  },
  {
    label: "Expected Commodity ",
    name: "expected_commodity",
    placeholder: "Expected Commodity ",
    type: "number",
  },
  {
    label: "CommodityInwardType",
    name: "commodity_inward_type",
    placeholder: "CommodityInwardType",
    type: "text",
  },
  {
    label: "PreStackCommodityID",
    name: "prestack_commodity",
    placeholder: "PreStackCommodityID",
    type: "number",
  },
  {
    label: "PreStackCommodityID",
    name: "prestack_commodity_qty",
    placeholder: "PreStackCommodityQty",
    type: "number",
  },
  {
    label: "CCBankerID",
    name: "banker_id",
    placeholder: "CCBankerID",
    type: "number",
  },
  // {
  //   label: "FundingRequired",
  //   name: "bank_name",
  //   placeholder: "FundingRequired",
  //   type: "text",
  // },
  {
    label: "Rent ",
    name: "rent",
    placeholder: "Rent ",
    type: "number",
  },
  {
    label: "GGRevenueSharingRatio",
    name: "gg_revenue_ratio",
    placeholder: "GGRevenueSharingRatio",
    type: "number",
  },
  {
    label: "SecurityDepositeMonth",
    name: "security_deposit_month",
    placeholder: "SecurityDepositeMonth",
    type: "date",
  },
  {
    label: "AdvanceRent",
    name: "advance_rent",
    placeholder: "AdvanceRent",
    type: "number",
  },
  {
    label: "AdvanceRentMonth",
    name: "advance_rent_month",
    placeholder: "AdvanceRentMonth",
    type: "date",
  },
  // {
  //   label: "GST ",
  //   name: "bank_name",
  //   placeholder: "GST ",
  //   type: "text",
  // },
  // {
  //   label: "CommencementDate",
  //   name: "bank_name",
  //   placeholder: "CommencementDate",
  //   type: "text",
  // },
  // {
  //   label: "AgreementPeriodMonth",
  //   name: "bank_name",
  //   placeholder: "AgreementPeriodMonth",
  //   type: "text",
  // },

  {
    label: "NoticePeriodMonth ",
    name: "notice_period_month",
    placeholder: "NoticePeriodMonth ",
    type: "date",
  },

  {
    label: "Remarks",
    name: "remarks",
    placeholder: "Remarks",
    type: "text",
  },

  {
    label: "L1UserID",
    name: "l1_user",
    placeholder: "L1UserID",
    type: "number",
  },
  {
    label: "L2UserID",
    name: "l2_user",
    placeholder: "L2UserID",
    type: "number",
  },

  // {
  //   label: "DocumentID ",
  //   name: "bank_name",
  //   placeholder: "DocumentID ",
  //   type: "text",
  // },
  // {
  //   label: "InspectionAssignedTo ",
  //   name: "bank_name",
  //   placeholder: "InspectionAssignedTo ",
  //   type: "text",
  // },

  {
    label: "ACTIVE/DeActive",
    name: "active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  warehouse_type: yup.number().required("warehouse type is required"),
  warehouse_subtype: yup.number().required("warehouse sub type is required"),
  warehouse_name: yup.string().trim().required("warehouse name is required"),
  region: yup.number().required("region is required"),
  state: yup.number().required("state is required"),
  // warehouse_type: yup.string().trim().required("Zone ID is required"),
  district: yup.number().required("district is required"),
  area: yup.number().required("area  is required"),
  warehouse_address: yup
    .string()
    .trim()
    .required("warehouse address is required"),
  warehouse_pincode: yup.number().required("warehouse pincode is required"),
  no_of_chambers: yup.number().required("no of chambers  is required"),
  standard_capacity: yup.number().required("standard capacity is required"),
  currrent_capacity: yup.number().required("currrent capacity is required"),
  currrent_utilised_capacity: yup
    .number()
    .required("currrent utilised capacity  is required"),
  no_of_warehouse_in_area: yup
    .number()
    .required("no of warehouse in area is required"),
  lock_in_period: yup.number().required("lock in period is required"),
  lock_in_period_month: yup.date().required("lock in period month is required"),
  covered_area: yup.number().required("covered area  is required"),
  supervisor_day_shift: yup
    .number()
    .required("supervisor day shift  is required"),
  supervisor_night_shift: yup
    .number()
    .required("supervisor night shift is required"),
  security_guard_day_shift: yup
    .string()
    .trim()
    .required("security guard day shift is required"),
  security_guard_night_shift: yup
    .number()
    .required("security guard night shift is required"),
  expected_commodity: yup.number().required("expected commodity  is required"),
  commodity_inward_type: yup
    .string()
    .trim()
    .required("commodity inward type is required"),
  prestack_commodity: yup.number().required("prestack commodity  is required"),
  prestack_commodity_qty: yup
    .number()
    .required("prestack commodity qty is required"),
  banker_id: yup.number().required("banker id  is required"),
  // bank_name: yup.string().trim().required("Funding Required is required"),
  rent: yup.number().required("rent  is required"),
  gg_revenue_ratio: yup.number().required("gg revenue ratio  is required"),
  security_deposit_month: yup
    .date()
    .required("security deposit month  is required"),
  advance_rent: yup.number().required("advance rent  is required"),
  advance_rent_month: yup.date().required("advance rent month  is required"),
  // warehouse_type: yup.string().trim().required("GST type is required"),
  // warehouse_type: yup.string().trim().required("CommencementDate type is required"),
  // warehouse_type: yup.string().trim().required("AgreementPeriodMonth type is required"),
  notice_period_month: yup.date().required("notice period month  is required"),
  remarks: yup.string().trim().required("remarks  is required"),
  l1_user: yup.number().required("l1 user  is required"),
  l2_user: yup.number().required("l2 user  is required"),
  // warehouse_type: yup.string().trim().required("DocumentID type is required"),
  // warehouse_type: yup.string().trim().required("InspectionAssignedTo type is required"),

  active: yup.string(),
});

export { filterFields, schema, addEditFormFields };
