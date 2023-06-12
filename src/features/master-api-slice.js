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
