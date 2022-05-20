import * as Types from '../constants/ProfileTypes';

export const fetchGetProfile = () => {
  return {
    type: Types.GET_PROFILE,
  };
};

export const fetchGetProfileSuccess = data => {
  return {
    type: Types.GET_PROFILE_SUCCESS,
    payload: data.data,
  };
};
export const fetchGetProfileFail = error => {
  return {
    type: Types.GET_PROFILE_FAIL,
    payload: error,
  };
};

export const fetchUpdateUser = payload => {
  return {
    type: Types.UPDATE_USER,
    payload
  };
};

export const fetchUpdateUserSuccess = data => {
  return {
    type: Types.UPDATE_USER_SUCCESS,
    payload: data.data,
  };
};
export const fetchUpdateUserFail = error => {
  return {
    type: Types.UPDATE_USER_FAIL,
    payload: error,
  };
};