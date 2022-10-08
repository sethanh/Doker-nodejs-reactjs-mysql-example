import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import styles from './styles';

class FilterData extends Component {
  render() {
    const { classes, onHandleChange } = this.props;
    return (
      <form className={classes.searchbox} noValidate autoComplete="off">
        <TextField
          label="Search"
          variant="outlined"
          className={classes.field}
          onChange={onHandleChange}
        />
      </form>
    );
  }
}

FilterData.propTypes = {
  classes: PropTypes.object,
  onHandleChange: PropTypes.func,
};

export default withStyles(styles)(FilterData);
