import React, { Component } from 'react'
import styles from './header.scss'
import { Button } from '../../components'

class Header extends Component {
    render() {
        return (
            <header className={styles.header}>
                <h1 className={styles.logo}>Athena</h1>
                <nav className={styles.menu}>
                    <ul className={styles.menu__ul}>
                        <li className={styles.menu__link}>Log in</li>
                        <Button value='Sign Up' />
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header
