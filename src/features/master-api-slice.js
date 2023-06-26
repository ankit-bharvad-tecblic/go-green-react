import { apiSlice } from "../app/api/apiSlice";
import { API } from "../constants/api.constants";
// credentials

export const masterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistrictMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.DISTRICT_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    getStateMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.STATE_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    // start Zone-Master get add update mutation methods
    getZoneMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.ZONE_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    addZoneMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.ZONE_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    updateZoneMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.ZONE_MASTER,
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
        url: API.DASHBOARD.EARTHQUAKE_ZONE_TYPE_MASTER,
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
        url: API.DASHBOARD.INSURANCE_COMPANY_MASTER,
        method: "PATCH",
        body: data,
      }),
    }),

    getRegionMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.REGION_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    updateRegionMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.UPDATE_REGION_MASTER}/${data.id}/`,
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
        url: `${API.DASHBOARD.UPDATE_AREA_MASTER}/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addAreaMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.ADD_AREA_MASTER,
        method: "POST",
        params: params,
      }),
    }),
    getCommodityTypeMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_TYPE_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    updateCommodityTypeMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.UPDATE_COMMODITY_TYPE_MASTER}/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addCommodityTypeMaster: builder.mutation({
      query: (data) => ({
        url: API.DASHBOARD.ADD_COMMODITY_TYPE_MASTER,
        method: "POST",
        body: data,
      }),
    }),
    getCommodityGrade: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_GRADE,
        method: "GET",
        params: params,
      }),
    }),
    updateCommodityGrade: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.UPDATE_COMMODITY_GRADE}/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addCommodityGrade: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.ADD_COMMODITY_GRADE,
        method: "POST",
        params: params,
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
        url: `${API.DASHBOARD.COMMODITY_MASTER}/`,
        method: "POST",
        body: data,
      }),
    }),
    updateCommodityMaster: builder.mutation({
      query: (data) => ({
        url: `${API.DASHBOARD.COMMODITY_MASTER}/${data.id}/`,
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
        url: API.DASHBOARD.PAGE_MASTER,
        method: "PATCH",
        body: data,
      }),
    }),

    // end page master get add update mutation method
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
        url: `${API.DASHBOARD.UPDATE_COMMODITY_VARIETY}/${data.id}`,
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
        url: API.DASHBOARD.ADD_COMMODITY_VARIETY,
        method: "POST",
        body: data,
      }),
      onError: (error) => {
        console.log("API Error:", error);
        // Dispatch actions, show notification, etc.
      },
    }),
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
        url: API.DASHBOARD.SECURITY_AGENCY_MASTER,
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
        url: API.DASHBOARD.SECURITY_GUARD_MASTER,
        method: "PATCH",
        body: data,
      }),
    }),

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
    getBankCMLocationMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.BANK_CM_LOCATION_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    getCommodityBagMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_BAG_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    getHsnMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.HSN_MASTER,
        method: "GET",
        params: params,
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
  }),
});

export const {
  useGetDistrictMasterMutation,
  useGetStateMasterMutation,

  useGetZoneMasterMutation,
  useAddZoneMasterMutation,
  useUpdateZoneMasterMutation,

  // Api mutation for area master starts
  useGetAreaMasterMutation,
  useUpdateAreaMasterMutation,
  useAddAreaMasterMutation,
  // Api mutation for area master ends

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
  useGetRoleMasterMutation,
  useGetRolePageAssignmentMasterMutation,
  useGetUserMasterMutation,
  useAddUserMasterMutation,
  useUpdateUserMasterMutation,
  // Api mutation for commodity variety starts
  useGetCommodityVarietyMutation,
  useUpdateCommodityVarietyMutation,
  useAddCommodityVarietyMutation,
  // Api mutation for commodity variety ends

  useGetWareHouseSubTypeMutation,

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

  //Apis mutation for region master starts
  useGetRegionMasterMutation,
  useAddRegionMasterMutation,
  useUpdateRegionMasterMutation,
  //Api mutation for region master ends
  useGetWarehouseTypeMasterMutation,
  useActiveDeActiveMutation,

  useGetCommodityMasterMutation,
  useAddCommodityMasterMutation,
  useUpdateCommodityMasterMutation,
  useGetBankCMLocationMasterMutation,
  useGetEmployeeMasterMutation,
  useGetDepartmentMasterMutation,
  useGetHiringProposalMasterMutation,
  useGetCommodityBagMasterMutation,
  useGetHsnMasterMutation,
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
