import { configureStore } from "@reduxjs/toolkit";
import osintReducer from "./osintSlice/osintSlice";
import webutationFormReducer from "./webutationFormSlice/webutationFormSlice";

const store = configureStore({
  reducer: {
    osint: osintReducer,
    webutationForm: webutationFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
