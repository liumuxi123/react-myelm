import React, { Component } from 'react'
// import { Button } from 'antd-mobile';
import Header from '@components/header/header.jsx'
import IconFont from '@components/iconFont/iconFont.jsx'
import { getCitys } from '@api/home/index.js'
import "./home.less"

const cityItems = (citys) =>{
  return citys.map((city,index) =>{
    return (<span className="city-item" key={index}>{city.name}</span>)
  })
}
export default class home extends Component {
  state = {
    currentCity:{},
    hotCity:[],
    allCitys:{}
  }
  componentDidMount(){
    this.currentCity()
    this.getHotCity()
    this.getAllCitys()
  }
  currentCity = async () => {
    const res = await getCitys({
      type:'guess'
    })
    this.setState({
      currentCity:res
    })
  }
  getHotCity = async () => {
    const res = await getCitys({
      type:'hot'
    })
    this.setState({
      hotCity:res
    })
  }
  getAllCitys = async () => {
    const res = await getCitys({
      type:'group'
    })
    this.setState({
      allCitys:res
    })
  }
  render() {
    return (
      <div className="home-wrap">
        <Header leftsolt={ <div>饿了么</div>}>
        </Header>
        <div className="city-card">
          <div className="city-tip">
            <span className="city-tip-left">当前城市：</span>
            <span>定位不准时，请在城市列表中选择</span>
          </div>
          <div className="city-location">
            <span className="city-location-name">{this.state.currentCity.name}</span>
            <span><IconFont type="icon-arrow-right"/></span>
          </div>
        </div>
        <div className="hot-city-wrap city-part">
          <div className="title">热门城市</div>
          <div className="city-item-wrap">
            {cityItems(this.state.hotCity)}
          </div>
        </div>
        {
          // console.log(Object.keys(this.state.allCitys))
          
          Object.keys(this.state.allCitys).map((key,index) =>{
            return (
              <div className="city-part" key={'city'+index}>
                <div className="title">{key}</div>
                <div className="city-item-wrap">
                  {cityItems(this.state.allCitys[key])}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
