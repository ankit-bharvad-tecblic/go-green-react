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
  }),
});

export const { useSaveAsDraftMutation } = warehouseProposalApiSlice;
