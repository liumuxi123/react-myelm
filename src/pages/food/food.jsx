import React, { Component } from 'react'
import IconFont from '@components/iconFont/iconFont.jsx'
import './food.less'
import { getRestaurantCategorys } from '@api/food'
import { getRestaurants } from "@api/msite";
import ShopList from '@components/shopList/shopList';

export default class food extends Component {
  state = {
    title: '',
    categoryId: '',
    geohash: '',
    categoryData: [],
    restaurants: []
  }
  componentDidMount() {
    const query = this.props.location.query
    this.setState({
      title: query.title,
      categoryId: query.categoryId,
      geohash: query.geohash
    })
    this.getCategoryData(query.geohash)
    query.geohash && this.getRestaurantsData(query.geohash, query.categoryId)
  }
  getCategoryData = async (geohash) => {
    console.log(geohash);
    let params = {}
    if (geohash && geohash.indexOf(',') > -1) {
      params = {
        latitude: geohash.split(',')[0],
        longitude: geohash.split(',')[1]
      }
    }
    const res = await getRestaurantCategorys(params)
    if (res.status !== 0) {
      console.log(res);
      this.setState({
        categoryData: res
      })
    }
  }
  getRestaurantsData = async (geohash, categoryId) => {
    const params = {
      latitude: geohash.split(',')[0],
      longitude: geohash.split(',')[1],
      restaurant_category_id: categoryId
    }
    const res = await getRestaurants(params)
    if (res.status !== 0) {
      this.setState({
        restaurants: res
      })
    }
  }
  onCategoryOpenChange = () => {

  }
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="food-wrap">
        <div className="header">
          <IconFont onClick={this.goBack} className="header-icon" type="icon-arrow-left" />
          <span>{this.state.title}</span>
          <span></span>
        </div>
        <div className="tabs-wrap">
          <li className="tab-item">
            <span>分类</span>
            <IconFont className="tab-icon" type="icon-down" />
          </li>
          <li className="tab-item">
            <span>排序</span>
            <IconFont className="tab-icon" type="icon-down" />
          </li>
          <li className="tab-item">
            <span>筛选</span>
            <IconFont className="tab-icon" type="icon-down" />
          </li>
        </div>
        <div className="food-contents">
          <ShopList data={this.state.restaurants} geohash={this.state.geohash} />
        </div>
      </div>
    )
  }
}
