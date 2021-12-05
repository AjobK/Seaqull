import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './nav.scss'
import { NavigationMobileElement } from '../../components'

@inject('store') @observer
class NavigationMobile extends Component {
  render() {
    const { nav, profile, open } = this.props.store

    let menuItems = profile.loggedIn && nav.menuItemsLoggedIn || nav.menuItemsLoggedOut
    let arr = []

    for (let key in menuItems) {
      if (menuItems.hasOwnProperty(key)) {
        arr.push(
          <NavigationMobileElement
            title={ key }
            icon={ menuItems[key].icon }
            key={ Math.random() }
            value={ menuItems[key].children
            } />
        )
      }
    }

    return (
      <section className={ [
        styles.navigation,
        open && styles.sNavOpen
      ].join(' ') }>
        <div className={ styles.menu }>
          <ul className={ styles.menuUl }>
            {arr}
          </ul>
        </div>
      </section>
    )
  }
}

export default NavigationMobile
