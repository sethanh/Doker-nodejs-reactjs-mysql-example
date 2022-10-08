import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import store from './redux/store';
import App from './container/App/App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoading from './components/globalLoading/index';
import theme from './commons/theme/theme';
import GlobalModal from './components/globalMoDal/index';

// const store = createStore(
//   appReducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(thunk),
// );

ReactDOM.render(
  <Provider store={store()}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <GlobalModal />
      <GlobalLoading />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
reportWebVitals();
