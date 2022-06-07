import * as Types from './../constants/ui';

const initialState = { showloading: false, showlogin: false, };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SHOW_LOADING:
      return {
        ...state,
        showloading: true,
      };
    case Types.HIDE_LOADING:
      return {
        ...state,
        showloading: false,
      };
    case Types.SHOW_LOGIN:
      return {
        ...state,
        showlogin: true,
      };
    case Types.HIDE_LOGIN:
      return {
        ...state,
        showlogin: false,
      };
    default:
      return state;
  }
};
export default reducer;
