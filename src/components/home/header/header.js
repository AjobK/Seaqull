import React from 'react'
import styles from '../header/header.scss'

class Header extends React.Component {
    render() {
      return (
      <header class={styles.header}>
        <h1 class="header__logo">Athena</h1>
            <nav class="header__menu">
                <ul class="header__menu-ul">
                    <li class="header__menu-link">Log in</li>
                    <li class="header__menu-link__signup">Sign up</li>
                </ul>
            </nav>
        </header>
      )
    }
  }

  export default Header