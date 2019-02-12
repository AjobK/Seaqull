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
            <Link to='/profile' className={styles.menuItem}>
              <li>My profile</li>
            </Link>
            <li onClick={user.logOut} className={styles.menuItem}>Logout</li>
          </ul>
        ) : ( // Logged out content
          <ul className={styles.menuUl}>
            <li onClick={user.logIn} className={styles.menuItem}>Log in</li>
            <Button value='Sign Up' className={styles.button} />
          </ul>
        )}
      </nav>
    )
  }
}

export default HeaderNavigation
