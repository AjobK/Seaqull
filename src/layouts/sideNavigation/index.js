import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../header'
import headerMobileStyles from './sideNavigation.scss'
import { ProfileBar } from '../../components'

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
        const { ui, nav } = this.props.store

        return (
            <section className={[
                headerMobileStyles.navigation,
                ui.subNavOpen && headerMobileStyles.sNavOpen,
                this.props.filler && headerMobileStyles.filler
            ].join(' ')}>
                {!this.props.filler &&
                <div className={headerMobileStyles.menu}>
                    <Header fillerHeightOnly />
                    <ProfileBar userRole='Developer' level={10} />
                    <ul className={headerMobileStyles.menuUl}>
                        { // Iterating over all menu items
                            Object.keys(nav.menuItems).map((item, index) => {
                                return (
                                    <li className={headerMobileStyles.menuItem} key={index}>
                                        <a className={headerMobileStyles.menuLink} href={nav.menuItems[index].href}>
                                            {nav.menuItems[index].title}
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
