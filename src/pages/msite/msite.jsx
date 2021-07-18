import React, { Component } from 'react'
import Header from '@components/header/header.jsx'
import Footer from '@components/footer/footer.jsx'
import IconFont from '@components/iconFont/iconFont.jsx'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import { getFoodCategory, getPositionByGeohash, getRestaurants } from "@api/msite";
import { Link } from "react-router-dom";
import 'swiper/swiper.less';
import 'swiper/components/pagination/pagination.less';
import './msite.less'

SwiperCore.use([Pagination]);
export default class msite extends Component {
    state = {
        address: '',
        latitude: '',
        longitude: '',
        foodCategorys: [],
        restaurants: [],
        imgBaseUrl: "https://fuss10.elemecdn.com/",
        imgBaseUrl2: "//elm.cangdu.org/img/"
    }
    componentDidMount() {
        let geohash = this.props.match.params.geohash || ','
        this.setState({
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
                                                return (<Link className="category-item" key={index} to={'/'} >
                                                    <div className="img-wrap">
                                                        <img src={this.state.imgBaseUrl + item.image_url} />
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
                        <div className="restaurant-lists">
                            {
                                this.state.restaurants.map((item, index) => {
                                    return (<div className="restaurant-item" key={index}>
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
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div>
                <Footer />            
            </div>
        )
    }
}
