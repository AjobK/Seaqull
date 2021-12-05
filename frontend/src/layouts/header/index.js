import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './header.scss'
import { Hamburger, HeaderNavigation, NavigationMobile } from '../../components'

@inject('store') @observer
class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subNavOpen: false
    }
  }

  toggleSubNavigation = () => {
    let { subNavOpen } = this.state

    this.setState({ subNavOpen: !subNavOpen })
  }

  render() {
    const { subNavOpen } = this.state

    return (
      <div className={ [
        styles.headerWrap,
        subNavOpen && styles.sNavOpen
      ].join(' ') }>
        <header className={ [styles.header].join(' ') }>
          <section className={ styles.headerContent }>
            <HeaderNavigation />
            <Hamburger
              onClick={ this.toggleSubNavigation }
              active={ subNavOpen }
              className={ styles.hamburger }
            />
          </section>
          <div className={ [
            styles.navigationMobile,
            !subNavOpen ? styles.hide : ''
          ].join(' ') } >
            <NavigationMobile />
          </div>
        </header>
      </div>
    )
  }
}

export default Header
