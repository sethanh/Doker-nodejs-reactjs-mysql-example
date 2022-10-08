import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/styles';
import Dashboard from './../../components/dashboard';
import styles from './styles';

class AdminLayoutRoute extends Component {
  render() {
    const { component: YourComponent, ...data } = this.props;
    return (
      <Route
        {...data}
        render={routeProps => {
          return (
            <Dashboard {...data}>
              <YourComponent {...routeProps} />
            </Dashboard>
          );
        }}
      />
    );
  }
}

AdminLayoutRoute.propTypes = {
  name: PropTypes.string,
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.func,
};
const witchStyles = withStyles(styles);
export default compose(witchStyles)(AdminLayoutRoute);
