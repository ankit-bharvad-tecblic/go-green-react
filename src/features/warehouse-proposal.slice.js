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
      query: (data) => ({
        url: API.WAREHOUSE_PROPOSAL.PBPM,
        method: "POST",
        body: data,
      }),
    }),
    minMaxAvg: builder.mutation({
      query: (id) => ({
        url: `${API.WAREHOUSE_PROPOSAL.MIN_MAX_AVG}${id}/min_max_average_rent/`,
        method: "GET",
      }),
    }),

    getWarehouseType: builder.mutation({
      query: (id) => ({
        url: `${API.WAREHOUSE_PROPOSAL.GET_WAREHOUSE_TYPE}`,
        method: "GET",
      }),
    }),
    getWarehouseSubType: builder.mutation({
      query: (id) => ({
        url: `${API.WAREHOUSE_PROPOSAL.GET_WAREHOUSE_SUB_TYPE}`,
        method: "GET",
      }),
    }),

    getWarehouseProposalDetails: builder.mutation({
      query: (id) => ({
        url: `${API.WAREHOUSE_PROPOSAL.WAREHOUSE_PROPOSAL_DETAILS}${id}`,
        method: "GET",
      }),
    }),

    // warehouse/warehousehiring_proposal/420
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
  useMinMaxAvgMutation,

  useGetWarehouseTypeMutation,
  useGetWarehouseSubTypeMutation,
  useGetWarehouseProposalDetailsMutation,
} = warehouseProposalApiSlice;
