import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './header.scss'
import { Button } from '../../components'

class Header extends Component {
    render() {
        let headerContent = (
            <section className={styles.headerContent}>
                <h1 className={styles.logo}>Athena</h1>
                <nav className={styles.menu}>
                    <ul className={styles.menu__ul}>
                        <li className={styles.menu__link}>Log in</li>
                        <Button value='Sign Up' />
                    </ul>
                </nav>
            </section>
        )

        const { filler } = this.props
        return filler && ( // Ensuring there is only ONE header for google SEO
            <div className={styles.filler}>
                {headerContent}
            </div>
        ) || (
            <header className={styles.header}>
                {headerContent}
            </header>
        )
    }
}

Header.propTypes = {
    filler: PropTypes.bool
}

export default Header
