import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import {NavLink} from 'react-router-dom';
import './styles.css';

class Header extends Component {
  render() {
    const { classes } = this.props;
    return<div className='header'>
      <NavLink className='btn_header' to='/'  activeStyle={{ color: 'blue' }} exact={true}>Home</NavLink>
      <NavLink className='btn_header' to='/subject' activeStyle={{ color: 'blue' }}>Subject</NavLink>
      <div className='btn_header'>Online</div>
    </div>
  }
}

Header.propTypes = {
  classes: PropTypes.object,
};
const ConnectedStyle = withStyles(styles);
export default compose(ConnectedStyle)(Header);
