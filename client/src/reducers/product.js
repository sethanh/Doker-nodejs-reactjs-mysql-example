import * as Types from './../constants/ProductTypes';

const initialState = {
  get: true,
  data: [],
};
const findIndex = (products, id) => {
  let result = -1;
  products.forEach((product, index) => {
    if (product.id === id) {
      result = index;
    }
  });
  return result;
};

const myreducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_PRODUCT:
      return { ...state, get: false };
    case Types.GET_PRODUCT_SUCCESS:
      return { ...state, data: action.payload };
    case Types.GET_PRODUCT_FAIL:
      return { ...state };
    case Types.UPDATE_PRODUCT:
      return { ...state};
    case Types.UPDATE_PRODUCT_SUCCESS:
      const {data}= state;
      data[findIndex(data,action.payload.id)]=action.payload;
      return { ...state, data}; 
    case Types.UPDATE_PRODUCT_FAIL:
      return { ...state};
    default:
      return state;
  }
};

export default myreducer;
