import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import headerStyles from './header.scss'
import { Button, Hamburger } from '../../components'
import Banner from '../../components/banner'

@inject('store') @observer
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hOpen: true
        }
    }

    hamburgerClick() {
        const { ui } = this.props.store
        ui.toggleSubNav()
    }

    render() {
        const { ui, defaultData } = this.props.store
        let headerContent = (
            <div className={headerStyles.wrapper}>
                <Banner title='Enjoying your stay?' description='Join our community entirely for free'/>
                <section className={headerStyles.headerContent}>
                    <Hamburger onClick={this.hamburgerClick.bind(this)} active={ui.subNavOpen} className={headerStyles.hamburger} />
                    <h1 className={headerStyles.logo}>{ defaultData.projectName }</h1>
                    <nav className={headerStyles.menu}>
                        <ul className={headerStyles.menuUl}>
                            <li className={headerStyles.menuItem}>Log in</li>
                            <Button value='Sign Up' className={headerStyles.button} />
                        </ul>
                    </nav>
                </section>
            </div>
        )

        const { filler } = this.props
        return filler && ( // Ensuring there is only ONE header for Google SEO
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

Header.propTypes = {
    filler: PropTypes.bool,
    store: PropTypes.any
}

export default Header
