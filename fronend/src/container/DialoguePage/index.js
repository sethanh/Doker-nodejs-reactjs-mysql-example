import React, { Component } from 'react';
import readXlsxFile from 'read-excel-file';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Input, Space } from 'antd';
import Speech from 'react-speech';
import {withRouter,Link} from 'react-router-dom';
import * as studyActions from '../../actions/subjectActions';
import './styles.css';
import speech from 'speech-js';
const { Search } = Input;
class AdminHomePage extends Component {
  state = { data: null, txtin: "", show: false, auto: false, showtv: true, txtvn: "",voice:"",forget:"",flag:0 };
  onRandVoice=()=>{
    const rd= Math.floor(Math.random() * 6);
    switch(rd) {
      case 0:
        this.setState({voice:"Google UK English Female"});
        break;
      case 1:
        this.setState({voice:"Google US English Male"});
        break;
      case 2:
        this.setState({voice:"Google US English Female"});
        break;
      case 3:
        this.setState({voice:"Google UK English Male"});
        break;
      case 4:
        this.setState({voice:"Google UK English Female"});
        break;
      default:
        this.setState({voice:"Daniel"});
    }
  }

  render() {
    return (
      <div></div>
    );
  }
}

AdminHomePage.propTypes = {};
const mapStateToProps = state => {
  return { studydata: state };
};

const mapDispatchToProps = dispatch => {
  return {
    studyAction: bindActionCreators(studyActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(AdminHomePage);
