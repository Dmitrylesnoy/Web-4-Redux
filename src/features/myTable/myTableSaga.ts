import { call, put, takeLatest } from "redux-saga/effects";
import { fetchTableData } from "./myTableAPI";
import { fetchTableDataRequest, fetchTableDataSuccess, fetchTableDataFailure } from "./myTableSlice";

function* fetchTableDataSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetchTableData);
    if (response.data) {
      yield put(fetchTableDataSuccess(response.data));
    } else {
      yield put(fetchTableDataFailure("No data received"));
    }
  } catch (error) {
    yield put(fetchTableDataFailure(error instanceof Error ? error.message : "Unknown error"));
  }
}

export function* watcherFetchTableData() {
  yield takeLatest(fetchTableDataRequest.type, fetchTableDataSaga);
}
