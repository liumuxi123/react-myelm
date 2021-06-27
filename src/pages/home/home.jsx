import React, { Component } from 'react'
// import { Button } from 'antd-mobile';
import Header from '@components/header/header.jsx'
import IconFont from '@components/iconFont/iconFont.jsx'
import { getCitys } from '@api/home/index.js'
import "./home.less"


export default class home extends Component {
  state = {
    currentCity: {},
    hotCity: [],
    allCitys: {}
  }
  componentDidMount() {
    this.currentCity()
    this.getHotCity()
    this.getAllCitys()
  }
  currentCity = async () => {
    const res = await getCitys({
      type: 'guess'
    })
    if (res.status !== 0) {
      this.setState({
        currentCity: res
      })
    }
  }
  getHotCity = async () => {
    const res = await getCitys({
      type: 'hot'
    })
    this.setState({
      hotCity: res
    })
  }
  getAllCitys = async () => {
    const res = await getCitys({
      type: 'group'
    })
    this.setState({
      allCitys: res
    })
  }
  setLocation = (id) => {
    console.log(id);
    this.props.history.push(`/city/${id}`)
  }
  render() {
    const cityItems = (citys) => {
      return citys.map((city, index) => {
        return (<span className="city-item" onClick={this.setLocation.bind(this,city.id)}  key={index}>{city.name}</span>)
      })
    }
    return (
      <div className="home-wrap">
        <Header leftsolt={<div>饿了么</div>}>
        </Header>
        <div className="city-card">
          <div className="city-tip">
            <span className="city-tip-left">当前城市：</span>
            <span>定位不准时，请在城市列表中选择</span>
          </div>
          <div className="city-location" onClick={this.setLocation.bind(this,this.state.currentCity.id)}>
            <span className="city-location-name">{this.state.currentCity.name}</span>
            <span><IconFont style={{ fontSize: '22px' }} type="icon-arrow-right" /></span>
          </div>
        </div>
        <div className="city-content">
          <div className="hot-city-wrap city-part">
            <div className="title">热门城市</div>
            <div className="city-item-wrap">
              {cityItems(this.state.hotCity)}
            </div>
          </div>
          {
            // console.log(Object.keys(this.state.allCitys))

            Object.keys(this.state.allCitys).map((key, index) => {
              return (
                <div className="city-part" key={'city' + index}>
                  <div className="title">{key}</div>
                  <div className="city-item-wrap">
                    {cityItems(this.state.allCitys[key])}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
