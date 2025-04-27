import { configureStore } from "@reduxjs/toolkit";
import osintReducer from "./osintSlice/osintSlice";
import webutationFormReducer from "./webutationFormSlice/webutationFormSlice";
import peopleDataLabsReducer from "./peopleDataLabsSlice/peopleDataLabsSlice";

const store = configureStore({
  reducer: {
    osint: osintReducer,
    webutationForm: webutationFormReducer,
    peopleDataLabs: peopleDataLabsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
