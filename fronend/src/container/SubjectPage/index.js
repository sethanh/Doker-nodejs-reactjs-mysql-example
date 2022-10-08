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
  state = { data: null, txtin: "", show: false, auto: false, showtv: true, txtvn: "",voice:{},forget:"",flag:0,voices:[],sl:'',current:-1 };

  onRandVoice=()=>{
    const rd= Math.floor(Math.random() * 6);
    console.log(rd);
    let voicestemp = window.speechSynthesis.getVoices();
    console.log('voice',voicestemp);
    this.setState({voice:voicestemp[rd]});
  }
  componentDidMount() {

    const { studydata } = this.props;
    console.log('xxx',studydata);
    const { subject } = studydata;
    const { data } = subject;
    const { stt } = subject;
    if (data.length === 0) {
      const { studyAction } = this.props;
      const { getStudy } = studyAction;
      getStudy();
    }
    this.onRandVoice();
  }
  onSetSelect = (value,index) => {
    const { studyAction } = this.props;
    const { onSetSlect } = studyAction;
    onSetSlect(value);
    this.setState({ txtin: "",sl:value,current:index!=-1?index:this.state.current});
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
  onRandom = () => {
    const { studyAction } = this.props;
    const { fetchRandom } = studyAction;
    fetchRandom();
  }

  onChangeForget=(e)=>{
    const { target } = e;
    const { value } = target;
    
    this.setState({
      forget: data[value],
    });
    console.log(data);
  };
  onSetForget = ()=>{
    const { studydata } = this.props;
    const { subject } = studydata;
    const { data, stt } = subject;
    let dt=[['forget',''],[data[stt].vietnam,data[stt].english]]
    const { studyAction } = this.props;
    const { fetchCreateMultiple } = studyAction;
    fetchCreateMultiple(dt);
  }

  onClick = () => {
    const { data } = this.state;
    const { studyAction } = this.props;
    const { fetchCreateMultiple } = studyAction;
    fetchCreateMultiple(data);
  };

  onNext = (value) => {
    const { studydata } = this.props;
    const { subject } = studydata;
    const { data, stt} = subject;
    // if(value===-1){
    //   speech.synthesis(data[stt-1].english, 'en-UK');
    // }
    // else
    // speech.synthesis(data[stt].english, 'en-UK');
    if(stt<data.length-1){
    const { studyAction } = this.props;
    const { fetchOnNextStudy } = studyAction;
    fetchOnNextStudy(value);
    this.onRandVoice();
    this.setState({ txtin: '', txtvn: '',flag:0 });
    }
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
    const { subject } = studydata;
    const { data, stt, select } = subject;
    const { txtin, show, auto, showtv, txtvn, st,voice,flag,current} = this.state;
    const a = this.check(txtin, data.length > 0 ? data[stt].english : 'xx');
    const b = this.check(txtvn, data.length > 0 ? data[stt].vietnam : 'xx');
    console.log('version',React.version);
    if (txtin, data.length > 0 && txtin === data[stt].english && auto) {
      this.onNext(1);
    }
    return (
      subject.select === '' ? <div>
        <div class="container fontbase">
          <input type="file" id="input" onChange={e => this.onChange(e)} />
          <div onClick={this.onClick} className="btninsert">
            insert
          </div>
          {subject.select===""&&subject.subject? subject.subject.map((item,index) =>
            <div className={`col-xs-6 col-sm-4 col-md-2 col-lg-2 subject_center ${index===current?'sbj_active':null}`}  
            onClick={() => this.onSetSelect(item.subject,index)}>
              <div className='content_subject'>
              {item.subject} 
              <div style={{color:'white',position:'absolute',width:42,height:42,background:'blue',top:5,right:5,borderRadius:21,display:'flex',alignItems:'center',justifyContent:'center'}}>{item.count}</div>
              </div>
            </div>
          ) : null}
        </div>

      </div>
        : <div className="fontbase">
          <div onClick={()=>{this.onSetSelect('',-1)}} className="btninsert"  >
            back
          </div>
          <div onClick={() => { this.setState({ auto: !auto }) }} className="btninsert" >
            {auto ? 'auto' : 'manual'}
          </div>
          <input type="file" id="input" onChange={e => this.onChange(e)} />
          <div onClick={this.onClick} className="btninsert" >
            insert
          </div>
          <div onClick={this.onRandom} className="btninsert" >
            random
          </div>
          {/* <div onClick={()=>speech.synthesis(data[stt].english, 'en-UK') } className="btninsert" >
            read
          </div> */}
          <div onClick={() => { this.setState({ showtv: !showtv }) }} className="btninsert" >
            {showtv ? 'empty' : 'vietnamese'}
          </div>
          {data.length > 0 ? (
            <div className="flexrow">
              <div onClick={!flag?speech.synthesis(data[stt].english,1.2):null}></div>
              {showtv ? <div style={{ flex: 1 }}>{data[stt].vietnam}</div> :
                <Input placeholder="việt Nam" style={{ flex: 1 }} onChange={(e) => { this.setState({ txtvn: e.target.value,flag:1 }) }} value={txtvn} />}
              <div style={{ width: 60 }}></div>
              <Input placeholder="english text" style={{ flex: 1 }} onChange={(e) => { this.setState({ txtin: e.target.value,flag:1 }) }} value={txtin} />
            </div>
          ) : null}
          {data.length > 0 ? <div className="flexrow" style={{ marginTop: 10 }}>
            <div style={{ width: '50%', color: 'green', display: 'flex', flexDirection: 'row' }}>
              <div style={{ color: txtvn === data[stt].vietnam ? '#1313f0' : 'green' }}>{b[0]}</div>
              <div style={{ color: 'red' }}>{b[1]}</div>
              <div style={{ width: 100 }}></div>
            </div>
            <div style={{ width: '50%', color: 'green', display: 'flex', flexDirection: 'row' }}>
              <div style={{ color: txtin === data[stt].english ? '#1313f0' : 'green' }}>{a[0]}</div>
              <div style={{ color: 'red' }}>{a[1]}</div>
              <div style={{ width: 100 }}></div>
            </div>
          </div> : null}
          {data.length > 0 ? <div className="flexrow" >
            <Speech 
              autostart={true}
              text={data[stt].english} />
            <div className="fa fa-assistive-listening-systems" style={{ width: '100%', paddingRight: '99%' }}></div>
          </div> : null}
          {show && data.length > 0 ? <div style={{ color: 'black' }}>{data[stt].english}</div> : null}
          <div className='btnshow' onClick={() => { this.setState({ show: !show }) }}> show</div>
          <div className="flexrow" >
            <div onClick={() => this.onNext(-1)} className="btninsert" style={{ flexGrow: 1 }}>
              pre
            </div>
            <div style={{ width: 60 }}></div>
            <div onClick={() => this.onNext(1)} className="btninsert" style={{ flexGrow: 1 }}>
              next
            </div>
          </div>
          <div onClick={this.onSetForget} className="btninsert" key="forget">
            Add forget
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
          <div>{stt+1}/{data.length}</div>
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
