import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import errorSlice from "./errorSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    error: errorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type TStore = ReturnType<typeof store.getState>;
