import React, { Component } from 'react'
import styles from './header.scss'
import Popup from '../../components/popup';

class Header extends Component {
    render() {
        return (
            <header className={styles.header}>
                <h1 className={styles.logo}>Athena</h1>
                <nav className={styles.menu}>
                    <ul className={styles.menu__ul}>
                        <li className={styles.menu__link}>Log in</li>
                        <li className={styles.menu__signup}>Sign up</li>
                    </ul>
                </nav>
                <Popup overlayColor='#ffffff' target={styles.menu__signup}>
                    <h1>test</h1>
                </Popup>
            </header>
        )
    }
}

export default Header
