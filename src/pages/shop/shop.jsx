import React, { Component } from 'react'
import IconFont from '@components/iconFont/iconFont.jsx'
import { getShopDetail, getfoodList } from '@api/shop'
import { Tabs } from 'antd-mobile';
import './shop.less'

export default class shop extends Component {
  state = {
    shopId: '',
    geohash: '',
    imgBaseUrl: '//elm.cangdu.org/img/',
    shopDetail: {},
    foodMenuList: [],
    foodList: [],
    activeMenuIndex: 0
  }
  componentDidMount() {
    const query = this.props.location.query
    this.setState({
      shopId: query.id,
      geohash: query.geohash
    })
    query.id && this.getShopDetailInfo(query.id)
    query.id && this.getfoodData(query.id)
  }
  getShopDetailInfo = async (id) => {
    const res = await getShopDetail(id)
    if (res.status !== 0) {
      console.log(res);
      this.setState({
        shopDetail: res
      })
    }
  }
  getfoodData = async (id) => {
    const params = {
      restaurant_id: id
    }
    const res = await getfoodList(params)
    if (res.status !== 0) {
      console.log(res);
      this.setState({
        foodMenuList: res,
        foodList: res[0].foods
      })
    }
  }
  menuChange = (index) => {
    const foodList = this.state.foodMenuList[index] && this.state.foodMenuList[index].foods
    console.log(foodList);
    this.setState({
      activeMenuIndex: index,
      foodList: foodList || []
    })
  }
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="shop-wrap">
        <div className="shop-detail-header">
          <div className="header-cover-img">
            <img src={`${this.state.imgBaseUrl}${this.state.shopDetail.image_path}`} alt="" />
          </div>
          <div className="detail-header-content">
            <div className="header">
              <IconFont onClick={this.goBack} className="header-icon" type="icon-arrow-left" />
            </div>
            <div className="detail-wrap">
              <div className="shop-img">
                <img src={`${this.state.imgBaseUrl}${this.state.shopDetail.image_path}`} alt="" />
              </div>
              <div className="shop-des">
                <h4 className="des-title">{this.state.shopDetail.name}</h4>
                <p className="des-text">商家配送／{this.state.shopDetail.order_lead_time}分钟送达／配送费¥{this.state.shopDetail.float_delivery_fee}</p>
                <p className="des-promotion">公告：{this.state.shopDetail.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'}</p>
              </div>
              <IconFont type="icon-arrow-right" className="header-arrow-right" />
            </div>
          </div>
        </div>
        <Tabs tabs={[
          { title: '商品' },
          { title: '评价' }
        ]}
          initialPage={1}
        >
          <div className="shop-goods">
            <div className="category-wrap">
              {
                this.state.foodMenuList && this.state.foodMenuList.map((menu, mIndex) => {
                  return (<li key={mIndex} className={this.state.activeMenuIndex === mIndex ? "category-item active" : "category-item"} onClick={this.menuChange.bind(this, mIndex)}>
                    <span>{menu.name}</span>
                  </li>)
                })
              }
            </div>
            <div className="goods-wrap">
              
            </div>
          </div>
          <div className="shop-comments">
            Content of second tab
          </div>
        </Tabs>
      </div>
    )
  }
}
