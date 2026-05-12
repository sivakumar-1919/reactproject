import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    search: "",
    minPrice: 0,
    maxPrice: Infinity,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
  },
});

export const { setSearch, setPriceRange } = filterSlice.actions;
export default filterSlice.reducer;