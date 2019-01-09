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

    iconClick = arg => () => {
        const { ui, nav, user } = this.props.store
        const menuItems = user.loggedIn ? nav.menuItemsLoggedIn : nav.menuItemsLoggedOut
        if (!menuItems[arg].children) {
            if (ui.subNavOpen) ui.closeSubNav()
        } else {
            if (!ui.subNavOpen || ui.currentOpenTab == arg) ui.toggleSubNav()
        }
        ui.setCurrentOpenTab(arg)
    }

    render () {
        const { ui, nav, user } = this.props.store
        const { filler, fillerWidthOnly } = this.props

        const menuItems = user.loggedIn ? nav.menuItemsLoggedIn : nav.menuItemsLoggedOut
        
        if (!menuItems[ui.currentOpenTab]) ui.setCurrentOpenTab(Object.keys(menuItems)[0])
        
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
                                <li key={index} className={[
                                        styles.menuItem,
                                        ui.currentOpenTab == item && (ui.subNavOpen || !menuItems[item].children) && styles.menuItemActive
                                    ].join(' ')}
                                    onClick={this.iconClick(item)} itemName={item}>
                                    <FontAwesomeIcon icon={menuItems[item].icon} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    { menuItems[ui.currentOpenTab].children &&
                        <div className={styles.menuExpanded}>
                            {user.loggedIn && <ProfileBar userName={user.name} userRole={user.role} levelPercentage={user.percentage} level={user.level} />}
                            <h2 className={styles.currentHeading}>{ui.currentOpenTab}</h2>
                            <ul className={styles.menuExpandedUl}>
                                {Object.keys(menuItems[ui.currentOpenTab].children).map((item, index) => (
                                    <div className={styles.menuExpandedItem} key={index}>
                                        {menuItems[ui.currentOpenTab].children[index].title}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    }
                </div>}
            </section>
        )
    }
}

export default Navigation
