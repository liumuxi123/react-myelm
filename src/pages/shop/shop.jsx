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
          initialPage={0}
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
              <div className="header">
                <span className="name">{this.state.foodMenuList[this.state.activeMenuIndex] ? this.state.foodMenuList[this.state.activeMenuIndex].name : ''}</span>
                <span>{this.state.foodMenuList[this.state.activeMenuIndex] ? this.state.foodMenuList[this.state.activeMenuIndex].description : ''}</span>
              </div>
              <div className="food-list">
                {
                  this.state.foodList && this.state.foodList.map((food, fIndex) => {
                    return (<li key={fIndex} className="food-item">
                      <section className="food-img">
                        <img src={`${this.state.imgBaseUrl}${food.image_path}`} alt="" />
                      </section>
                      <section className="food-des">
                        <div className="name-header">
                          <div className="name">{food.name}</div>
                          {
                            food.attributes && food.attributes.length > 0 ? (<ul>
                              {
                                food.attributes && food.attributes.map((attri, aIndex) => {
                                  if (attri) {
                                    return (<li key={aIndex} className="attr-item" style={{ color: attri.icon_name === '新' ? '#0094f5' : '#' + attri.icon_color, borderColor: '#' + attri.icon_color }}>
                                      {attri.icon_name === '新' ? '新品' : attri.icon_name}
                                    </li>)
                                  } else {
                                    return ''
                                  }
                                })
                              }
                            </ul>) : ''
                          }
                        </div>
                        <p className="des-content">{food.description}</p>
                        <p className="sale-rank">
                          <span>月售{food.month_sales}份</span>
                          <span>好评率{food.satisfy_rate}%</span>
                        </p>
                        {
                          food.activity ? (<p className="food_activity">
                            <span style={{ color: '#' + food.activity.image_text_color, borderColor: '#' + food.activity.icon_color }}>{food.activity.image_text}</span>
                          </p>) : ''
                        }
                        <div className="price-buycard">
                          <section className="food-price">
                            <span>¥</span>
                            <span className="price">{food.specfoods[0].price}</span>
                            {
                              food.specifications && food.specifications.length > 0 ? (<span style={{color:'#666'}}>起</span>) : ''
                            }
                          </section>
                          <div className="buycard"></div>
                        </div>
                      </section>
                    </li>)
                  })
                }
              </div>
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
