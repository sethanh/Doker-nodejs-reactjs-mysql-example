import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'redux';

class AuthLayout extends Component {
  render() {
    const { component: YourComponent, rule, status ,...data } = this.props;
    return (
      <Route
        {...data}
        render={routeProps => {
          return (
              <YourComponent {...routeProps}  rule={rule} status={status}/>
          );
        }}
      />
    );
  }
}
export default compose(AuthLayout);
