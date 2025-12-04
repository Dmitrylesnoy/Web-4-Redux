import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import myFormReducer from "../features/myForm/myFormSlice";
import myTableReducer from "../features/myTable/myTableSlice";
import rootSaga from "./rootSaga";
import authSliceReducer from "../features/auth/authSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    myForm: myFormReducer,
    myTable: myTableReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
