import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import * as productActions from './../../../../actions/ProductActions';
import { connect } from 'react-redux';
import { PNG } from '../../../../assets';

class ProductDetail extends Component {

  onChange = (e)=>{
    const {target}=e;
    const {name,value}= target;
    this.setState({
      [name]:value
    });
  }
  renderInput = (label, value, name) => (
    <div className="form-group">
      <label>{label}</label>
      <input type="text" className="form-control" name={name} defaultValue={value} onChange={this.onChange}/>
    </div>
  )
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
    const {productAction}= this.props;
    const {fetchUpdateProduct}= productAction;
    const {history } = this.props;
    const data = history.location.state?.data;
    var body={...this.state,id:data.id};
    fetchUpdateProduct(body);
    // getUser();
  }
  rederAvatarInput = (top) =>{ 
    let inputRef;
    const {history } = this.props;
    const data = history.location.state?.data;
    return(<div className={top?"col-xs-12 col-sm-12 col-md-0 col-lg-0":"col-xs-0 col-sm-0 col-md-4 col-lg-4"} style={{textAlign:'center'}}>
      <img src={data?.image||PNG.product_default} className='imgAvatar' onClick={() => inputRef.click()}></img>
      <input type="file" onChange={this.onFileChange}  ref={refParam => inputRef = refParam}   hidden/>
    </div>
  )}
  render() {
    const { history } = this.props;
    const data = history.location.state?.data;
    return <div>
      <div className="col-xs-12 col-sm-12  col-md-10 col-lg-8">
          <legend>{data?.name || 'Product'}</legend>
          {this.rederAvatarInput(true)}
          <div className="col-xs-12 col-sm-12  col-md-8 col-lg-8">
            <form onSubmit={this.onSubmit}>
              {this.renderInput('Tên sản phẩm', data?.name || null, 'name')}
              {this.renderInput('Đơn giá', data?.price || null, 'price')}
              <button type="submit" className="btn  bg_btn_secondary">Cập nhật</button>
            </form>
          </div>
          {this.rederAvatarInput(false)}
        </div>
    </div>;
  }
}

ProductDetail.propTypes = {};

const mapStateToProps = state => {
  return { };
};

const mapDispatchToProps = dispatch => {
  return {
    productAction: bindActionCreators(productActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(ProductDetail);
