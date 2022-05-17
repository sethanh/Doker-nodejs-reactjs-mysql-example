import * as Types from '../constants/ActionTypes';
import { successNote, errorNote } from '../commons/helpers/notefile';

export const fetchLoginNew = () => {
  return {
    type: Types.LOGIN_TOKEN,
  };
};

export const authSuccess = data => {
  return {
    type: Types.LOGIN_TOKEN_SUCCESS,
    payload: data.data,
  };
};
export const authFail = error => {
  return {
    type: Types.LOGIN_TOKEN_FAIL,
    payload: error,
  };
};

export const fetchLogin = payload => {
  return {
    type: Types.LOGIN,
    payload
  };
};
export const fetchLoginFacebook = payload => {
  return {
    type: Types.LOGIN_FACEBOOK,
    payload
  };
};
export const fetchLoginSuccess = data => {
  successNote('Đăng nhập thành công');
  return {
    type: Types.LOGIN_SUCCESS,
    payload: data.data,
  };
};
export const fetchLoginFail = error => {
  errorNote('Đăng nhập thất bại');
  return {
    type: Types.LOGIN_FAIL,
    payload: error,
  };
};

export const fetchLogout = () => {
  return {
    type: Types.LOGOUT,
  };
};

export const fetchRegisterSuccess = data => {
  const payload = data.data;
  return {
    type: Types.REGISTER_SUCCESS,
    payload
  };
};
export const fetchRegisterFail = payload => {
  return {
    type: Types.REGISTER_FAIL,
    payload
  };
};
export const fetchRegister = payload => {
  return {
    type: Types.REGISTER,
    payload
  };
};

export const filterLogin = value => {
  return {
    type: Types.LOGIN_FILTER,
    payload: value,
  };
};

export const filterSuccess = data => {
  return {
    type: Types.LOGIN_FILTER_SUCCESS,
    payload: data,
  };
};


// export const fetchLogin = () => {
//   return dispatch => {
//     dispatch(fetchLoginNew());
//     loginApis
//       .getList()
//       .then(resp => {
//         const { data } = resp;
//         dispatch(fetchLoginSuccess(data));
//       })
//       .catch(error => {
//         dispatch(fetchLoginFail(error));
//       });
//   };
// };
