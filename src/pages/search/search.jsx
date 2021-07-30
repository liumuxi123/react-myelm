import React, { Component } from 'react'
import IconFont from '@components/iconFont/iconFont.jsx'
import Footer from '@components/footer/footer.jsx'
import './search.less'

export default class search extends Component {
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="search-wrap">
        <div className="header">
          <IconFont onClick={this.goBack} className="header-icon" type="icon-arrow-left" />
          <span>搜索</span>
          <span></span>
        </div>
        <div className="search-contents">
          搜索页面
        </div>
        <Footer />
      </div>
    )
  }
}
