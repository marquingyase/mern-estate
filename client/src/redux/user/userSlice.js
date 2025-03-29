import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   isAuthenticated: false,
  user: null,
  // error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    failure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { start, success, failure, logout } = userSlice.actions;

export default userSlice.reducer;
