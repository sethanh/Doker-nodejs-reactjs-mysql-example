import React from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import store from './store'
import { i18n } from './config'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppProvider = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  )
}

export default AppProvider
