import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  }, // Your reducers go here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Enable this to allow actions with non-serializable payloads
      // immutableCheck: false, // Enable this to allow state mutations
      // thunk: true, // Enable this to allow asynchronous actions
      // other middleware you want to use...
    }), // Add any middleware you need here
});
