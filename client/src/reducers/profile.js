import * as Types from './../constants/ProfileTypes';

const initialState = {
  get: true,
  data: {},
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
    case Types.GET_PROFILE:
      return { ...state, get: false };
    case Types.GET_PROFILE_SUCCESS:
      return { ...state, data: action.payload};
    default:
      return state;
  }
};

export default myreducer;
