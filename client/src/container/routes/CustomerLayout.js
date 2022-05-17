import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import {CustomerDashBoard} from './../../components';

class CustomerLayout extends Component {
  render() {
    const { component: YourComponent, ...data } = this.props;
    return (
      <Route
        {...data}
        render={routeProps => {
          return (
            <CustomerDashBoard {...data}>
              <YourComponent {...routeProps} />
            </CustomerDashBoard>
          );
        }}
      />
    );
  }
}
export default compose(CustomerLayout);
