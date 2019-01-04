import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './nav.scss'
import { ProfileBar } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

@inject('store') @observer
class Navigation extends Component {
    componentDidMount () {
        const { nav } = this.props.store
        this.setState({
            menuItems: nav.menuItems
        })
    }

    iconClick = arg => event => {
        const { ui } = this.props.store
        if (!ui.subNavOpen || ui.currentOpenTab == arg) ui.toggleSubNav()
        ui.setCurrentOpenTab(arg)
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
                    <div className={styles.menu}>
                        <ul className={styles.menuUl}>
                            {Object.keys(menuItems).map((item, index) => (
                                <li key={index} className={styles.menuItem} onClick={this.iconClick(item)} itemName={item}>
                                    <FontAwesomeIcon icon={menuItems[item].icon} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.menuExpanded}>
                        {user.loggedIn && <ProfileBar userName='Elomin' userRole='Best Developer' levelPercentage={66} level={10} />}
                        <h2 className={styles.currentHeading}>{ui.currentOpenTab}</h2>
                        <ul className={styles.menuExpandedUl}>
                            {menuItems[ui.currentOpenTab].children &&
                            Object.keys(menuItems[ui.currentOpenTab].children).map((item, index) => (
                                <div className={styles.menuExpandedItem} key={index}>
                                    {menuItems[ui.currentOpenTab].children[index].title}
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>}
            </section>
        )
    }
}

export default Navigation
