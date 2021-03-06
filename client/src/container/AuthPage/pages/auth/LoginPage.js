import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../../../../actions/loginActions';
import { PNG } from '../../../../assets';
import FacebookLogin from 'react-facebook-login';
import './style.css';
class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    showSignup: false
  }
  onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { AuthAction } = this.props;
    const { fetchLogin } = AuthAction;
    fetchLogin({ email, password });
  }
  onChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value
    })
  }
  validate(values) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let errors = "";
    if (values.email === "") {
      errors.email = "Email is missing";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Email is not in the expected email address standard format";
    }
    if (values.password === "") {
      errors.password = "Password is missing";
    } else if (values.password.length < 6) {
      errors.password = "Password must be 6 characters at minimum";
    }
    return errors;
  }
  
  responseFacebook = (response) => {
    const {AuthAction,hideModal }= this.props;
    const {fetchLoginFacebook}= AuthAction;
    const body={id_facebook:response.id,name:response.name}
    fetchLoginFacebook(body);
    hideModal();
  }

  responseGoogle = (response) => {
  }

  onRegiter = (event) => {
    event.preventDefault();
    const { AuthAction } = this.props;
    const { fetchRegister } = AuthAction;
    const { name, email, password } = this.state;
    fetchRegister({ name, email, password });
  }
  renderInputText = (name, placeholder, type) => (
    <input
      type={type}
      name={name}
      className='inputLogin'
      placeholder={placeholder}
      onChange={this.onChange}
    />
  )

  renderLoginForm = () => (
    <form onSubmit={this.onSubmit}>
      <div className='form_login'>
        <div>????ng nh???p b???ng email</div>
        {this.renderInputText('email', 'abc@email.com', 'text')}
        {this.renderInputText('password', 'M???t kh???u', 'password')}
        <div className='txt_message_error'>{this.props.login?.error || ''}</div>
        <input
          type='submit'
          value='????ng nh???p'
          className='btnLogin txtLogin'
        />
        <div className='txtlogin'>Qu??n m???t kh???u</div>
        <div>
          <span className='txtLink'>B???n ch??a c?? t??i kho???n? </span>
          <span className='txtlogin' onClick={() => this.setState({ showSignup: true })}>    T???o t??i kho???n</span>
        </div>
        <div className='txtline'>--------------------------------<span className='txtLink'> Ho???c ????ng nh???p b???ng </span>--------------------------------</div>
        <div className='row_login'>
          {this.renderLoginFabook()}
          {this.renderLoginPhone()}
        </div>
      </div>
    </form>
  )
  renderLoginFabook = () => (
    <FacebookLogin
      appId="471036058042198"
      fields="name,email,picture"
      cssClass="my-facebook-button-class"
      icon="fa-facebook"
      textButton=""
      callback={this.responseFacebook}
    />
  )
  renderLoginPhone = () => (
    <div className="my-phone-button-class">
      <span className="fa-solid fa-phone"></span>
    </div>
  )
  renderRegisterForm = () => (
    <form onSubmit={this.onRegiter}>
      <div className='form_login'>
        <div>T???o t??i kho???n b???ng email</div>
        {this.renderInputText('name', 'Nguy???n V??n A', 'text')}
        {this.renderInputText('email', 'abc@email.com', 'text')}
        {this.renderInputText('password', 'M???t kh???u', 'password')}
        {this.renderInputText('confirm_password', 'Nh???p l???i m???t kh???u', 'password')}
        <input
          type='submit'
          value='T???o t??i kho???n'
          className='btnLogin txtLogin'
        />
        <div className='txtlogin' onClick={() => this.setState({ showSignup: false })}>????ng nh???p</div>
      </div>
    </form>
  )
  render() {
    const { showSignup } = this.state;
    return (
      <div className='container_login'>
        {showSignup ? this.renderRegisterForm() : this.renderLoginForm()}
        <div className='bg_img_login center_flex'>
          <img src={PNG.bg_login} className='img_login' />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { login } = state;
  return { login }
};
const mapDispatchToProps = dispatch => {
  return {
    AuthAction: bindActionCreators(AuthActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(LoginPage);
