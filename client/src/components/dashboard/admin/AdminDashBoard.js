import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import * as AuthActions from '../../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header';
import SideBar from './sideBar';
import Footer from './footer';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Content, Sider } = Layout;
class DashBoard extends Component {
  onLogout = () => {
    const { AuthAction } = this.props;
    const { fetchLogout } = AuthAction;
    fetchLogout();
  }
  render() {
    const { children,rule,check } = this.props;
    if (rule !== 'admin' && !check) {
      return (<Redirect to='/home' />)
    }
    return (
      <Layout>
        <Header onLogout={()=>this.onLogout()}/>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <SideBar />
            <Content style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
          </Layout>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  const { login } = state;
  const { data, rule, check } = login;
  return { data, rule, check };
};

const mapDispatchToProps = dispatch => {
  return {
    AuthAction: bindActionCreators(AuthActions, dispatch),
  };
};
const ConnectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(ConnectRedux)(DashBoard);
