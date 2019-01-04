import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../header'
import styles from './nav.scss'
import { ProfileBar, NavDropdown } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                <div className={styles.menu}>
                    <ul className={styles.menuUl}>
                        {Object.keys(menuItems).map((item, index) => (
                            <li key={index} className={styles.menuItem} onClick={this.props.onClick}>
                                <FontAwesomeIcon icon={menuItems[item].icon} onClick={this.iconClick.bind(this)}/>
                            </li>
                        ))}
                    </ul>
                </div>}
            </section>
        )
    }
}

export default Navigation
