import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import Header from './header';
import SideBar from './sideBar';
import * as sibarAction from './../../actions/uiActions';

class DashBoard extends Component {
  state = { openSidebar: false };

  setOpenSideBar = value => {
    const { onSetOpenSideBar } = this.props;
    console.log(onSetOpenSideBar, value);
    const { showSideBar, hideSideBar } = onSetOpenSideBar;
    if (value) showSideBar();
    else hideSideBar();
  };

  render() {
    const { children, name, classes, openSidebar } = this.props;
    // console.log('children', children);
    return (
      <div>
        <Header
          name={name}
          onSetOpenSideBar={this.setOpenSideBar}
          open={openSidebar}
        />
        <div className={classes.wrapper}>
          <SideBar open={openSidebar} onSetOpenSideBar={this.setOpenSideBar} />
          <div className={classes.wrapperContent}>{children}</div>
        </div>
      </div>
    );
  }
}

DashBoard.propTypes = {
  children: PropTypes.object,
  name: PropTypes.string,
  classes: PropTypes.object,
  openSidebar: PropTypes.bool,
  onSetOpenSideBar: PropTypes.shape({
    showSideBar: PropTypes.func,
    hideSideBar: PropTypes.func,
  }),
};
const mapStateToProps = state => {
  const { showsidebar } = state.ui;
  return {
    openSidebar: showsidebar,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetOpenSideBar: bindActionCreators(sibarAction, dispatch),
  };
};
const ConnectedStyle = withStyles(styles);
const ConnectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(ConnectedStyle, ConnectRedux)(DashBoard);
