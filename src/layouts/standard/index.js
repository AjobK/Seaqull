import React, { Component } from 'react'
import { Header } from '../../layouts'
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
    return (
      <section className={styles.wrapper}>
        <Header />
        <aside className={styles.higherOrder}>
          <NavigationMobile />
        </aside>
        <NavigationMobile filler /> {/* Filler aligns content */}
        <div className={styles.innerWrapper} onClick={this.props.store.ui.closeSubNav}>
          { this.props.children }
        </div>
      </section>
    )
  }
}

export default Standard
