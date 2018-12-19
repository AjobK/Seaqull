import React, { Component } from 'react'
import PropTypes from 'prop-types'
import headerStyles from './header.scss'
import { Button, Hamburger } from '../../components'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hOpen: true
        }
    }

    hamburgerClick() {
        this.setState({
            hOpen: !this.state.hOpen
        })
    }

    render() {
        let headerContent = (
            <section className={headerStyles.headerContent}>
                <Hamburger onClick={this.hamburgerClick.bind(this)} active={this.state.hOpen} />
                <h1 className={headerStyles.logo}>Athena</h1>
                <nav className={headerStyles.menu}>
                    <ul className={headerStyles.menuUl}>
                        <li className={headerStyles.menuItem}>Log in</li>
                        <Button value='Sign Up' className={headerStyles.button} />
                    </ul>
                </nav>
            </section>
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
    filler: PropTypes.bool
}

export default Header
