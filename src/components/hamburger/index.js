import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './hamburger.scss'

class Hamburger extends Component {
  render () {
    return (
      <div className={[style.hamburger, this.props.active && style.hActive, this.props.className].join(' ')} onClick={this.props.onClick}>
        <span className={style.hamburgerLine} />
        <span className={style.hamburgerLine} />
        <span className={style.hamburgerLine} />
      </div>
    )
  }
}

Hamburger.propTypes = {
  active: PropTypes.boolean,
  onClick: PropTypes.any,
  className: PropTypes.string
}

export default Hamburger
