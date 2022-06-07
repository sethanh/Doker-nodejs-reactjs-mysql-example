import { combineReducers } from 'redux';
import login from './login';
import ui from './ui';
import modal from './modal';
import weather from './weather';
import profile from './profile';
import product from './product';
import cart from './cart';

const appReducers = combineReducers({
  login,
  ui,
  modal,
  weather,
  profile,
  product,
  cart
});
export default appReducers;
