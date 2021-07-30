import React, { Component } from 'react'
import IconFont from '@components/iconFont/iconFont.jsx'
import Footer from '@components/footer/footer.jsx'
import "./profile.less"

export default class profile extends Component {
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="profile-wrap">
        <div className="header">
          <IconFont onClick={this.goBack} className="header-icon" type="icon-arrow-left" />
          <span>搜索</span>
          <span></span>
        </div>
        <div className="profile-contents">
          个人中心页面
        </div>
        <Footer />
      </div>
    )
  }
}
