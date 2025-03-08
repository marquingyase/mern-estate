import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
