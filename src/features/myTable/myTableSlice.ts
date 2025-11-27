import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PointData {
  x: number;
  y: number;
  r: number;
  hit: boolean;
  execTime: number;
  dataFormatted: string;
}

export interface MyTableState {
  data: PointData[];
}

const initialState: MyTableState = {
  data: [],
};

const myTableSlice = createSlice({
  name: "myTable",
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<PointData[]>) => {
      state.data = action.payload;
    },
    addPointData: (state, action: PayloadAction<PointData>) => {
      state.data.push(action.payload);
    },
    clearTableData: (state) => {
      state.data = [];
    },
  },
});

export const { setTableData, addPointData, clearTableData } = myTableSlice.actions;
export default myTableSlice.reducer;
