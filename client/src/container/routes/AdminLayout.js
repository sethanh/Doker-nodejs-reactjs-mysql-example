import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import {AdminDashBoard} from '../../components';

class AdminLayout extends Component {
  render() {
    const { component: YourComponent, ...data } = this.props;
    return (
      <Route
        {...data}
        render={routeProps => {
          return (
            <AdminDashBoard {...data}>
              <YourComponent {...routeProps} />
            </AdminDashBoard>
          );
        }}
      />
    );
  }
}
export default compose(AdminLayout);
