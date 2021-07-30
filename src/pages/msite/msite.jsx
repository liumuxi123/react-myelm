import React, { Component } from 'react'
import Header from '@components/header/header.jsx'
import Footer from '@components/footer/footer.jsx'
import IconFont from '@components/iconFont/iconFont.jsx'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import { getFoodCategory, getPositionByGeohash, getRestaurants } from "@api/msite";
import { Link } from "react-router-dom";
import ShopList from '@components/shopList/shopList';
import 'swiper/swiper.less';
import 'swiper/components/pagination/pagination.less';
import './msite.less'

SwiperCore.use([Pagination]);
export default class msite extends Component {
  state = {
    address: '',
    latitude: '',
    longitude: '',
    geohash: '',
    foodCategorys: [],
    restaurants: [],
    imgBaseUrl: "https://fuss10.elemecdn.com/",
  }
  componentDidMount() {
    let geohash = this.props.match.params.geohash || ','
    this.setState({
      geohash,
      latitude: geohash.split(',')[0],
      longitude: geohash.split(',')[1],
    })
    this.getPositionInfo()
    this.getFoodCategorys()
    this.getRestaurantsData(geohash.split(',')[0], geohash.split(',')[1])
  }
  getPositionInfo = async () => {
    let geohash = this.props.match.params.geohash
    const res = await getPositionByGeohash(geohash)
    if (res.status !== 0) {
      this.setState({
        address: res.name,
      })
    }
  }
  getFoodCategorys = async () => {
    const res = await getFoodCategory()
    if (res.status !== 0) {
      const len = res.length
      const foodCategorys = []
      for (let i = 0, j = 0; i < len; i += 8, j++) {
        foodCategorys[j] = res.splice(0, 8)
      }
      console.log(foodCategorys, 222);
      this.setState({
        foodCategorys,
      })
    }
  }
  getRestaurantsData = async (latitude, longitude) => {
    const params = {
      latitude: latitude,
      longitude: longitude
    }
    const res = await getRestaurants(params)
    if (res.status !== 0) {
      this.setState({
        restaurants: res
      })
    }
  }
  goSearch = () => {

  }
  getCategoryId = (url) => {
    let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    if (/restaurant_category_id/gi.test(urlData)) {
      return JSON.parse(urlData).restaurant_category_id.id
    }else{
      return ''
    }
  }
  render() {
    return (
      <div className="msite-wrap">
        <Header className="msite-header" leftsolt={<IconFont onClick={this.goSearch} className="header-icon" type="icon-sousuo" />} title={this.state.address}>
        </Header>
        <div className="msite-contents">
          <div className="msite-navs-wrap">
            <Swiper
              spaceBetween={0}
              pagination
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {
                this.state.foodCategorys.map((outItem, outIndex) => {
                  return (<SwiperSlide className="category-outer-item" key={outIndex} >
                    {
                      outItem.map((item, index) => {
                        return (<Link className="category-item" key={index} to={{ pathname: '/food', query: {geohash: this.state.geohash,title: item.title,categoryId:this.getCategoryId(item.link)}}} >
                          <div className="img-wrap">
                            <img src={this.state.imgBaseUrl + item.image_url} alt="" />
                          </div>
                          <div className="name">{item.title}</div>
                        </Link>)
                      })
                    }
                  </SwiperSlide>)
                })
              }
            </Swiper>
          </div>
          <div className="line"></div>
          <div className="restaurant-wrap">
            <div className="title"><IconFont className="title-icon" type="icon-inspection" /> 附近商家</div>
            <ShopList data={this.state.restaurants} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
