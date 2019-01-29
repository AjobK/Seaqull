import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './headerNavigation.scss'
import { Link } from 'react-router-dom'
import { Button } from '../../components'

@inject('store') @observer
class HeaderNavigation extends Component {
  render() {
    const { user } = this.props.store

    return (
      <nav className={styles.menu}>
        {user.loggedIn ? ( // Logged in content
          <ul className={styles.menuUl}>
            <Link to="/profile" className={styles.menuItem}>
              <li>My profile</li>
            </Link>
            <Link to="/" className={styles.menuItem}>
              <li onClick={user.logOut}>Logout</li>
            </Link>
          </ul>
        ) : ( // Logged out content
          <ul className={styles.menuUl}>
            <Link to="/" className={styles.menuItem}>
              <li onClick={user.logIn}>Log in</li>
            </Link>
            <Button value="Sign Up" className={styles.button} />
          </ul>
        )}
      </nav>
    )
  }
}

export default HeaderNavigation
