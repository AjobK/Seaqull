import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import headerStyles from './header.scss'
import { Button, Hamburger } from '../../components'

@inject('store') @observer
class Header extends Component {
    hamburgerClick() {
        const { ui } = this.props.store
        ui.toggleSubNav()
    }

    render() {
        const { ui, defaultData, user } = this.props.store
        let headerContent = (
            <section className={headerStyles.headerContent}>
                <Hamburger onClick={this.hamburgerClick.bind(this)} active={ui.subNavOpen} className={headerStyles.hamburger} />
                <h1 className={headerStyles.logo}>{ defaultData.projectName }</h1>
                {!user.loggedIn ? (
                    <nav className={headerStyles.menu}>
                        <ul className={headerStyles.menuUl}>
                            <li className={headerStyles.menuItem} onClick={user.logIn}>Log in</li>
                            <Button value='Sign Up' className={headerStyles.button} />
                        </ul>
                    </nav>
                ) : (
                    <nav className={headerStyles.menu}>
                        <ul className={headerStyles.menuUl}>
                            <li className={headerStyles.menuItem}>My profile</li>
                            <li className={headerStyles.menuItem} onClick={user.logOut}>Logout</li>
                        </ul>
                    </nav>
                )}
            </section>
        )

        const { filler, fillerHeightOnly } = this.props
        return filler && ( // Ensuring there is only ONE header for Google SEO
            <div className={headerStyles.filler}>
                {headerContent}
            </div>
        ) || fillerHeightOnly && (
            <div className={headerStyles.filler}>
                {headerContent}
            </div>
        ) || (
            <header className={headerStyles.header}>
                {headerContent}
            </header>
        )
    }
}

export default Header
