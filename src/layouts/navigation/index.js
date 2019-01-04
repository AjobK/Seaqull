import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './nav.scss'
import { NavDropdown } from '../../components'

@inject('store') @observer
class Navigation extends Component {
    componentDidMount () {
        const { nav } = this.props.store
        this.setState({
            menuItems: nav.menuItems
        })
    }

    iconClick() {
        const { ui } = this.props.store
        ui.toggleSubNav()
    }

    render () {
        const { ui, nav, user } = this.props.store
        const { filler, fillerWidthOnly } = this.props

        const menuItems = user.loggedIn ? nav.menuItemsLoggedIn : nav.menuItemsLoggedOut

        return (
            <section className={[
                fillerWidthOnly && styles.fillerWidth || styles.navigation,
                filler && styles.filler,
                ui.subNavOpen && styles.sNavOpen
            ].join(' ')}>
                {!filler && !fillerWidthOnly &&
                <div className={styles.wrapper}>
                    <div className={styles.menuExpanded}>
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
                    </div>
                </div>}
            </section>
        )
    }
}

export default Navigation
