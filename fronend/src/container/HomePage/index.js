import React, { Component } from 'react';
import readXlsxFile from 'read-excel-file';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Input, Space } from 'antd';
import Speech from 'react-speech';
import * as studyActions from '../../actions/studyActions';
import './styles.css';
import { useSpeechSynthesis } from 'react-speech-kit';
const { Search } = Input;
class AdminHomePage extends Component {
  state = { data: null, txtin: "", show: false, auto: false, showtv: true, txtvn: ""};

  componentDidMount() {
    const { studydata } = this.props;
    const { study } = studydata;
    const { data } = study;
    const { stt } = study;
    if (data.length === 0) {
      const { studyAction } = this.props;
      const { getStudy } = studyAction;
      getStudy();
    }
  }
  check = (t1, t2) => {
    let n1 = t1.length;
    let n2 = t2.length;
    let i = 0;
    let s1 = '';
    let s2 = '';
    for (i; i < n1; i++) {
      if (t1[i] === t2[i]) {
        s1 = s1 + t1[i]
      }
      else {
        while (i < n1) {
          s2 = s2 + t1[i]
          i = i + 1
        }
      }
    }
    let data = [s1, s2];
    return data;
  }
  onChange = e => {
    e.preventDefault();
    const { files } = e.target;
    const f = files[0];
    readXlsxFile(f).then(rows => {
      this.setState({ data: rows });
    });
  };
  onRandom=()=>{
    const { studyAction } = this.props;
    const {fetchRandom}= studyAction;
    fetchRandom();
  }

  onClick = () => {
    const { data } = this.state;
    const { studyAction } = this.props;
    const { fetchCreateMultiple } = studyAction;
    fetchCreateMultiple(data);
  };

  onNext = (value) => {
    const { studyAction } = this.props;
    const { fetchOnNextStudy } = studyAction;
    fetchOnNextStudy(value);
    this.setState({ txtin: '',txtvn:'' });
  };

  onChangeNumber = e => {
    const { target } = e;
    const { value } = target;
    this.setState({
      number: value,
    });
  };
  myFunction = (value) => {
    alert(value);
  }
  onSetNumber = () => {
    const { number } = this.state;
    const { studyAction } = this.props;
    const { fetchOnSetNumberStudy } = studyAction;
    fetchOnSetNumberStudy(Number(number));
  };

  render() {
    const { studydata } = this.props;
    const { study } = studydata;
    const { data } = study;
    const { stt } = study;
    const { txtin, show, auto, showtv,txtvn ,st} = this.state;
    const a = this.check(txtin, data.length > 0 ? data[stt].english : 'xx');
    const b = this.check(txtvn, data.length > 0 ? data[stt].vietnam : 'xx');
    if (txtin, data.length > 0 && txtin === data[stt].english && auto) {
      this.onNext(1);
    }
    console.log(a);
    return (
      <div className="fontbase">
        <div onClick={() => { this.setState({ auto: !auto }) }} className="btninsert" key="insert">
          {auto ? 'auto' : 'manual'}
        </div>
        <input type="file" id="input" onChange={e => this.onChange(e)} />
        <div onClick={this.onClick} className="btninsert" key="insert">
          insert
        </div>
        <div onClick={this.onRandom} className="btninsert" key="insert">
          random
        </div>
        <div onClick={() => { this.setState({ showtv: !showtv }) }} className="btninsert" key="insert">
          {showtv ? 'empty' : 'vietnamese'}
        </div>
        {data.length > 0 ? (
          <div className="flexrow">
            {showtv ? <div style={{ flex: 1 }}>{data[stt].vietnam}</div> :
            <Input placeholder="việt Nam" style={{ flex: 1 }} onChange={(e) => { this.setState({ txtvn: e.target.value }) }} value={txtvn} />}
            <div style={{width:60}}></div>
            <Input placeholder="english text" style={{ flex: 1 }} onChange={(e) => { this.setState({ txtin: e.target.value }) }} value={txtin} />
          </div>
        ) : null}
        {data.length > 0 ? <div className="flexrow" style={{ marginTop: 10 }}>
          <div style={{ width: '50%', color: 'green', display: 'flex', flexDirection: 'row' }}>
            <div style={{ color: txtvn === data[stt].vietnam? '#1313f0' : 'green' }}>{b[0]}</div>
            <div style={{ color: 'red' }}>{b[1]}</div>
            <div style={{ width: 100 }}></div>
          </div>
          <div style={{ width: '50%', color: 'green', display: 'flex', flexDirection: 'row' }}>
            <div style={{ color: txtin === data[stt].english ? '#1313f0' : 'green' }}>{a[0]}</div>
            <div style={{ color: 'red' }}>{a[1]}</div>
            <div style={{ width: 100 }}></div>
          </div>
        </div> : null}
        {data.length > 0 ?  <div className="flexrow" >
          <Speech
          text={data[stt].english}/>
          <div className="fa fa-assistive-listening-systems" style={{width:'100%',paddingRight:'99%'}}></div>
          </div> : null}
        {show && data.length > 0 ? <div style={{ color: 'black' }}>{data[stt].english}</div> : null}

        <div className='btnshow' onClick={() => { this.setState({ show: !show }) }}> show</div>
        <div className="flexrow" >
        <div onClick={()=>this.onNext(-1)} className="btninsert" style={{flexGrow:1}}>
          pre
        </div>
        <div style={{width:60}}></div>
        <div onClick={()=>this.onNext(1)} className="btninsert" style={{flexGrow:1}}>
          next
        </div>
        </div>
        <Space direction="vertical">
          <Search
            placeholder="input number"
            allowClear
            enterButton="Search"
            size="large"
            onChange={this.onChangeNumber}
            onSearch={this.onSetNumber}
          />
        </Space>
        <div>{stt}/{data.length}</div>
      </div>
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
