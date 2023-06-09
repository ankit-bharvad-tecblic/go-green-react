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
    getAreaMaster: builder.mutation({
      query: (params) => ({
        url: API.DASHBOARD.AREA_MASTER,
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
} = masterApiSlice;
