import React, { Component } from 'react'
import IconFont from '@components/iconFont/iconFont.jsx'
import Footer from '@components/footer/footer.jsx'
import './order.less'

export default class order extends Component {
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="order-wrap">
        <div className="header">
          <IconFont onClick={this.goBack} className="header-icon" type="icon-arrow-left" />
          <span>订单管理</span>
          <span></span>
        </div>
        <div className="order-contents">
          订单管理页面
        </div>
        <Footer />
      </div>
    )
  }
}
