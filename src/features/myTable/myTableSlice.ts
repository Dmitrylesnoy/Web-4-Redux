import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPointsData } from "./myTableAPI";

export interface PointData {
  x: number;
  y: number;
  r: number;
  hit: boolean;
  execTime: number;
  date: string;
}

export interface MyTableState {
  data: PointData[];
  error?: string;
}

const initialState: MyTableState = {
  data: [],
};

export const fetchPointsDataThunk = createAsyncThunk("myTable/fetchPointsDataThunk", async () => {
  return await fetchPointsData();
});

const myTableSlice = createSlice({
  name: "myTable",
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<PointData[]>) => {
      state.data = action.payload;
    },
    addTableData: (state, action: PayloadAction<PointData>) => {
      state.data.push(action.payload);
    },
    clearTableData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPointsDataThunk.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.data = action.payload.data;
        }
        state.error = undefined;
      })
      .addCase(fetchPointsDataThunk.rejected, (state, action) => {
        state.error = action.error.message || "Submission failed";
      });
  },
});

export const { setTableData, addTableData, clearTableData } = myTableSlice.actions;
export default myTableSlice.reducer;
