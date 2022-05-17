import React, { Component } from 'react';
import { compose } from 'redux';
import {NavLink} from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header} = Layout;

class HeaderComponent extends Component {
  render() {
    const {onLogout}= this.props;
    return<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1"><NavLink to='/'>Home</NavLink></Menu.Item>
      <Menu.Item key="2"><NavLink to='/admin/product' >Product</NavLink> </Menu.Item>
      <Menu.Item key="3" onClick={()=>onLogout()}>Logout</Menu.Item>
    </Menu>
  </Header>
  }
}

export default compose(HeaderComponent);
