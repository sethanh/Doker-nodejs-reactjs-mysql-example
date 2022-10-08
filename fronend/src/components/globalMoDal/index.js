import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import styles from './styles';
import * as modalAction from './../../actions/ModalAction';

class GlobalModal extends Component {
  handleClose = () => {
    const { onHandleClose } = this.props;
    const { closeModal } = onHandleClose;
    closeModal();
  };

  render() {
    const { classes, open } = this.props;
    return (
      <div>
        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper}>jjj</div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { openModal } = state.modal;
  return { open: openModal };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleClose: bindActionCreators(modalAction, dispatch),
  };
};
GlobalModal.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onHandleClose: PropTypes.shape({
    closeModal: PropTypes.func,
  }),
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(GlobalModal);
