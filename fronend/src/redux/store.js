import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import appReducers from './../reducers/index';
import mySaga from './../sagas/index';

// const composeEnhancers =
//   process.env.NODE_ENV !== 'production' &&
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         shouldHotReload: false,
//       })
//     : compose;
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];
const configStore = () => {
  const store = createStore(appReducers, composeWithDevTools(...enhancers));
  sagaMiddleware.run(mySaga);
  return store;
};

export default configStore;
