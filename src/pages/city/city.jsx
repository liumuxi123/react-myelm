import React, { Component } from 'react'
import IconFont from '@components/iconFont/iconFont.jsx'
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { getPosition, getCityInfo } from "@api/city";
import { setStorage, getStorage, removeStorage } from "@utils/index.js";
import './city.less'

export default class city extends Component {
    state = {
        cityId: '',
        cityName: '',
        searchVal: '',
        searchResult: [],
        historyList: []
    }
    componentDidMount() {
        let cityId = this.props.match.params.id
        this.setState({
            cityId
        })
        this.getCurrentCityInfo(cityId)
        const palceHistory = getStorage('placeHistory')
        if (palceHistory) {
            this.setState({
                historyList:JSON.parse(palceHistory)
            })
        }
    }
    getCurrentCityInfo = async (cityId) => {
        const res = await getCityInfo(cityId)
        if (res.status !== 0) {
            this.setState({
                cityName: res.name
            })
        }
    }
    goBack = () => {
        this.props.history.goBack()
    }
    goToHome = () => {
        this.props.history.push('/home')
    }
    handleInput = (val) => {
        this.setState({
            searchVal: val
        })
    }
    selectLocation = (item, type) => {
        if (type == 'search') {
            // 保存到本地
            let hasFlag = false
            this.state.historyList.forEach((history) => {
                if (history.geohash == item.geohash) {
                    hasFlag = true
                }
            })
            if (!hasFlag) {
                this.state.historyList.unshift(item)
                this.setState({
                    historyList: this.state.historyList
                })
                setStorage('placeHistory', JSON.stringify(this.state.historyList))
            }
        }
        this.props.history.push(`/msite/${item.geohash}`)
    }
    clearHistory = () => {
        removeStorage('placeHistory')
        this.setState({
            historyList: []
        })
    }

    searchPosition = async () => {
        let params = {
            city_id: this.state.cityId,
            type: 'search',
            keyword: this.state.searchVal
        }
        const res = await getPosition(params)
        if (res.status !== 0) {
            this.setState({
                searchResult: res
            })
        }
    }
    render() {
        const locationItems = (data, type) => {
            return data.map((item, index) => {
                return (<div className="location-item" key={index} onClick={this.selectLocation.bind(this, item, type)}>
                    <div className="name">{item.name}</div>
                    <div className="address">{item.address}</div>
                </div>)
            })
        }

        return (
            <div className="city-wrap">
                <div className="header">
                    <IconFont onClick={this.goBack} className="header-icon" type="icon-arrow-left" />
                    <span>{this.state.cityName}</span>
                    <span onClick={this.goToHome}>切换城市</span>
                </div>
                <div className="search-wrap">
                    <List className="search-input-wrap">
                        <InputItem
                            clear
                            placeholder="输入学校，商务楼，地址"
                            defaultValue={this.state.searchVal}
                            onChange={this.handleInput}
                        ></InputItem>
                    </List>
                    <div onClick={this.searchPosition}>
                        <IconFont type="icon-sousuo" className="search-icon" />
                    </div>
                </div>
                {
                    this.state.searchResult.length > 0 ? (<div className="search-lists-wrap location-list-wrap">
                        {locationItems(this.state.searchResult, 'search')}
                    </div>) : this.state.historyList.length > 0 ? (
                        <div className="search-history-wrap">
                            <h3 className="title">搜索历史</h3>
                            <div className="search-history location-list-wrap">
                                {locationItems(this.state.historyList, 'history')}
                            </div>
                            <div className="clear-history" onClick={this.clearHistory}>
                                清空所有
                            </div>
                        </div>
                    ) : (<div></div>)
                }

            </div>
        )
    }
}
