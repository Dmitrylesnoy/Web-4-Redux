import { call, put, takeLatest, select } from "redux-saga/effects";
import { submitFormData } from "./myFormAPI";
import { submitFormRequest, submitFormSuccess, submitFormFailure } from "./myFormSlice";
import { addTableData } from "../myTable/myTableSlice";

function* submitFormSaga(action: ReturnType<typeof submitFormRequest>): Generator<any, void, any> {
  try {
    const state = yield select();
    const token = state.auth.token;

    const response: any = yield call(submitFormData, action.payload, action.payload.graphFlag || false, token);
    if (response.error) {
      yield put(submitFormFailure(response.error));
    } else {
      yield put(submitFormSuccess(response));
      yield put(addTableData(response));
    }
  } catch (error) {
    yield put(submitFormFailure(error instanceof Error ? error.message : "Unknown error"));
  }
}

export function* watcherSubmitForm() {
  yield takeLatest(submitFormRequest.type, submitFormSaga);
}
