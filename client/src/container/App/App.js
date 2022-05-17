import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import * as AuthActions from '../../actions/loginActions';
import { ADMIN_ROUTES, CUSTOMER_ROUTES, AdminLayout, CustomerLayout, AuthLayout, AUTH_ROUTES } from './../routes';

class App extends Component {
  componentDidMount() {
    const { login } = this.props;
    const { status } = login;
    if (!status) {
      const { AuthAction } = this.props;
      const { fetchLoginNew } = AuthAction;
      fetchLoginNew();
    }
  }
  renderAdminRoutes = () => {
    let xhtml = null;
    xhtml = ADMIN_ROUTES.map(route => {
      return (
        <AdminLayout
          path={route.path}
          key={route.path}
          component={route.component}
          name={route.name}
          exact={route.exact}
        />
      );
    });
    return xhtml;
  };
  renderCustomerRoutes = () => {
    let xhtml = null;
    xhtml = CUSTOMER_ROUTES.map(route => {
      return (
        <CustomerLayout
          path={route.path}
          key={route.path}
          component={route.component}
          name={route.name}
          exact={route.exact}
        />
      );
    });
    return xhtml;
  };
  renderAuthRoutes = () => {
    let xhtml = null;
    const { login } = this.props;
    const { status, data, rule } = login;
    xhtml = AUTH_ROUTES.map(route => {
      return (
        <AuthLayout 
          path={route.path}
          key={route.path}
          component={route.component}
          name={route.name}
          exact={route.exact}
          status= {status}
          rule= {rule}
        />
      );
    });
    return xhtml;
  }

  render() {
    return (
      <Router>
        <Switch>
          {this.renderAdminRoutes()}
          {this.renderCustomerRoutes()}
          {this.renderAuthRoutes()}
        </Switch>
      </Router>
    );
  }
}
App.propTypes = {};
const mapStateToProps = state => {
  return { login: state.login };
};

const mapDispatchToProps = dispatch => {
  return {
    AuthAction: bindActionCreators(AuthActions, dispatch),
  };
};
const witchConect = connect(mapStateToProps, mapDispatchToProps);
export default compose(witchConect)(App);
