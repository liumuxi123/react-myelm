import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import IconFont from '@components/iconFont/iconFont.jsx'
import "./footer.less"
import { withRouter, Link } from 'react-router-dom'



export class Footer extends Component {
  static propTypes = {
    geohash:PropTypes.string.isRequired
  }
  state = {
      currentPath:''
  }
  componentDidMount(){
      this.setState({
        currentPath: this.props.history.location.pathname
      })
    console.log(this.props.history);
  }
  render() {
    return (
      <div className="footer-wrap">
        <Link className={this.state.currentPath.indexOf('/msite') > -1?'footer-item active':'footer-item'} to={`/msite/${this.props.geohash}`}>
            <span><IconFont className="footer-icon" type="icon-elment" /></span>
            <span>外卖</span>
        </Link>
        <Link className={this.state.currentPath.indexOf('/search') > -1?'footer-item active':'footer-item'} to={`/search/${this.props.geohash}`}>
            <span><IconFont className="footer-icon" type="icon-zhinanzhen" /></span>
            <span>搜索</span>
        </Link>
        <Link className={this.state.currentPath.indexOf('/order') > -1?'footer-item active':'footer-item'} to={`/order/${this.props.geohash}`}>
            <span><IconFont className="footer-icon" type="icon-dingdan" /></span>
            <span>订单</span>
        </Link>
        <Link className={this.state.currentPath.indexOf('/profile') > -1?'footer-item active':'footer-item'} to={`/profile/${this.props.geohash}`}>
            <span><IconFont className="footer-icon" type="icon-wode" /></span>
            <span>我的</span>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    geohash: state.geohash
  }
}

export default connect(mapStateToProps)(withRouter(Footer))
