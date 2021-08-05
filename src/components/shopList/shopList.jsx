import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './shopList.less'
import { Link } from "react-router-dom";

export default class shopList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    geohash:PropTypes.string.isRequired
  }
  state = {
    imgBaseUrl2: "//elm.cangdu.org/img/"
  }
  componentDidMount() {
  }
  isZhushi = (supports) => {
    let zhushiFlag = false
    if (supports instanceof Array && supports.length > 0) {
      supports.forEach((item) => {
        if (item.icon_name === '准') {
          zhushiFlag = true
        }
      })
    }
    return zhushiFlag
  }

  render() {
    return (
      <div className="restaurant-lists">
        {
          this.props.data && this.props.data.map((item, index) => {
            return (<Link to={{ pathname: '/shop', query: { geohash: this.props.geohash, id: item.id } }} className="restaurant-item" key={index}>
              <div className="left-img"><img src={this.state.imgBaseUrl2 + item.image_path} alt="" /></div>
              <div className="right-info">
                <div className="title-line info-line">
                  <div className={item.is_premium ? 'premium left name' : 'left name'}>{item.name}</div>
                  <div className="tags">
                    {
                      item.supports && item.supports.map((support, sIndex) => {
                        return (<span className="tag" key={sIndex}>{support.icon_name}</span>)
                      })
                    }
                  </div>
                </div>
                <div className="starts-line info-line">
                  <div className="left">
                    <div className="rank-score">{item.rating}分</div>
                    <div className="order">月售{item.recent_order_num}单</div>
                  </div>
                  <div className="right">
                    {
                      item.delivery_mode ? (<span className="delivery-mode">{item.delivery_mode.text}</span>) : ''
                    }
                    {
                      this.isZhushi(item.supports) ? (<span className="zhunshi">准时达</span>) : ''
                    }
                  </div>
                </div>
                <div className="delivery-line info-line">
                  <div className="left min-prices">¥{item.float_minimum_order_amount}起送
                    <span className="segmentation">/</span>
                    {item.piecewise_agent_fee.tips}
                  </div>
                  <div className="right">
                    {
                      Number(item.distance) ? (<span className="distance">
                        {
                          item.distance > 1000 ? (item.distance / 1000).toFixed(2) + 'km' : item.distance + 'm'
                        }
                      </span>) : (<span className="distance">{item.distance}</span>)
                    }
                    <span className="segmentation">/</span>
                    <span className="order_time">{item.order_lead_time}</span>
                  </div>
                </div>
              </div>
            </Link>)
          })
        }
      </div>
    )
  }
}
