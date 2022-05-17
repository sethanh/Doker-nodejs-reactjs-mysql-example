import * as Types from './../constants/ActionTypes';

const initialState = {
  status: false,
  data: [],
  rule: 'default'
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
    case Types.LOGIN_TOKEN:
      return { ...state, status: true };
    case Types.LOGIN_TOKEN_SUCCESS:
      return { ...state, data: action.payload, rule: action.payload.rule==='customer'?'customer':'admin' };
    case Types.LOGIN_TOKEN_FAIL:
      return { ...state, rule: 'customer'};
    case Types.LOGIN:
      return { ...state, status: true };
    case Types.LOGIN_FACEBOOK:
      return { ...state, status: true };
    case Types.LOGIN_SUCCESS:
      return { ...state, data: action.payload, rule: action.payload.rule==='customer'?'customer':'admin', check: true };
    case Types.LOGIN_FAIL:
      return { ...state, rule: 'customer', error: 'sai tên đăng nhập hoặc mật khẩu' };
    case Types.LOGIN_FILTER:
      return { ...state, txtSearch: '' };
    case Types.LOGIN_FILTER_SUCCESS:
      return { ...state, txtSearch: action.payload };
    case Types.LOGOUT:
      return { ...initialState };
    case Types.REGISTER:
      return { ...state, status: true };
    case Types.REGISTER_SUCCESS:
      return { ...state, data: action.payload, rule: action.payload.rule==='customer'?'customer':'admin', check: true };
    case Types.REGISTER_FAIL:
      return { ...state, rule: 'customer', error: 'Đăng ký không thành công vui lòng kiễm tra lại' };
    default:
      return state;
  }
};

export default myreducer;
