import React, { Component } from 'react'
import { NavigationMobile } from '../../components'
import { observer, inject } from 'mobx-react'
import styles from './standard.scss'

@inject('store') @observer
class Standard extends Component {
  componentDidMount() {
    document.querySelector(`.${styles.wrapper}`).addEventListener('mousedown', this.preventXScroll)
  }

  preventXScroll = (e) => {
    if (e.which == 2 && this.props.store.ui.subNavOpen) e.preventDefault()
  }

  render() {
    const { className } = this.props

    return (
      <section className={ [styles.wrapper, ...(className ? className : [''])].join(' ') }>
        <aside className={ styles.higherOrder }>
          <NavigationMobile />
        </aside>
        <NavigationMobile filler /> {/* Filler aligns content */}
        <div className={ styles.innerWrapper } onClick={ this.props.store.ui.closeSubNav }>
          { this.props.children }
        </div>
      </section>
    )
  }
}

export default Standard
