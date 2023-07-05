import { apiSlice } from "../app/api/apiSlice";
import { API } from "../constants/api.constants";

export const warehouseProposalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveAsDraft: builder.mutation({
      query: (data) => ({
        url: API.WAREHOUSE_PROPOSAL.SAVE_AS_DRAFT,
        method: "POST",
        body: data,
      }),
    }),
    fetchLocationDrillDown: builder.mutation({
      query: (query) => ({
        url: API.COMMON_API_END_POINTS.LOCATION_DRILL_DOWN,
        method: "GET",
        params: query,
      }),
    }),

    getSupervisorDayShift: builder.mutation({
      query: () => ({
        url: API.WAREHOUSE_PROPOSAL.SUPERVISOR_DAY,
        method: "GET",
      }),
    }),
    getSupervisorNightShift: builder.mutation({
      query: () => ({
        url: API.WAREHOUSE_PROPOSAL.SUPERVISOR_NIGHT,
        method: "GET",
      }),
    }),

    getSecurityGuardDayShift: builder.mutation({
      query: () => ({
        url: API.WAREHOUSE_PROPOSAL.SUPERVISOR_DAY,
        method: "GET",
      }),
    }),
    getSecurityGuardNightShift: builder.mutation({
      query: () => ({
        url: API.WAREHOUSE_PROPOSAL.SECURITY_NIGHT,
        method: "GET",
      }),
    }),
    calculatePBPM: builder.mutation({
      query: () => ({
        url: API.WAREHOUSE_PROPOSAL.PBPM,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSaveAsDraftMutation,
  useFetchLocationDrillDownMutation,
  useGetSupervisorDayShiftMutation,
  useGetSupervisorNightShiftMutation,

  useGetSecurityGuardDayShiftMutation,
  useGetSecurityGuardNightShiftMutation,

  useCalculatePBPMMutation,
} = warehouseProposalApiSlice;
