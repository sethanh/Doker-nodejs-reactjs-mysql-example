import * as Types from './../constants/CartTypes';

const initialState = {
  get: true,
  data: [],
};
const findIndex = (CARTs, id) => {
  let result = -1;
  CARTs.forEach((CART, index) => {
    if (CART.id === id) {
      result = index;
    }
  });
  return result;
};

const myreducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_CART:
      return { ...state, get: false };
    case Types.GET_CART_SUCCESS:
      return { ...state, data: action.payload };
    case Types.GET_CART_FAIL:
      return { ...state };

    case Types.CREATE_CART:
      return { ...state };
    case Types.CREATE_CART_SUCCESS:
      return { ...state,  data: action.payload };
    case Types.CREATE_CART_FAIL:
      return { ...state };

    case Types.UPDATE_CART:
      return { ...state };
    case Types.UPDATE_CART_SUCCESS:
      const { data } = state;
      data[findIndex(data, action.payload.id)] = action.payload;
      return { ...state, data };
    case Types.UPDATE_CART_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default myreducer;
