import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import LoadingIcon from './../../assets/images/loading.gif';
import * as uiAction from '../../actions/uiActions';

class GlobalLoading extends Component {
  render() {
    const { classes, showLoading } = this.props;
    console.log('A', showLoading);
    let xhtml = null;
    if (showLoading) {
      xhtml = (
        <div className={classes.globalloadding}>
          <img src={LoadingIcon} alt="loading icon" className={classes.icon} />
        </div>
      );
    }
    return xhtml;
  }
}
const mapStateToProps = state => {
  return { showLoading: state.ui.showloading };
};

const mapDispatchToProps = dispatch => {
  return {
    uiAction: bindActionCreators(uiAction, dispatch),
  };
};
GlobalLoading.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(GlobalLoading);
