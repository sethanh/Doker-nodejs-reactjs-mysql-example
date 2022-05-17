import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import './style.css'
class MainModal extends Component {
  render() {
    const { children,hideModal } = this.props;
    return (
      <div className='container_main_modal'>
         {children}
        <div className='bg_main_modal' onClick={()=>hideModal()}></div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
  };
};
const ConnectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(ConnectRedux)(MainModal);
