export const API = {
  SIGNUP: "/register/",
  LOGIN: "/login/",
  FORGOT_PWD: "/Forgotpass_Api/",
  CHANGE_PASSWORD: "/verify_password/",

  DASHBOARD: {
    DISTRICT_MASTER: "/warehouse/district/",
    STATE_MASTER: "/warehouse/state/",
    SUBSTATE_MASTER: "/warehouse/substate/",
    AREA_MASTER: "/warehouse/area/",
    BANK_MASTER: "/business_flow/bank/",
    BANK_BRANCH_MASTER: "/business_flow/bank_branch/",
    EARTHQUAKE_ZONE_TYPE_MASTER: "/warehouse/earthquake_zone_type/",
    EARTHQUAKE_ZONE_ACTIVE: "/warehouse/earthquake/",
    INSURANCE_COMPANY_MASTER: "/business_flow/insurance/",
    INSURANCE_POLICY_MASTER: "/business_flow/insurance_policy/",
    REGION_MASTER: "/warehouse/region/",
    COMMODITY_TYPE_MASTER: "/warehouse/commodity_type/",
    COMMODITY_GRADE: "/warehouse/commodity_grade/",
    COMMODITY_MASTER: "/warehouse/commodity/",
    PAGE_MASTER: "/page/",
    EMPLOYEE_MASTER: "/employeeapi/",
    EMPLOYEE_MASTER_ACTIVE: "",
    DEPARTMENT_MASTER: "/departmentapi/",
    DEPARTMENT_MASTER_ACTIVE: "",
    HIRING_PROPOSAL_MASTER: "/warehouse/warehousehiring_proposal/",
    HIRING_PROPOSAL_MASTER_ACTIVE: "",
    ROLE_MASTER: "/role/",
    ROLE_PAGE_ASSIGNMENT_MASTER: "/role",
    USER_MASTER: "/user/",
    COMMODITY_VARIETY: "/warehouse/commodity_variety/",
    WAREHOUSE_SUB_TYPE: "/warehouse/warehouse_sub_type/",
    SECURITY_AGENCY_MASTER: "/business_flow/security_agency/",
    SECURITY_GUARD_MASTER: "/warehouse/security_guard/",
    WAREHOUSE_TYPE_MASTER: "/warehouse/warehouse_type/",
    COMMODITY_ACTIVE: "/warehouse/commodity_active/",
    COMMODITY_TYPE_ACTIVE: "",
    COMMODITY_GRADE_ACTIVE: "/warehouse/commodity_grade_active/",
    COMMODITY_VARIETY_ACTIVE: "/warehouse/commodity_variety_active/",
    STATE_ACTIVE: "/warehouse/state_active/",
    ZONE_ACTIVE: "/warehouse/zone_active/",
    REGION_ACTIVE: "/warehouse/region_active_api/",
    DISTRICT_ACTIVE: "",
    AREA_ACTIVE: "",
    INSURANCE_ACTIVE: "/business_flow/insurance/",
    SECURITY_AGENCY_ACTIVE: "",
    SECURITY_GUARD_ACTIVE: "",
    CLIENT_MASTER: "",
    PAGE_MASTER_ACTIVE: "",
    BANK_MASTER_ACTIVE: "",
    BANK_BRANCH_MASTER_ACTIVE: "",
    WAREHOUSE_TYPE_MASTER_ACTIVE: "",
    WAREHOUSE_SUB_TYPE_MASTER_ACTIVE: "",
    USER_MASTER_ACTIVE: "",
    BANK_CM_LOCATION_MASTER: "/business_flow/bank_cm_location/",
    COMMODITY_BAG_MASTER: "/warehouse/commodity_type/",
    HSN_MASTER: "/warehouse/hsn/",
    WAREHOUSE_OWNER_MASTER: "/warehouse/HiringProposalWarehouseOwnerDetails/",
    EXCEL_DOWNLOAD_MASTER: "excel_download",
  },

  WAREHOUSE_PROPOSAL: {
    SAVE_AS_DRAFT: "/warehouse/save_draft_create/",
    SUPERVISOR_DAY: "/warehouse/day/supervisor",
    SUPERVISOR_NIGHT: "/warehouse/night/supervisor",
    SECURITY_DAY: "/warehouse/day/security",
    SECURITY_NIGHT: "/warehouse/night/security",
    PBPM: "/operational_flow/pbpm/pbpm_list/",
    MIN_MAX_AVG: "warehouse/warehousehiring_proposal/",
    GET_WAREHOUSE_TYPE: "/warehouse/warehouse_type/",
    GET_WAREHOUSE_SUB_TYPE: "/warehouse/warehouse_sub_type",
    WAREHOUSE_PROPOSAL_DETAILS: "/warehouse/warehousehiring_proposal/",
  },
  COMMON_API_END_POINTS: {
    LOCATION_DRILL_DOWN: "/warehouse/location/filter",
    FILE_UPLOAD: "/operational_flow/vaibhav_upload/",
  },
};
