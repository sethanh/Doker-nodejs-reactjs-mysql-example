import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';
class LoginPage extends Component {
  render() {
    const { rule, status } = this.props;
    if (rule === 'customer' && status) {
      return (<Redirect to='/home' />)
    }
    else if (rule === 'admin' && status) {
      return (<Redirect to='/admin' />)
    }
    return (
      <div className='container_splash'>
        welcome to Milk Tea
      </div>
    );
  }
}
export default LoginPage;
