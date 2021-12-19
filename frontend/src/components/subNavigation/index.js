import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './nav.scss'
import { SubNavigationElement } from '../../components'
import * as navigationItemsJSON from './navigationItems.json'

@inject('store') @observer
class SubNavigation extends Component {
  render() {
    const { profile } = this.props.store
    const { className } = this.props
    const { navigationItemsLoggedIn, navigationItemsLoggedOut } = navigationItemsJSON

    const navigationItems = profile.loggedIn
      ? navigationItemsLoggedIn
      : navigationItemsLoggedOut
    const navigationElements = []

    for (let key in navigationItems) {
      navigationElements.push(
        <SubNavigationElement
          title={ key }
          to={ navigationItems[key]?.ref }
          icon={ navigationItems[key]?.icon }
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
            { navigationElements }
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
