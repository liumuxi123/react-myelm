import React, { Component } from 'react'
import IconFont from '@components/iconFont/iconFont.jsx'
import Footer from '@components/footer/footer.jsx'
import { connect } from "react-redux";
import { List, InputItem } from 'antd-mobile';
import { getSearchCategory } from "@api/search";
import { saveAttrInfo } from '../../store/action';
import PropTypes from "prop-types";
import ShopList from '@components/shopList/shopList';
import './search.less'

class search extends Component {
  static propTypes = {
    searchHistory: PropTypes.array.isRequired,
    saveAttrInfo: PropTypes.func.isRequired
  }
  state = {
    searchVal: '',
    geohash: '',
    restaurants: [],
    searchFlag: false // 是否搜索
  }
  componentDidMount() {
    const params = this.props.match.params
    this.setState({
      geohash: params.geohash
    })
  }
  goBack = () => {
    this.props.history.goBack()
  }
  handleInput = (val) => {
    this.setState({
      searchVal: val
    })
  }
  doSearch = async (val) => {
    const params = {
      geohash: this.state.geohash,
      keyword: val
    }
    const res = await getSearchCategory(params)
    if (res.status !== 0) {
      console.log(res);
      this.setState({
        restaurants: res,
        searchFlag: true
      })
    }
    this.saveHistory(val)
  }
  /**
   * 保存历史记录
   */
  saveHistory = (val) => {
    if (!this.props.searchHistory || this.props.searchHistory.length === 0) {
      this.props.saveAttrInfo('searchHistory', [val])
    } else {
      let flag = false
      this.props.searchHistory.forEach(item => {
        if (item === val) {
          flag = true
        }
      });
      if (!flag) {
        this.props.saveAttrInfo('searchHistory', [...this.props.searchHistory, val])
      }
    }
  }
  clearHistory = () => {
    this.props.saveAttrInfo('searchHistory', [])
  }
  deleteHistory = (e, val) => {
    console.log(e, val);
    e.stopPropagation()
    let index = -1
    this.props.searchHistory.forEach((item, i) => {
      if (item === val) {
        index = i
      }
    });
    let history = [...this.props.searchHistory]
    history.splice(index, 1)
    this.props.saveAttrInfo('searchHistory', history)
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
          <div onClick={this.doSearch.bind(this, this.state.searchVal)}>
            <IconFont type="icon-sousuo" className="search-icon" />
          </div>
        </div>
        <div className="search-contents">
          {
            this.state.searchFlag ? (<section className="restaurants-wrap">
              {
                this.state.restaurants && this.state.restaurants.length > 0 ? (<div>
                  <h3>商家</h3>
                  <div className="restaurant-content">
                    <ShopList data={this.state.restaurants} geohash={this.state.geohash} />
                  </div>
                </div>) : (<div className="no-data">抱歉，暂无搜索结果</div>)
              }
            </section>) : (<section className="history-wrap">
              <h3>搜索历史</h3>
              {
                this.props.searchHistory.length > 0 ? (<div className="history-contents">
                  {
                    this.props.searchHistory.map((history, index) => {
                      return (<div key={index} className="history-item" onClick={this.doSearch.bind(this, history)}>
                        <span>{history}</span>
                        <IconFont type="icon-guanbi" className="close-icon" onClick={(e) => { this.deleteHistory(e, history) }} />
                      </div>)
                    })
                  }
                  <div className="clear" onClick={this.clearHistory}>清空搜索历史</div>
                </div>) : (<div></div>)
              }
            </section>)
          }
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchHistory: state.searchHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAttrInfo: (attr, geohash) => dispatch(saveAttrInfo(attr, geohash))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(search)
