import { combineReducers } from 'redux';
import login from './login';
import ui from './ui';
import modal from './modal';
import weather from './weather';
import profile from './profile';
import product from './product';

const appReducers = combineReducers({
  login,
  ui,
  modal,
  weather,
  profile,
  product
});
export default appReducers;
