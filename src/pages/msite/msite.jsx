import React, { Component } from 'react'
import Header from '@components/header/header.jsx'
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
        imgBaseUrl: "https://fuss10.elemecdn.com"
    }
    componentDidMount() {
        let geohash = this.props.match.params.geohash || ','
        this.setState({
            latitude: geohash.split(',')[0],
            longitude: geohash.split(',')[1],
        })
        this.getPositionInfo()
        this.getFoodCategorys()
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
            console.log(foodCategorys,222);
            this.setState({
                foodCategorys,
            })
        }
    }
    goSearch = () => {

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
                </div>

            </div>
        )
    }
}
