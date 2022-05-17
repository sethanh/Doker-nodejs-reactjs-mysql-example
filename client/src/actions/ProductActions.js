import * as Types from '../constants/ProductTypes';

export const fetchGetProduct = () => {
  return {
    type: Types.GET_PRODUCT,
  };
};

export const fetchGetProductSuccess = data => {
  return {
    type: Types.GET_PRODUCT_SUCCESS,
    payload: data.data,
  };
};
export const fetchGetProductFail = error => {
  return {
    type: Types.GET_PRODUCT_FAIL,
    payload: error,
  };
};

export const fetchUpdateProduct = (payload) => {
  return {
    type: Types.UPDATE_PRODUCT,
    payload
  };
};

export const fetchUpdateProductSuccess = data => {
  return {
    type: Types.UPDATE_PRODUCT_SUCCESS,
    payload: data.data,
  };
};
export const fetchUpdateProductFail = error => {
  return {
    type: Types.UPDATE_PRODUCT_FAIL,
    payload: error,
  };
};