import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../header'
import styles from './nav.scss'
import { ProfileBar, NavDropdown } from '../../components'

@inject('store') @observer
class NavigationMobile extends Component {
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
                styles.navigation,
                ui.subNavOpen && styles.sNavOpen,
                this.props.filler && styles.filler
            ].join(' ')}>
                {!this.props.filler &&
                <div className={styles.menu}>
                    <Header fillerHeightOnly />
                    {user.loggedIn && <ProfileBar userName={user.name} userRole={user.role} levelPercentage={user.percentage} level={user.level} />}
                    <ul className={styles.menuUl}>
                        {Object.keys(menuItems).map((item, index) => (
                            <NavDropdown
                                title={item}
                                icon={menuItems[item].icon}
                                key={index}
                                value={menuItems[item].children
                            } />
                        ))}
                    </ul>
                </div>}
            </section>
        )
    }
}

export default NavigationMobile
