import React from 'react'
import styles from './header.scss'

class Header extends React.Component {
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
        </header>
      )
    }
  }

  export default Header