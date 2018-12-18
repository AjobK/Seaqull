import React, { Component } from 'react'
import PropTypes from 'prop-types'
import headerMobileStyles from './sideNavigation.scss'

class HeaderMobile extends Component {
    render() {
        const menuItems = {
            'log in': {
                'href': '/login',
            },
            'sign up': {
                'href': '/signup'
            }
        }
        return (
            <section className={[headerMobileStyles.navigation, this.props.open && headerMobileStyles.sNavOpen].join(' ')}>
                <div className={headerMobileStyles.menu}>
                    <ul className={headerMobileStyles.menuUl}>
                        { // Iterating over all menu items
                            Object.keys(menuItems).map((item, index) => {
                                return (
                                    <li className={headerMobileStyles.menuItem} key={index}>
                                        <a className={headerMobileStyles.menuLink} href={menuItems[item].href}>{item}</a>
                                    </li>
                                ) 
                            })
                        }
                    </ul>
                </div>
            </section>
        )
    }
}

HeaderMobile.propTypes = {
    open: PropTypes.bool
}

export default HeaderMobile
