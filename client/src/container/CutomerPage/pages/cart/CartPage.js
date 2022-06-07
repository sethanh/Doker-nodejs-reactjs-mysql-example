import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import * as CartActions from './../../../../actions/CartActions';
import { connect } from 'react-redux';
import { formatMoney } from '../../../../commons';

class CartPage extends Component {

  state={
    payCart:[]
  }

  onChange=(item,e)=>{
    console.log(e.target.name, e.target.checked);
    const {payCart}= this.state;
    const data= payCart;
    if(e.target.checked){
      data.push(item);
    }
    else{
      data.splice(data.indexOf(item),1);
    }
    this.setState({payCart:data});
  }

  renderCartView = (head,item) => (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg_cart" key={head?'Header':item.product.id} >
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <input
          type="checkbox"
          name={head?'Header':item.product.id}
          className='cursor'
          onChange={(e)=>this.onChange(item,e)}
        />
        {head?null:<img src={item.product.image} className="img_cart"></img>}
        {head&&'Sản phẩm'||item.product.name}
      </div>
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        {head&&'Đơn giá'||`${formatMoney(item.product.price, 2, '.', ',')} ₫`}
      </div>
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        {head&&'Số lượng'||item.quantify}
      </div>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        {head&&'Thành tiền'||`${formatMoney(item.product.price*item.quantify, 2, '.', ',')}`}
      </div>
      <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
       <div className='fa fa-trash-o cursor' />
      </div>
    </div>
  )

  renderPayCartView=(item)=>(
    
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg_cart">
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        {item.product.name}
      </div>
      <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
        {item.quantify}
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      {`${formatMoney(item.product.price*item.quantify, 2, '.', ',')}`}
      </div>
      
      
    </div>
    
  )

  render() {
    const { cart } = this.props;
    const { data } = cart;
    const {payCart}= this.state;
    console.log(payCart);
    return (
      <div >
        <div className="container">

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            GIỎ HÀNG
          </div>


          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              {this.renderCartView(true,cart)}
              {data.map((item) => (
                this.renderCartView(false,item)
              ))}
            </div>

            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {payCart.map((item)=>(
                this.renderPayCartView(item)
              ))}
            </div>

          </div>

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { cart } = state;
  return { cart };
};
const mapDispatchToProps = dispatch => {
  return {
    CartAction: bindActionCreators(CartActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(CartPage);
