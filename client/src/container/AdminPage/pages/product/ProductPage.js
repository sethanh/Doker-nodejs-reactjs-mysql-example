import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import * as weatherActions from './../../../../actions/weatherActions';
import * as productActions from './../../../../actions/ProductActions';
import { connect } from 'react-redux';
import { PNG } from '../../../../assets';
import { Table, Tag, Space } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: image =>(
      <img src={image || PNG.product_default} style={{ width: 40, height: 40 }}></img>
    )
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: status => (<Tag color={status ? 'geekblue' : 'green'} >
      {status ? 'non' : 'avaliable'}
    </Tag>)
  }
];

class ProductPage extends Component {
  componentDidMount() {
    const { get, productAction } = this.props;
    if (get) {
      const { fetchGetProduct } = productAction;
      fetchGetProduct();
    }
  }
  onEdit=(value)=>{
    console.log(this.props);
    const {history}= this.props;
    history.push(`/admin/product/${value.id}`,{ data:value });
  }
  render() {
    const { inventory } = this.props;
    console.log(inventory);
    return <div>
      {
        inventory && <Table 
        columns={columns} 
        dataSource={inventory} 
        onRow={record => ({
          onClick: e => {
            this.onEdit(record)
          }
        })}
        />
      }
    </div>;
  }
}

ProductPage.propTypes = {};

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
export default compose(withConnect)(ProductPage);
