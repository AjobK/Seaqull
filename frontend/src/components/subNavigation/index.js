import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './nav.scss'
import { SubNavigationElement } from '../../components'
import * as menuItemsJSON from './menuItems.json'

@inject('store') @observer
class SubNavigation extends Component {
  render() {
    const { profile } = this.props.store
    const { className } = this.props

    let menuItems = profile.loggedIn && menuItemsJSON.menuItemsLoggedIn || menuItemsJSON.menuItemsLoggedOut
    let navigationItems = []

    for (let key in menuItems) {
      navigationItems.push(
        <SubNavigationElement
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
              <SubNavigationElement
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

export default SubNavigation
