import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import Header from './header';
import SideBar from './sideBar';
import Footer from './footer';
import * as AuthActions from '../../../actions/loginActions';
import * as LoginActions from '../../../actions/uiActions';
import { LoginPage } from './../../../container'
import { MainModal } from '../../index'
import { Redirect } from 'react-router-dom';
import './style.css'
class DashBoard extends Component {
  componentWillReceiveProps(nextProps) {
    const { check } = nextProps;
    const { showlogin,LoginAction } = this.props;
    const {hideLogin} = LoginAction;
    if (showlogin && check) {
     hideLogin();
    }
  }
  onHideLogin=()=>{
    const { LoginAction } = this.props;
    const {hideLogin} = LoginAction;
    hideLogin();
  }

  onshowlogin=()=>{
    const { LoginAction } = this.props;
    const {showLogin} = LoginAction;
    showLogin();
  }

  onLogout = () => {
    const { AuthAction } = this.props;
    const { fetchLogout } = AuthAction;
    fetchLogout();
  }
  render() {
    const { children, data, rule, check, cart } = this.props;
    const { showlogin } = this.props;
    console.log(showlogin);
    if (rule === 'admin' && check) {
      return (<Redirect to='/admin' />)
    }
    return (
      <div className='container_customer'>
        {showlogin
          &&
          <MainModal hideModal={this.onHideLogin} >
            <LoginPage hideModal={this.onHideLogin} />
          </MainModal>
        }
        <Header
          user={data}
          showLogin={this.onshowlogin}
          onLogout={this.onLogout}
          cart={cart}
        />
        <div className="grid_small_pc grid_big_pc">
          <SideBar />
          {children}
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { login,ui,cart } = state;
  const { data, rule, check } = login;
  const {showlogin}=ui;
  return { data, rule, check,showlogin,cart};
};

const mapDispatchToProps = dispatch => {
  return {
    AuthAction: bindActionCreators(AuthActions, dispatch),
    LoginAction: bindActionCreators(LoginActions, dispatch),
  };
};
const ConnectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(ConnectRedux)(DashBoard);
