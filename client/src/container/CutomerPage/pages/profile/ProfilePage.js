import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { PNG } from '../../../../assets'
import { connect } from 'react-redux';
import * as profileActions from '../../../../actions/profileActions';
import { uploadAvatar } from '../../../../apis/authApis';
import {getUser} from '../../../../apis/profileApis';
class ProfilePage extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const {get}= this.props;
    if(get){
      const {profileAction}= this.props;
      const {fetchGetProfile}= profileAction;
      fetchGetProfile();
    }
  }

  onFileChange = (e) => {
    this.setState({ profileImg: e.target.files[0] },
    () => {
      const formData = new FormData();
      formData.append('profileImg', this.state.profileImg)
      uploadAvatar(formData);
    }
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('profileImg', this.state.profileImg)
    // uploadAvatar(formData);
    getUser();
  }

  renderInput = (label, value, name) => (
    <div className="form-group">
      <label>{label}</label>
      <input type="text" className="form-control" name={name} defaultValue={value}/>
    </div>
  )
  rederAvatarInput = (top) =>{ 
    let inputRef;
    const {user}=this.props
    return(<div className={top?"col-xs-12 col-sm-12 col-md-0 col-lg-0":"col-xs-0 col-sm-0 col-md-4 col-lg-4"} style={{textAlign:'center'}}>
      <img src={user?.image||PNG.avatar_default} className='imgAvatar' onClick={() => inputRef.click()}></img>
      <input type="file" onChange={this.onFileChange}  ref={refParam => inputRef = refParam}   hidden/>
    </div>
  )}


  render() {
    const { user } = this.props;
    return (
      <div className='children_center'>
        <div className="col-xs-12 col-sm-12  col-md-10 col-lg-8">
          <legend>{user?.name || 'Profile'}</legend>
          {this.rederAvatarInput(true)}
          <div className="col-xs-12 col-sm-12  col-md-8 col-lg-8">
            <form onSubmit={this.onSubmit}>
              {this.renderInput('Name', user?.name || null, 'name')}
              {this.renderInput('Email', user?.email || null, 'email')}
              {this.renderInput('Phone', user?.phone || null, 'phone')}
              {this.renderInput('Birthday', user?.birthday || null, 'birthday')}
              <button type="submit" className="btn  bg_btn_secondary">Cập nhật</button>
            </form>
          </div>
          {this.rederAvatarInput(false)}
          {/* <div >
            <img src={'http://localhost:3001/d45cb09e-64f6-4d4d-bc24-2278ceeb4f36-screenshot-from-2022-04-11-19-55-36.png'} style={{ width: 50, height: 50 }}></img>
          </div> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { profile } = state;
  const { data,get } = profile;
  const {user}= data;
  return {
    user,
    get
  };
};
const mapDispatchToProps = dispatch => {
  return {
    profileAction: bindActionCreators(profileActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(ProfilePage);
