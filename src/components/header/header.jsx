import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./header.less"


export class Header extends Component {
  static propTypes = {
    title:PropTypes.string
  }

  render() {
    console.log(this.props);
    return (
      <div className="header-wrap">
        <div className="left-slot">{this.props.leftsolt}</div>
        <div className="title">{this.props.title}</div>
        <div className="login">
          登录 | 注册
        </div>
      </div>
    )
  }
}

export default Header
