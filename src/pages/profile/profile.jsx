import React, { Component } from 'react'
import IconFont from '@components/iconFont/iconFont.jsx'
import Footer from '@components/footer/footer.jsx'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import "./profile.less"

class profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired
  }
  state = {
    imgBaseUrl: '//elm.cangdu.org/img/'
  }
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="profile-wrap">
        <div className="header">
          <IconFont onClick={this.goBack} className="header-icon" type="icon-arrow-left" />
          <span>我的</span>
          <span></span>
        </div>
        <div className="profile-contents">
          <Link to="/profile/info" className="base-info">
            <div className="left">
              <div className="avatar">
                {
                  this.props.userInfo && this.props.userInfo.user_id ? (<img src={`${this.state.imgBaseUrl}${this.props.userInfo.avatar}`} alt="" />) : (<IconFont className="avatar-icon" type="icon-wode" />)
                }
                {/* <IconFont className="avatar-icon" type="icon-wode" /> */}
              </div>
              <div className="account">
                <div className="username account-item">{this.props.userInfo.username || '登录|注册'}</div>
                <div className="phone account-item">
                  <IconFont type="icon-dianhua" className="phone-icon" />
                  {this.props.userInfo.mobile || '暂无绑定手机号'}
                </div>
              </div>
            </div>
            <div className="right">
              <IconFont type="icon-arrow-right" className="right-icon" />
            </div>
          </Link>
          <section className="info-data">
            <Link className="info-item" to="/">
              <div className="top-number">
                <span className="num">{this.props.userInfo.balance ? parseInt(this.props.userInfo.balance).toFixed(2) : 0.00}</span>
                <span className="unit">元</span>
              </div>
              <div className="bottom-text">
                我的余额
              </div>
            </Link>
            <Link className="info-item" to="/">
              <div className="top-number">
                <span className="num" style={{ color: '#ff5f3e' }}>{this.props.userInfo.gift_amount || 0}</span>
                <span className="unit">个</span>
              </div>
              <div className="bottom-text">
                我的优惠
              </div>
            </Link>
            <Link className="info-item" to="/">
              <div className="top-number">
                <span className="num" style={{ color: '#6ac20b' }}>{this.props.userInfo.point || 0}</span>
                <span className="unit">分</span>
              </div>
              <div className="bottom-text">
                我的积分
              </div>
            </Link>
          </section>
          <section className="profile-list">
            <Link to="/" className="list-item">
              <div className="list-item-left">
                <IconFont type="icon-dingdan" className="list-icon" />
                <span>我的订单</span>
              </div>
              <IconFont type="icon-arrow-right" className="list-right-icon" />
            </Link>
            <Link to="/" className="list-item">
              <div className="list-item-left">
                <IconFont type="icon-shangchengdingdan" className="list-icon" />
                <span>积分商城</span>
              </div>
              <IconFont type="icon-arrow-right" className="list-right-icon" />
            </Link>
            <Link to="/" className="list-item">
              <div className="list-item-left">
                <IconFont type="icon-huiyuan" className="list-icon" />
                <span>饿了么会员卡</span>
              </div>
              <IconFont type="icon-arrow-right" className="list-right-icon" />
            </Link>
            <Link to="/" className="list-item">
              <div className="list-item-left">
                <IconFont type="icon-fuwuzhongxin" className="list-icon" />
                <span>服务中心</span>
              </div>
              <IconFont type="icon-arrow-right" className="list-right-icon" />
            </Link>
            <Link to="/" className="list-item">
              <div className="list-item-left">
                <IconFont type="icon-elment" className="list-icon" style={{ fontSize: '22px' }} />
                <span>下载饿了么APP</span>
              </div>
              <IconFont type="icon-arrow-right" className="list-right-icon" />
            </Link>
          </section>
        </div>
        <Footer />
        {renderRoutes(this.props.route.children)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


export default connect(mapStateToProps, null)(profile)
