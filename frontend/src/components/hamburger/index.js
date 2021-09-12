import React, { Component } from 'react'
import style from './hamburger.scss'

class Hamburger extends Component {
  render() {
    return (
      <div
        className={ [style.hamburger, this.props.active && style.hActive, this.props.className].join(' ') }
        onClick={ this.props.onClick }
      >
        <span className={ style.hamburgerLine } />
        <span className={ style.hamburgerLine } />
        <span className={ style.hamburgerLine } />
      </div>
    )
  }
}

export default Hamburger
