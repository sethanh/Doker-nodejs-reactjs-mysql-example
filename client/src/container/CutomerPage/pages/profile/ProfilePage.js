import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { PNG } from '../../../../assets';
import { connect } from 'react-redux';
import * as profileActions from '../../../../actions/profileActions';
import { uploadAvatar } from '../../../../apis/authApis';
import {getUser} from '../../../../apis/profileApis';
class ProfilePage extends Component {
  state={
    urlFile: null
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

    this.setState({ profileImg: e.target.files[0],urlFile : URL.createObjectURL(e.target.files[0])}
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {profileImg} = this.state;
    const name= e.target[0].value;
    const email= e.target[1].value;
    const phone= e.target[2].value;
    const birthday= e.target[3].value;
    const {profileAction}= this.props;
    const {fetchUpdateUser}= profileAction;
    if( profileImg){
      const formData = new FormData();
      formData.append('profileImg', profileImg);
      fetchUpdateUser({name,email,phone,birthday,formData});
    }
    else{
      fetchUpdateUser({name,email,phone,birthday});
    }
   
    // getUser();
    
    
  }

  renderInput = (label, value, name) => (
    <div className="form-group">
      <label>{label}</label>
      <input type="text" className="form-control" name={name} defaultValue={value} />
    </div>
  )
  rederAvatarInput = (top,urlFile) =>{ 
    let inputRef;
    console.log(urlFile);
    return(<div className={top?"col-xs-12 col-sm-12 col-md-0 col-lg-0":"col-xs-0 col-sm-0 col-md-4 col-lg-4"} style={{textAlign:'center'}}>
      <img src={urlFile||PNG.avatar_default} className='imgAvatar' onClick={() => inputRef.click()}></img>
      <input type="file" onChange={this.onFileChange}  ref={refParam => inputRef = refParam}   hidden/>
    </div>
  )}


  render() {
    const { user } = this.props;
    const {urlFile}= this.state;
    return (
      <div className='children_center'>
        <div className="col-xs-12 col-sm-12  col-md-10 col-lg-8">
          <legend>{user?.name || 'Profile'}</legend>
          {this.rederAvatarInput(true,urlFile||user?.image)}
          <div className="col-xs-12 col-sm-12  col-md-8 col-lg-8">
            <form onSubmit={this.onSubmit}>
              {this.renderInput('Name', user?.name || null, 'name')}
              {this.renderInput('Email', user?.email || null, 'email')}
              {this.renderInput('Phone', user?.phone || null, 'phone')}
              {this.renderInput('Birthday', user?.birthday || null, 'birthday')}
              <button type="submit" className="btn  bg_btn_secondary">Cập nhật</button>
            </form>
          </div>
          {this.rederAvatarInput(false,urlFile||user?.image)}
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
