import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import Header from './header';
import SideBar from './sideBar';
import Footer from './footer';
import * as AuthActions from '../../../actions/loginActions';
import { LoginPage } from './../../../container'
import { MainModal } from '../../index'
import { Redirect } from 'react-router-dom';
import './style.css'
class DashBoard extends Component {
  state = {
    showAuthPage: false
  }
  componentWillReceiveProps(nextProps) {
    const { check } = nextProps;
    const { showAuthPage } = this.state;
    if (showAuthPage && check) {
      this.setState({ showAuthPage: false });
    }
  }

  onLogout = () => {
    const { AuthAction } = this.props;
    const { fetchLogout } = AuthAction;
    fetchLogout();
  }
  render() {
    const { children, data, rule, check } = this.props;
    const { showAuthPage } = this.state;
    if (rule === 'admin' && check) {
      return (<Redirect to='/admin' />)
    }
    return (
      <div className='container_customer'>
        {showAuthPage
          &&
          <MainModal hideModal={() => this.setState({ showAuthPage: false })} >
            <LoginPage hideModal={() => this.setState({ showAuthPage: false })} />
          </MainModal>
        }
        <Header
          user={data}
          showAuthPage={() => this.setState({ showAuthPage: true })}
          onLogout={this.onLogout}
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
