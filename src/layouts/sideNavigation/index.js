import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import headerMobileStyles from './sideNavigation.scss'

@inject('store') @observer
class HeaderMobile extends Component {
    constructor (props) {
        super(props)
        this.state = {
            menuItems: {'Log in':{'href': '/login'},'Sign Up':{'href': '/signup'}}
        }
    }

    componentDidMount () {
        const { nav } = this.props.store
        this.setState({
            menuItems: nav.menuItems
        })
    }

    render () {
        const { ui } = this.props.store
        const { menuItems } = this.state

        return (
            <section className={[
                headerMobileStyles.navigation,
                ui.subNavOpen && headerMobileStyles.sNavOpen,
                this.props.filler && headerMobileStyles.filler
            ].join(' ')}>
                <div className={headerMobileStyles.menu}>
                    <ul className={headerMobileStyles.menuUl}>
                        { // Iterating over all menu items
                            Object.keys(menuItems).map((item, index) => (
                                <li className={headerMobileStyles.menuItem} key={index}>
                                    <a className={headerMobileStyles.menuLink} href={menuItems[item].href}>{item}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        )
    }
}

export default HeaderMobile
