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