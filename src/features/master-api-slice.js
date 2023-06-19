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
    getZoneMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.ZONE_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    getBankMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.BANK_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    getBankBranchMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.BANK_BRANCH_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    getEarthQuakeZoneTypeMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.EARTHQUAKE_ZONE_TYPE_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    getInsuranceCompanyMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.INSURANCE_COMPANY_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    getRegionMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.REGION_MASTER,
        method: "GET",
        params: params,
      }),
    }),
    getAreaMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.AREA_MASTER,
        method: "GET",
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
    getCommodityGrade: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_GRADE,
        method: "GET",
        params: params,
      }),
    }),
    getCommodityMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.COMMODITY_MASTER,
        method: "GET",
        params: params,
      }),
    }),
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
  }),
});

export const {
  useGetDistrictMasterMutation,
  useGetStateMasterMutation,
  useGetZoneMasterMutation,
  useGetAreaMasterMutation,
  useGetBankMasterMutation,
  useGetBankBranchMasterMutation,
  useGetCommodityTypeMasterMutation,
  useGetCommodityGradeMutation,
  useGetCommodityMasterMutation,
  useGetPageMasterMutation,
  useGetRoleMasterMutation,
  useGetRolePageAssignmentMasterMutation,
  useGetUserMasterMutation,
  useGetCommodityVarietyMutation,
  useGetWareHouseSubTypeMutation,
  useGetSecurityAgencyMasterMutation,
  useGetSecurityGuardMasterMutation,
  useGetEarthQuakeZoneTypeMasterMutation,
  useGetInsuranceCompanyMasterMutation,
  useGetRegionMasterMutation,

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
