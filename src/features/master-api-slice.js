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
