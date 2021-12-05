import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './nav.scss'
import { NavigationMobileElement } from '../../components'

@inject('store') @observer
class NavigationMobile extends Component {
  render() {
    const { nav, profile } = this.props.store
    const { className } = this.props

    let menuItems = profile.loggedIn && nav.menuItemsLoggedIn || nav.menuItemsLoggedOut
    let navigationItems = []

    for (let key in menuItems) {
      navigationItems.push(
        <NavigationMobileElement
          title={ key }
          to={ menuItems[key]?.ref }
          icon={ menuItems[key]?.icon }
          key={ Math.random() }
        />
      )
    }

    return (
      <section className={ [
        styles.navigation,
        className
      ].join(' ') }>
        <div className={ styles.menu }>
          <ul className={ styles.menuUl }>
            { navigationItems }
            {
              profile.loggedIn &&
              <NavigationMobileElement
                title={ 'Logout' }
                icon={ 'SignOutAlt' }
                onClick={ () => {
                  profile.logOut()
                } }
              />
            }
          </ul>
        </div>
      </section>
    )
  }
}

export default NavigationMobile
