import { put, takeLatest } from 'redux-saga/effects'
import { actionTest, actionTestSuccess } from '../reducers'

function* onTest({ payload }: any) {

    yield put(actionTestSuccess('Thanh cong'))
  
}

export function* watchHome() {
  yield takeLatest(actionTest.type, onTest)
}