import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import { persistReducer , persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer, // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other reducers here, like: homeReducer, cartReducer, etc.  // Add your other
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Your reducers go here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Enable this to allow actions with non-serializable payloads
      // immutableCheck: false, // Enable this to allow state mutations
      // thunk: true, // Enable this to allow asynchronous actions
      // other middleware you want to use...
    }), // Add any middleware you need here
});

export const persistor = persistStore(store);
