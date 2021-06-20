import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import IconFont from '@components/iconFont/iconFont.jsx'
import { getStorage } from "@utils/index.js";
import "./header.less"
import { withRouter } from 'react-router-dom'



export class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    userInfo: PropTypes.object.isRequired
  }
  goLogin = () => {
    this.props.history.push('/login')
  }
  goToProfile = () => {
    this.props.history.push('/profile')
  }
  render() {
    return (
      <div className="header-wrap">
        <div className="left-slot">{this.props.leftsolt}</div>
        <div className="title">{this.props.title}</div>
        <div>
          {
            getStorage('user_id') ? (<div className="user-icon" onClick={this.goToProfile}>
              <IconFont type="icon-bussiness-man" />
            </div>) : (<div className="login" onClick={this.goLogin}>
              登录 | 注册
            </div>)
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


export default connect(mapStateToProps)(withRouter(Header))
