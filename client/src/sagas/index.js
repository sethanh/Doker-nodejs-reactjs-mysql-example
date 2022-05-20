import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  select,
  all
} from 'redux-saga/effects';
import * as Types from './../constants/ActionTypes';
import * as ProfileTypes from '../constants/ProfileTypes';
import * as ProductTypes from '../constants/ProductTypes';

import {
  fetchLoginSuccess,
  fetchLoginFail,
  fetchRegisterSuccess,
  fetchRegisterFail,
  filterSuccess,
  authSuccess,
  authFail
} from '../actions/loginActions';
import { showLoading, hideLoading } from '../actions/uiActions';
import { getWeatherSuccess, getWeatherFail } from '../actions/weatherActions';
import { fetchGetProfileSuccess, fetchGetProfileFail, fetchUpdateUserSuccess, fetchUpdateUserFail } from '../actions/profileActions';
import { fetchGetProductSuccess, fetchGetProductFail, fetchUpdateProductSuccess, fetchUpdateProductFail } from '../actions/ProductActions';

import { login, loginToken, register, loginFacebook } from '../apis/authApis';
import { getUser, updateUser, uploadAvatar } from '../apis/profileApis';
import { getWeather } from '../apis/weatherApis'
import { getProduct, update,updateImage } from '../apis/productApis';

import { STATUS_CODE } from './../constants/index';
import * as WeatherTypes from './../constants/WeatherTypes';

function* watchFetchLoginAction() {
  while (true) {
    yield take(Types.LOGIN_TOKEN);
    const resp = yield call(loginToken);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      const { token } = data;
      localStorage.setItem('_token', token);
      yield put(authSuccess(data));
    } else {
      yield put(authFail(data));
    }
  }
}

function* watchLogin({ payload }) {
  yield put(showLoading());
  const resp = yield call(login, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    const { token } = data;
    localStorage.setItem('_token', token);
    yield put(fetchRegisterSuccess(data));
  } else {
    yield put(fetchLoginFail(resp));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* watchLoginFacebook({ payload }) {
  yield put(showLoading());
  const resp = yield call(loginFacebook, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    const { token } = data;
    localStorage.setItem('_token', token);
    yield put(fetchLoginSuccess(data));
  } else {
    yield put(fetchLoginFail(resp));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* watchRegister({ payload }) {
  yield put(showLoading());
  const resp = yield call(register, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    const { token } = data;
    localStorage.setItem('_token', token);
    yield put(fetchLoginSuccess(data));
  } else {
    yield put(fetchRegisterFail(resp));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* watchLogout() {
  yield put(showLoading());
  localStorage.clear();
  yield delay(1000);
  yield put(hideLoading());
}

function* watchFilterLogin({ payload }) {
  yield delay(600);
  const list = yield select(state => state.login);
  yield put(filterSuccess(payload));
}

function* watchGetWeather({ payload }) {
  let body = { lat: payload.latitude, lon: payload.longitude };
  const resp = yield call(getWeather, body);
  const { status, data } = resp;
  yield put(showLoading());
  if (status === STATUS_CODE.SUCCESS) {
    yield put(getWeatherSuccess(data));
  }
  else {
    yield put(getWeatherFail(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* watchGetProfile() {
  yield put(showLoading());
  const resp = yield call(getUser);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(fetchGetProfileSuccess(data));
  } else {
    yield put(fetchGetProfileFail(resp));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* watchGetProduct() {
  yield put(showLoading());
  const resp = yield call(getProduct);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(fetchGetProductSuccess(data));
  } else {
    yield put(fetchGetProductFail(resp));
  }
  yield delay(1000);
  yield put(hideLoading());
}
function* watchUpdateProduct({ payload }) {
  yield put(showLoading());
  const { formData, ...datasProduct } = payload;
  const resp01 = yield call(update, datasProduct);
  const { status, data } = resp01;
  if (status === STATUS_CODE.SUCCESS) {
    if (formData) {
      const resp = yield call(updateImage,payload);
      const { status, data } = resp;
      if (status === STATUS_CODE.SUCCESS) {
        yield put(fetchUpdateProductSuccess(data));
      }
      else {
        yield put(fetchUpdateProductFail(resp));
      }
    }
    else {
      yield put(fetchUpdateProductSuccess(data));
    }
  } else {
    yield put(fetchUpdateProductFail(resp));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* watchUpdateUser({ payload }) {
  yield put(showLoading());
  const { formData, ...datasUser } = payload;
  const resp01 = yield call(updateUser, datasUser);
  const { status, data } = resp01;
  if (status === STATUS_CODE.SUCCESS) {
    if (formData) {
      const resp = yield call(uploadAvatar, formData);
      const { status, data } = resp;
      if (status === STATUS_CODE.SUCCESS) {
        yield put(fetchUpdateUserSuccess(data));
      }
      else {
        yield put(fetchUpdateUserFail(resp));
      }
    }
    else {
      yield put(fetchUpdateUserSuccess(data));
    }
  } else {
    yield put(fetchUpdateUserFail(resp01));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* rootSaga() {
  yield all([
    yield fork(watchFetchLoginAction),
    yield takeLatest(Types.LOGIN, watchLogin),
    yield takeLatest(Types.LOGIN_FACEBOOK, watchLoginFacebook),
    yield takeLatest(Types.LOGOUT, watchLogout),

    yield takeLatest(ProfileTypes.GET_PROFILE, watchGetProfile),
    yield takeLatest(ProfileTypes.UPDATE_USER, watchUpdateUser),

    yield takeLatest(ProductTypes.GET_PRODUCT, watchGetProduct),
    yield takeLatest(ProductTypes.UPDATE_PRODUCT, watchUpdateProduct),

    yield takeLatest(Types.REGISTER, watchRegister),
    yield takeLatest(Types.LOGIN_FILTER, watchFilterLogin),
    yield takeLatest(WeatherTypes.GET_FETCH_WEATHER_BY_CITY, watchGetWeather),
  ])
}
export default rootSaga;
