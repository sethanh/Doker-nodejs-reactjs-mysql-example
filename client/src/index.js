import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import {App} from './container';
import reportWebVitals from './reportWebVitals';
import GlobalLoading from './components/globalLoading/index';
import GlobalModal from './components/globalMoDal/index';
import './index.css';
import 'antd/dist/antd.css';
import './assets/theme/themeColor.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Provider store={store()}>
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
  </Provider>,
  document.getElementById('root'),
);
reportWebVitals();
