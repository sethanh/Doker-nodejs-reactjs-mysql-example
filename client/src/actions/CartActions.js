import * as Types from '../constants/CartTypes';

export const fetchGetCart = () => {
  return {
    type: Types.GET_CART,
  };
};

export const fetchGetCartSuccess = data => {
  return {
    type: Types.GET_CART_SUCCESS,
    payload: data.data,
  };
};
export const fetchGetCartFail = error => {
  return {
    type: Types.GET_CART_FAIL,
    payload: error,
  };
};

export const fetchCreateCart = (payload) => {
  return {
    type: Types.CREATE_CART,
    payload
  };
};

export const fetchCreateCartSuccess = data => {
  return {
    type: Types.CREATE_CART_SUCCESS,
    payload: data.data,
  };
};
export const fetchCreateCartFail = error => {
  return {
    type: Types.CREATE_CART_FAIL,
    payload: error,
  };
};

export const fetchUpdateCart = (payload) => {
  return {
    type: Types.UPDATE_CART,
    payload
  };
};

export const fetchUpdateCartSuccess = data => {
  return {
    type: Types.UPDATE_CART_SUCCESS,
    payload: data.data,
  };
};
export const fetchUpdateCartFail = error => {
  return {
    type: Types.UPDATE_CART_FAIL,
    payload: error,
  };
};

