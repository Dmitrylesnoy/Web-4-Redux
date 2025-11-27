import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import myFormReducer from "../features/myForm/myFormSlice";
import myTableReducer from "../features/myTable/myTableSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    myForm: myFormReducer,
    myTable: myTableReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
