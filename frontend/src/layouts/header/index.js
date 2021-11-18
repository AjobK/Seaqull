import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './header.scss'
import { Hamburger, HeaderNavigation } from '../../components'

@inject('store') @observer
class Header extends Component {
  hamburgerClick() {
    const { ui } = this.props.store

    ui.toggleSubNav()
  }

  render() {
    const { ui } = this.props.store

    let headerContent = (
      <section className={ styles.headerContent }>
        <HeaderNavigation />
        <Hamburger onClick={ this.hamburgerClick.bind(this) } active={ ui.subNavOpen } className={ styles.hamburger } />
      </section>
    )

    return (
      <div className={ [
        styles.headerWrap,
        ui.subNavOpen && styles.sNavOpen
      ].join(' ') }>
        <header className={ [styles.header].join(' ') }>
          {headerContent}
        </header>
      </div>
    )
  }
}

export default Header
