import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface MyFormState {
  x: number | null;
  y: string;
  r: number | null;
  xError: string;
  yError: string;
  rError: string;
}

const initialState: MyFormState = {
  x: null,
  y: "",
  r: null,
  xError: "",
  yError: "",
  rError: "",
};

export const myFormSlice = createSlice({
  name: "myForm",
  initialState,
  reducers: {
    setX: (state, action: PayloadAction<number | null>) => {
      state.x = action.payload;
      state.xError = "";
    },
    setY: (state, action: PayloadAction<string>) => {
      state.y = action.payload;
      state.yError = "";
    },
    setR: (state, action: PayloadAction<number | null>) => {
      state.r = action.payload;
      state.rError = "";
    },
    validateX: (state) => {
      if (state.x === null) {
        state.xError = "X is required";
      } else if (state.x < -4 || state.x > 4) {
        state.xError = "X must be between -4 and 4";
      } else {
        state.xError = "";
      }
    },
    validateY: (state) => {
      const yNum = parseFloat(state.y);
      if (isNaN(yNum)) {
        state.yError = "Y must be a number";
      } else if (yNum < -5 || yNum > 3) {
        state.yError = "Y must be between -5 and 3";
      } else {
        state.yError = "";
      }
    },
    validateR: (state) => {
      if (state.r === null) {
        state.rError = "R is required";
      } else if (state.r <= 0) {
        state.rError = "R must be positive";
      } else {
        state.rError = "";
      }
    },
    resetForm: (state) => {
      return { ...initialState };
    },
    submitForm: (state) => {},
  },
});

export const { setX, setY, setR, validateX, validateY, validateR, resetForm, submitForm } = myFormSlice.actions;

export const selectMyForm = (state: RootState) => state.myForm;

export default myFormSlice.reducer;
