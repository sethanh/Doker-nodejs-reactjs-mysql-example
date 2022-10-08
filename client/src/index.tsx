import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import AppProvider from './app/AppProvider'
import 'antd/dist/antd.css';

ReactDOM.render(
  <AppProvider/>,
  document.getElementById('root'),
);
reportWebVitals();
