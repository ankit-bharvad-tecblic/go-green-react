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
  }),
});

export const { useSaveAsDraftMutation, useFetchLocationDrillDownMutation } =
  warehouseProposalApiSlice;
