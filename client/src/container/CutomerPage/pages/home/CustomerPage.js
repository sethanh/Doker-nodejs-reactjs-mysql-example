import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import * as weatherActions from './../../../../actions/weatherActions';
import * as productActions from './../../../../actions/ProductActions';
import { connect } from 'react-redux';
import { register, uploadAvatar } from '../../../../apis/authApis';
import { createProduct } from '../../../../apis/productApis';
import { createInvoicesRequest, createInvoices } from '../../../../apis/invoicesApis';
import { PNG } from '../../../../assets';
import {formatMoney} from '../../../../commons';

class CustomerPage extends Component {
  state = {
    products: [],
    request: [],
    file: null,
    fileName: ''
  }
  componentDidMount() {
    const { get, productAction } = this.props;
    if (get) {
      const { fetchGetProduct } = productAction;
      fetchGetProduct();
    }
  }

  onFileChange = (e) => {
    this.setState({ profileImg: e.target.files[0] })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImg', this.state.profileImg)
    uploadAvatar(formData);
  }

  onInvoices = () => {
    const dataOrder = [
      { id_product: 1, quantify: 2 },
      { id_product: 2, quantify: 1 }
    ]
    const orders = JSON.stringify(dataOrder);
    const body = {
      id_customer: 1,
      address_receive: 'se_tuan',
      id_staff: 1,
      orders
    }
    createInvoices(body)
  }
  onRequest = () => {
    const dataOrder = [
      { id_product: 1, quantify: 2 },
      { id_product: 2, quantify: 1 }
    ]
    const orders = JSON.stringify(dataOrder);
    const body = {
      id_customer: 1,
      address_receive: 'se_tuan',
      orders
    }
    createInvoicesRequest(body)
  }

  onRegiter = () => {
    const body = {
      name: 'Nguyen thanh thuan',
      username: 'se_thanh',
      email: 'thanhse100@gmail.com',
      password: 'se2012520',
      // rule:'staff'
    }
    register(body)
  }
  onRegiter1 = () => {
    const body = {
      name: 'Nguyen thanh se',
      username: 'se_tuan',
      email: 'thanhse123@gmail.com',
      password: 'se2012520',
      rule: 'staff'
    }
    register(body)
  }
  onCalApi = () => {
    console.log('day');
    const body = {
      name: 'coffee đen đá',
      price: 14000,
      image: 'http://127.0.0.1:3001/coffeeden.jpeg'
    }
    createProduct(body);
  }
  onCalApi1 = () => {
    console.log('day');
    const body = {
      name: 'trà đào',
      price: 18000
    }
    createProduct(body);
  }
  renderCard = (item, index) => (
    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-2" key={index}>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 product_card">
        <img src={item.image || PNG.product_default} className="img_product"></img>
        <div className='row bg_product'>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 txt_product_name">
            {item.name}
          </div>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 txt_title'>
            {formatMoney(item.price,2,'.',',')} ₫
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ justifyContent: 'right', display: 'flex' }}>
          <div className='icon_product bg_two'>
            <div className='fa fa-shopping-cart '></div>
          </div>
          <div className='icon_product bg_four'>
            <div className="fa-solid fa-info"></div>
          </div>
        </div>
      </div>
    </div>
  )
  render() {
    const { inventory } = this.props;
    return (
      <div >
        <div className="container">
          {inventory.map((item, index) => (
            this.renderCard(item, index)
          ))}
        </div>

        {/* <div style={{ width: 100, height: 30, background: 'blue', textAlign: 'center', marginBottom: 5, lineHeight: '30px', borderRadius: 5 }}
          onClick={() => { this.onCalApi() }}>
          call
        </div>
        <div style={{ width: 100, height: 30, background: 'blue', textAlign: 'center', marginBottom: 5, lineHeight: '30px', borderRadius: 5 }}
          onClick={() => { this.onCalApi1() }}>
          call1
        </div>
        <div style={{ width: 100, height: 30, background: 'blue', textAlign: 'center', marginBottom: 5, lineHeight: '30px', borderRadius: 5 }}
          onClick={() => { this.onRegiter() }}>
          register
        </div>
        <div style={{ width: 100, height: 30, background: 'blue', textAlign: 'center', marginBottom: 5, lineHeight: '30px', borderRadius: 5 }}
          onClick={() => { this.onRegiter1() }}>
          register ct
        </div>
        <div style={{ width: 100, height: 30, background: 'blue', textAlign: 'center', marginBottom: 5, lineHeight: '30px', borderRadius: 5 }}
          onClick={() => { this.onRequest() }}>
          request
        </div>
        <div style={{ width: 100, height: 30, background: 'blue', textAlign: 'center', marginBottom: 5, lineHeight: '30px', borderRadius: 5 }}
          onClick={() => { this.onInvoices() }}>
          invoices
        </div> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { weather, product } = state;
  const { get, data } = product;
  return { weather, get, inventory: data };
};
const mapDispatchToProps = dispatch => {
  return {
    weatherAction: bindActionCreators(weatherActions, dispatch),
    productAction: bindActionCreators(productActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(CustomerPage);
