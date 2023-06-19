import { createSlice } from "@reduxjs/toolkit";

const dataTableFiltersSlice = createSlice({
  name: "dataTableFilters",
  initialState: {
    filtersFields: {
      isShow: false,
    },
    filterQuery: "",
  },
  reducers: {
    setUpFilterFields: (state, action) => {
      state.filtersFields = { ...state.filtersFields, ...action.payload };
    },
    setUpFilterQuery: (state, action) => {
      state.filterQuery = action.payload;
    },
  },
});

export const { setUpFilterFields, setUpFilterQuery } =
  dataTableFiltersSlice.actions;
export default dataTableFiltersSlice.reducer;
