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
        <header className={ styles.header }>
          <section className={ styles.headerContent }>
            <HeaderNavigation subNavOpen={ subNavOpen } />
            <Hamburger
              onClick={ this.toggleSubNavigation }
              active={ subNavOpen }
              className={ styles.hamburger }
            />
            <NavigationMobile className={ `${ styles.navigationMobileBox } ${ !subNavOpen ? styles.hide : '' }` } />
          </section>
          <div
            className={ [
              styles.navigationMobile,
              !subNavOpen ? styles.hide : ''
            ].join(' ') }
          >
            <div
              className={ styles.overlay }
              onClick={ () => {
                console.log('CLOSEEE')
                this.setState({ subNavOpen: false })
              } }
            />
          </div>
        </header>
      </div>
    )
  }
}

export default Header
