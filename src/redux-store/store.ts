import { configureStore } from "@reduxjs/toolkit";
import osintReducer from "./osintSlice/osintSlice";

const store = configureStore({
  reducer: {
    osint: osintReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
