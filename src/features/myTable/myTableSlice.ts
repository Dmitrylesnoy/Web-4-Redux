import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { drawPoint } from "../graph/Graph";

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

export const addPointDataThunk = createAsyncThunk(
  "myTable/addPointDataThunk",
  async ({ pointData, canvas }: { pointData: PointData; canvas: HTMLCanvasElement | null }, { dispatch }) => {
    dispatch(addPointData(pointData));
    drawPoint(canvas, pointData.x, pointData.y, pointData.hit);
  }
);

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
