import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../header'
import headerMobileStyles from './sideNavigation.scss'
import { ProfileBar } from '../../components'

@inject('store') @observer
class HeaderMobile extends Component {
    componentDidMount () {
        const { nav } = this.props.store
        this.setState({
            menuItems: nav.menuItems
        })
    }

    render () {
        const { ui, nav, user } = this.props.store

        const menuItems = user.loggedIn ? nav.menuItemsLoggedIn : nav.menuItemsLoggedOut

        return (
            <section className={[
                headerMobileStyles.navigation,
                ui.subNavOpen && headerMobileStyles.sNavOpen,
                this.props.filler && headerMobileStyles.filler
            ].join(' ')}>
                {!this.props.filler &&
                <div className={headerMobileStyles.menu}>
                    <Header fillerHeightOnly />
                    {user.loggedIn && <ProfileBar userName='Elomin' userRole='Developer' levelPercentage={66} level={10} />}
                    <ul className={headerMobileStyles.menuUl}>
                        { // Iterating over all menu items
                            Object.keys(menuItems).map((item, index) => {
                                return (
                                    <li className={headerMobileStyles.menuItem} key={index}>
                                        <a className={headerMobileStyles.menuLink} href={menuItems[index].href}>
                                            {menuItems[index].title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>}
            </section>
        )
    }
}

export default HeaderMobile
