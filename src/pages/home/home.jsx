import React, { Component } from 'react'
// import { Button } from 'antd-mobile';
import Header from '@components/header/header.jsx'
export default class home extends Component {
  render() {
    return (
      <div className="home-wrap">
        <Header leftsolt={ <div>饿了么</div>}>
        </Header>
        <div className="city-nav">

        </div>
      </div>
    )
  }
}
