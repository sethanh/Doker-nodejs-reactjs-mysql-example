import React, { Component } from 'react';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { headers, accounts } from './datas';
import { PNG } from '../../../../assets'
class HeaderComponent extends Component {
  state = {
    showAccount: false,
  }

  onHandleAccount = (title) => {
    const { onLogout } = this.props;
    this.setState({ showAccount: false })
    switch (title) {
      case 'Quản lý đơn hàng':
        break;
      case 'Thông báo':
        break;
      case 'Thoát tài khoản':
        onLogout();
        break;
      case 'Trang cá nhân':
        break;
      default:
        break;
    }
  }

  renderHeaderItem = (item, index) => (
    <div key={index} className='txtheaders' >
      {item}
    </div>
  )

  renderButtonAccount= (title,index)=>(
    <div key={index} className='bg_item_account' onClick={() => this.onHandleAccount(title)}>
        {title}
      </div>
  )
  renderLinkAccount= (item,index)=>(
    <NavLink key={index} className='bg_item_account_link'  to={item.to}>
      {item.title}
    </NavLink>
  )

  renderItemAccount = (item, index) => {
    return(item.link?this.renderLinkAccount(item,index):this.renderButtonAccount(item.title,index));
  }
  renderAccount = () => (
    <div className='bg_account'>
      <div className='triangle-up'></div>
      {accounts.map((title, index) => (this.renderItemAccount(title, index)))}
    </div>
  )
  render() {
    const { showAuthPage, user } = this.props;
    const { showAccount } = this.state;
    const name = user?.name;
    return (
      <div className='bgHeader'>
        <div className='grid_small_pc grid_big_pc header'>
          <div className='bg_logo_header'>
            <img src={PNG.my_na_logo} alt='logo' className='img_logo'/>
          </div>
          <div className='bg_search'>
            <div className='header_search'>
              <input type="text" name="search" className='input_header' placeholder='Tìm sản phẩm' />
              <div className='btn_search_head'>
                <div className="fas fa-search" />
                <div className='txt_search'>Tìm kiếm</div>
              </div>
            </div>
            <div className='bg_list_header'>
              {headers.map((item, index) => (this.renderHeaderItem(item, index)))}
            </div>
          </div>
          <div className='itemHeader'
            onMouseMove={name ? () => this.setState({ showAccount: true }) : null}
            onMouseLeave={name ? () => this.setState({ showAccount: false }) : null}>
            <div className='header_top'
              onClick={name ? null : () => showAuthPage()}
            >
              <div className="fas fa-user fa-3x" />
              <div className="bg_account_head">
                {!name&&<div className='txt_auth'>Đăng nhập/đăng ký</div>}
                <div className='txt_auth_bold'>{name || 'Tài khoản'}</div>
              </div>
            </div>
            <div></div>
            {showAccount && this.renderAccount()}
          </div>
          <div className='itemHeader'>
            <div className='header_top'>
              <div className="fas fa-shopping-cart fa-3x" />
              <div className='txt_shopping'>Giỏ hàng</div>
            </div>
            <div className='bg_list_header wr_connect' >
              <div className='bg_connect'>
                <div className='fab fa-facebook-messenger'></div>
                <div className='txt_connect' >Trò chuyện</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(HeaderComponent);
