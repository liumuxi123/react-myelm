import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./header.less"
import {withRouter} from 'react-router-dom'


export class Header extends Component {
  static propTypes = {
    title:PropTypes.string
  }
  goLogin = () => {
    this.props.history.push('/login')
  }
  render() {
    return (
      <div className="header-wrap">
        <div className="left-slot">{this.props.leftsolt}</div>
        <div className="title">{this.props.title}</div>
        <div className="login" onClick={this.goLogin}>
          登录 | 注册
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
