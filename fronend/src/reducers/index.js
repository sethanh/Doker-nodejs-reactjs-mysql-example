import { combineReducers } from 'redux';
import login from './login';
import ui from './ui';
import modal from './modal';
import study from './study';
import subject from './subject';

const appReducers = combineReducers({
  login,
  ui,
  modal,
  study,
  subject
});
export default appReducers;
