import { apiSlice } from "../app/api/apiSlice";
import { API } from "../constants/api.constants";
// credentials

export const masterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // start district-master get add update mutation
    getDistrictMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.DISTRICT_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addDistrictMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.DISTRICT_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateDistrictMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.DISTRICT_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // end district-master get add update mutation
    // start state-master get add update mutation
    getStateMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.STATE_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addStateMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.STATE_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateStateMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.STATE_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // end state-master get add update mutation

    // start Zone-Master get add update mutation methods
    getZoneMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.SUBSTATE_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addZoneMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.SUBSTATE_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateZoneMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.SUBSTATE_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // start Zone-Master get add update mutation methods
    getBankMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.BANK_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addBankMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.BANK_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateBankMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.BANK_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    getBankBranchMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.BANK_BRANCH_MASTER,
        method: "GET",
        params: params,
      }),
    }),

    // start earthquack-master get add update mutation methods
    addBankBranchMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.BANK_BRANCH_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateBankBranchMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.BANK_BRANCH_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    getEarthQuakeZoneTypeMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.EARTHQUAKE_ZONE_TYPE_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addEarthQuakeZoneTypeMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.EARTHQUAKE_ZONE_TYPE_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateEarthQuakeZoneTypeMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.EARTHQUAKE_ZONE_TYPE_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // start client-master get add update mutation methods
    getClientMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.CLIENT_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addClientMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.CLIENT_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateClientMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.CLIENT_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

    //start Insurance-Master get add update mutation methods
    getInsuranceCompanyMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.INSURANCE_COMPANY_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addInsuranceCompanyMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.INSURANCE_COMPANY_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateInsuranceCompanyMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.INSURANCE_COMPANY_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Insurance POlicy MAster Add edit Update Start
    getInsurancePolicyMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.INSURANCE_POLICY_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addInsurancePolicyMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.INSURANCE_POLICY_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateInsurancePolicyMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.INSURANCE_POLICY_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // Insurance Policy Master Add Edit update Master End

    getRegionMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.REGION_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    updateRegionMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.REGION_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    addRegionMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.REGION_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    getAreaMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.AREA_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    updateAreaMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.AREA_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    addAreaMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.AREA_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    // commodity type master add edit update start
    getCommodityTypeMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_TYPE_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    updateCommodityTypeMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.COMMODITY_TYPE_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    addCommodityTypeMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.COMMODITY_TYPE_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    //commodity type master add update edit end

    //commodity grade master add edit update start
    getCommodityGrade: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_GRADE,
        method: "GET",
        params: params,
      }),
    }),
    updateCommodityGrade: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.COMMODITY_GRADE}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    addCommodityGrade: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.COMMODITY_GRADE,
        method: "POST",
        body: data,
      }),
    }),
    // start Commodity-Master get add update mutation methods
    getCommodityMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addCommodityMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.COMMODITY_MASTER}`,
        method: "POST",
        body: data,
      }),
    }),
    updateCommodityMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.COMMODITY_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // end Commodity-Master add update mutation methods

    //start page master get add update mutation methods
    getPageMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.PAGE_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    addPageMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.PAGE_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updatePageMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.PAGE_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

    // end page master get add update mutation method
    // Start Role master get add mutation method
    getRoleMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.ROLE_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    addRoleMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.ROLE_MASTER}`,
        method: "POST",
        body: data,
      }),
    }),
    updateRoleMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.ROLE_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // End  Role Master Update Add get Mutation
    getRolePageAssignmentMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.ROLE_PAGE_ASSIGNMENT_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    getUserMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.USER_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),

    addUserMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.USER_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateUserMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.USER_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    getEmployeeMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.EMPLOYEE_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),

    addEmployeeMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.EMPLOYEE_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateEmployeeMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.EMPLOYEE_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

    getDepartmentMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.DEPARTMENT_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),

    addDepartmentMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.DEPARTMENT_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateDepartmentMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.DEPARTMENT_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

    getHiringProposalMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.HIRING_PROPOSAL_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),

    addHiringProposalMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.HIRING_PROPOSAL_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateHiringProposalMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.HIRING_PROPOSAL_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    getCommodityVariety: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_VARIETY,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    updateCommodityVariety: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.COMMODITY_VARIETY}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    addCommodityVariety: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.COMMODITY_VARIETY,
        method: "POST",
        body: data,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    //warehouse sub type get add update mutation start
    getWareHouseSubType: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.WAREHOUSE_SUB_TYPE,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    addWareHouseSubType: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.WAREHOUSE_SUB_TYPE,
        method: "POST",
        body: data,
      }),
    }),
    updateWareHouseSubType: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.WAREHOUSE_SUB_TYPE}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    //warehouse sub type get add update mutation end
    //warehouse owner type get add update mutation start
    getWareHouseOwnerType: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.WAREHOUSE_OWNER_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    addWareHouseOwnerType: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.WAREHOUSE_OWNER_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateWareHouseOwnerType: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.WAREHOUSE_OWNER_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    //warehouse owner type get add update mutation end

    // start security agency get add update mutation methods
    getSecurityAgencyMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.SECURITY_AGENCY_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    addSecurityAgencyMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.SECURITY_AGENCY_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateSecurityAgencyMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.SECURITY_AGENCY_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // start security guard get add update mutation methods
    getSecurityGuardMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.SECURITY_GUARD_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    addSecurityGuardMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.SECURITY_GUARD_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateSecurityGuardMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.SECURITY_GUARD_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // Warehouse type master update add patch start
    getWarehouseTypeMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.WAREHOUSE_TYPE_MASTER,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    addWarehouseTypeMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.WAREHOUSE_TYPE_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateWarehouseTypeMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.WAREHOUSE_TYPE_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

    // warehouse type master update add patch end
    // Bank Cm Location Add Update add Start
    getBankCMLocationMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.BANK_CM_LOCATION_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addBankCMLocationMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.BANK_CM_LOCATION_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateBankCMLocationMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.BANK_CM_LOCATION_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    // Bank Cm Location Add Update Edit End

    //  Commodity bag master add edit update starts
    getCommodityBagMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_BAG_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addCommodityBagMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.COMMODITY_BAG_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateCommodityBagMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.COMMODITY_BAG_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    //Commodity bag master add edit update end

    getHsnMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.HSN_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addHsnMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.HSN_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateHsnMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.HSN_MASTER}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    activeDeActive: builder.mutation({
      query: (data) => ({
        url: data.endPoint,
        method: "POST",
        body: data,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    //Download Excel File API
    getDownLoadExcel: builder.mutation({
      query: (params) => ({
        url: `${API.DASHBOARD.EXCEL_DOWNLOAD_MASTER}?`,
        method: "GET",
        params: params,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
    //Download Excel File API
    postFileUpload: builder.mutation({
      query: (data) => ({
        url: `${API.COMMON_API_END_POINTS.FILE_UPLOAD}`,
        method: "POST",
        body: data,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
  }),
});

export const {
  // Api mutation for district master starts
  useGetDistrictMasterMutation,
  useAddDistrictMasterMutation,
  useUpdateDistrictMasterMutation,
  // Api mutation for district master ends
  //Api mutation for state master starts
  useGetStateMasterMutation,
  useAddStateMasterMutation,
  useUpdateStateMasterMutation,
  //Api mutation for state master ends

  useGetZoneMasterMutation,
  useAddZoneMasterMutation,
  useUpdateZoneMasterMutation,

  // Api mutation for area master starts
  useGetAreaMasterMutation,
  useUpdateAreaMasterMutation,
  useAddAreaMasterMutation,
  // Api mutation for area master ends
  // Api mutation for warehouse owner master starts
  useGetWareHouseOwnerTypeMutation,
  useUpdateWareHouseOwnerTypeMutation,
  useAddWareHouseOwnerTypeMutation,
  // Api mutation for warehouse owner master ends
  useGetClientMasterMutation,
  useAddClientMasterMutation,
  useUpdateClientMasterMutation,

  useGetBankMasterMutation,
  useAddBankMasterMutation,
  useUpdateBankMasterMutation,
  useGetBankBranchMasterMutation,
  useAddBankBranchMasterMutation,
  useUpdateBankBranchMasterMutation,
  // Api mutation for commodity type starts
  useGetCommodityTypeMasterMutation,
  useUpdateCommodityTypeMasterMutation,
  useAddCommodityTypeMasterMutation,
  // Api mutation for commodity type ends

  // Api mutation for commodity grade starts
  useGetCommodityGradeMutation,
  useUpdateCommodityGradeMutation,
  useAddCommodityGradeMutation,
  // Api mutation for commodity grade ends

  // Api mutation for page master starts
  useGetPageMasterMutation,
  useAddPageMasterMutation,
  useUpdatePageMasterMutation,
  // Api mutation for page master ends
  // Api mutation for Role master start
  useGetRoleMasterMutation,
  useAddRoleMasterMutation,
  useUpdateRoleMasterMutation,
  // Api mutation for role master ends
  useGetRolePageAssignmentMasterMutation,
  useGetUserMasterMutation,
  useAddUserMasterMutation,
  useUpdateUserMasterMutation,
  // Api mutation for commodity variety starts
  useGetCommodityVarietyMutation,
  useUpdateCommodityVarietyMutation,
  useAddCommodityVarietyMutation,
  // Api mutation for commodity variety ends

  // Api mutation for warehouse sub type start
  useGetWareHouseSubTypeMutation,
  useAddWareHouseSubTypeMutation,
  useUpdateWareHouseSubTypeMutation,
  // api mutation for warehouse sub type end

  //Api mutation for warehouse type start
  useGetWarehouseTypeMasterMutation,
  useUpdateWarehouseTypeMasterMutation,
  useAddWarehouseTypeMasterMutation,
  //Api mutation for warehouse type end

  // Api mutation for security agency starts
  useGetSecurityAgencyMasterMutation,
  useAddSecurityAgencyMasterMutation,
  useUpdateSecurityAgencyMasterMutation,
  // Api mutation for security agency end

  // Api mutation for security Guard starts
  useGetSecurityGuardMasterMutation,
  useAddSecurityGuardMasterMutation,
  useUpdateSecurityGuardMasterMutation,

  // Api mutation for security Guard end

  // Api mutation for earthquack zone type start
  useGetEarthQuakeZoneTypeMasterMutation,
  useAddEarthQuakeZoneTypeMasterMutation,
  useUpdateEarthQuakeZoneTypeMasterMutation,
  // Api mutation for earthquack zone type end

  //Api mutation for Insurance variety starts
  useGetInsuranceCompanyMasterMutation,
  useUpdateInsuranceCompanyMasterMutation,
  useAddInsuranceCompanyMasterMutation,
  // Api mutation for Insurance variety ends

  //Api mutation for Insurance Policy Mutation Start
  useGetInsurancePolicyMasterMutation,
  useAddInsurancePolicyMasterMutation,
  useUpdateInsurancePolicyMasterMutation,

  // Api mutation for Insurance Policy Mutation End
  //Apis mutation for region master starts
  useGetRegionMasterMutation,
  useAddRegionMasterMutation,
  useUpdateRegionMasterMutation,
  //Api mutation for region master ends

  useActiveDeActiveMutation,

  useGetCommodityMasterMutation,
  useAddCommodityMasterMutation,
  useUpdateCommodityMasterMutation,
  // Api Mutation For Bank Cm Location Start
  useGetBankCMLocationMasterMutation,
  useAddBankCMLocationMasterMutation,
  useUpdateBankCMLocationMasterMutation,
  // Api Mutation For Bank Cm Location End
  useGetEmployeeMasterMutation,
  useAddEmployeeMasterMutation,
  useUpdateEmployeeMasterMutation,
  useGetDepartmentMasterMutation,
  useAddDepartmentMasterMutation,
  useUpdateDepartmentMasterMutation,
  useGetHiringProposalMasterMutation,
  useAddHiringProposalMasterMutation,
  useUpdateHiringProposalMasterMutation,

  //Commodity bag master mutation start
  useGetCommodityBagMasterMutation,
  useAddCommodityBagMasterMutation,
  useUpdateCommodityBagMasterMutation,
  // Commodity bag master mutation end
  useGetHsnMasterMutation,
  useAddHsnMasterMutation,
  useUpdateHsnMasterMutation,
  useGetDownLoadExcelMutation,
  // Api upload file Api
  usePostFileUploadMutation,
} = masterApiSlice;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
//   endpoints: (builder) => ({
//     getCommodityMaster: builder.query({
//       query: (params) => ({
//         url: API.DASHBOARD.COMMODITY_MASTER,
//         method: 'GET',
//         params: params,
//       }),
//       onError: (error, { dispatch }) => {
//         if (error.status === 401) {
//           // Unauthorized error handling logic
//           // For example, redirect to login page or show an error message
//         }
//       },
//     }),
//   }),
// });

// export const { useGetCommodityMasterQuery } = api;
