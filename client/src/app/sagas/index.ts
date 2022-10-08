import { all } from "redux-saga/effects"

import { homeSaga } from "../../pages/home"

export default function* rootSaga() {
  yield all([
    homeSaga(),
  ])
}