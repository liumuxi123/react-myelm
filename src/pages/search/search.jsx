import React, { Component } from 'react'
import IconFont from '@components/iconFont/iconFont.jsx'
import Footer from '@components/footer/footer.jsx'
import { List, InputItem } from 'antd-mobile';
import { getSearchCategory } from "@api/search";
import { setStorage, getStorage, removeStorage } from "@utils/index.js";
import './search.less'

export default class search extends Component {
  state = {
    searchVal: '',
    geohash: '',
    restaurants: []
  }
  componentDidMount() {
    // const query = this.props.location.query
    // this.setState({
    //   geohash: query.geohash
    // })
  }
  goBack = () => {
    this.props.history.goBack()
  }
  handleInput = (val) => {
    this.setState({
      searchVal: val
    })
  }
  doSearch = async () => {
    const params = {
      geohash: this.state.geohash,
      keyword:this.state.searchVal
    }
    const res = await getSearchCategory(params)
    if (res.status !== 0) {
      console.log(res);
      this.setState({
        restaurants: res
      })
    }
  }
  render() {
    return (
      <div className="search-page-wrap">
        <div className="header">
          <IconFont onClick={this.goBack} className="header-icon" type="icon-arrow-left" />
          <span>搜索</span>
          <span></span>
        </div>
        <div className="search-bar-wrap">
          <List className="search-input-wrap">
            <InputItem
              clear
              placeholder="请输入商家或美食名称"
              defaultValue={this.state.searchVal}
              onChange={this.handleInput}
            ></InputItem>
          </List>
          <div onClick={this.doSearch}>
            <IconFont type="icon-sousuo" className="search-icon" />
          </div>
        </div>
        <div className="search-contents">

        </div>
        <Footer />
      </div>
    )
  }
}
