import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconFont from '@components/iconFont/iconFont'
import './ratingStar.less'

export default class ratingStar extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    all: PropTypes.number
  }

  starRender = () => {
    let num = this.props.all || 5
    let html = []
    for (let i = 0; i < num; i++) {
      html.push(<span key={i} className={i < Math.floor(this.props.rating || 0) ? 'active star-icon' : 'star-icon'}>
        <IconFont type="icon-star" className="icon-star-style" />
      </span>)
    }
    return html
  }

  render() {
    return (
      <div className="star-wrap">
        {
          this.starRender()
        }
      </div>
    )
  }
}
